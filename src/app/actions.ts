
'use server';

import { generateResumeSummary, GenerateResumeSummaryInput } from '@/ai/flows/resume-summary-generator';

interface ActionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function generateResumeSummaryAction(
  input: GenerateResumeSummaryInput
): Promise<ActionResult<{ summary: string }>> {
  try {
    const result = await generateResumeSummary(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error generating resume summary:', error);
    // Return a generic error message to the client for security
    return { success: false, error: 'An unexpected error occurred. Please try again.' };
  }
}
