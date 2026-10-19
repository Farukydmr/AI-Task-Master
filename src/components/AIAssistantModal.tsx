import React, { useState } from 'react';
import type { NewTaskInput } from '../interfaces/task';
import type { AIBlueprint } from '../utils/aiGenerator';
import { AI_BLUEPRINTS, generateTaskFromPrompt } from '../utils/aiGenerator';
import { 
  Bot, 
  Sparkles, 
  X, 
  Send, 
  CheckCircle, 
  ArrowRight,
  Lightbulb
} from 'lucide-react';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: NewTaskInput) => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  onAddTask,
}) => {
  const [prompt, setPrompt] = useState('');
  const [generatedTask, setGeneratedTask] = useState<NewTaskInput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      const result = generateTaskFromPrompt(prompt);
      setGeneratedTask(result);
      setIsGenerating(false);
    }, 450);
  };

  const handleSelectBlueprint = (bp: AIBlueprint) => {
    const defaultDueDate = new Date(Date.now() + 86400000 * 4).toISOString().slice(0, 10);
    const task: NewTaskInput = {
      title: bp.title,
      description: bp.description,
      category: bp.category,
      priority: bp.priority,
      status: 'Bekliyor',
      dueDate: defaultDueDate,
      tags: [...bp.tags, 'AI Önerisi'],
      isAiGenerated: true,
    };
    setGeneratedTask(task);
    setPrompt(bp.title);
  };

  const handleConfirmAdd = () => {
    if (generatedTask) {
      onAddTask(generatedTask);
      setGeneratedTask(null);
      setPrompt('');
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="modal-container animate-scale-in" 
        style={{ maxWidth: '640px' }} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title">
            <div style={{
              width: 34,
              height: 34,
              borderRadius: '8px',
              background: 'var(--gradient-ai)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              boxShadow: 'var(--shadow-ai-glow)'
            }}>
              <Bot size={20} />
            </div>
            <span>Yapay Zeka Görev ve Proje Asistanı</span>
          </div>
          <button 
            id="ai-modal-close-btn"
            className="btn-card-action"
            onClick={onClose}
            title="Kapat"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Prompt Form */}
          <form onSubmit={handleGenerate} className="form-group">
            <label className="form-label" htmlFor="ai-prompt-input">
              Doğal Dille Ne Yapmak İstediğinizi Yazın:
            </label>
            <div style={{ display: 'flex', gap: '0.65rem' }}>
              <input
                id="ai-prompt-input"
                type="text"
                className="form-input"
                placeholder="Örn: E-ticaret için RAG destekli akıllı ürün öneri motoru kur"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                autoFocus
              />
              <button
                id="ai-generate-submit-btn"
                type="submit"
                className="btn btn-ai"
                disabled={isGenerating || !prompt.trim()}
                style={{ flexShrink: 0 }}
              >
                {isGenerating ? <Sparkles size={16} className="animate-spin" /> : <Send size={16} />}
                <span>{isGenerating ? 'Analiz...' : 'Üret'}</span>
              </button>
            </div>
          </form>

          {/* Generated Preview Card */}
          {generatedTask && (
            <div 
              className="animate-fade-in"
              style={{
                background: 'rgba(6, 182, 212, 0.08)',
                border: '1px solid rgba(6, 182, 212, 0.35)',
                borderRadius: 'var(--radius-md)',
                padding: '1.2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="badge badge-ai">
                  <Sparkles size={12} />
                  AI Önerisi Hazır
                </span>
                <span className={`badge priority-${generatedTask.priority}`}>
                  {generatedTask.priority}
                </span>
              </div>
              <h3 style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                {generatedTask.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}>
                {generatedTask.description}
              </p>
              <div className="tag-list">
                {generatedTask.tags.map((t, i) => (
                  <span key={i} className="tag-item">#{t}</span>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button
                  id="ai-add-task-confirm-btn"
                  className="btn btn-primary"
                  onClick={handleConfirmAdd}
                >
                  <CheckCircle size={16} />
                  <span>Bu Görevi Projeye Ekle</span>
                </button>
              </div>
            </div>
          )}

          {/* Pre-built Blueprints Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--text-secondary)', fontSize: '0.86rem', fontWeight: 600 }}>
              <Lightbulb size={16} color="var(--amber)" />
              <span>Veya Popüler AI & Web Mimari Şablonlarından Seçin:</span>
            </div>

            <div className="blueprint-grid">
              {AI_BLUEPRINTS.map((bp, idx) => (
                <div
                  key={idx}
                  id={`blueprint-card-${idx}`}
                  className="blueprint-card"
                  onClick={() => handleSelectBlueprint(bp)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className="badge" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)' }}>
                      {bp.category}
                    </span>
                    <span className={`badge priority-${bp.priority}`} style={{ fontSize: '0.7rem' }}>
                      {bp.priority}
                    </span>
                  </div>
                  <div className="blueprint-title">{bp.title}</div>
                  <div className="blueprint-desc">{bp.description.slice(0, 75)}...</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--cyan)', marginTop: 'auto' }}>
                    <span>Planı İncele</span>
                    <ArrowRight size={12} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button 
            id="ai-modal-cancel-btn"
            className="btn btn-secondary" 
            onClick={onClose}
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
