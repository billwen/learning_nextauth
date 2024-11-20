// https://stackoverflow.com/questions/11386492/accessing-line-number-in-v8-javascript-chrome-node-js

import { nanoid } from 'nanoid';

export const instanceId = nanoid(4);

const disabledDebug: Record<string, boolean> = {};

function getStack() {
  const orig = Error.prepareStackTrace;
  Error.prepareStackTrace = (_, stack) => stack;
  const err = new Error();
  Error.captureStackTrace(err, arguments.callee);
  const stack = err.stack;
  Error.prepareStackTrace = orig;
  return stack;
}

function getLineNumber() {
  return 0;
}

function errorLog(fileName: string, msg: string, meta?: Record<string, number | string | boolean>) {
  if (!disabledDebug[fileName]) {
    console.error(`[${new Date().toISOString}|${instanceId}|${fileName}] ${msg};`, meta);
  }
}

function infoLog(fileName: string, msg: string, meta?: Record<string, number | string | boolean>) {
  if (!disabledDebug[fileName]) {
    console.info(`[${new Date().toISOString}|${instanceId}|${fileName}] ${msg};`, meta);
  }
}

function warnLog(fileName: string, msg: string, meta?: Record<string, number | string | boolean>) {
  if (!disabledDebug[fileName]) {
    console.warn(`[${new Date().toISOString}|${instanceId}|${fileName}] ${msg};`, meta);
  }
}

function setFileDebug(fileName: string, enable: boolean) {
  if (enable) {
    delete disabledDebug[fileName];
  } else {
    disabledDebug[fileName] = true;
  }
}

function enableLineDebug() {
  Object.defineProperty(global, '__stack', {
    get: getStack,
  });

  Object.defineProperty(global, '__line', {
    get: getLineNumber,
  });
}

const log = {
  error: errorLog,
  info: infoLog,
  warn: warnLog,
  setFileDebug,
  enableLineDebug,
};

export type Log = typeof log;

export default log;
