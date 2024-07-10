import React, { useState, useEffect } from 'react';
import { axiosInstance } from "../services/api";

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState('groups');
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    if (selectedOption === 'groups') {
      fetchRankedGroups();
    } else if (selectedOption === 'teams') {
      fetchTopTeams();
    } else {
      fetchTopMembers();
    }
  }, [selectedOption]);

  const fetchRankedGroups = async () => {
    try {
      const response = await axiosInstance.get('/ranked-groups');
      setRankings(response.data);
    } catch (err) {
      console.error('Error fetching ranked groups:', err);
    }
  };

  const fetchTopTeams = async () => {
    try {
      const response = await axiosInstance.get('/top-20-teams');
      setRankings(response.data);
    } catch (err) {
      console.error('Error fetching top teams:', err);
    }
  };

  const fetchTopMembers = async () => {
    try {
      const response = await axiosInstance.get('/top-20-members');
      setRankings(response.data);
    } catch (err) {
      console.error('Error fetching top members:', err);
    }
  };

  const getMedal = (rank) => {
    switch (rank) {
      case 1:
        return '🥇'; // Gold Medal
      case 2:
        return '🥈'; // Silver Medal
      case 3:
        return '🥉'; // Bronze Medal
      default:
        return null;
    }
  };

  return (
    <div className="p-4 bg-cyan-900 justify-center items-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Bảng Xếp Hạng</h1>
      <div className="mb-4">
        <button
          className={`px-4 py-2 mr-2 ${selectedOption === 'groups' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedOption('groups')}
        >
          Top ĐV
        </button>
        <button
          className={`px-4 py-2 mr-2 ${selectedOption === 'teams' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedOption('teams')}
        >
          Top Đội
        </button>
        <button
          className={`px-4 py-2 ${selectedOption === 'members' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedOption('members')}
        >
          Top Cá Nhân
        </button>
      </div>
      <div className="overflow-x-auto bg-cyan-900 justify-center items-center h-screen">
        <table className="min-w-full bg-white border shadow-2xl font-[Poppins] border-2 border-cyan-200 w-6/12">
          <thead>
            <tr>
              <th className="px-4 py-3 border text-center bg-cyan-800">Xếp Hạng</th>
              <th className="px-4 py-3 border text-center
              bg-cyan-800">{selectedOption === 'groups' ? 'Tên ĐV' : selectedOption === 'teams' ? 'Tên Đội' : 'Tên Cá Nhân'}</th>
              <th className="px-4 py-3 border text-center
              bg-cyan-800">{selectedOption === 'groups' || selectedOption === 'teams' ? 'Điểm Trung Bình' : 'Tổng Điểm'}</th>
              <th className="px-4 py-3 border text-center
              bg-cyan-800">Huy Chương</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((item, index) => (
              <tr className="bg-cyan-200 hover:bg-cyan-100 hover:scale-105 cursor-pointer duration-300" key={item._id}>
                <td className="px-6 py-3 border text-center">{index + 1}</td>
                <td className="px-6 py-3 border text-center">{selectedOption === 'groups' ? item.name : selectedOption === 'teams' ? item.name : item.name}</td>
                <td className="px-6 py-3 border text-center">{selectedOption === 'groups' || selectedOption === 'teams' ? item.avg_score : item.total_score}</td>
                <td className="px-6 py-3 border text-center">{getMedal(index + 1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
