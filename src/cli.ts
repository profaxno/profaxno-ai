#!/usr/bin/env node

import { Command } from 'commander';
import { installCommand } from './commands/install';

const program = new Command();

program
  .name('profaxno-ai')
  .description('CLI to install opencode configuration from repo')
  .version('1.0.0');

program.addCommand(installCommand);

program.parse(process.argv);