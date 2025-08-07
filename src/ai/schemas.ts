
import {z} from 'zod';

/**
 * @fileoverview Defines the data schemas for AI-related operations.
 *
 * This file contains the Zod schemas for validating inputs and outputs
 * of Genkit flows, ensuring type safety and data consistency.
 */

export const GenerateResumeSummaryInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The full text content of the resume to be summarized.'),
});

export type GenerateResumeSummaryInput = z.infer<
  typeof GenerateResumeSummaryInputSchema
>;

export const GenerateResumeSummaryOutputSchema = z.object({
  summary: z
    .string()
    .describe('The generated professional summary for the resume.'),
});

export type GenerateResumeSummaryOutput = z.infer<
  typeof GenerateResumeSummaryOutputSchema
>;
