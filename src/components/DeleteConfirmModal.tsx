import React from 'react';
import type { ITask } from '../interfaces/task';
import { AlertTriangle, Trash2, X } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  taskToDelete: ITask | null;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  taskToDelete,
}) => {
  if (!isOpen || !taskToDelete) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="modal-container animate-scale-in" 
        style={{ maxWidth: '440px' }} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title" style={{ color: 'var(--rose)' }}>
            <AlertTriangle size={22} />
            <span>Görevi Sil</span>
          </div>
          <button 
            id="delete-modal-close-btn"
            className="btn-card-action"
            onClick={onClose}
            title="Kapat"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <p style={{ color: 'var(--text-primary)', fontSize: '0.96rem' }}>
            Aşağıdaki görevi silmek istediğinizden emin misiniz?
          </p>
          <div style={{
            padding: '0.85rem 1rem',
            background: 'rgba(244, 63, 94, 0.08)',
            border: '1px solid rgba(244, 63, 94, 0.25)',
            borderRadius: 'var(--radius-md)',
            fontWeight: 600,
            color: 'var(--text-primary)',
            fontSize: '0.92rem'
          }}>
            "{taskToDelete.title}"
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
            Bu işlem geri alınamaz ve görev yerel depolamadan (LocalStorage) kalıcı olarak kaldırılacaktır.
          </p>
        </div>

        <div className="modal-footer">
          <button 
            id="delete-cancel-btn"
            type="button" 
            className="btn btn-secondary" 
            onClick={onClose}
          >
            Vazgeç
          </button>
          <button 
            id="delete-confirm-btn"
            type="button" 
            className="btn btn-danger" 
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            <Trash2 size={16} />
            <span>Evet, Sil</span>
          </button>
        </div>
      </div>
    </div>
  );
};
