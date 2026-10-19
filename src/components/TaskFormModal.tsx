import React, { useState, useEffect } from 'react';
import type { ITask, NewTaskInput, TaskCategory, TaskPriority, TaskStatus } from '../interfaces/task';
import { 
  X, 
  Sparkles, 
  Save, 
  PlusCircle, 
  AlertCircle
} from 'lucide-react';

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskData: NewTaskInput) => void;
  taskToEdit?: ITask | null;
}

export const TaskFormModal: React.FC<TaskFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  taskToEdit,
}) => {
  const isEditing = !!taskToEdit;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TaskCategory>('Frontend');
  const [priority, setPriority] = useState<TaskPriority>('Orta');
  const [status, setStatus] = useState<TaskStatus>('Bekliyor');
  const [dueDate, setDueDate] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [isAiGenerated, setIsAiGenerated] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setCategory(taskToEdit.category);
      setPriority(taskToEdit.priority);
      setStatus(taskToEdit.status);
      setDueDate(taskToEdit.dueDate || '');
      setTagsInput(taskToEdit.tags ? taskToEdit.tags.join(', ') : '');
      setIsAiGenerated(taskToEdit.isAiGenerated || false);
    } else {
      setTitle('');
      setDescription('');
      setCategory('Frontend');
      setPriority('Orta');
      setStatus('Bekliyor');
      const defaultDate = new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 10);
      setDueDate(defaultDate);
      setTagsInput('');
      setIsAiGenerated(false);
    }
    setError('');
  }, [taskToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Lütfen bir görev başlığı girin.');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      category,
      priority,
      status,
      dueDate: dueDate || new Date().toISOString().slice(0, 10),
      tags,
      isAiGenerated,
    });
    onClose();
  };

  const handleAIEnhance = () => {
    if (!title) {
      setError('AI optimizasyonu için en azından kısa bir başlık girin.');
      return;
    }
    setIsAiGenerated(true);
    if (!description) {
      setDescription(`[AI Asistanı]: ${title} için önerilen geliştirme adımları:\n1. Fonksiyonel gereksinim analizi ve arayüz prototipi.\n2. Servis katmanı ve state yönetimi entegrasyonu.\n3. Uçtan uca kullanıcı testi ve optimizasyon.`);
    }
    if (!tagsInput) {
      setTagsInput(`${category}, AI Destekli, Agile, Kodlama`);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container animate-scale-in" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title">
            {isEditing ? (
              <>
                <Save size={22} color="var(--primary)" />
                <span>Görevi Güncelle</span>
              </>
            ) : (
              <>
                <PlusCircle size={22} color="var(--primary)" />
                <span>Yeni Görev Ekle</span>
              </>
            )}
          </div>
          <button 
            id="modal-close-btn"
            className="btn-card-action"
            onClick={onClose}
            title="Kapat"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && (
              <div style={{
                background: 'rgba(244, 63, 94, 0.15)',
                color: 'var(--rose)',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.88rem'
              }}>
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            {/* Title */}
            <div className="form-group">
              <label className="form-label" htmlFor="task-title-input">
                Görev Başlığı *
              </label>
              <input
                id="task-title-input"
                type="text"
                className="form-input"
                placeholder="Örn: React ile LocalStorage Entegrasyonu"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (error) setError('');
                }}
                autoFocus
              />
            </div>

            {/* Category & Priority Row */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="task-category-select">
                  Kategori
                </label>
                <select
                  id="task-category-select"
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as TaskCategory)}
                >
                  <option value="Yapay Zeka">🤖 Yapay Zeka</option>
                  <option value="Frontend">💻 Frontend</option>
                  <option value="Backend">⚙️ Backend</option>
                  <option value="Tasarım">🎨 Tasarım</option>
                  <option value="Genel">📌 Genel</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="task-priority-select">
                  Öncelik
                </label>
                <select
                  id="task-priority-select"
                  className="form-select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as TaskPriority)}
                >
                  <option value="Düşük">⚪ Düşük</option>
                  <option value="Orta">🟣 Orta</option>
                  <option value="Yüksek">🟠 Yüksek</option>
                  <option value="Kritik">🔴 Kritik</option>
                </select>
              </div>
            </div>

            {/* Status & Due Date Row */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="task-status-select">
                  Durum
                </label>
                <select
                  id="task-status-select"
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as TaskStatus)}
                >
                  <option value="Bekliyor">⏳ Bekliyor</option>
                  <option value="Devam Ediyor">⚡ Devam Ediyor</option>
                  <option value="Tamamlandı">✅ Tamamlandı</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="task-duedate-input">
                  Bitiş Tarihi
                </label>
                <input
                  id="task-duedate-input"
                  type="date"
                  className="form-input"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>

            {/* Description */}
            <div className="form-group">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <label className="form-label" htmlFor="task-desc-input">
                  Açıklama & Notlar
                </label>
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={handleAIEnhance}
                  style={{ fontSize: '0.78rem', color: 'var(--cyan)', display: 'flex', alignItems: 'center', gap: '4px', padding: '2px 6px' }}
                  title="Başlığı baz alarak yapay zeka ile adımlar öner"
                >
                  <Sparkles size={13} />
                  AI ile Detaylandır
                </button>
              </div>
              <textarea
                id="task-desc-input"
                className="form-textarea"
                rows={3}
                placeholder="Görev kapsamı, mimari hedefler ve notlar..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Tags */}
            <div className="form-group">
              <label className="form-label" htmlFor="task-tags-input">
                Etiketler (Virgülle Ayırın)
              </label>
              <input
                id="task-tags-input"
                type="text"
                className="form-input"
                placeholder="React, TypeScript, LocalStorage, UI"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="modal-footer">
            <button
              id="form-cancel-btn"
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Vazgeç
            </button>
            <button
              id="form-submit-btn"
              type="submit"
              className="btn btn-primary"
            >
              {isEditing ? 'Değişiklikleri Kaydet' : 'Görevi Oluştur'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
