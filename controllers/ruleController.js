const Rule = require('../models/Rule');
const { parseRuleString, combineNodes, evaluate, printTree } = require('../utils/ruleUtils');


/**
 * Generates a random string of specified length using uppercase and lowercase letters.
 * Uses Math.random() for character selection.
 * @param {number} length - The desired length of the random string
 * @return {string} A random string of letters
 */
function generateRandomLetterString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const charactersLength = characters.length;
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return result;
}


/**
 * Creates a new rule in the database.
 * Parses the rule string into an AST, saves it, and returns the created rule.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {Object} JSON response with created rule or error
 */
createRule = async (req, res) => {
  try {
    const { ruleName, ruleString } = req.body;
    if (!ruleName || !ruleString) {
      return res.status(400).json({ error: 'Both ruleName and ruleString are required' });
    }
    const rootNode = parseRuleString(ruleString);
    const rule = new Rule({ ruleName, ruleAST: rootNode });
    await rule.save();
    printTree(rootNode);
    res.status(201).json(rule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/**
 * Combines multiple existing rules into a new rule.
 * Fetches rules from the database, combines their ASTs, and saves as a new rule.
 * Uses a random string suffix for the new rule name.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {Object} JSON response with combined rule or error
 */
combineRules = async (req, res) => {
  try {
    const { rules, op } = req.body;
    const ruleDocs = await Rule.find({ ruleName: { $in: rules } });
    if (ruleDocs.length === 0) {
      return res.status(404).json({ error: 'No matching rules found' });
    }
    const ruleASTs = ruleDocs.map(rule => rule.ruleAST);
    const combinedRootNode = combineNodes(ruleASTs, op);
    const randomString = generateRandomLetterString(4);
    const rule = new Rule({ ruleName: `combined${randomString}`, ruleAST: combinedRootNode });
    await rule.save();
    printTree(combinedRootNode);
    res.status(201).json(rule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/**
 * Evaluates a specified rule against provided data.
 * Fetches the rule from the database and applies it to the input data.
 * @param {Object} req - Express request object with rule name and evaluation data
 * @param {Object} res - Express response object
 * @return {Object} JSON response with evaluation result or error
 */
evaluateRule = async (req, res) => {
  try {
    const { ast, data } = req.body;
    const rule = await Rule.find({ ruleName: ast });
    if (!rule) {
      return res.status(404).json({ error: 'Rule not found' });
    }
    const result = evaluate(rule[0].ruleAST, data);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { evaluateRule, combineRules, createRule};