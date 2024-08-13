import React, { useState } from 'react';

function EvaluateRule() {
  const [ast, setAst] = useState('');
  const [data, setData] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/api/rules/evaluate_rule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ast, data: JSON.parse(data) }),
    });
    const responseData = await response.json();
    setResult(JSON.stringify(responseData, null, 2));
  };

  return (
    <div>
      <h2>Evaluate Rule</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="evaluate-ast">Rule Name:</label>
          <input
            type="text"
            id="evaluate-ast"
            value={ast}
            onChange={(e) => setAst(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="evaluate-data">Data JSON:</label>
          <textarea
            id="evaluate-data"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Evaluate Rule</button>
      </form>
      <pre>{result}</pre>
    </div>
  );
}

export default EvaluateRule;