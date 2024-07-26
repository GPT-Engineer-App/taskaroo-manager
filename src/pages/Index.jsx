import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Package2 } from "lucide-react";
import ListView from './ListView';
import KanbanView from './KanbanView';
import CalendarView from './CalendarView';
import TaskModal from './TaskModal';

const Index = () => {
  const [view, setView] = useState('list');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const renderView = () => {
    switch(view) {
      case 'list':
        return <ListView />;
      case 'kanban':
        return <KanbanView />;
      case 'calendar':
        return <CalendarView />;
      default:
        return <ListView />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between p-4 bg-background border-b">
        <div className="flex items-center space-x-2">
          <Package2 className="h-6 w-6" />
          <span className="text-xl font-bold">Task Manager</span>
        </div>
        <nav className="space-x-4">
          <Button 
            variant={view === 'list' ? 'default' : 'ghost'} 
            onClick={() => setView('list')}
          >
            List View
          </Button>
          <Button 
            variant={view === 'kanban' ? 'default' : 'ghost'} 
            onClick={() => setView('kanban')}
          >
            Kanban View
          </Button>
          <Button 
            variant={view === 'calendar' ? 'default' : 'ghost'} 
            onClick={() => setView('calendar')}
          >
            Calendar View
          </Button>
        </nav>
        <Button onClick={() => setIsTaskModalOpen(true)}>Add Task</Button>
      </header>
      <main className="flex-grow p-4">
        {renderView()}
      </main>
      <TaskModal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} />
    </div>
  );
};

export default Index;