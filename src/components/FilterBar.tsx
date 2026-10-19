import React from 'react';
import type { ITaskFilter } from '../interfaces/task';
import { 
  Search, 
  X, 
  LayoutGrid, 
  List, 
  Layers,
  ChevronDown
} from 'lucide-react';

interface FilterBarProps {
  filter: ITaskFilter;
  onFilterChange: (newFilter: Partial<ITaskFilter>) => void;
  categoryCounts: Record<string, number>;
  totalCount: number;
}

const CATEGORIES: { label: string; value: string }[] = [
  { label: 'Tümü', value: 'all' },
  { label: 'Yapay Zeka', value: 'Yapay Zeka' },
  { label: 'Frontend', value: 'Frontend' },
  { label: 'Backend', value: 'Backend' },
  { label: 'Tasarım', value: 'Tasarım' },
  { label: 'Genel', value: 'Genel' },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  onFilterChange,
  categoryCounts,
  totalCount,
}) => {
  return (
    <section className="filter-section" aria-label="Filtreleme ve Arama">
      {/* Top Search & Dropdown Controls */}
      <div className="filter-top-row">
        {/* Search */}
        <div className="search-container">
          <Search className="search-icon" size={18} />
          <input
            id="task-search-input"
            type="text"
            className="search-input"
            placeholder="Görev adı, etiket veya açıklamalarda ara..."
            value={filter.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
          />
          {filter.search && (
            <button 
              className="search-clear"
              onClick={() => onFilterChange({ search: '' })}
              title="Aramayı Temizle"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Dropdowns */}
        <div className="filter-dropdowns">
          {/* Priority */}
          <div className="select-wrapper">
            <select
              id="filter-priority-select"
              className="custom-select"
              value={filter.priority}
              onChange={(e) => onFilterChange({ priority: e.target.value })}
            >
              <option value="all">Tüm Öncelikler</option>
              <option value="Kritik">🔴 Kritik</option>
              <option value="Yüksek">🟠 Yüksek</option>
              <option value="Orta">🟣 Orta</option>
              <option value="Düşük">⚪ Düşük</option>
            </select>
            <ChevronDown className="select-arrow" size={15} />
          </div>

          {/* Status */}
          <div className="select-wrapper">
            <select
              id="filter-status-select"
              className="custom-select"
              value={filter.status}
              onChange={(e) => onFilterChange({ status: e.target.value })}
            >
              <option value="all">Tüm Durumlar</option>
              <option value="Bekliyor">⏳ Bekliyor</option>
              <option value="Devam Ediyor">⚡ Devam Ediyor</option>
              <option value="Tamamlandı">✅ Tamamlandı</option>
            </select>
            <ChevronDown className="select-arrow" size={15} />
          </div>

          {/* Sort By */}
          <div className="select-wrapper">
            <select
              id="filter-sort-select"
              className="custom-select"
              value={filter.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
            >
              <option value="createdAt-desc">📅 En Yeni Eklenen</option>
              <option value="createdAt-asc">📅 En Eski</option>
              <option value="dueDate">⏰ Bitiş Tarihine Göre</option>
              <option value="priority">🔥 Önceliğe Göre</option>
              <option value="title">🔤 Başlığa Göre (A-Z)</option>
            </select>
            <ChevronDown className="select-arrow" size={15} />
          </div>

          {/* Grid / List View Toggle */}
          <div className="view-mode-toggle">
            <button
              id="view-grid-btn"
              className={`view-btn ${filter.viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => onFilterChange({ viewMode: 'grid' })}
              title="Izgara Görünümü"
            >
              <LayoutGrid size={17} />
            </button>
            <button
              id="view-list-btn"
              className={`view-btn ${filter.viewMode === 'list' ? 'active' : ''}`}
              onClick={() => onFilterChange({ viewMode: 'list' })}
              title="Liste Görünümü"
            >
              <List size={17} />
            </button>
          </div>
        </div>
      </div>

      {/* Category Chips */}
      <div className="category-chips">
        <Layers size={16} color="var(--text-muted)" style={{ marginLeft: '4px', flexShrink: 0 }} />
        {CATEGORIES.map((cat) => {
          const isActive = filter.category === cat.value;
          const count = cat.value === 'all' ? totalCount : (categoryCounts[cat.value] || 0);
          return (
            <button
              key={cat.value}
              id={`cat-chip-${cat.value}`}
              className={`category-chip ${isActive ? 'active' : ''}`}
              onClick={() => onFilterChange({ category: cat.value })}
            >
              <span>{cat.label}</span>
              <span style={{ 
                opacity: 0.8, 
                fontSize: '0.75rem', 
                background: isActive ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)',
                padding: '1px 6px',
                borderRadius: '99px'
              }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
