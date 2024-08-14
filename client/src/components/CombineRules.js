// components/CombineRules.js
import React, { useState } from 'react';
import { generateTreeHTML } from '../utils/treeUtils';

function CombineRules() {
  const [rules, setRules] = useState(['']);
  const [operators, setOperators] = useState(['AND']);
  const [result, setResult] = useState('');

  const addRule = () => {
    setRules([...rules, '']);
    setOperators([...operators, 'AND']);
  };

  const handleRuleChange = (index, value) => {
    const newRules = [...rules];
    newRules[index] = value;
    setRules(newRules);
  };

  const handleOperatorChange = (index, value) => {
    const newOperators = [...operators];
    newOperators[index] = value;
    setOperators(newOperators);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/rules/combine_rules`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rules, op: operators[0] }),
    });
    const data = await response.json();
    let treeHTML = generateTreeHTML(data.ruleAST);
    treeHTML += `<br><p>Rule Name: ${data.ruleName}</p>`;
    setResult(treeHTML);
  };

  return (
    <div>
      <h2>Combine Rules</h2>
      <form onSubmit={handleSubmit}>
        <h4>Enter Rules to Combine (i.e - Rule-1 AND Rule-2)</h4>
        {rules.map((rule, index) => (
          <div key={index} className="rule-container">
            <label htmlFor={`combine-rule${index + 1}`}>Rule:</label>
            <input
              type="text"
              id={`combine-rule${index + 1}`}
              value={rule}
              onChange={(e) => handleRuleChange(index, e.target.value)}
              required
            />
            {index < rules.length - 1 && (
              <>
                <label htmlFor={`operator${index + 1}`}>Operator:</label>
                <select
                  id={`operator${index + 1}`}
                  value={operators[index]}
                  onChange={(e) => handleOperatorChange(index, e.target.value)}
                >
                  <option value="AND">AND</option>
                  <option value="OR">OR</option>
                </select>
              </>
            )}
          </div>
        ))}
        <button type="button" onClick={addRule}>Add Another Rule</button>
        <button type="submit">Combine Rules</button>
      </form>
      <pre dangerouslySetInnerHTML={{ __html: result }}></pre>
    </div>
  );
}

export default CombineRules;