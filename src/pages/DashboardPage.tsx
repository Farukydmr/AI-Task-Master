import React, { useState, useEffect, useMemo } from 'react';
import type { ITask, ITaskFilter, ITaskStats, NewTaskInput } from '../interfaces/task';
import { 
  loadTasksFromStorage, 
  saveTasksToStorage, 
  exportTasksAsJSON, 
  importTasksFromJSON, 
  getSavedTheme, 
  saveThemeToStorage 
} from '../utils/storage';
import { INITIAL_TASKS } from '../utils/mockData';

import { Navbar } from '../components/Navbar';
import { StatsCards } from '../components/StatsCards';
import { FilterBar } from '../components/FilterBar';
import { TaskCard } from '../components/TaskCard';
import { TaskFormModal } from '../components/TaskFormModal';
import { AIAssistantModal } from '../components/AIAssistantModal';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';

import { 
  Plus, 
  FolderPlus, 
  RotateCcw, 
  CheckCircle, 
  Info, 
  Bot
} from 'lucide-react';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  text: string;
}

export const DashboardPage: React.FC = () => {
  // Tasks state
  const [tasks, setTasks] = useState<ITask[]>(() => loadTasksFromStorage());

  // Filter & Search state
  const [filter, setFilter] = useState<ITaskFilter>({
    search: '',
    category: 'all',
    priority: 'all',
    status: 'all',
    sortBy: 'createdAt-desc',
    viewMode: 'grid',
  });

  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>(() => getSavedTheme());

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<ITask | null>(null);

  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<ITask | null>(null);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (text: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  // Sync theme with DOM and LocalStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    saveThemeToStorage(theme);
  }, [theme]);

  // Persist tasks to LocalStorage whenever modified
  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  /* ================== CRUD OPERATIONS ================== */

  // 1. CREATE (Ekle)
  const handleCreateTask = (newTaskData: NewTaskInput) => {
    const newTask: ITask = {
      ...newTaskData,
      id: 'task-' + Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
    showToast('Görev başarıyla eklendi! 🎉', 'success');
  };

  // 2. UPDATE (Güncelleme)
  const handleUpdateTask = (updatedData: NewTaskInput) => {
    if (!taskToEdit) return;

    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskToEdit.id
          ? {
              ...t,
              ...updatedData,
              updatedAt: new Date().toISOString(),
            }
          : t
      )
    );
    setTaskToEdit(null);
    showToast('Görev başarıyla güncellendi! ✏️', 'info');
  };

  // Quick toggle status (Tamamlandı / Bekliyor)
  const handleToggleComplete = (task: ITask) => {
    const nextStatus = task.status === 'Tamamlandı' ? 'Bekliyor' : 'Tamamlandı';
    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id
          ? {
              ...t,
              status: nextStatus,
              updatedAt: new Date().toISOString(),
            }
          : t
      )
    );
    showToast(
      nextStatus === 'Tamamlandı' ? 'Tebrikler! Görev tamamlandı 🚀' : 'Görev durumu güncellendi.',
      nextStatus === 'Tamamlandı' ? 'success' : 'info'
    );
  };

  // Open Edit modal
  const handleOpenEdit = (task: ITask) => {
    setTaskToEdit(task);
    setIsFormModalOpen(true);
  };

  // 3. DELETE (Silme)
  const handleOpenDelete = (task: ITask) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!taskToDelete) return;
    setTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id));
    showToast(`"${taskToDelete.title.slice(0, 25)}..." silindi.`, 'warning');
    setTaskToDelete(null);
  };

  // Export / Import
  const handleExport = () => {
    exportTasksAsJSON(tasks);
    showToast('Tüm görevler JSON olarak indirildi.', 'info');
  };

  const handleImport = (content: string) => {
    try {
      const imported = importTasksFromJSON(content);
      setTasks(imported);
      showToast(`${imported.length} adet görev içe aktarıldı!`, 'success');
    } catch (err: any) {
      showToast(err.message || 'İçe aktarma başarısız.', 'warning');
    }
  };

  const handleResetDemoData = () => {
    if (window.confirm('Tüm verileri başlangıçtaki örnek görevlerle sıfırlamak istiyor musunuz?')) {
      setTasks(INITIAL_TASKS);
      showToast('Örnek veriler geri yüklendi.', 'info');
    }
  };

  /* ================== FILTERING & SORTING ================== */

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    tasks.forEach((t) => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });
    return counts;
  }, [tasks]);

  const stats: ITaskStats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'Tamamlandı').length;
    const inProgress = tasks.filter((t) => t.status === 'Devam Ediyor').length;
    const pending = tasks.filter((t) => t.status === 'Bekliyor').length;
    const highPriority = tasks.filter(
      (t) => t.priority === 'Yüksek' || t.priority === 'Kritik'
    ).length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, inProgress, pending, highPriority, completionRate };
  }, [tasks]);

  const aiCount = useMemo(() => {
    return tasks.filter((t) => t.isAiGenerated).length;
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        // Search query
        if (filter.search.trim()) {
          const q = filter.search.toLowerCase();
          const titleMatch = task.title.toLowerCase().includes(q);
          const descMatch = task.description.toLowerCase().includes(q);
          const tagMatch = task.tags.some((t) => t.toLowerCase().includes(q));
          if (!titleMatch && !descMatch && !tagMatch) return false;
        }

        // Category filter
        if (filter.category !== 'all' && task.category !== filter.category) {
          return false;
        }

        // Priority filter
        if (filter.priority !== 'all' && task.priority !== filter.priority) {
          return false;
        }

        // Status filter
        if (filter.status !== 'all' && task.status !== filter.status) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filter.sortBy === 'createdAt-desc') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (filter.sortBy === 'createdAt-asc') {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        if (filter.sortBy === 'dueDate') {
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }
        if (filter.sortBy === 'priority') {
          const priorityOrder: Record<string, number> = {
            Kritik: 4,
            Yüksek: 3,
            Orta: 2,
            Düşük: 1,
          };
          return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
        }
        if (filter.sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [tasks, filter]);

  return (
    <>
      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenNewTask={() => {
          setTaskToEdit(null);
          setIsFormModalOpen(true);
        }}
        onOpenAIModal={() => setIsAIModalOpen(true)}
        onExport={handleExport}
        onImport={handleImport}
      />

      <main className="app-container">
        {/* Page Header / Hero Banner */}
        <section className="page-header" aria-labelledby="dashboard-title">
          <div>
            <h1 id="dashboard-title" className="page-title">
              Yapay Zeka & Web Geliştirme Proje Stüdyosu
            </h1>
            <p className="page-subtitle">
              ReactJS, TypeScript, LocalStorage ve AI destekli mimari ile modern görev yönetimi ve istem (prompt) planlayıcısı.
            </p>
          </div>

          <div className="header-action-buttons">
            <button
              id="header-ai-generate-btn"
              className="btn btn-ai"
              onClick={() => setIsAIModalOpen(true)}
            >
              <Bot size={18} />
              <span>AI Asistanından Fikir Al</span>
            </button>

            <button
              id="header-add-task-btn"
              className="btn btn-primary"
              onClick={() => {
                setTaskToEdit(null);
                setIsFormModalOpen(true);
              }}
            >
              <Plus size={18} />
              <span>Yeni Görev</span>
            </button>
          </div>
        </section>

        {/* Real-time Stats Cards */}
        <StatsCards stats={stats} aiCount={aiCount} />

        {/* Filter & Search Bar */}
        <FilterBar
          filter={filter}
          onFilterChange={(newF) => setFilter((prev) => ({ ...prev, ...newF }))}
          categoryCounts={categoryCounts}
          totalCount={tasks.length}
        />

        {/* Task List / Grid Display (Read) */}
        <section aria-label="Görevler Listesi">
          {filteredTasks.length === 0 ? (
            <div className="empty-state animate-fade-in">
              <div className="empty-icon">
                <FolderPlus size={32} />
              </div>
              <h2 className="empty-title">Kriterlere Uygun Görev Bulunamadı</h2>
              <p className="empty-desc">
                Arama teriminizi veya filtrelerinizi değiştirebilir veya hemen yeni bir görev/proje adımı ekleyebilirsiniz.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  id="empty-reset-filter-btn"
                  className="btn btn-secondary"
                  onClick={() =>
                    setFilter({
                      search: '',
                      category: 'all',
                      priority: 'all',
                      status: 'all',
                      sortBy: 'createdAt-desc',
                      viewMode: filter.viewMode,
                    })
                  }
                >
                  Filtreleri Temizle
                </button>
                <button
                  id="empty-add-btn"
                  className="btn btn-primary"
                  onClick={() => {
                    setTaskToEdit(null);
                    setIsFormModalOpen(true);
                  }}
                >
                  <Plus size={16} />
                  Yeni Görev Ekle
                </button>
              </div>
            </div>
          ) : (
            <div className={filter.viewMode === 'grid' ? 'task-grid' : 'task-list'}>
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggleComplete={handleToggleComplete}
                  onEdit={handleOpenEdit}
                  onDelete={handleOpenDelete}
                  viewMode={filter.viewMode}
                />
              ))}
            </div>
          )}
        </section>

        {/* Reset / Backup Utility Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 0', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.84rem' }}>
            <Info size={15} />
            <span>Verileriniz tarayıcınızın LocalStorage belleğinde anlık olarak saklanır.</span>
          </div>

          <button
            id="reset-demo-data-btn"
            className="btn-ghost"
            style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}
            onClick={handleResetDemoData}
            title="Örnek verileri sıfırla"
          >
            <RotateCcw size={14} />
            Örnek Görevleri Sıfırla
          </button>
        </div>
      </main>

      {/* App Footer */}
      <footer className="app-footer">
        <div>
          <strong>AI TaskMaster Studio</strong> &bull; TNC Group Web Geliştirme & Yapay Zeka Projesi
        </div>
        <div className="footer-links">
          <span>ReactJS + TypeScript + LocalStorage</span>
          <span>&bull;</span>
          <span>Netlify Ready</span>
        </div>
      </footer>

      {/* Modals */}
      <TaskFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setTaskToEdit(null);
        }}
        onSubmit={(taskData) => {
          if (taskToEdit) {
            handleUpdateTask(taskData);
          } else {
            handleCreateTask(taskData);
          }
        }}
        taskToEdit={taskToEdit}
      />

      <AIAssistantModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        onAddTask={handleCreateTask}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setTaskToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        taskToDelete={taskToDelete}
      />

      {/* Toast Notification Stack */}
      <div className="toast-container" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast ${toast.type}`}>
            {toast.type === 'success' && <CheckCircle size={18} />}
            {toast.type === 'info' && <Info size={18} />}
            {toast.type === 'warning' && <RotateCcw size={18} />}
            <span>{toast.text}</span>
          </div>
        ))}
      </div>
    </>
  );
};
