import { config } from 'dotenv';
config();

import '@/ai/flows/meditation-playlist.ts';
import '@/app/api/genkit/[...slug]/route';
