export type TodoPriority = 'Düşük' | 'Orta' | 'Yüksek';
export type TodoCategory = 'Genel' | 'Ders' | 'İş' | 'Kişisel';

export interface ITodo {
  id: string;
  title: string;
  category: TodoCategory;
  priority: TodoPriority;
  completed: boolean;
  createdAt: string;
}

export type FilterStatus = 'all' | 'active' | 'completed';
