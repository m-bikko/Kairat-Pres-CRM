import React from 'react';

const HOURS = Array.from({ length: 11 }, (_, i) => i + 8); // 8 AM to 6 PM
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export const CalendarView: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Team Standup & Planning</h2>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2 mr-4">
             <img className="w-8 h-8 rounded-full border-2 border-white" src="https://picsum.photos/30/30?1" alt="" />
             <img className="w-8 h-8 rounded-full border-2 border-white" src="https://picsum.photos/30/30?2" alt="" />
             <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500">+3</div>
          </div>
          <select className="text-sm border-gray-200 rounded-md bg-gray-50 px-2 py-1 outline-none">
            <option>Week View</option>
            <option>Day View</option>
          </select>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-6 min-w-[800px]">
          {/* Time Column */}
          <div className="border-r border-gray-100">
            <div className="h-10 border-b border-gray-100 bg-gray-50"></div>
            {HOURS.map(hour => (
              <div key={hour} className="h-20 border-b border-gray-100 text-xs text-gray-400 font-mono text-right pr-2 pt-2">
                {hour}:00
              </div>
            ))}
          </div>

          {/* Days Columns */}
          {DAYS.map((day, index) => (
            <div key={day} className="relative border-r border-gray-100 last:border-r-0">
              <div className="h-10 border-b border-gray-100 bg-gray-50 flex items-center justify-center text-sm font-medium text-gray-600 sticky top-0 z-10">
                {day}
              </div>
              {HOURS.map(hour => (
                 <div key={`${day}-${hour}`} className="h-20 border-b border-gray-100 hover:bg-gray-50/50 transition-colors"></div>
              ))}
              
              {/* Mock Events */}
              {index === 0 && (
                <div className="absolute top-[85px] left-1 right-1 h-[70px] bg-indigo-50 border-l-4 border-indigo-500 rounded p-2 text-xs hover:scale-[1.02] transition-transform cursor-pointer shadow-sm">
                   <p className="font-medium text-indigo-900">Weekly Standup</p>
                   <p className="text-indigo-600 mt-1">9:00 - 10:00</p>
                </div>
              )}
              {index === 2 && (
                <div className="absolute top-[245px] left-1 right-1 h-[150px] bg-purple-50 border-l-4 border-purple-500 rounded p-2 text-xs hover:scale-[1.02] transition-transform cursor-pointer shadow-sm">
                   <p className="font-medium text-purple-900">Sprint Planning</p>
                   <p className="text-purple-600 mt-1">11:00 - 1:00 PM</p>
                   <div className="flex -space-x-1 mt-2">
                     <div className="w-5 h-5 rounded-full bg-purple-200"></div>
                     <div className="w-5 h-5 rounded-full bg-purple-300"></div>
                   </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
