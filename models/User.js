const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password:{
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    },
});

// /**fire function after doc is saved to db
// * TODO: read more on hooks
// ** post is a hook
// *! post here is not a post request but after a save has occured fire a function
// */
// userSchema.post('save', function(doc, next){
//     console.log('new user was created and saved', doc);
//     next();
// });

// /**fire function before doc is saved to db
// ** pre is a hook
// *! here the pre says , before save fire a function
// */
// userSchema.pre('save', function (next){
//     console.log('user about to be created and saved', this);
//     next();
// });


//pre hook
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


const User = mongoose.model('user', userSchema);

module.exports = User;