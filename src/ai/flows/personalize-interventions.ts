'use server';

/**
 * @fileOverview AI flow to suggest personalized interventions or activities based on student engagement patterns.
 *
 * - personalizeInterventions - A function that suggests personalized interventions.
 * - PersonalizeInterventionsInput - The input type for the personalizeInterventions function.
 * - PersonalizeInterventionsOutput - The return type for the personalizeInterventions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizeInterventionsInputSchema = z.object({
  studentId: z.string().describe('The ID of the student.'),
  engagementData: z.string().describe('Student engagement data, e.g., forum activity, module progress.'),
  learningStyle: z.string().optional().describe('The learning style of the student.'),
});
export type PersonalizeInterventionsInput = z.infer<typeof PersonalizeInterventionsInputSchema>;

const PersonalizeInterventionsOutputSchema = z.object({
  interventionType: z.string().describe('The type of intervention suggested (e.g., personalized feedback, activity suggestion).'),
  interventionDetails: z.string().describe('Detailed description of the suggested intervention, tailored to the student.'),
});
export type PersonalizeInterventionsOutput = z.infer<typeof PersonalizeInterventionsOutputSchema>;

export async function personalizeInterventions(input: PersonalizeInterventionsInput): Promise<PersonalizeInterventionsOutput> {
  return personalizeInterventionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizeInterventionsPrompt',
  input: {schema: PersonalizeInterventionsInputSchema},
  output: {schema: PersonalizeInterventionsOutputSchema},
  prompt: `You are an AI assistant that helps educators by suggesting personalized interventions for students based on their engagement data.

  Student ID: {{{studentId}}}
  Engagement Data: {{{engagementData}}}
  Learning Style: {{{learningStyle}}}

  Based on this information, suggest an appropriate intervention or activity to boost the student's participation. Be specific and tailor the suggestion to the student's needs and learning style, if available. Explain why you're suggesting the intervention and what the expected outcome is.
  Format your response to match the schema description.
  `,
});

const personalizeInterventionsFlow = ai.defineFlow(
  {
    name: 'personalizeInterventionsFlow',
    inputSchema: PersonalizeInterventionsInputSchema,
    outputSchema: PersonalizeInterventionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
