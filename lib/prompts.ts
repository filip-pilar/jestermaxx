import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const TRANSLATE_SYSTEM_PROMPT = readFileSync(
  join(process.cwd(), 'lib', 'translate.md'),
  'utf-8'
);

export const GENERATE_SYSTEM_PROMPT = readFileSync(
  join(process.cwd(), 'lib', 'generate.md'),
  'utf-8'
);
