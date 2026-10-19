import React from 'react';
import type { FilterStatus } from '../interfaces/todo';
import { Search, Trash2 } from 'lucide-react';

interface TodoFilterProps {
  filterStatus: FilterStatus;
  onFilterChange: (status: FilterStatus) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCount: number;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  filterStatus,
  onFilterChange,
  searchQuery,
  onSearchChange,
  totalCount,
  activeCount,
  completedCount,
  onClearCompleted,
}) => {
  return (
    <div className="filter-wrapper">
      {/* Canlı Arama Inputu */}
      <div className="search-box">
        <Search size={16} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Görevlerde ara..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button 
            type="button" 
            className="clear-search-btn"
            onClick={() => onSearchChange('')}
          >
            ✕
          </button>
        )}
      </div>

      {/* Durum Filtre Butonları */}
      <div className="filter-tabs">
        <button
          type="button"
          className={`tab-btn ${filterStatus === 'all' ? 'active' : ''}`}
          onClick={() => onFilterChange('all')}
        >
          Tümü ({totalCount})
        </button>

        <button
          type="button"
          className={`tab-btn ${filterStatus === 'active' ? 'active' : ''}`}
          onClick={() => onFilterChange('active')}
        >
          Devam Edenler ({activeCount})
        </button>

        <button
          type="button"
          className={`tab-btn ${filterStatus === 'completed' ? 'active' : ''}`}
          onClick={() => onFilterChange('completed')}
        >
          Tamamlananlar ({completedCount})
        </button>

        {completedCount > 0 && (
          <button
            type="button"
            className="btn-clear-completed"
            onClick={onClearCompleted}
            title="Tamamlanan görevleri temizle"
          >
            <Trash2 size={14} />
            <span>Tamamlananları Sil</span>
          </button>
        )}
      </div>
    </div>
  );
};
