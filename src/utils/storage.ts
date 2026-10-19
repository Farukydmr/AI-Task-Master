import type { ITodo } from '../interfaces/todo';

const STORAGE_KEY = 'todo_app_tasks';

// Başlangıçta boş kalmaması için örnek veriler
export const INITIAL_TODOS: ITodo[] = [
  {
    id: 'todo-1',
    title: 'React ve modern JavaScript temellerini tekrar et',
    category: 'Ders',
    priority: 'Yüksek',
    completed: true,
    createdAt: new Date(Date.now() - 86400000 * 2).toLocaleDateString('tr-TR'),
  },
  {
    id: 'todo-2',
    title: 'Components, Pages ve Interfaces klasör mimarisini kur',
    category: 'Ders',
    priority: 'Yüksek',
    completed: true,
    createdAt: new Date(Date.now() - 86400000).toLocaleDateString('tr-TR'),
  },
  {
    id: 'todo-3',
    title: 'Projeyi GitHub reposuna push et ve Netlify üzerinde yayına al',
    category: 'İş',
    priority: 'Orta',
    completed: false,
    createdAt: new Date().toLocaleDateString('tr-TR'),
  },
  {
    id: 'todo-4',
    title: 'Ödev teslim formunu doldur ve linkleri hocaya ilet',
    category: 'Genel',
    priority: 'Düşük',
    completed: false,
    createdAt: new Date().toLocaleDateString('tr-TR'),
  },
];

/**
 * LocalStorage'dan görevleri çeker. Veri yoksa başlangıç verilerini döner.
 */
export const loadTodos = (): ITodo[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      saveTodos(INITIAL_TODOS);
      return INITIAL_TODOS;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('LocalStorage okuma hatası:', err);
    return INITIAL_TODOS;
  }
};

/**
 * Görevleri LocalStorage'a kaydeder.
 */
export const saveTodos = (todos: ITodo[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (err) {
    console.error('LocalStorage kayıt hatası:', err);
  }
};
