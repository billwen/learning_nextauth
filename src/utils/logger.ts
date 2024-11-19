// https://stackoverflow.com/questions/11386492/accessing-line-number-in-v8-javascript-chrome-node-js

export const instanceId = nanoid(8);

Object.defineProperty(global, '__stack', {
    get: function(){
      var orig = Error.prepareStackTrace;
      Error.prepareStackTrace = function(_, stack){ return stack; };
      var err = new Error;
      Error.captureStackTrace(err, arguments.callee);
      var stack = err.stack;
      Error.prepareStackTrace = orig;
      return stack;
    }
  });
  
  Object.defineProperty(global, '__line', {
    get: function(){
      return __stack[1].getLineNumber();
    }
  });
  
  console.log(__line);

function errorLog(fileName: string, msg: string, meta?: Record<string, number | string | boolean>) {
    console.error(`[${fileName} ${msg}`, meta);
}