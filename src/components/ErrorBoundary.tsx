import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Erro capturado pelo ErrorBoundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '48px',
          textAlign: 'center',
          maxWidth: '600px',
          margin: '0 auto',
          background: 'var(--surface)',
          borderRadius: 'var(--radius-default)',
          boxShadow: 'var(--shadow-default)',
          marginTop: '48px',
        }}>
          <AlertCircle size={48} style={{ color: 'var(--danger)', marginBottom: '16px' }} />
          <h2 style={{ 
            color: 'var(--text-primary)', 
            marginBottom: '16px',
            fontSize: 'var(--font-size-heading-md)'
          }}>
            Erro ao conectar com Supabase
          </h2>
          <p style={{ 
            color: 'var(--text-secondary)', 
            marginBottom: '24px',
            fontSize: 'var(--font-size-body)'
          }}>
            {this.state.error?.message || 'Ocorreu um erro inesperado'}
          </p>
          <div style={{
            background: 'var(--background)',
            padding: '16px',
            borderRadius: 'var(--radius-default)',
            textAlign: 'left',
            marginBottom: '24px',
          }}>
            <strong style={{ color: 'var(--text-primary)' }}>Possíveis soluções:</strong>
            <ol style={{ 
              marginTop: '8px',
              paddingLeft: '20px',
              color: 'var(--text-secondary)',
              fontSize: 'var(--font-size-body)'
            }}>
              <li>Verifique se executou o script SQL no Supabase</li>
              <li>Verifique se as tabelas existem no Table Editor</li>
              <li>Desabilite RLS ou crie políticas de segurança</li>
              <li>Verifique a chave API em src/lib/supabase.ts</li>
            </ol>
          </div>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            style={{
              padding: '12px 24px',
              background: 'var(--primary)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-default)',
              fontSize: 'var(--font-size-body)',
              fontWeight: 'var(--font-weight-semibold)',
              cursor: 'pointer',
            }}
          >
            Tentar Novamente
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

