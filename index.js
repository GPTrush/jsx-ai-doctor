// Simplified browser-only JSX validator
async function analyzeJSXCode(jsxCode) {
  try {
    // Dynamic import of @babel/parser
    const { parse } = await import('@babel/parser');
    
    // Attempt to parse the code
    parse(jsxCode, {
      sourceType: 'module',
      plugins: ['jsx'],
      errorRecovery: true
    });
    
    return []; // No errors found
  } catch (error) {
    // Get the problematic line if location is available
    const lines = jsxCode.split('\n');
    const line = error.loc ? lines[error.loc.line - 1] : jsxCode;
    
    // Format the error message
    return [`${line}  <---- Error: ${error.message} in line ${error.loc?.line || 1}:${error.loc?.column || 0}`];
  }
}

// For backwards compatibility
const lintJSXCode = analyzeJSXCode;

// Export the functions
module.exports = {
  analyzeJSX: analyzeJSXCode,
  lintJSXCode
};