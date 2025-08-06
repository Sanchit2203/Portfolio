
/**
 * @fileoverview This file initializes and a new Genkit AI Action.
 */
import {genkit, Plugin} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {next} from '@genkit-ai/next';

const plugins: Plugin<any>[] = [next(), googleAI()];

if (!process.env.GENKIT_ENV || process.env.GENKIT_ENV === 'development') {
  // In a development environment, we provide a dev-only plugin that provides
  // a UI for viewing traces and registered Genkit entities.
  // Note: Dev UI has been removed to resolve module errors.
}

export const ai = genkit({
  plugins: plugins,
});
