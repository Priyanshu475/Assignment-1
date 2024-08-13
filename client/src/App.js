import React from 'react';
import CreateRule from './components/CreateRule';
import CombineRules from './components/CombineRules';
import EvaluateRule from './components/EvaluateRule';

function App() {
  return (
    <div className="app-container">
    <h1>Rule Engine with AST</h1>
    <div className="components-container">
      <CreateRule />
      <CombineRules />
      <EvaluateRule />
    </div>
  </div>
  );
}

export default App;