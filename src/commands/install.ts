import { Command } from 'commander';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import chalk from 'chalk';
import { copyRecursive } from '../utils/copy';
import moment from 'moment';


export const installCommand = new Command('install')
  .description('Install opencode configuration from repo')
  .option('-f, --force', 'Overwrite existing files')
  .option('--dry-run', 'Simulate without copying files')
  .option('-v, --verbose', 'Show copy details')
  .action((options) => {
    const HOME = os.homedir();

    // * Target directory for opencode
    const targetDir = path.join(HOME, '.config', 'opencode');

    // * Templates folder inside dist
    const sourceDir = path.join(__dirname, '../templates/opencode');

    // * Create backup if config already exists
    if (fs.existsSync(targetDir)) {
      const dateStr = moment().format('YYYYMMDD-HHmm'); // desired format
      const backupDir = path.join(HOME, '.config', `backup_${dateStr}_opencode`);

      console.log(chalk.yellow(`⚠️ Backup detected. Copying previous config to ${backupDir}`));

      if (!options.dryRun) {
        fs.cpSync(targetDir, backupDir, { recursive: true });
      }

      console.log(chalk.green(`✅ Backup created`));
    }

    console.log(chalk.blue('📦 Installing opencode...\n'));

    // * Copy templates to destination
    copyRecursive(sourceDir, targetDir, options);

    console.log(chalk.green('\n✅ Installation completed'));
    console.log(chalk.gray(`📁 Location: ${targetDir}`));
  });