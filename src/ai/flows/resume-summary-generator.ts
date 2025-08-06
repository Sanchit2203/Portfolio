
'use server';
/**
 * @fileOverview A flow to generate a resume summary.
 *
 * - generateResumeSummary - A function that generates a resume summary.
 * - GenerateResumeSummaryInput - The input type for the generateResumeSummary function.
 * - GenerateResumeSummaryOutput - The return type for the generateResumeSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const GenerateResumeSummaryInputSchema = z.object({
  resumeText: z.string().describe('The full text content of a resume.'),
});
export type GenerateResumeSummaryInput = z.infer<typeof GenerateResumeSummaryInputSchema>;

export const GenerateResumeSummaryOutputSchema = z.object({
  summary: z.string().describe('A 2-3 sentence professional summary based on the resume.'),
});
export type GenerateResumeSummaryOutput = z.infer<typeof GenerateResumeSummaryOutputSchema>;

const resumePrompt = ai.definePrompt({
    name: 'resumeSummaryPrompt',
    input: { schema: GenerateResumeSummaryInputSchema },
    output: { schema: GenerateResumeSummaryOutputSchema },
    prompt: `You are an expert resume writer. Based on the following resume text, create a compelling and professional 2-3 sentence summary that highlights the candidate's key skills, experiences, and qualifications.

Resume Text:
{{{resumeText}}}
`,
});


const resumeSummaryFlow = ai.defineFlow(
  {
    name: 'generateResumeSummaryFlow',
    inputSchema: GenerateResumeSummaryInputSchema,
    outputSchema: GenerateResumeSummaryOutputSchema,
  },
  async (input) => {
    const { output } = await resumePrompt(input);
    return output!;
  }
);

export async function generateResumeSummary(
  input: GenerateResumeSummaryInput
): Promise<GenerateResumeSummaryOutput> {
  return await resumeSummaryFlow(input);
}
