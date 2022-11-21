const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const user = mongoose.Schema({

    nom: { type: String, required: true, trimp: true, uppercase: true },
    prenom: { type: String, required: true, trimp: true },
    email: { type: String, required: true, unique: true, trimp: true, lowercase: true },
    password: { type: String, required: true, trimp: true },
    genre: { type: String },
    avatar: { type: String },
    bio: { type: String },
    role: { type: String, default: "user" },
    followers: { type: [String] },
    following: { type: [String] },
},
    {
        timestamps: true,

    })



user.plugin(uniqueValidator);
module.exports = mongoose.model("user", user)