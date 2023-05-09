import { CliCommandInterface } from './cli-command.interface.js';
import chalk from 'chalk';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    /*console.log(`
        Программа для подготовки данных для REST API сервера.
        Пример:
            main.js --<command> [--arguments]
        Команды:
            --version:                   # выводит номер версии
            --help:                      # печатает этот текст
            --import <path>:             # импортирует данные из TSV
            --generate <n> <path> <url>  # генерирует произвольное количество тестовых данных
        `);*/
    console.log(chalk.green('Программа для подготовки данных для REST API сервера.'));
    console.log(chalk.yellow('Пример:'));
    console.log(chalk.blue('  main.js --<command> [--arguments]'));
    console.log(chalk.yellow('Команды:'));
    console.log(chalk.blue('  --version:                   # выводит номер версии'));
    console.log(chalk.blue('  --help:                      # печатает этот текст'));
    console.log(chalk.blue('  --import <path>:             # импортирует данные из TSV'));
    console.log(chalk.blue('  --generate <n> <path> <url>  # генерирует произвольное количество тестовых данных'));
  }
}
