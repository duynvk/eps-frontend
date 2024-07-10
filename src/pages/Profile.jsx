// components/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/users/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load profile data');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="profile-page">
      <div class="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
            <div class="w-full flex flex-col 2xl:w-1/3">
                <div class="flex-1 bg-white rounded-lg shadow-xl p-8">
                    <h4 class="text-xl text-gray-900 font-bold">Hồ sơ người dùng</h4>
                    <ul class="mt-2 text-gray-700">
                        <li class="flex border-y py-2">
                            <span class="font-bold w-24">Username:</span>
                            <span class="text-gray-700">{user.username}</span>
                        </li>
                        <li class="flex border-b py-2">
                            <span class="font-bold w-24">Email:</span>
                            <span class="text-gray-700">{user.email}</span>
                        </li>
                        <li class="flex border-b py-2">
                            <span class="font-bold w-24">ĐV:</span>
                            <span class="text-gray-700">{user.group_id ? user.group_id.name : 'No group assigned'}</span>
                        </li>
                        <li class="flex border-b py-2">
                            <span class="font-bold w-24">Đội</span>
                            <span class="text-gray-700">{user.team_id ? user.team_id.name : 'No team assigned'}</span>
                        </li>
                    </ul>
                </div>
            </div>
      </div>
    </div>
  );
};

export default Profile;
