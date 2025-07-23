// src/ai/flows/meditation-playlist.ts
'use server';
/**
 * @fileOverview Meditation playlist generation AI agent.
 *
 * - generateMeditationPlaylist - A function that handles the meditation playlist generation process.
 * - GenerateMeditationPlaylistInput - The input type for the generateMeditationPlaylist function.
 * - GenerateMeditationPlaylistOutput - The return type for the generateMeditationPlaylist function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMeditationPlaylistInputSchema = z.object({
  meditationCategories: z
    .string()
    .describe("A comma separated list of meditation categories the user prefers, such as 'Sleep', 'Calm', and 'Focus'."),
  trackList: z.string().describe('A list of meditation tracks available in the app.'),
});
export type GenerateMeditationPlaylistInput = z.infer<typeof GenerateMeditationPlaylistInputSchema>;

const GenerateMeditationPlaylistOutputSchema = z.object({
  playlist: z
    .string()
    .describe('A comma separated list of meditation tracks recommended for the user.'),
});
export type GenerateMeditationPlaylistOutput = z.infer<typeof GenerateMeditationPlaylistOutputSchema>;

export async function generateMeditationPlaylist(input: GenerateMeditationPlaylistInput): Promise<GenerateMeditationPlaylistOutput> {
  return generateMeditationPlaylistFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMeditationPlaylistPrompt',
  input: {schema: GenerateMeditationPlaylistInputSchema},
  output: {schema: GenerateMeditationPlaylistOutputSchema},
  prompt: `You are a meditation playlist generator. You will take the track list, filter it to include only those relevant to the provided categories, and return the result.

  Categories: {{{meditationCategories}}}
  Track List: {{{trackList}}}
  `,
});

const generateMeditationPlaylistFlow = ai.defineFlow(
  {
    name: 'generateMeditationPlaylistFlow',
    inputSchema: GenerateMeditationPlaylistInputSchema,
    outputSchema: GenerateMeditationPlaylistOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
