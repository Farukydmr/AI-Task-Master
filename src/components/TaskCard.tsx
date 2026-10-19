import React from 'react';
import type { ITask } from '../interfaces/task';
import confetti from 'canvas-confetti';
import { 
  Check, 
  Calendar, 
  Sparkles, 
  Pencil, 
  Trash2,
  Layers
} from 'lucide-react';

interface TaskCardProps {
  task: ITask;
  onToggleComplete: (task: ITask) => void;
  onEdit: (task: ITask) => void;
  onDelete: (task: ITask) => void;
  viewMode: 'grid' | 'list';
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
  viewMode,
}) => {
  const isCompleted = task.status === 'Tamamlandı';

  const handleCheckboxClick = () => {
    if (!isCompleted) {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.75 },
        colors: ['#6366f1', '#10b981', '#06b6d4', '#f59e0b']
      });
    }
    onToggleComplete(task);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Tarih Belirtilmedi';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <article 
      className={`task-card animate-fade-in ${isCompleted ? 'completed' : ''} ${viewMode === 'list' ? 'list-view-item' : ''}`}
      id={`task-card-${task.id}`}
    >
      <div className="task-card-header">
        {/* Toggle Checkbox */}
        <button
          id={`task-check-${task.id}`}
          className={`custom-checkbox ${isCompleted ? 'checked' : ''}`}
          onClick={handleCheckboxClick}
          title={isCompleted ? 'Tamamlanmadı olarak işaretle' : 'Tamamlandı olarak işaretle'}
          aria-label="Görevi tamamla"
        >
          {isCompleted && <Check size={14} strokeWidth={3} />}
        </button>

        <div className="task-card-content">
          {/* Badges row */}
          <div className="badge-group">
            {/* Category */}
            <span className="badge" style={{ background: 'rgba(255, 255, 255, 0.08)', color: 'var(--text-primary)' }}>
              <Layers size={11} />
              {task.category}
            </span>

            {/* Priority */}
            <span className={`badge priority-${task.priority}`}>
              {task.priority}
            </span>

            {/* Status */}
            <span className={`badge status-${task.status.replace(' ', '\\ ')}`}>
              {task.status}
            </span>

            {/* AI Generated Indicator */}
            {task.isAiGenerated && (
              <span className="badge badge-ai" title="Yapay zeka tarafından üretildi">
                <Sparkles size={11} />
                AI
              </span>
            )}
          </div>

          {/* Title */}
          <h2 className="task-title" style={{ marginTop: '0.4rem' }}>
            {task.title}
          </h2>

          {/* Description */}
          {task.description && (
            <p className="task-description">
              {task.description}
            </p>
          )}

          {/* Tags */}
          {task.tags && task.tags.length > 0 && (
            <div className="tag-list" style={{ marginTop: '0.35rem' }}>
              {task.tags.map((tag, idx) => (
                <span key={idx} className="tag-item">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="task-card-footer">
        <div className="task-date">
          <Calendar size={13} />
          <span>{formatDate(task.dueDate)}</span>
        </div>

        {/* Action Buttons: Edit & Delete */}
        <div className="card-action-group">
          <button
            id={`task-edit-btn-${task.id}`}
            className="btn-card-action"
            onClick={() => onEdit(task)}
            title="Görevi Düzenle (Güncelleme)"
            aria-label="Görevi düzenle"
          >
            <Pencil size={15} />
          </button>

          <button
            id={`task-delete-btn-${task.id}`}
            className="btn-card-action delete"
            onClick={() => onDelete(task)}
            title="Görevi Sil"
            aria-label="Görevi sil"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </article>
  );
};
