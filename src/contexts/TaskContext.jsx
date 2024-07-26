import React, { createContext, useState, useContext } from 'react';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Daily Brief // 1', date: '2024-04-01', completed: false, column: 'To-Dos' },
    { id: 2, title: 'Daily Brief // 2', date: '2024-04-02', completed: true, column: 'In-Progress' },
    { id: 3, title: 'Daily Brief // 3', date: '2024-04-03', completed: true, column: 'Done' },
    { id: 4, title: 'Daily Brief // 4', date: '2024-04-04', completed: true, column: 'Done' },
    { id: 5, title: 'Next event promotion post // 1', date: '2024-04-03', completed: true, column: 'In-Progress' },
  ]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const moveTask = (taskId, targetColumn) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, column: targetColumn } : task
    ));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, moveTask }}>
      {children}
    </TaskContext.Provider>
  );
};