#!/usr/bin/env node

import minimist from "minimist";
import { MemoController } from "./memo-controller.js";

const args = minimist(process.argv.slice(2));
new MemoController().execute(args);
