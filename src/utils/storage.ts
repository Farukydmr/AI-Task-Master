import type { ITask } from '../interfaces/task';
import { INITIAL_TASKS } from './mockData';

const STORAGE_KEY = 'ai_task_master_tasks_v1';
const THEME_KEY = 'ai_task_master_theme_v1';

export const loadTasksFromStorage = (): ITask[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TASKS));
      return INITIAL_TASKS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_TASKS;
  } catch (err) {
    console.error('LocalStorage load error:', err);
    return INITIAL_TASKS;
  }
};

export const saveTasksToStorage = (tasks: ITask[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (err) {
    console.error('LocalStorage save error:', err);
  }
};

export const exportTasksAsJSON = (tasks: ITask[]): void => {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(tasks, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `ai_tasks_backup_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};

export const importTasksFromJSON = (jsonString: string): ITask[] => {
  const parsed = JSON.parse(jsonString);
  if (!Array.isArray(parsed)) {
    throw new Error('Geçersiz dosya biçimi: Görev dizisi bulunamadı.');
  }
  return parsed;
};

export const getSavedTheme = (): 'dark' | 'light' => {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    return 'dark';
  } catch {
    return 'dark';
  }
};

export const saveThemeToStorage = (theme: 'dark' | 'light'): void => {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (err) {
    console.error('Theme save error:', err);
  }
};
