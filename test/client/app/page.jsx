'use client';

import { analyzeJSX } from '@gptrush/jsx-ai-doctor';
import { useState } from 'react';

export default function TestPage() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const testCases = [
    {
      name: "Valid Component",
      code: `
const MyComponent = () => {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
};`
    },
    {
      name: "Invalid Syntax",
      code: `
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
`
    }
  ];

  const runTests = async () => {
    setIsLoading(true);
    const results = [];
    
    for (const test of testCases) {
      try {
        const errors = await analyzeJSX(test.code);
        results.push({
          name: test.name,
          errors,
          success: errors.length === 0
        });
      } catch (error) {
        results.push({
          name: test.name,
          errors: [error.message],
          success: false
        });
      }
    }
    
    setResults(results);
    setIsLoading(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>JSX AI Doctor - Client Test</h1>
      
      <button 
        onClick={runTests}
        disabled={isLoading}
        style={{
          padding: '10px 20px',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: isLoading ? 'wait' : 'pointer',
          opacity: isLoading ? 0.7 : 1
        }}
      >
        {isLoading ? 'Running Tests...' : 'Run Tests'}
      </button>

      {results.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          {results.map((result, index) => (
            <div 
              key={index}
              style={{
                marginBottom: '20px',
                padding: '15px',
                borderRadius: '5px',
                backgroundColor: result.success ? '#e6ffe6' : '#ffe6e6'
              }}
            >
              <h3>{result.name}</h3>
              <pre style={{ 
                backgroundColor: '#f5f5f5', 
                padding: '10px', 
                borderRadius: '5px' 
              }}>
                {result.errors.length > 0 
                  ? result.errors.join('\n') 
                  : 'No errors found'}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 