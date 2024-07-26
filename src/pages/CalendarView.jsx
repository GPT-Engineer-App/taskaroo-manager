import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Plus, CheckCircle2 } from 'lucide-react';
import { useTasks } from '../contexts/TaskContext';

const CalendarView = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 3)); // April 2024
  const { tasks } = useTasks();

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const renderCalendar = () => {
    const calendar = [];
    let dayCount = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfMonth) {
          week.push(<td key={`empty-${j}`} className="p-2 border border-gray-700"></td>);
        } else if (dayCount > daysInMonth) {
          week.push(<td key={`empty-end-${j}`} className="p-2 border border-gray-700"></td>);
        } else {
          const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayCount);
          const formattedDate = currentDate.toISOString().split('T')[0];
          const dayTasks = tasks.filter(task => task.date === formattedDate);

          week.push(
            <td key={dayCount} className="p-2 border border-gray-700 align-top h-32">
              <div className="font-semibold mb-2">{dayCount}</div>
              {dayTasks.map(task => (
                <Card key={task.id} className="mb-1 bg-[#363636] border-none">
                  <CardContent className="p-2 flex items-center">
                    {task.completed ? (
                      <CheckCircle2 className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                    ) : (
                      <div className="h-3 w-3 border border-gray-400 rounded-full mr-2 flex-shrink-0" />
                    )}
                    <span className="text-xs truncate">{task.title}</span>
                  </CardContent>
                </Card>
              ))}
              {dayTasks.length < 3 && (
                <Button variant="ghost" size="sm" className="w-full justify-start text-gray-400 mt-1 p-0 h-6">
                  <Plus className="h-3 w-3 mr-1" /> Add task
                </Button>
              )}
            </td>
          );
          dayCount++;
        }
      }
      calendar.push(<tr key={i}>{week}</tr>);
      if (dayCount > daysInMonth) break;
    }

    return calendar;
  };

  return (
    <div className="p-4 bg-[#1f1f1f] text-white">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">Today</Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">April 2024</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">Filter</Button>
          <Button variant="outline" size="sm">Weeks</Button>
          <Button variant="outline" size="sm">Color: Default</Button>
          <Button variant="outline" size="sm">Unscheduled</Button>
        </div>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
              <th key={day} className="p-2 border border-gray-700 text-left">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>{renderCalendar()}</tbody>
      </table>
    </div>
  );
};

export default CalendarView;