import React, { useState } from 'react';
import { TaskProvider } from './context/TaskContext';
import Dashboard from './components/Dashboard';
import TaskList from './components/TaskList';
import SupabaseTest from './components/SupabaseTest';
import ErrorBoundary from './components/ErrorBoundary';
import ConfigWarning from './components/ConfigWarning';
import { LayoutDashboard, List, TestTube } from 'lucide-react';
import { supabase } from './lib/supabase';
import './App.css';

type View = 'dashboard' | 'tasks' | 'test';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  
  // Verificar se a chave API está configurada
  const isApiKeyConfigured = () => {
    try {
      const key = (supabase as any).supabaseKey;
      // Verificar se a chave está configurada e não é a padrão
      return key && 
             key !== 'SUA_CHAVE_AQUI' && 
             key.length > 10; // Chave válida deve ter pelo menos alguns caracteres
    } catch {
      return false;
    }
  };

  return (
    <ErrorBoundary>
      <TaskProvider>
        <div className="app">
        <nav className="app-nav">
          <div className="nav-content">
            <h1 className="app-logo">Tarefas</h1>
            <div className="nav-buttons">
              <button
                className={`nav-button ${currentView === 'dashboard' ? 'active' : ''}`}
                onClick={() => setCurrentView('dashboard')}
              >
                <LayoutDashboard size={20} />
                Dashboard
              </button>
              <button
                className={`nav-button ${currentView === 'tasks' ? 'active' : ''}`}
                onClick={() => setCurrentView('tasks')}
              >
                <List size={20} />
                Tarefas
              </button>
              <button
                className={`nav-button ${currentView === 'test' ? 'active' : ''}`}
                onClick={() => setCurrentView('test')}
              >
                <TestTube size={20} />
                Teste Supabase
              </button>
            </div>
          </div>
        </nav>

        <main className="app-main">
          {!isApiKeyConfigured() && <ConfigWarning />}
          {currentView === 'dashboard' && <Dashboard />}
          {currentView === 'tasks' && <TaskList />}
          {currentView === 'test' && <SupabaseTest />}
        </main>
      </div>
      </TaskProvider>
    </ErrorBoundary>
  );
};

export default App;

