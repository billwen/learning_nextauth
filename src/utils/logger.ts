// https://stackoverflow.com/questions/11386492/accessing-line-number-in-v8-javascript-chrome-node-js

import { nanoid } from 'nanoid';

export const instanceId = nanoid(4);

const disabledDebug: Record<string, boolean> = {};

function extractFileName(filePath: string | undefined | null) {
  if (!filePath) {
    return '';
  }

  return filePath.split('/').pop();
}

function errorLog(fileName: string, msg: string, meta?: Record<string, number | string | boolean>) {
  const extractedFileName = extractFileName(fileName);
  if (!disabledDebug[extractedFileName]) {
    console.error(`[${new Date().toISOString()}|${instanceId}|${extractedFileName}] ${msg};`, meta ?? {});
  }
}

function infoLog(fileName: string, msg: string, meta?: Record<string, number | string | boolean>) {
  const extractedFileName = extractFileName(fileName);
  if (!disabledDebug[fileName]) {
    console.info(`[${new Date().toISOString()}|${instanceId}|${extractedFileName}] ${msg};`, meta ?? {});
  }
}

function warnLog(fileName: string, msg: string, meta?: Record<string, number | string | boolean>) {
  const extractedFileName = extractFileName(fileName);
  if (!disabledDebug[fileName]) {
    console.warn(`[${new Date().toISOString()}|${instanceId}|${extractedFileName}] ${msg};`, meta ?? {});
  }
}

function setFileDebug(fileName: string, enable: boolean) {
  if (enable) {
    delete disabledDebug[fileName];
  } else {
    disabledDebug[fileName] = true;
  }
}

const log = {
  error: errorLog,
  info: infoLog,
  warn: warnLog,
  setFileDebug,
};

export type Log = typeof log;

export default log;
