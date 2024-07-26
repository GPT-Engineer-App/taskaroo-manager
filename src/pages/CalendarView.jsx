import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TaskModal from './TaskModal';

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', dueDate: '2024-03-20' },
    { id: 2, title: 'Task 2', dueDate: '2024-03-25' },
    { id: 3, title: 'Task 3', dueDate: '2024-03-30' },
  ]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setIsTaskModalOpen(true);
  };

  const tasksForSelectedDate = tasks.filter(
    task => new Date(task.dueDate).toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="flex">
      <div className="w-1/2 pr-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          className="rounded-md border"
        />
      </div>
      <div className="w-1/2 pl-4">
        <h2 className="text-xl font-bold mb-4">Tasks for {selectedDate.toDateString()}</h2>
        {tasksForSelectedDate.map(task => (
          <Card key={task.id} className="mb-4">
            <CardHeader>
              <CardTitle>{task.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Due Date: {task.dueDate}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <TaskModal 
        isOpen={isTaskModalOpen} 
        onClose={() => setIsTaskModalOpen(false)} 
        defaultDate={selectedDate}
      />
    </div>
  );
};

export default CalendarView;