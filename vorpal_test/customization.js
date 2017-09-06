const Vorpal = require('vorpal');
const chalk = Vorpal().chalk;

const unicorns = Vorpal()
    .delimiter(chalk.magenta('unicorn-land~$'))
    .help(require('./unicorn-help.js'))
    .use(require('./unicorn-commands'))
    .history('unicorn-command-history');

const narwhals = Vorpal()
    .delimiter(chalk.cyan('narwhal-land~$'))
    .help(require('./narwhal-help.js'))
    .use(require('./narwhal-commands'))
    .history('narwhal-command-history');

// One does not exit a magical land!
unicorns
  .find('exit')
  .remove();

unicorns
  .show()
  .parse(process.argv);

vorpal.delimiter('$').show();