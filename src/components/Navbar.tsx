import React, { useRef } from 'react';
import { 
  Sun, 
  Moon, 
  Download, 
  Upload, 
  PlusCircle, 
  BrainCircuit,
  Bot
} from 'lucide-react';

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenNewTask: () => void;
  onOpenAIModal: () => void;
  onExport: () => void;
  onImport: (content: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  onOpenNewTask,
  onOpenAIModal,
  onExport,
  onImport,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        onImport(content);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="brand-wrapper" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="brand-icon">
            <BrainCircuit size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="brand-title">AI TaskMaster</span>
              <span className="brand-badge">Studio</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              Web & AI Project Suite
            </div>
          </div>
        </div>

        <div className="navbar-actions">
          {/* AI Generator Action */}
          <button 
            id="nav-ai-assistant-btn"
            className="btn btn-ai"
            onClick={onOpenAIModal}
            title="Yapay Zeka ile Görev Üret"
          >
            <Bot size={17} />
            <span>AI Asistanı</span>
          </button>

          {/* New Task Action */}
          <button 
            id="nav-add-task-btn"
            className="btn btn-primary"
            onClick={onOpenNewTask}
            title="Yeni Görev Ekle"
          >
            <PlusCircle size={17} />
            <span>Yeni Görev</span>
          </button>

          {/* Export JSON */}
          <button 
            id="nav-export-btn"
            className="btn-icon"
            onClick={onExport}
            title="JSON Olarak Dışa Aktar"
          >
            <Download size={18} />
          </button>

          {/* Import JSON */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept=".json" 
            style={{ display: 'none' }} 
          />
          <button 
            id="nav-import-btn"
            className="btn-icon"
            onClick={() => fileInputRef.current?.click()}
            title="JSON Dosyasından İçe Aktar"
          >
            <Upload size={18} />
          </button>

          {/* Theme Toggle */}
          <button 
            id="nav-theme-toggle-btn"
            className="btn-icon"
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Aydınlık Moda Geç' : 'Karanlık Moda Geç'}
          >
            {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#6366f1" />}
          </button>
        </div>
      </div>
    </header>
  );
};
