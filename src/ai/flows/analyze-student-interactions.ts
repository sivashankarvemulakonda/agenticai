'use server';

/**
 * @fileOverview Analyzes student interactions in online forums to identify engagement patterns and potential disengagement.
 *
 * - analyzeStudentInteractions - A function that analyzes student interactions.
 * - AnalyzeStudentInteractionsInput - The input type for the analyzeStudentInteractions function.
 * - AnalyzeStudentInteractionsOutput - The return type for the analyzeStudentInteractions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeStudentInteractionsInputSchema = z.object({
  forumPosts: z
    .string()
    .describe(
      'A string containing all forum posts for a given time period. Should include author and timestamp.'
    ),
});
export type AnalyzeStudentInteractionsInput = z.infer<
  typeof AnalyzeStudentInteractionsInputSchema
>;

const AnalyzeStudentInteractionsOutputSchema = z.object({
  engagementSummary: z
    .string()
    .describe(
      'A summary of student engagement patterns, identifying potential disengagement and at-risk students.'
    ),
  topicsNeedingAttention: z
    .string()
    .describe('Topics that require more attention based on the forum posts.'),
  atRiskStudents: z
    .string()
    .describe('List of students who are at risk of disengagement.'),
});

export type AnalyzeStudentInteractionsOutput = z.infer<
  typeof AnalyzeStudentInteractionsOutputSchema
>;

export async function analyzeStudentInteractions(
  input: AnalyzeStudentInteractionsInput
): Promise<AnalyzeStudentInteractionsOutput> {
  return analyzeStudentInteractionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeStudentInteractionsPrompt',
  input: {schema: AnalyzeStudentInteractionsInputSchema},
  output: {schema: AnalyzeStudentInteractionsOutputSchema},
  prompt: `You are an AI assistant designed to analyze student interactions in online forums and identify engagement patterns.

  Analyze the following forum posts to provide insights into student engagement, topics needing attention, and students at risk of disengagement.

  Forum Posts:
  {{forumPosts}}

  Provide a concise summary of the engagement patterns, clearly stating any signs of disengagement.

  Identify specific topics that students are struggling with or that require more detailed explanation.

  List any students who are showing signs of disengagement and are at risk of falling behind.
  Format your output in markdown format with clear headings for each section.
`,
});

const analyzeStudentInteractionsFlow = ai.defineFlow(
  {
    name: 'analyzeStudentInteractionsFlow',
    inputSchema: AnalyzeStudentInteractionsInputSchema,
    outputSchema: AnalyzeStudentInteractionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
