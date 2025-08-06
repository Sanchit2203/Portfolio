
'use server';
/**
 * @fileOverview A flow to generate a resume summary.
 *
 * - generateResumeSummary - A function that generates a resume summary.
 */

import {ai} from '@/ai/genkit';
import { 
  GenerateResumeSummaryInputSchema, 
  GenerateResumeSummaryOutputSchema,
  type GenerateResumeSummaryInput,
  type GenerateResumeSummaryOutput
} from '@/ai/schemas';


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
