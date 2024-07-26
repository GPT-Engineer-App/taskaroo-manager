import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import TaskModal from './TaskModal';

const ListView = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', dueDate: '2024-03-20', priority: 'High' },
    { id: 2, title: 'Task 2', dueDate: '2024-03-25', priority: 'Medium' },
    { id: 3, title: 'Task 3', dueDate: '2024-03-30', priority: 'Low' },
  ]);
  const [editingTask, setEditingTask] = useState(null);

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleCloseModal = () => {
    setEditingTask(null);
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.dueDate}</TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell>
                <Button variant="outline" onClick={() => handleEditTask(task)}>Edit</Button>
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