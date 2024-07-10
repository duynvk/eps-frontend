import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../services/api.js';

const SelectTeam = ({ groupId, onSelect }) => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    if (groupId) {
      const fetchTeams = async () => {
        try {
          const response = await axiosInstance.get(`/teams/${groupId}`);
          setTeams(response.data);
        } catch (error) {
          console.error('Error fetching teams:', error);
        }
      };
      fetchTeams();
    }
  }, [groupId]);

  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chọn đội:</label>
      <select
        className="mt-1 block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => onSelect(e.target.value)}
        disabled={!groupId}
      >
        <option value="">Đội</option>
        {teams.map((team) => (
          <option key={team._id} value={team._id}>
            {team.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectTeam;
