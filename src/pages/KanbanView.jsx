import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal, CheckCircle2 } from 'lucide-react';

const KanbanView = () => {
  const [columns, setColumns] = useState({
    'To-Dos': [
      { id: 1, title: 'Daily Brief // 3', date: '3 Apr', completed: false },
      { id: 2, title: 'Partnership post //2', date: '4 Apr', completed: false },
      { id: 3, title: 'Next event promotion post // 2', date: '5 Apr', completed: true },
      { id: 4, title: 'trailer boost', date: '5 Apr', completed: false },
      { id: 5, title: 'Video // Conservative Investor', date: '4 Apr', completed: true },
    ],
    'In-Progress': [
      { id: 6, title: 'Daily Brief // 2', date: '2 Apr', completed: true },
      { id: 7, title: 'Next event promotion post // 1', date: '3 Apr', completed: false },
      { id: 8, title: 'Partnership Post // 1', date: '1 Apr', completed: true },
      { id: 9, title: 'Video // Education in metaverse', date: '2 Apr', completed: true },
      { id: 10, title: 'Video // Moderate Investor tip', date: '1 Apr', completed: false },
    ],
    'Done': [
      { id: 11, title: 'Daily Brief // 4', date: '4 Apr', completed: true },
      { id: 12, title: 'Daily Brief // 5', date: '5 Apr', completed: true },
      { id: 13, title: 'Speaker Card post', date: '2 Apr', completed: true },
      { id: 14, title: 'SBF article', date: '1 Apr', completed: true },
    ],
    'Untitled section': [
      { id: 15, title: 'Mansion house video // What is TDC?', date: '9 Apr', completed: true },
      { id: 16, title: 'Speaker Card Post', date: '3 Apr', completed: false },
      { id: 17, title: 'Video // RWA', date: '3 Apr', completed: true },
      { id: 18, title: 'trailer', date: '1 Apr', completed: true },
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
    <div className="flex space-x-4 p-4 bg-[#1f1f1f] text-white">
      {Object.entries(columns).map(([columnName, tasks]) => (
        <div
          key={columnName}
          className="w-72 bg-[#2c2c2c] rounded-lg p-4"
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, columnName)}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{columnName} {tasks.length}</h2>
            <div className="flex space-x-2">
              <Button size="icon" variant="ghost" className="h-6 w-6 text-gray-400">
                <Plus className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="h-6 w-6 text-gray-400">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {tasks.map(task => (
            <Card
              key={task.id}
              draggable
              onDragStart={(e) => onDragStart(e, task.id, columnName)}
              className="mb-2 bg-[#363636] border-none cursor-move"
            >
              <CardContent className="p-3">
                <div className="flex items-start">
                  {task.completed ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  ) : (
                    <div className="h-4 w-4 border border-gray-400 rounded-full mt-1 mr-2 flex-shrink-0" />
                  )}
                  <div>
                    <p className={`text-sm ${task.completed ? 'text-gray-400' : 'text-white'}`}>{task.title}</p>
                    <div className="flex items-center mt-2">
                      <div className="w-6 h-6 bg-gray-600 rounded-full mr-2"></div>
                      <span className="text-xs text-gray-400">{task.date}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <Button variant="ghost" className="w-full justify-start text-gray-400 mt-2">
            <Plus className="h-4 w-4 mr-2" /> Add task
          </Button>
        </div>
      ))}
    </div>
  );
};

export default KanbanView;