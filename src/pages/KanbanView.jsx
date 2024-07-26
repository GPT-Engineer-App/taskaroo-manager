import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal, CheckCircle2 } from 'lucide-react';
import { useTasks } from '../contexts/TaskContext';
import { DndContext, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

const KanbanView = () => {
  const { tasks, moveTask } = useTasks();
  const columns = ['To-Dos', 'In-Progress', 'Done', 'Untitled section'];

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const activeColumn = active.data.current.sortable.containerId;
      const overColumn = over.data.current.sortable.containerId;

      if (activeColumn !== overColumn) {
        moveTask(active.id, overColumn);
      }
    }
  };

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div className="flex space-x-4 p-4 bg-[#1f1f1f] text-white">
        {columns.map((columnName) => (
          <div key={columnName} className="w-72 bg-[#2c2c2c] rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{columnName} {tasks.filter(task => task.column === columnName).length}</h2>
              <div className="flex space-x-2">
                <Button size="icon" variant="ghost" className="h-6 w-6 text-gray-400">
                  <Plus className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="h-6 w-6 text-gray-400">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <SortableContext
              items={tasks.filter(task => task.column === columnName).map(task => task.id)}
              strategy={verticalListSortingStrategy}
            >
              {tasks
                .filter(task => task.column === columnName)
                .map(task => (
                  <SortableItem key={task.id} id={task.id}>
                    <Card className="mb-2 bg-[#363636] border-none cursor-move">
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
                  </SortableItem>
                ))}
            </SortableContext>
            <Button variant="ghost" className="w-full justify-start text-gray-400 mt-2">
              <Plus className="h-4 w-4 mr-2" /> Add task
            </Button>
          </div>
        ))}
      </div>
    </DndContext>
  );
};

export default KanbanView;