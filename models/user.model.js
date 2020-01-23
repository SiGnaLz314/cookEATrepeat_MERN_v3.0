const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
mongoose.promise = Promise;

const userSchema = new Schema({
    admin: { type: Boolean, required: true, unique: false },
    firstName: {type: String, required: true, unique: false },
    lastName: { type: String, required: true, unique: false },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: false },
},{
    collection: 'users'
});

userSchema.methods = {
    checkPassword: function(inputPassword){
        return bcrypt.compareSync(inputPassword, this.password);
    },
    hashPassword: plainTextPassword => {
        return bcrypt.hashSync(plainTextPassword, 10)
    }
}

userSchema.pre('save', function(next){
    if(!this.password) {
        console.log('NO PASSWORD PROVIDED ---- PLEASE PROVIDE A PASSWORD');
        next();
    } else {
        this.password = this.hashPassword(this.password);
        next();
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;