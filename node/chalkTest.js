/**
 * Created by sli on 12/6/2017.
 */

const chalk = require('chalk');
const log = console.log;

//https://github.com/chalk/chalk
log(chalk.bold.blue("I am blue!"))
log(chalk.blue.bgRed.bold("I am blue!"))
log(chalk.red("I am red!", chalk.underline.bgBlue(' abc')))
log(chalk.black("I am green!", chalk.underline.bgBlue(' abc')))
