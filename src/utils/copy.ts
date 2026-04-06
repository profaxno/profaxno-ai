import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';

type Options = {
  force?: boolean;
  dryRun?: boolean;
  verbose?: boolean;
};

export function copyRecursive(src: string, dest: string, options: Options) {
  if (!fs.existsSync(src)) return;

  const stats = fs.statSync(src);

  if (stats.isDirectory()) {
    if (!fs.existsSync(dest) && !options.dryRun) {
      fs.mkdirSync(dest, { recursive: true });
    }
    if (options.verbose) console.log(chalk.gray(`📁 Crear carpeta: ${dest}`));

    const files = fs.readdirSync(src);
    for (const file of files) {
      copyRecursive(path.join(src, file), path.join(dest, file), options);
    }
  } else {
    if (fs.existsSync(dest) && !options.force) {
      if (options.verbose) console.log(chalk.yellow(`⚠️ Existe: ${dest} (omitido)`));
      return;
    }

    if (!options.dryRun) {
      fs.copyFileSync(src, dest);
    }

    if (options.verbose) console.log(chalk.green(`✔ Copiado: ${dest}`));
  }
}