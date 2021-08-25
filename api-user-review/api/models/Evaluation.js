const mongoose = require('../../database');

const EvaluationSchema = new mongoose.Schema({
    user:{
        name:{
            type: String,
            require: true,
        },
        email:{
            type: String,
            required: true,
            lowercase: true,
        }
    },
    product: {
        id:{            
            type: String,
            required: true
        },
        name:{
            type: String,
            required: true
        }
    },
    grade:{
        type: Number,
        default: 3,
    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
}, { autoIndex: true, autoCreate: true, });

const Evaluation = mongoose.model('Evaluation', EvaluationSchema);
module.exports = Evaluation;