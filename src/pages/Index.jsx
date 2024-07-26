import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Package2, Plus } from "lucide-react";
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
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between p-4 bg-card border-b border-border">
        <div className="flex items-center space-x-2">
          <Package2 className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Content Board</span>
        </div>
        <nav className="flex space-x-1">
          <Button 
            variant={view === 'list' ? 'secondary' : 'ghost'} 
            onClick={() => setView('list')}
            className="text-sm"
          >
            List
          </Button>
          <Button 
            variant={view === 'kanban' ? 'secondary' : 'ghost'} 
            onClick={() => setView('kanban')}
            className="text-sm"
          >
            Board
          </Button>
          <Button 
            variant={view === 'calendar' ? 'secondary' : 'ghost'} 
            onClick={() => setView('calendar')}
            className="text-sm"
          >
            Calendar
          </Button>
        </nav>
        <Button onClick={() => setIsTaskModalOpen(true)} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" /> Add task
        </Button>
      </header>
      <main className="flex-grow p-4">
        {renderView()}
      </main>
      <TaskModal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} />
    </div>
  );
};

export default Index;