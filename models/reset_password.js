const mongoose = require('mongoose');
const resetpassSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    accessToken:{
        type:String
    },
    isValid:{
        type:Boolean
    }
},
{
    timestamps:true
});

const Reset = mongoose.model('Reset', resetpassSchema);
module.exports = Reset;
