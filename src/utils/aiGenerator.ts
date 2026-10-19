import type { NewTaskInput, TaskCategory, TaskPriority } from '../interfaces/task';

export interface AIBlueprint {
  title: string;
  description: string;
  category: TaskCategory;
  priority: TaskPriority;
  tags: string[];
}

export const AI_BLUEPRINTS: AIBlueprint[] = [
  {
    title: 'RAG (Retrieval-Augmented Generation) Vektör Veritabanı Mimarisi',
    description: 'LangChain ve ChromaDB / Pinecone kullanarak PDF ve doküman sorgulama motoru kur. Embedding modelleriyle semantik arama uygula.',
    category: 'Yapay Zeka',
    priority: 'Kritik',
    tags: ['RAG', 'VectorDB', 'Embeddings', 'LangChain'],
  },
  {
    title: 'Ollama ile Yerel LLM API Entegrasyonu ve Streaming Yanıtlar',
    description: 'Llama 3 / Mistral modelini yerel makinede çalıştırıp React arayüzüne server-sent events (SSE) ile anlık kelime akışı sağla.',
    category: 'Yapay Zeka',
    priority: 'Yüksek',
    tags: ['Ollama', 'LocalLLM', 'Streaming', 'SSE'],
  },
  {
    title: 'Next.js 15 & React Server Components ile AI Dashboard',
    description: 'Modern App Router, Server Actions ve Tailwind CSS kullanarak veri akışını optimize et, SEO puanını 100 yap.',
    category: 'Frontend',
    priority: 'Yüksek',
    tags: ['Next.js', 'React', 'ServerComponents', 'SEO'],
  },
  {
    title: 'Figma to Code: Glassmorphism ve Mikro Etkileşimler Tasarımı',
    description: 'Kullanıcı odaklı modern karanlık mod arayüzü, pürüzsüz geçiş efektleri ve kart animasyonları geliştir.',
    category: 'Tasarım',
    priority: 'Orta',
    tags: ['Figma', 'UI/UX', 'MicroInteractions', 'CSS3'],
  },
  {
    title: 'FastAPI & PyTorch ile Makine Öğrenmesi Tahmin Servisi',
    description: 'Eğitilmiş model için RESTful API uç noktası aç, Dockerize et ve gecikme süresini <50ms altına düşür.',
    category: 'Backend',
    priority: 'Yüksek',
    tags: ['FastAPI', 'PyTorch', 'Docker', 'MachineLearning'],
  },
  {
    title: 'Tarayıcı İçi AI: Transformers.js ile Duygu Analizi',
    description: 'Sunucu maliyeti olmadan tamamen istemci tarafında ONNX tabanlı NLP modeliyle kullanıcı yorumlarını sınıflandır.',
    category: 'Yapay Zeka',
    priority: 'Orta',
    tags: ['TransformersJS', 'ClientAI', 'NLP', 'WebAssembly'],
  },
  {
    title: 'Web3 & AI: Akıllı Sözleşmeler için Güvenlik Denetim Aracı',
    description: 'Solidity kontratlarını statik kod analizi ve LLM destekli güvenlik taramasıyla inceleyen test paketi.',
    category: 'Genel',
    priority: 'Düşük',
    tags: ['Web3', 'Security', 'Auditing', 'Automation'],
  }
];

export const generateTaskFromPrompt = (prompt: string): NewTaskInput => {
  const p = prompt.toLowerCase();
  
  let category: TaskCategory = 'Genel';
  if (p.includes('ai') || p.includes('yapay zeka') || p.includes('model') || p.includes('llm') || p.includes('gpt') || p.includes('prompt')) {
    category = 'Yapay Zeka';
  } else if (p.includes('react') || p.includes('vue') || p.includes('css') || p.includes('html') || p.includes('frontend') || p.includes('arayüz') || p.includes('tasarım')) {
    category = p.includes('tasarım') ? 'Tasarım' : 'Frontend';
  } else if (p.includes('api') || p.includes('backend') || p.includes('veri') || p.includes('node') || p.includes('sql') || p.includes('sunucu')) {
    category = 'Backend';
  }

  let priority: TaskPriority = 'Orta';
  if (p.includes('acil') || p.includes('kritik') || p.includes('hemen') || p.includes('önemli')) {
    priority = 'Kritik';
  } else if (p.includes('yüksek') || p.includes('büyük') || p.includes('ana')) {
    priority = 'Yüksek';
  } else if (p.includes('kolay') || p.includes('küçük') || p.includes('düşük')) {
    priority = 'Düşük';
  }

  // Tag extraction
  const tags: string[] = ['AI Destekli'];
  if (category !== 'Genel') tags.push(category);
  if (p.includes('react')) tags.push('React');
  if (p.includes('python')) tags.push('Python');
  if (p.includes('api')) tags.push('API');
  if (p.includes('css') || p.includes('tasarım')) tags.push('UI/UX');
  if (p.includes('test')) tags.push('Test');

  const defaultDueDate = new Date(Date.now() + 86400000 * 5).toISOString().slice(0, 10);

  return {
    title: prompt.trim().charAt(0).toUpperCase() + prompt.trim().slice(1),
    description: `[Yapay Zeka Tarafından Üretildi]\n• Hedef: ${prompt.trim()}\n• Adım 1: Mimari gereksinimleri ve API spesifikasyonlarını tanımla.\n• Adım 2: Çekirdek modülleri test odaklı geliştir.\n• Adım 3: Entegrasyon ve performans doğrulamasını tamamla.`,
    category,
    priority,
    status: 'Bekliyor',
    dueDate: defaultDueDate,
    tags: Array.from(new Set(tags)),
    isAiGenerated: true,
  };
};
