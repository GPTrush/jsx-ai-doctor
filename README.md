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

### Next.js Configuration

If you're using Next.js, you'll need to add the following configuration to your `next.config.js` to handle Node.js-specific modules:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't attempt to load these Node.js only modules on the client
      config.resolve.fallback = {
        fs: false,
        module: false,
        path: false,
      }
    }
    return config
  },
}

module.exports = nextConfig
```

---

## Usage

The library supports multiple environments:
- Browser-side (React/Next.js apps)
- Server-side (Node.js)

```javascript
const { analyzeJSX } = require('@gptrush/jsx-ai-doctor');

// Works in both browser and Node.js environments
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
2. Automatically detects the environment (browser vs Node.js)
3. In browser environments:
   - Uses a lightweight JSX parser for basic syntax validation
   - Provides simplified error messages
4. In Node.js environments:
   - Uses full ESLint capabilities
   - Provides detailed error messages with line/column information
5. Returns consistent error output format across environments

---

## Features

- **Multi-Environment Support**: Works seamlessly in both browser (React/Next.js) and Node.js environments
- **Adaptive Validation**: Uses appropriate validation strategy based on the runtime environment
- **Error Identification**: Quickly identifies issues in JSX code, including syntax and rule violations
- **LLM-Friendly Output**: Provides clear, human-readable error messages in a format optimized for feeding into language models
- **Standalone or Integrated Use**: Use it as a standalone NPM package or integrate it into your project for enhanced linting

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

