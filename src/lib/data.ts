import type { Student, Module } from '@/types';

export const students: Student[] = [
  { id: '1', name: 'Liam Johnson', avatar: 'student-1', engagement: 92, progress: 85, lastSeen: '2 hours ago', isAtRisk: false },
  { id: '2', name: 'Olivia Smith', avatar: 'student-2', engagement: 85, progress: 90, lastSeen: '1 day ago', isAtRisk: false },
  { id: '3', name: 'Noah Williams', avatar: 'student-3', engagement: 42, progress: 35, lastSeen: '5 days ago', isAtRisk: true },
  { id: '4', name: 'Emma Brown', avatar: 'student-4', engagement: 76, progress: 80, lastSeen: 'yesterday', isAtRisk: false },
  { id: '5', name: 'Ava Jones', avatar: 'student-5', engagement: 35, progress: 25, lastSeen: '1 week ago', isAtRisk: true },
  { id: '6', name: 'Ethan Garcia', avatar: 'student-6', engagement: 68, progress: 72, lastSeen: '3 days ago', isAtRisk: false },
];

export const modules: Module[] = [
  {
    id: '1',
    title: 'Introduction to Algebra',
    description: 'Master the fundamentals of algebraic expressions and equations.',
    image: 'module-1',
    content: {
      videoUrl: 'https://www.youtube.com/embed/grSekf0_3jA',
      transcript: 'This video introduces basic algebraic concepts...',
      quiz: [
        { question: 'What is 2x + 3x?', options: ['4x', '5x', '6x'], correctAnswer: '5x' },
        { question: 'Solve for x: x + 5 = 10', options: ['3', '5', '15'], correctAnswer: '5' },
      ],
    },
  },
  {
    id: '2',
    title: 'Renaissance Art History',
    description: 'Explore the masterpieces of the Renaissance and their creators.',
    image: 'module-2',
    content: {
      videoUrl: 'https://www.youtube.com/embed/2V_Jp-A8_jA',
      transcript: 'The Renaissance was a fervent period of European cultural...',
      quiz: [
        { question: 'Who painted the Mona Lisa?', options: ['Michelangelo', 'Raphael', 'Leonardo da Vinci'], correctAnswer: 'Leonardo da Vinci' },
      ],
    },
  },
  {
    id: '3',
    title: 'Creative Writing Workshop',
    description: 'Unleash your inner storyteller with guided writing exercises.',
    image: 'module-3',
    content: {
      videoUrl: 'https://www.youtube.com/embed/NhrB422l-qI',
      transcript: 'Welcome to the creative writing workshop. Today we focus on character development...',
      quiz: [
        { question: 'What is a "plot twist"?', options: ['A predictable outcome', 'An unexpected development', 'The story\'s introduction'], correctAnswer: 'An unexpected development' },
      ],
    },
  },
  {
    id: '4',
    title: 'Physics 101: The Laws of Motion',
    description: 'Understand the principles that govern the physical world.',
    image: 'module-4',
    content: {
      videoUrl: 'https://www.youtube.com/embed/kKKM8Y-u7ds',
      transcript: 'Newton\'s Laws of Motion are three basic laws of classical mechanics...',
      quiz: [
        { question: 'What is Newton\'s First Law about?', options: ['Action-Reaction', 'Force and Acceleration', 'Inertia'], correctAnswer: 'Inertia' },
      ],
    },
  },
];

export const engagementData = [
  { week: 'Week 1', engagement: 65 },
  { week: 'Week 2', engagement: 72 },
  { week: 'Week 3', engagement: 78 },
  { week: 'Week 4', engagement: 75 },
  { week: 'Week 5', engagement: 82 },
  { week: 'Week 6', engagement: 85 },
  { week: 'Week 7', engagement: 79 },
];

export const forumPosts = `
[2024-05-20 10:05] Liam Johnson: Hey everyone, I'm a bit stuck on the algebra homework, specifically question 3. Can anyone explain the concept of factoring polynomials again?
[2024-05-20 11:30] Olivia Smith: @Liam, I was confused too! I found a great video on YouTube that explains it really well. The key is to find the greatest common divisor.
[2024-05-20 14:15] Emma Brown: I agree with Olivia. For Q3, you need to pull out 2x from the expression. Then it becomes much simpler.
[2024-05-21 09:00] Instructor: Great discussion, everyone. @Liam, let me know if you're still having trouble. Remember to check the supplemental materials in Module 1.
[2024-05-22 18:20] Ethan Garcia: The Renaissance module is fascinating! The details in the paintings are incredible.
[2024-05-23 11:00] Liam Johnson: Thanks @Olivia and @Emma! That makes much more sense now. I got it.
[2024-05-24 16:45] Emma Brown: Is anyone else finding the creative writing prompts a bit challenging? I'm struggling to come up with a good story for the 'unexpected hero' prompt.
[2024-05-25 10:00] Olivia Smith: @Emma, I started by just brainstorming random character ideas. Don't think about the story at first, just the person. It helped me get going!
`;
