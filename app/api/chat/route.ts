import { streamText } from 'ai';
import { TRANSLATE_SYSTEM_PROMPT, GENERATE_SYSTEM_PROMPT } from '@/lib/prompts';

export const maxDuration = 60;

export async function POST(req: Request) {
  const { prompt, mode, model } = await req.json();

  const systemPrompt =
    mode === 'generate' ? GENERATE_SYSTEM_PROMPT : TRANSLATE_SYSTEM_PROMPT;

  const result = streamText({
    model: model || process.env.DEFAULT_MODEL || 'minimax/minimax-m2.5',
    system: systemPrompt,
    prompt,
    temperature: 0.85,
  });

  return result.toTextStreamResponse();
}
