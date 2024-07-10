import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../services/api.js';

const ScoreEntryForm = ({ teamId, selectedDate }) => {
  const [members, setMembers] = useState([]);
  const [scores, setScores] = useState({});

  useEffect(() => {
    if (teamId) {
      const fetchMembers = async () => {
        try {
          const response = await axiosInstance.get(`/members/${teamId}`);
          setMembers(response.data);
          const initialScores = {};
          response.data.forEach(member => {
            initialScores[member._id] = {
              score_tp: 0,
              score_lxr: 0,
              score_tdm1l: 0,
              score4_tdm4l: 0,
              score_cn: 0,
              score_pb70cd: 0,
              score_pbpr: 0,
              score_ds: 0,
              score_dst: 0,
              score_edu: 0,
              score_nh: 0,
              score_dt0: 0,
              score_dt1: 0,
              score_hh: 0,
              score_kt: 0,
            };
          });
          setScores(initialScores);
        } catch (error) {
          console.error('Error fetching members:', error);
        }
      };
      fetchMembers();
    }
  }, [teamId]);

  const handleScoreChange = (memberId, field, value) => {
    setScores({
      ...scores,
      [memberId]: {
        ...scores[memberId],
        [field]: value
      }
    });
  };

  const handleSubmit = async () => {
    try {
      for (const memberId of Object.keys(scores)) {
        const scoreEntry = {
          memberId: memberId,
          date: selectedDate,
          scores: scores[memberId]
        };
        console.log('scoreEntry:', scoreEntry);
        // Gửi dữ liệu lên server cho từng memberId
        const response = await axiosInstance.post(`/enter-score`, scoreEntry);
        console.log(`Score saved successfully for member ${memberId}`);
        console.log('Response from server:', response.data);
      }
  
      alert('All scores saved successfully!');
    } catch (error) {
      console.error('Error saving scores:', error);
      alert('Failed to save scores.');
    }
  };

  return (
    <div>
      {members.length > 0 && (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-20 py-2 border whitespace-nowrap">Đội viên</th>
              <th className="px-4 py-2 border">TP</th>
              <th className="px-1 py-2 border">Laxaro</th>
              <th className="px-4 py-2 border">1L</th>
              <th className="px-4 py-2 border">4L</th>
              <th className="px-4 py-2 border">CN</th>
              <th className="px-2 py-2 border">PB 70CĐ</th>
              <th className="px-1 py-2 border">PB Preaching</th>
              <th className="px-4 py-2 border">Đọc sách</th>
              <th className="px-1 py-2 border">Đọc+thi sách</th>
              <th className="px-4 py-2 border">Edu</th>
              <th className="px-3 py-2 border">Nhóm</th>
              <th className="px-4 py-2 border">ĐT1</th>
              <th className="px-4 py-2 border">ĐT5</th>
              <th className="px-4 py-2 border">HH</th>
              <th className="px-4 py-2 border">KT</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member._id}>
                <td className="px-4 py-2 border">{member.name}</td>
                {Object.keys(scores[member._id]).map((field) => (
                  <td className="px-1 py-1 border text-center" key={field}>
                    <input
                      type="number"
                      value={scores[member._id][field]}
                      onChange={(e) => handleScoreChange(member._id, field, e.target.value)}
                      className="w-full text-center"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-500 text-white"
        style={{ float: 'right' }} // Đưa nút Save sang phía bên phải
      >
        Lưu
      </button>
    </div>
  );
};

export default ScoreEntryForm;
