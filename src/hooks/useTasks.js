// hooks/useTasks.js
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export function useTasks() {
  const { data: session, status } = useSession();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carregar tasks do servidor
  useEffect(() => {
    if (status === 'authenticated') {
      fetchTasks();
    } else if (status === 'unauthenticated') {
      setTasks([]);
      setLoading(false);
    }
  }, [status]);

  async function fetchTasks() {
    try {
      const res = await fetch('/api/tasks');
      if (res.ok) {
        const data = await res.json();
        setTasks(data.tasks);
      }
    } catch (error) {
      console.error('Erro ao carregar tasks:', error);
    } finally {
      setLoading(false);
    }
  }

  async function addTask(text, category = 'outros') {
    if (!session) return;

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, category })
      });

      if (res.ok) {
        const data = await res.json();
        setTasks(prev => [data.task, ...prev]);
        return data.task;
      }
    } catch (error) {
      console.error('Erro ao adicionar task:', error);
    }
  }

  async function updateTask(id, updates) {
    if (!session) return;

    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });

      if (res.ok) {
        const data = await res.json();
        setTasks(prev => prev.map(t => t._id === id ? data.task : t));
        return data.task;
      }
    } catch (error) {
      console.error('Erro ao atualizar task:', error);
    }
  }

  async function deleteTask(id) {
    if (!session) return;

    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setTasks(prev => prev.filter(t => t._id !== id));
      }
    } catch (error) {
      console.error('Erro ao deletar task:', error);
    }
  }

  async function toggleTask(id) {
    const task = tasks.find(t => t._id === id);
    if (task) {
      await updateTask(id, { completed: !task.completed });
    }
  }

  return {
    tasks,
    loading,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    refetch: fetchTasks
  };
}