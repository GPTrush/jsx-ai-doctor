// Import ESLint differently based on environment
const getESLintImplementation = () => {
  if (typeof window !== 'undefined') {
    // Browser environment - use a simplified validation approach
    return Promise.resolve({
      lintText: async (code) => {
        const errors = [];
        
        // Basic JSX validation
        try {
          // Check for basic syntax errors
          const parser = require('@babel/parser');
          parser.parse(code, {
            sourceType: 'module',
            plugins: ['jsx']
          });
        } catch (error) {
          errors.push({
            messages: [{
              severity: 2,
              line: error.loc?.line || 1,
              column: error.loc?.column || 0,
              message: error.message
            }]
          });
        }
        
        return errors;
      }
    });
  } else {
    // Node.js environment - use full ESLint
    return Promise.resolve(require('eslint').ESLint);
  }
};

async function analyzeJSXCode(jsxCode) {
  try {
    const ESLint = await getESLintImplementation();
    const codeLines = jsxCode.split("\n");
    
    // Initialize ESLint based on environment
    const eslint = typeof window !== 'undefined' 
      ? ESLint  // Browser environment - use simplified linter
      : new ESLint({  // Node.js environment - use full ESLint
          fix: false,
          overrideConfig: {
            languageOptions: {
              ecmaVersion: 2020,
              sourceType: "module",
              globals: {
                window: 'readonly',
                document: 'readonly',
                navigator: 'readonly',
                console: 'readonly'
              },
              parserOptions: {
                ecmaFeatures: { jsx: true }
              }
            },
            linterOptions: {
              reportUnusedDisableDirectives: true,
            },
            rules: {},
            settings: {
              react: { version: 'detect' }
            }
          }
        });

    // Lint the code and format results consistently
    const results = await eslint.lintText(jsxCode);
    
    return results
      .flatMap(result => result.messages.filter(message => message.severity === 2))
      .map(message => {
        const line = codeLines[message.line - 1];
        const errorLocation = typeof window !== 'undefined' 
          ? ''  // Browser environment - simpler error message
          : ` in line ${message.line}:${message.column}`;
        return `${line}  <---- Error: ${message.message}${errorLocation}`;
      });
      
  } catch (error) {
    console.error('ESLint initialization error:', error);
    return [`Error initializing ESLint: ${error.message}`];
  }
}

// For backwards compatibility
const lintJSXCode = analyzeJSXCode;

module.exports = { analyzeJSX: analyzeJSXCode, lintJSXCode };

