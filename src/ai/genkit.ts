
/**
 * @fileoverview This file initializes and a new Genkit AI Action.
 */
import {genkit, Plugin} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {next} from '@genkit-ai/next';
import {firebase} from '@genkit-ai/firebase';

const plugins: Plugin<any>[] = [next(), firebase(), googleAI()];

if (!process.env.GENKIT_ENV || process.env.GENKIT_ENV === 'development') {
  // In a development environment, we devide a dev-only plugin that provides
  // a UI for viewing traces and registered Genkit entities.
  const {dev} = await import('genkit/dev');
  plugins.push(dev());
}

export const ai = genkit({
  plugins: plugins,
});
