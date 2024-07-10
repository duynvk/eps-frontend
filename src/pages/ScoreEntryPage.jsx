import React, { useState } from 'react';
import SelectGroup from '../components/Select/SelectGroup';
import SelectTeam from '../components/Select/SelectTeam';
import ScoreEntryForm from '../components/Select/ScoreEntryForm';
import DatePicker, { registerLocale } from 'react-datepicker';
import { vi } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

// Register Vietnamese locale
registerLocale('vi', vi);

const ScoreEntryPage = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Nhập Điểm</h1>
      <div className="flex items-center mb-4 space-x-4">
        <div className="w-1/3">
          <SelectGroup onSelect={(groupId) => { setSelectedGroup(groupId); setSelectedTeam(null); }} />
        </div>
        {selectedGroup && (
          <div className="w-1/3">
            <SelectTeam groupId={selectedGroup} onSelect={setSelectedTeam} />
          </div>
        )}
        {selectedTeam && (
          <div className="flex flex-col w-1/3 mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chọn Ngày:</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              locale="vi"
              dateFormat="dd/MM/yyyy"
              className="mt-1 block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        )}
      </div>
      {selectedTeam && (
        <div>
          <ScoreEntryForm teamId={selectedTeam} selectedDate={selectedDate} />
        </div>
      )}
    </div>
  );
};

export default ScoreEntryPage;
