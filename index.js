const { ESLint } = require("eslint");

async function lintJSXCode(jsxCode) {
  const eslint = new ESLint({ fix: false }); // Don't auto-fix
  const results = await eslint.lintText(jsxCode);
  const codeLines = jsxCode.split("\n");


  
  /*results.forEach(result => {
    result.messages?.forEach(message => {
      console.log(message);
    });
  });*/

  // Filter and return only errors (ignoring warnings)
  const errors = results
  .flatMap(result => result.messages.filter(message => message.severity === 2)) // Filter only errors (severity 2)
  .map(message => {
    const line = codeLines[message.line - 1]; // Get the corresponding line of code
    const arrow = "  <---- Error: " + message.message + ` in line ${message.line}:${message.column}`;
    return `${line}\n${arrow}`;
  });

  return errors;
}

module.exports = { lintJSXCode };

