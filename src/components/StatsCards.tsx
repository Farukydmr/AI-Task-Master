import React from 'react';
import type { ITaskStats } from '../interfaces/task';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ListTodo, 
  Sparkles,
  TrendingUp
} from 'lucide-react';

interface StatsCardsProps {
  stats: ITaskStats;
  aiCount: number;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats, aiCount }) => {
  return (
    <div className="stats-grid">
      {/* Total Tasks */}
      <div className="stat-card primary">
        <div className="stat-header">
          <span className="stat-label">Toplam Görev</span>
          <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--primary)' }}>
            <ListTodo size={20} />
          </div>
        </div>
        <div className="stat-value">{stats.total}</div>
        <div className="stat-subtext">
          <TrendingUp size={14} color="var(--primary)" />
          <span>{stats.pending} görev beklemede</span>
        </div>
      </div>

      {/* Completed Tasks */}
      <div className="stat-card emerald">
        <div className="stat-header">
          <span className="stat-label">Tamamlanan</span>
          <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--emerald)' }}>
            <CheckCircle2 size={20} />
          </div>
        </div>
        <div className="stat-value">{stats.completed}</div>
        <div className="stat-subtext">
          <span>Başarı Oranı: %{stats.completionRate}</span>
        </div>
        <div className="stat-progress-bar">
          <div 
            className="stat-progress-fill" 
            style={{ 
              width: `${stats.completionRate}%`,
              background: 'linear-gradient(90deg, #10b981 0%, #06b6d4 100%)'
            }} 
          />
        </div>
      </div>

      {/* In Progress */}
      <div className="stat-card cyan">
        <div className="stat-header">
          <span className="stat-label">Devam Eden</span>
          <div className="stat-icon" style={{ background: 'rgba(6, 182, 212, 0.15)', color: 'var(--cyan)' }}>
            <Clock size={20} />
          </div>
        </div>
        <div className="stat-value">{stats.inProgress}</div>
        <div className="stat-subtext">
          <span>Aktif geliştirme sürecinde</span>
        </div>
      </div>

      {/* Critical & High Priority */}
      <div className="stat-card amber">
        <div className="stat-header">
          <span className="stat-label">Kritik & Yüksek</span>
          <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--amber)' }}>
            <AlertTriangle size={20} />
          </div>
        </div>
        <div className="stat-value">{stats.highPriority}</div>
        <div className="stat-subtext">
          <Sparkles size={14} color="var(--cyan)" />
          <span>{aiCount} adet AI destekli görev</span>
        </div>
      </div>
    </div>
  );
};
