import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Package2, Plus } from "lucide-react";
import ListView from './ListView';
import KanbanView from './KanbanView';
import CalendarView from './CalendarView';

const Index = () => {
  const [view, setView] = useState('board');

  const renderView = () => {
    switch(view) {
      case 'list':
        return <ListView />;
      case 'board':
        return <KanbanView />;
      case 'calendar':
        return <CalendarView />;
      default:
        return <KanbanView />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#1f1f1f] text-white">
      <header className="flex items-center justify-between p-4 bg-[#2c2c2c] border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Package2 className="h-6 w-6 text-pink-500" />
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
            variant={view === 'board' ? 'secondary' : 'ghost'} 
            onClick={() => setView('board')}
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
        <Button className="bg-pink-500 text-white hover:bg-pink-600">
          <Plus className="h-4 w-4 mr-2" /> Add task
        </Button>
      </header>
      <main className="flex-grow overflow-auto">
        {renderView()}
      </main>
    </div>
  );
};

export default Index;