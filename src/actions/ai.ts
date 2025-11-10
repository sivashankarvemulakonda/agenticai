'use server';

import { analyzeStudentInteractions, AnalyzeStudentInteractionsOutput } from '@/ai/flows/analyze-student-interactions';
import { personalizeInterventions, PersonalizeInterventionsOutput } from '@/ai/flows/personalize-interventions';
import { students, forumPosts as allForumPosts } from '@/lib/data';

export async function runInteractionAnalysis(): Promise<AnalyzeStudentInteractionsOutput> {
  try {
    const result = await analyzeStudentInteractions({ forumPosts: allForumPosts });
    return result;
  } catch (error) {
    console.error("Error in runInteractionAnalysis:", error);
    throw new Error("Failed to analyze student interactions.");
  }
}

export async function getPersonalizedIntervention(studentId: string): Promise<PersonalizeInterventionsOutput> {
  const student = students.find(s => s.id === studentId);

  if (!student) {
    throw new Error("Student not found.");
  }

  const engagementData = `
    Student Name: ${student.name}
    Engagement Score: ${student.engagement}%
    Module Progress: ${student.progress}%
    Last Seen: ${student.lastSeen}
    Identified as At-Risk: ${student.isAtRisk ? 'Yes' : 'No'}
  `;

  try {
    const result = await personalizeInterventions({
      studentId: student.id,
      engagementData,
      learningStyle: 'Visual', // Example learning style
    });
    return result;
  } catch (error) {
    console.error("Error in getPersonalizedIntervention:", error);
    throw new Error("Failed to generate personalized intervention.");
  }
}
