/**
 * @fileoverview This file configures and initializes the Genkit AI platform.
 *
 * It sets up the necessary plugins for the application, such as Google AI for generative models.
 * The exported `ai` object is the central point for interacting with Genkit's capabilities.
 */
'use server';

import {genkit, Plugin} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

const plugins: Plugin<any>[] = [googleAI()];

if (process.env.NODE_ENV === 'development') {
  // In a development environment, we provide a dev-only plugin that provides
  // a UI for viewing traces and registered Genkit entities.
  // const {dev} = await import('genkit/dev');
  // plugins.push(dev());
}

export const ai = genkit({
  plugins,
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
