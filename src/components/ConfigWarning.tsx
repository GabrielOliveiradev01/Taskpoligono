import React from 'react';
import { AlertCircle, ExternalLink } from 'lucide-react';
import './ConfigWarning.css';

const ConfigWarning: React.FC = () => {
  return (
    <div className="config-warning">
      <div className="warning-content">
        <AlertCircle size={32} className="warning-icon" />
        <div className="warning-text">
          <h2>⚠️ Chave API do Supabase Não Configurada</h2>
          <p>
            Para usar o sistema de tarefas, você precisa configurar a chave API do Supabase.
          </p>
          <ol className="steps-list">
            <li>
              Acesse o{' '}
              <a
                href="https://supabase.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                Dashboard do Supabase <ExternalLink size={14} />
              </a>
            </li>
            <li>Vá em <strong>Settings → API</strong></li>
            <li>Copie a chave <strong>"anon public"</strong></li>
            <li>
              Abra o arquivo <code>src/lib/supabase.ts</code>
            </li>
            <li>
              Substitua <code>'SUA_CHAVE_AQUI'</code> pela chave que você copiou
            </li>
            <li>Salve o arquivo e recarregue a página</li>
          </ol>
          <div className="code-example">
            <p className="code-label">Exemplo do arquivo:</p>
            <pre>
              <code>
{`const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';`}
              </code>
            </pre>
          </div>
          <p className="help-text">
            💡 Veja o arquivo <code>SOLUCAO_RAPIDA_CHAVE.md</code> para instruções detalhadas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfigWarning;

