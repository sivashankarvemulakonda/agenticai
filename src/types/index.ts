export type Student = {
  id: string;
  name: string;
  avatar: string;
  engagement: number;
  progress: number;
  lastSeen: string;
  isAtRisk: boolean;
};

export type Module = {
  id: string;
  title: string;
  description: string;
  image: string;
  content: {
    videoUrl: string;
    transcript: string;
    quiz: QuizQuestion[];
  };
};

export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
};
