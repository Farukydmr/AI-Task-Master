import React, { useState, useEffect, useMemo } from 'react';
import type { ITodo, TodoCategory, TodoPriority, FilterStatus } from '../interfaces/todo';
import { loadTodos, saveTodos, INITIAL_TODOS } from '../utils/storage';

import { Navbar } from '../components/Navbar';
import { TodoForm } from '../components/TodoForm';
import { TodoFilter } from '../components/TodoFilter';
import { TodoItem } from '../components/TodoItem';
import { ListTodo } from 'lucide-react';

export const TodoPage: React.FC = () => {
  // 1. Durumlar (States)
  const [todos, setTodos] = useState<ITodo[]>(() => loadTodos());
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 2. LocalStorage Senkronizasyonu (Her değişiklikte otomatik kaydeder)
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  /* ================== CRUD İŞLEMLERİ ================== */

  // A. CREATE (Ekleme)
  const handleAddTodo = (title: string, category: TodoCategory, priority: TodoPriority) => {
    const newTodo: ITodo = {
      id: 'todo-' + Date.now(),
      title,
      category,
      priority,
      completed: false,
      createdAt: new Date().toLocaleDateString('tr-TR'),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  // B. UPDATE 1 (Tamamlama Durumunu Değiştirme)
  const handleToggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // C. UPDATE 2 (Başlık, Kategori, Öncelik Güncelleme)
  const handleUpdateTodo = (
    id: string,
    newTitle: string,
    newCategory: TodoCategory,
    newPriority: TodoPriority
  ) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              title: newTitle,
              category: newCategory,
              priority: newPriority,
            }
          : todo
      )
    );
  };

  // D. DELETE (Silme)
  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // E. Tamamlananları Toplu Silme
  const handleClearCompleted = () => {
    if (window.confirm('Tamamlanan tüm görevleri silmek istediğinize emin misiniz?')) {
      setTodos((prev) => prev.filter((todo) => !todo.completed));
    }
  };

  // F. Başlangıç Verilerini Sıfırlama
  const handleResetData = () => {
    if (window.confirm('Örnek görevleri varsayılana sıfırlamak istiyor musunuz?')) {
      setTodos(INITIAL_TODOS);
      setFilterStatus('all');
      setSearchQuery('');
    }
  };

  /* ================== FİLTRE VE LİSTELEME ================== */

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      // Durum Filtresi
      if (filterStatus === 'active' && todo.completed) return false;
      if (filterStatus === 'completed' && !todo.completed) return false;

      // Arama Filtresi
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = todo.title.toLowerCase().includes(query);
        const matchesCategory = todo.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesCategory) return false;
      }

      return true;
    });
  }, [todos, filterStatus, searchQuery]);

  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = totalCount - completedCount;

  return (
    <div className="todo-app-container">
      {/* Üst Menü ve İlerleme Göstergesi */}
      <Navbar
        totalCount={totalCount}
        completedCount={completedCount}
        onResetData={handleResetData}
      />

      <main className="main-content">
        {/* Görev Ekleme Formu (Create) */}
        <TodoForm onAddTodo={handleAddTodo} />

        {/* Filtreleme ve Arama Çubuğu */}
        <TodoFilter
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalCount={totalCount}
          activeCount={activeCount}
          completedCount={completedCount}
          onClearCompleted={handleClearCompleted}
        />

        {/* Görev Listesi (Read) */}
        <section className="todo-list-section">
          {filteredTodos.length > 0 ? (
            <div className="todo-items-list">
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggleTodo}
                  onUpdate={handleUpdateTodo}
                  onDelete={handleDeleteTodo}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <ListTodo size={40} />
              </div>
              <p className="empty-title">
                {searchQuery
                  ? 'Aramanıza uygun bir görev bulunamadı.'
                  : filterStatus === 'completed'
                  ? 'Henüz tamamlanmış bir görev yok.'
                  : 'Listenizde henüz görev bulunmuyor.'}
              </p>
              <p className="empty-subtitle">
                Yukarıdaki formdan yeni bir görev ekleyerek başlayabilirsiniz.
              </p>
            </div>
          )}
        </section>
      </main>

      {/* Sade Alt Bilgi */}
      <footer className="app-footer">
        <p>Web Geliştirme &bull; React &bull; LocalStorage &bull; CRUD Projesi</p>
      </footer>
    </div>
  );
};
