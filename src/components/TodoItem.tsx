import React, { useState } from 'react';
import type { ITodo, TodoCategory, TodoPriority } from '../interfaces/todo';
import { Check, Pencil, Trash2, X, Clock } from 'lucide-react';

interface TodoItemProps {
  todo: ITodo;
  onToggle: (id: string) => void;
  onUpdate: (id: string, newTitle: string, newCategory: TodoCategory, newPriority: TodoPriority) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editCategory, setEditCategory] = useState<TodoCategory>(todo.category);
  const [editPriority, setEditPriority] = useState<TodoPriority>(todo.priority);

  const handleSaveEdit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!editTitle.trim()) return;

    onUpdate(todo.id, editTitle.trim(), editCategory, editPriority);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(todo.title);
    setEditCategory(todo.category);
    setEditPriority(todo.priority);
    setIsEditing(false);
  };

  // Düzenleme Modu
  if (isEditing) {
    return (
      <form onSubmit={handleSaveEdit} className="todo-item editing">
        <div className="edit-form-content">
          <input
            type="text"
            className="edit-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            autoFocus
          />

          <div className="edit-selects">
            <select
              className="select-input select-small"
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value as TodoCategory)}
            >
              <option value="Ders">📚 Ders</option>
              <option value="İş">💼 İş</option>
              <option value="Kişisel">👤 Kişisel</option>
              <option value="Genel">📌 Genel</option>
            </select>

            <select
              className="select-input select-small"
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value as TodoPriority)}
            >
              <option value="Düşük">🟢 Düşük</option>
              <option value="Orta">🟡 Orta</option>
              <option value="Yüksek">🔴 Yüksek</option>
            </select>
          </div>
        </div>

        <div className="item-actions">
          <button
            type="submit"
            className="btn-icon btn-save"
            title="Değişiklikleri Kaydet"
          >
            <Check size={16} />
          </button>
          <button
            type="button"
            className="btn-icon btn-cancel"
            onClick={handleCancelEdit}
            title="İptal Et"
          >
            <X size={16} />
          </button>
        </div>
      </form>
    );
  }

  // Normal Görüntüleme Modu
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {/* 1. Güncelleme: Tamamlandı Durumunu Değiştirme */}
      <button
        type="button"
        className={`checkbox-btn ${todo.completed ? 'checked' : ''}`}
        onClick={() => onToggle(todo.id)}
        title={todo.completed ? 'Tamamlanmadı olarak işaretle' : 'Tamamlandı olarak işaretle'}
        aria-label="Tamamlama durumu değiştir"
      >
        {todo.completed && <Check size={14} strokeWidth={3} />}
      </button>

      {/* Görev Bilgileri */}
      <div className="todo-content" onClick={() => onToggle(todo.id)}>
        <p className="todo-title">{todo.title}</p>
        
        <div className="todo-meta">
          <span className="badge category-badge">
            {todo.category}
          </span>

          <span className={`badge priority-badge priority-${todo.priority.toLowerCase()}`}>
            {todo.priority}
          </span>

          <span className="date-badge">
            <Clock size={12} />
            {todo.createdAt}
          </span>
        </div>
      </div>

      {/* Aksiyon Butonları: Düzenle ve Sil */}
      <div className="item-actions">
        {/* 2. Güncelleme: Başlığı ve Detayları Düzenle */}
        <button
          type="button"
          className="btn-icon btn-edit"
          onClick={() => setIsEditing(true)}
          title="Görevi Düzenle"
        >
          <Pencil size={15} />
        </button>

        {/* Silme İşlemi */}
        <button
          type="button"
          className="btn-icon btn-delete"
          onClick={() => onDelete(todo.id)}
          title="Görevi Sil"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
};
