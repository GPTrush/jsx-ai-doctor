// Simplified browser-only JSX validator
async function analyzeJSXCode(jsxCode) {
  try {
    // Dynamic import of @babel/parser
    const { parse } = await import('@babel/parser');
    
    // Attempt to parse the code
    parse(jsxCode, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
      errorRecovery: true
    });
    
    return ''; // No errors found
  } catch (error) {
    // Get the problematic line and surrounding context if location is available
    const lines = jsxCode.split('\n');
    let contextLines = '';
    
    if (error.loc) {
      const lineNum = error.loc.line - 1;
      const prevLine = lineNum > 0 ? `${lineNum}: ${lines[lineNum - 1]}\n` : '';
      const errorLine = `${lineNum + 1}: ${lines[lineNum]} `;
      const errorPointer = '<---- Error: ' + 
                          error.message.replace(/\s*\(\d+:\d+\)\s*$/, '') + 
                          ` (${error.loc.line}:${error.loc.column})\n`;
      const nextLine = lineNum < lines.length - 1 ? `${lineNum + 2}: ${lines[lineNum + 1]}` : '';
      contextLines = `${prevLine}${errorLine}${errorPointer}${nextLine}`;
    } else {
      return `Error: ${error.message}`; // Fallback for errors without location
    }
    
    return contextLines;
  }
}

// For backwards compatibility
const lintJSXCode = analyzeJSXCode;

// Export the functions
module.exports = {
  analyzeJSX: analyzeJSXCode,
  lintJSXCode
};