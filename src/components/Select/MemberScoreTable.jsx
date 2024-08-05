import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../services/api.js';

const MemberScoreTable = ({ teamId }) => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (teamId) {
      const fetchMembers = async () => {
        try {
          const response = await axiosInstance.get(`/members/${teamId}`);
          setMembers(response.data);
        } catch (error) {
          console.error('Error fetching members:', error);
        }
      };
      fetchMembers();
    }
  }, [teamId]);

  return (
    <div>
      {members.length > 0 ? (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Tên đội viên</th>
              <th className="px-4 py-2 border">Số điểm</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member._id}>
                <td className="px-4 py-2 border">{member.name}</td>
                <td className="px-4 py-2 border text-center">{member.total_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">Không có thành viên nào.</p>
      )}
    </div>
  );
};

export default MemberScoreTable;
