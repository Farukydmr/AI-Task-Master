import React, { useState } from 'react';
import type { TodoCategory, TodoPriority } from '../interfaces/todo';
import { Plus } from 'lucide-react';

interface TodoFormProps {
  onAddTodo: (title: string, category: TodoCategory, priority: TodoPriority) => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TodoCategory>('Ders');
  const [priority, setPriority] = useState<TodoPriority>('Orta');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Lütfen bir görev açıklaması yazın.');
      return;
    }

    onAddTodo(title.trim(), category, priority);
    setTitle('');
    setError('');
  };

  return (
    <section className="form-card">
      <h2 className="section-title">Yeni Görev Ekle</h2>
      
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-row">
          {/* Görev Başlığı / Metni */}
          <div className="input-field-group main-input">
            <input
              type="text"
              className="text-input"
              placeholder="Ne yapılması gerekiyor? (Örn: React komponentlerini yaz...)"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
            />
          </div>

          {/* Kategori Seçimi */}
          <div className="input-field-group">
            <select
              className="select-input"
              value={category}
              onChange={(e) => setCategory(e.target.value as TodoCategory)}
            >
              <option value="Ders">📚 Ders</option>
              <option value="İş">💼 İş</option>
              <option value="Kişisel">👤 Kişisel</option>
              <option value="Genel">📌 Genel</option>
            </select>
          </div>

          {/* Öncelik Seçimi */}
          <div className="input-field-group">
            <select
              className="select-input"
              value={priority}
              onChange={(e) => setPriority(e.target.value as TodoPriority)}
            >
              <option value="Düşük">🟢 Düşük Öncelik</option>
              <option value="Orta">🟡 Orta Öncelik</option>
              <option value="Yüksek">🔴 Yüksek Öncelik</option>
            </select>
          </div>

          {/* Ekle Butonu */}
          <button type="submit" className="btn-primary">
            <Plus size={18} />
            <span>Görev Ekle</span>
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}
      </form>
    </section>
  );
};
