import React, { useState } from 'react';
import { generateTreeHTML } from '../utils/treeUtils';

function CreateRule() {
  const [ruleName, setRuleName] = useState('');
  const [ruleString, setRuleString] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/rules/create_rule`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ruleName, ruleString }),
    });
    const data = await response.json();
    let treeHTML = generateTreeHTML(data.ruleAST);
    treeHTML += `<br><p>Rule Name: ${data.ruleName}</p>`;
    setResult(treeHTML);
  };

  return (
    <div>
      <h2>Create Rule</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ruleName">Rule Name:</label>
          <input
            type="text"
            id="ruleName"
            value={ruleName}
            onChange={(e) => setRuleName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="ruleString">Rule:</label>
          <input
            type="text"
            id="ruleString"
            value={ruleString}
            onChange={(e) => setRuleString(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Rule</button>
      </form>
      <pre dangerouslySetInnerHTML={{ __html: result }}></pre>
    </div>
  );
}

export default CreateRule;