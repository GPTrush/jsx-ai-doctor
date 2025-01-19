const { lintJSXCode } = require("../../index");

const jsxCode = `
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
`;

lintJSXCode(jsxCode).then(errors => {
  if (errors.length > 0) {
    console.log("Errors found:");
    console.log(errors);
  } else {
    console.log("No errors found.");
  }
});

