const vorpal = require('vorpal')();

vorpal.command('say [words...]')
  .action(function (args, callback) {
    this.log(args.words.join(' '));
    callback();
  });

vorpal.command('reverse [words...]')
  .action(function (args, callback) {
    this.log(args.stdin.split('').reverse().join(''));
    callback();
  });

vorpal.command('color [color] [text...]')
  .action(function (args, callback) {
    this.log(vorpal.chalk[args.color](args.stdin));
    callback();
  });

vorpal.delimiter('pipe$').show();