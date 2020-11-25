const mongoose = require('mongoose');
const resetpassSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    accessToken:{
        type:String,
        required:true
    },
    isValid:{
        type:Boolean,
        required:true
    }
},
{
    timestamps:true
});

const Reset = mongoose.model('Reset', resetpassSchema);
module.exports = Reset;
