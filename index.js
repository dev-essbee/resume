#!/usr/bin/env node
'use strict';

const inquirer = require('inquirer');
const chalk = require('chalk');

const posResponse = chalk.bold.green;
const negResponse = chalk.redBright;

const resumeData = require('./resume-data.json');

const backPrompt = {
  type: 'list',
  name: 'answer',
  message: 'Go Back or Exit?',
  choices: ['Back', 'Exit'],
};

const proceedPrompt = {
  type: 'list',
  name: 'answer',
  message: 'What would you like to know today?',
  choices: [...Object.keys(resumeData), 'Exit'],
};

function main() {
  console.log('Hello, My name is' + chalk.yellow(' Shubham Bhandari') +
    ' and this is my resume.');
  resumeHandler();
}

function exit() {
  console.log(chalk.bold.red('Good Bye! Hope to see you soon.'));
  return;
}

function resumeHandler() {
  inquirer.prompt(proceedPrompt).then((choice) => {
    if (choice.answer == 'Exit') {
      exit();
      return;
    }

    console.log(posResponse('-----------------------------------------------' +
      '---\n'));

    let i = 0;
    resumeData[`${choice.answer}`].forEach((data) => {
      if (data == '\n') {
        i = 0;
        console.log();
      } else if (i == 0) {
        console.log(chalk.bold.cyan('~ ' + data));
        i += 1;
      } else if (i == 1) {
        console.log(chalk.bold.yellow('// ' + data));
        i += 1;
      } else {
        console.log('/ ' + data);
      }
    });

    if (choice.answer == 'About Me') {
      console.log('\nAt last: ' + chalk.bold.yellow('Programming' +
        ' is a SuperPower.'));
    }
    console.log(negResponse('\n--------------------------------------'
      + '------------'));

    inquirer.prompt(backPrompt).then((choice) => {
      if (choice.answer == 'Back') {
        resumeHandler();
      } else {
        exit();
        return;
      }
    });
  });
}

main();
