import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import TaskModal from './TaskModal';

const ListView = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Daily Brief // 1', dueDate: '2024-04-01', completed: false },
    { id: 2, title: 'Daily Brief // 2', dueDate: '2024-04-02', completed: true },
    { id: 3, title: 'Daily Brief // 3', dueDate: '2024-04-03', completed: true },
    { id: 4, title: 'Daily Brief // 4', dueDate: '2024-04-04', completed: true },
    { id: 5, title: 'Next event promotion post // 1', dueDate: '2024-04-03', completed: true },
  ]);
  const [editingTask, setEditingTask] = useState(null);

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleCloseModal = () => {
    setEditingTask(null);
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">To-Dos</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Task name</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead>Due date</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id} className={task.completed ? 'opacity-50' : ''}>
              <TableCell>
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTaskCompletion(task.id)}
                />
              </TableCell>
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell>
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <span className="text-xs">👤</span>
                </div>
              </TableCell>
              <TableCell>{task.dueDate}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" onClick={() => handleEditTask(task)}>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {editingTask && (
        <TaskModal isOpen={true} onClose={handleCloseModal} task={editingTask} />
      )}
    </div>
  );
};

export default ListView;