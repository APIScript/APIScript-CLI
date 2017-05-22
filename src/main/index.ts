#! /usr/bin/env node

import * as apiscript from 'apiscript';
import * as commander from 'commander';

import {Config} from 'apiscript';

commander
    .version("1.0.0")
    .option("-a, --api [file]", "The api to generate")
    .option("-g, --generator [name]", "The generator to use")
    .option("-l, --list", "List all available generators")
    .parse(process.argv);

let config: Config = {};
config.apiscript = commander;

apiscript.run(config);