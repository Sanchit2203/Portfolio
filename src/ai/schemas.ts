/**
 * @fileOverview This file contains the Zod schemas and TypeScript types for the AI flows.
 * Separating schemas into their own file is necessary to avoid issues with
 * Next.js server-side component restrictions, which only allow async functions
 * to be exported from files marked with 'use server'.
 *
 * - GenerateResumeSummaryInputSchema, GenerateResumeSummaryInput
 * - GenerateResumeSummaryOutputSchema, GenerateResumeSummaryOutput
 */

import { z } from 'zod';

// Schema for the input to the resume summary generation flow.
export const GenerateResumeSummaryInputSchema = z.object({
  resumeText: z.string().describe('The full text content of a resume.'),
});
export type GenerateResumeSummaryInput = z.infer<typeof GenerateResumeSummaryInputSchema>;

// Schema for the output of the resume summary generation flow.
export const GenerateResumeSummaryOutputSchema = z.object({
  summary: z.string().describe('A 2-3 sentence professional summary based on the resume.'),
});
export type GenerateResumeSummaryOutput = z.infer<typeof GenerateResumeSummaryOutputSchema>;
