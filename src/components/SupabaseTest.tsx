import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { CheckCircle2, XCircle, Loader } from 'lucide-react';
import './SupabaseTest.css';

const SupabaseTest: React.FC = () => {
  const [testResults, setTestResults] = useState<{
    connection: 'pending' | 'success' | 'error';
    read: 'pending' | 'success' | 'error';
    create: 'pending' | 'success' | 'error';
    update: 'pending' | 'success' | 'error';
    delete: 'pending' | 'success' | 'error';
  }>({
    connection: 'pending',
    read: 'pending',
    create: 'pending',
    update: 'pending',
    delete: 'pending',
  });

  const [testTaskId, setTestTaskId] = useState<string | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const addMessage = (message: string, type: 'info' | 'success' | 'error') => {
    const timestamp = new Date().toLocaleTimeString();
    const prefix = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    setMessages((prev) => [`[${timestamp}] ${prefix} ${message}`, ...prev]);
  };

  const testConnection = async () => {
    try {
      addMessage('Testando conexão com Supabase...', 'info');
      const { error } = await supabase.from('tasks').select('count', { count: 'exact', head: true });
      
      if (error) throw error;
      
      setTestResults((prev) => ({ ...prev, connection: 'success' }));
      addMessage('Conexão estabelecida com sucesso!', 'success');
      return true;
    } catch (error: any) {
      setTestResults((prev) => ({ ...prev, connection: 'error' }));
      addMessage(`Erro na conexão: ${error.message}`, 'error');
      return false;
    }
  };

  const testRead = async () => {
    try {
      addMessage('Testando leitura de tarefas...', 'info');
      const { data, error } = await supabase.from('tasks').select('*').limit(5);
      
      if (error) throw error;
      
      setTestResults((prev) => ({ ...prev, read: 'success' }));
      addMessage(`Leitura bem-sucedida! Encontradas ${data?.length || 0} tarefas.`, 'success');
      return true;
    } catch (error: any) {
      setTestResults((prev) => ({ ...prev, read: 'error' }));
      addMessage(`Erro na leitura: ${error.message}`, 'error');
      return false;
    }
  };

  const testCreate = async () => {
    try {
      addMessage('Testando criação de tarefa...', 'info');
      // Apenas user_name (sem user_id)
      const testTask = {
        user_name: 'Usuário de Teste',
        solicitante: 'Solicitante de Teste',
        title: `Tarefa de Teste - ${new Date().toLocaleString()}`,
        comentario: 'Comentário de teste para a tarefa',
        priority: 'media' as const,
        due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        completed: false,
      };

      const { data, error } = await supabase
        .from('tasks')
        .insert(testTask)
        .select()
        .single();

      if (error) {
        console.error('Erro detalhado:', error);
        throw error;
      }

      setTestTaskId(data.id);
      setTestResults((prev) => ({ ...prev, create: 'success' }));
      addMessage(`Tarefa criada com sucesso! ID: ${data.id}`, 'success');
      return true;
    } catch (error: any) {
      setTestResults((prev) => ({ ...prev, create: 'error' }));
      const errorMsg = error.message || 'Erro desconhecido';
      addMessage(`Erro na criação: ${errorMsg}`, 'error');
      console.error('Erro completo:', error);
      return false;
    }
  };

  const testUpdate = async () => {
    if (!testTaskId) {
      addMessage('Nenhuma tarefa de teste encontrada. Execute o teste de criação primeiro.', 'error');
      return false;
    }

    try {
      addMessage('Testando atualização de tarefa...', 'info');
      const { error } = await supabase
        .from('tasks')
        .update({ completed: true, title: 'Tarefa Atualizada - Teste' })
        .eq('id', testTaskId)
        .select()
        .single();

      if (error) throw error;

      setTestResults((prev) => ({ ...prev, update: 'success' }));
      addMessage('Tarefa atualizada com sucesso!', 'success');
      return true;
    } catch (error: any) {
      setTestResults((prev) => ({ ...prev, update: 'error' }));
      addMessage(`Erro na atualização: ${error.message}`, 'error');
      return false;
    }
  };

  const testDelete = async () => {
    if (!testTaskId) {
      addMessage('Nenhuma tarefa de teste encontrada.', 'error');
      return false;
    }

    try {
      addMessage('Testando exclusão de tarefa...', 'info');
      const { error } = await supabase.from('tasks').delete().eq('id', testTaskId);

      if (error) throw error;

      setTestTaskId(null);
      setTestResults((prev) => ({ ...prev, delete: 'success' }));
      addMessage('Tarefa deletada com sucesso!', 'success');
      return true;
    } catch (error: any) {
      setTestResults((prev) => ({ ...prev, delete: 'error' }));
      addMessage(`Erro na exclusão: ${error.message}`, 'error');
      return false;
    }
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setMessages([]);
    setTestResults({
      connection: 'pending',
      read: 'pending',
      create: 'pending',
      update: 'pending',
      delete: 'pending',
    });

    addMessage('Iniciando testes do Supabase...', 'info');

    // Teste sequencial
    const connectionOk = await testConnection();
    if (!connectionOk) {
      setIsRunning(false);
      return;
    }

    await testRead();
    const createOk = await testCreate();
    
    if (createOk) {
      await testUpdate();
      await testDelete();
    }

    addMessage('Testes concluídos!', 'success');
    setIsRunning(false);
  };

  const getStatusIcon = (status: 'pending' | 'success' | 'error') => {
    if (status === 'pending') return <Loader size={16} className="spinning" />;
    if (status === 'success') return <CheckCircle2 size={16} className="success-icon" />;
    return <XCircle size={16} className="error-icon" />;
  };

  const getStatusText = (status: 'pending' | 'success' | 'error') => {
    if (status === 'pending') return 'Pendente';
    if (status === 'success') return 'Sucesso';
    return 'Erro';
  };

  return (
    <div className="supabase-test">
      <div className="test-header">
        <h2>🧪 Teste de Conexão Supabase</h2>
        <button
          className="btn-primary"
          onClick={runAllTests}
          disabled={isRunning}
        >
          {isRunning ? 'Executando...' : 'Executar Todos os Testes'}
        </button>
      </div>

      <div className="test-results">
        <div className="test-item">
          {getStatusIcon(testResults.connection)}
          <span>Conexão: {getStatusText(testResults.connection)}</span>
        </div>
        <div className="test-item">
          {getStatusIcon(testResults.read)}
          <span>Leitura: {getStatusText(testResults.read)}</span>
        </div>
        <div className="test-item">
          {getStatusIcon(testResults.create)}
          <span>Criação: {getStatusText(testResults.create)}</span>
        </div>
        <div className="test-item">
          {getStatusIcon(testResults.update)}
          <span>Atualização: {getStatusText(testResults.update)}</span>
        </div>
        <div className="test-item">
          {getStatusIcon(testResults.delete)}
          <span>Exclusão: {getStatusText(testResults.delete)}</span>
        </div>
      </div>

      <div className="test-buttons">
        <button onClick={testConnection} disabled={isRunning}>
          Testar Conexão
        </button>
        <button onClick={testRead} disabled={isRunning}>
          Testar Leitura
        </button>
        <button onClick={testCreate} disabled={isRunning}>
          Testar Criação
        </button>
        <button onClick={testUpdate} disabled={isRunning || !testTaskId}>
          Testar Atualização
        </button>
        <button onClick={testDelete} disabled={isRunning || !testTaskId}>
          Testar Exclusão
        </button>
      </div>

      <div className="test-messages">
        <h3>Log de Testes</h3>
        <div className="messages-container">
          {messages.length === 0 ? (
            <p className="no-messages">Nenhum teste executado ainda.</p>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className="message">
                {msg}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SupabaseTest;

