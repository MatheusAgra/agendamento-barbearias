import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

function git(...args) {
  return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
}

try {
  const options = new Map();
  const args = process.argv.slice(2);

  for (let index = 0; index < args.length; index += 2) {
    const key = args[index];
    const value = args[index + 1];
    if (!['--branch', '--ref'].includes(key) || !value || value.startsWith('-') || options.has(key)) {
      throw new Error('Uso: node scripts/check-reference-policy.mjs [--branch nome] [--ref revisão]');
    }
    options.set(key, value);
  }

  // --branch indica o destino da integração, mesmo quando a revisão está sem linha local.
  const branch = options.get('--branch') ?? git('branch', '--show-current').trim();
  if (!branch) {
    throw new Error('Informe --branch quando a revisão não estiver em uma linha de trabalho local.');
  }

  if (branch !== 'main') {
    console.log(`Referências permitidas em ${branch}.`);
  } else {
    const ref = options.get('--ref');
    const paths = ref
      ? git('ls-tree', '-r', '--name-only', '-z', ref, '--', 'references')
      : git('ls-files', '-z', '--cached', '--others', '--', 'references');
    const root = git('rev-parse', '--show-toplevel').trim();
    const localDirectoryExists = !ref && existsSync(join(root, 'references'));

    if (paths.length > 0 || localDirectoryExists) {
      throw new Error('A main não pode conter references/. Preserve a pasta em develop e retire-a da revisão destinada à main.');
    }

    console.log(`Política atendida: references/ ausente ${ref ? `na revisão ${ref}` : 'dos arquivos locais da main'}.`);
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : 'Não foi possível verificar a política de referências.');
  process.exitCode = 1;
}
