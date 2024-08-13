const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ruleSchema = new Schema({
    ruleName: { 
        type: String, 
        required: true, 
        unique: true 
    },
    ruleAST: { type: Object, 
        required: true 
    }
  }, { timestamps: true });
  
module.exports  = mongoose.model('Rule', ruleSchema);