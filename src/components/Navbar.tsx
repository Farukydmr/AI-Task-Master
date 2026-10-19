import React from 'react';
import { CheckCircle2, RotateCcw } from 'lucide-react';

interface NavbarProps {
  totalCount: number;
  completedCount: number;
  onResetData: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  totalCount,
  completedCount,
  onResetData,
}) => {
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo-group">
          <div className="logo-icon">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <h1 className="logo-title">Görev Listesi (Todo App)</h1>
            <p className="logo-subtitle">TNC Group Web Geliştirme Projesi</p>
          </div>
        </div>

        <div className="header-actions">
          {/* İlerleme ve Sayaç */}
          <div className="progress-card">
            <div className="progress-info">
              <span className="progress-label">Tamamlanan</span>
              <span className="progress-count">{completedCount} / {totalCount} (%{percent})</span>
            </div>
            <div className="progress-bar-bg">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          {/* Örnek Veri Sıfırlama */}
          <button 
            type="button" 
            className="btn-secondary"
            onClick={onResetData}
            title="Örnek verileri varsayılana döndür"
          >
            <RotateCcw size={16} />
            <span>Sıfırla</span>
          </button>
        </div>
      </div>
    </header>
  );
};
