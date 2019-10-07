const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// library for handling autoincrement in mongoose
// https://github.com/ramiel/mongoose-sequence
const AutoIncrement = require("mongoose-sequence")(mongoose);

const userSchema = new Schema(
  {
    user_id: { type: Number, default: 0 },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
},{
    timestamps: true,
});

userSchema.plugin(AutoIncrement, { inc_field: "user_id" });

const User = mongoose.model('User', userSchema);

module.exports = User;