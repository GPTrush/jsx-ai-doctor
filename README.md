# jsx-ai-doctor

Built with ❤️ by Team [GPTrush.io](https://gptrush.io)

## Installation

Install the package using npm or yarn:

```bash
npm install @gptrush/jsx-ai-doctor
```

or

```bash
yarn add @gptrush/jsx-ai-doctor
```
---

## Usage

The library currently supports client-side environments only:
- React applications
- Next.js applications (with 'use client' directive)

```javascript
const { analyzeJSX } = require('@gptrush/jsx-ai-doctor');

// Example usage in a client component
const code = `
function Example() {
  return (
    <div>
      <h1>Hello World</h1>
      <p>This is a JSX example</p>
    </div>
  );
}
`;

analyzeJSX(code).then(errors => {
  if (errors.length > 0) {
    console.log("Errors found:");
    console.log(errors);
  } else {
    console.log("No errors found.");
  }
});
```

---

## Example Output

For a given JSX code snippet:

```jsx
const MyComponent = () => {
    const [signatures, setSignatures] = useState(
      {
        id: 1,
        name: 'Default Signature',
        content: '',
        isDefault: true,
      },]
    );
    return (
      <div>
        <h1>Hello, World!</h1>
      </div>
    );
  };
```

The output would look like:

```
[
  '      },]\n  <---- Error: Parsing error: Unexpected token ] in line 9:9'
]
```

---

## How It Works

1. Takes JSX code as a string input
2. Uses @babel/parser for lightweight JSX syntax validation
3. Returns clear error messages with line/column information
4. Optimized for client-side performance

---

## Features

- **Lightweight**: Minimal dependencies for optimal bundle size
- **Client-Side Focused**: Optimized for browser environments
- **Error Identification**: Quickly identifies JSX syntax issues
- **LLM-Friendly Output**: Provides clear, human-readable error messages
- **Zero Configuration**: Works out of the box with React and Next.js

---

## Why Use This Library?

AI-generated code often contains syntax errors, making it challenging to debug and resolve issues manually. If you're building a Bug Fixing Agent, you need a reliable way to extract and present errors in a format that an LLM can process effectively. `jsx-ai-doctor` bridges this gap by:

1. Identifying syntax issues with precision.
2. Formatting errors in a clean, structured manner that can be directly passed to an LLM.
3. Offering insights into how to correct errors and auto-fix code when possible.

---

## API Reference

### `analyzeJSX(code: string): Promise<Array<string>>`

- **Description**: Analyzes the given JSX code and returns an array of error messages
- **Parameters**: 
  - `code` (string): The JSX code to analyze
- **Returns**: A Promise resolving to an array of strings, each describing an issue found in the code with its context
- **Environment Behavior**:
  - Browser: Provides basic syntax validation with simplified error messages
  - Node.js: Provides full ESLint validation with detailed error location information

Example:

```javascript
const errors = analyzeJSX('<div><h1>Hello World</h1>');
console.log(errors);
// Output: [
//   "<div><h1>Hello World</h1> <---- Error: Missing closing tag for <div> in line 1:1"
// ]
```

---

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed description of your changes.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Feedback

We'd love to hear your thoughts! Feel free to open an issue or reach out to us on [GitHub](https://github.com/gptrush/jsx-ai-doctor).

---

Happy Coding! 🚀

## Future Work

1. **Node.js Support**: 
   - Add comprehensive ESLint-based validation for Node.js environments
   - Implement detailed rule configurations
   - Support for custom ESLint plugins and rules

2. **Enhanced Validation**:
   - Add React-specific best practices validation
   - Support for TypeScript validation
   - Custom rule configurations

3. **Performance Optimizations**:
   - Caching mechanisms for repeated validations
   - Incremental parsing for large files

4. **Additional Features**:
   - Auto-fix capabilities
   - Integration with popular IDEs
   - Custom rule creation

