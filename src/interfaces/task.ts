export type TaskCategory = 'Yapay Zeka' | 'Frontend' | 'Backend' | 'Tasarım' | 'Genel';
export type TaskPriority = 'Düşük' | 'Orta' | 'Yüksek' | 'Kritik';
export type TaskStatus = 'Bekliyor' | 'Devam Ediyor' | 'Tamamlandı';

export interface ITask {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  tags: string[];
  isAiGenerated?: boolean;
  createdAt: string;
  updatedAt: string;
}

export type NewTaskInput = Omit<ITask, 'id' | 'createdAt' | 'updatedAt'>;

export interface ITaskFilter {
  search: string;
  category: string;
  priority: string;
  status: string;
  sortBy: 'createdAt-desc' | 'createdAt-asc' | 'dueDate' | 'priority' | 'title';
  viewMode: 'grid' | 'list';
}

export interface ITaskStats {
  total: number;
  completed: number;
  inProgress: number;
  pending: number;
  highPriority: number;
  completionRate: number;
}
