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

```javascript
const { lintJSXCode } = require('@gptrush/jsx-ai-doctor');

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

lintJSXCode(jsxCode).then(errors => {
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

1. Takes JSX code as a string input.
2. Uses ESLint to parse and analyze the code.
3. Outputs:
   - A list of issues with contextual messages formatted for LLMs.
   - The corrected version of the code (if auto-fixable).

---

## Features

- **Error Identification**: Quickly identifies issues in JSX code, including syntax and rule violations.
- **LLM-Friendly Output**: Provides clear, human-readable error messages in a format optimized for feeding into language models.
- **Standalone or Integrated Use**: Use it as a standalone NPM package or integrate it into your project for enhanced linting.

---

## Why Use This Library?

AI-generated code often contains syntax errors, making it challenging to debug and resolve issues manually. If you're building a Bug Fixing Agent, you need a reliable way to extract and present errors in a format that an LLM can process effectively. `jsx-ai-doctor` bridges this gap by:

1. Identifying syntax issues with precision.
2. Formatting errors in a clean, structured manner that can be directly passed to an LLM.
3. Offering insights into how to correct errors and auto-fix code when possible.

---

## API Reference

### `analyzeJSX(code: string): Array<string>`

- **Description**: Analyzes the given JSX code and returns an array of error messages.
- **Parameters**: 
  - `code` (string): The JSX code to analyze.
- **Returns**: An array of strings, each describing an issue found in the code with its context.

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

We’d love to hear your thoughts! Feel free to open an issue or reach out to us on [GitHub](https://github.com/gptrush/jsx-ai-doctor).

---

Happy Coding! 🚀

