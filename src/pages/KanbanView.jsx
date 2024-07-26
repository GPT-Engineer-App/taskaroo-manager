import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const KanbanView = () => {
  const [columns, setColumns] = useState({
    todo: [
      { id: 1, title: 'Task 1', description: 'Description 1' },
      { id: 2, title: 'Task 2', description: 'Description 2' },
    ],
    inProgress: [
      { id: 3, title: 'Task 3', description: 'Description 3' },
    ],
    done: [
      { id: 4, title: 'Task 4', description: 'Description 4' },
    ],
  });

  const onDragStart = (e, taskId, sourceColumn) => {
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.setData('sourceColumn', sourceColumn);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, targetColumn) => {
    const taskId = e.dataTransfer.getData('taskId');
    const sourceColumn = e.dataTransfer.getData('sourceColumn');

    if (sourceColumn !== targetColumn) {
      setColumns(prev => {
        const task = prev[sourceColumn].find(t => t.id === parseInt(taskId));
        return {
          ...prev,
          [sourceColumn]: prev[sourceColumn].filter(t => t.id !== parseInt(taskId)),
          [targetColumn]: [...prev[targetColumn], task],
        };
      });
    }
  };

  return (
    <div className="flex space-x-4">
      {Object.entries(columns).map(([columnName, tasks]) => (
        <div
          key={columnName}
          className="w-64 bg-gray-100 p-4 rounded"
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, columnName)}
        >
          <h2 className="text-lg font-bold mb-4 capitalize">{columnName}</h2>
          {tasks.map(task => (
            <Card
              key={task.id}
              draggable
              onDragStart={(e) => onDragStart(e, task.id, columnName)}
              className="mb-4 cursor-move"
            >
              <CardHeader>
                <CardTitle>{task.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{task.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanView;