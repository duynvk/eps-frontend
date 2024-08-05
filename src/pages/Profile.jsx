// components/Profile.js
import React, { useState } from 'react';
import SelectGroup from '../components/Select/SelectGroup';
import SelectTeam from '../components/Select/SelectTeam';
import MemberScoreTable from '../components/Select/MemberScoreTable';

const Profile = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Bảng Điểm</h1>
      <div className="flex items-center mb-4 space-x-4">
        <div className="w-1/4">  </div>
        <div className="w-1/4">
          <SelectGroup onSelect={(groupId) => { setSelectedGroup(groupId); setSelectedTeam(null); }} />
        </div>
        {selectedGroup && (
          <div className="w-1/4">
            <SelectTeam groupId={selectedGroup} onSelect={setSelectedTeam} />
          </div>
        )}
      </div>
      {selectedTeam && (
        <>
          <div className="flex justify-center">
          <MemberScoreTable teamId={selectedTeam}/>
        </div>
        </>
      )}
    </div>
  );
};

export default Profile;
