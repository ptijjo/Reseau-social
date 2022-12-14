const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { isEmail } = require('validator');
const user = mongoose.Schema({

    nom: {
        type: String,
        required: [true, "Quel est votre nom ?"],
        trimp: true,
        uppercase: true,
        minLength: [3, "Le nom doit comporter au moins 3 lettres"],
        maxLength: [55, "Le nom ne doit pas comporter plus de 55 lettres"],
    },

    prenom: {
        type: String,
        required: [true, "Quel est votre prénom ?"],
        trimp: true,
        minLength: [3, "Le prénom doit comporter au moins 3 lettres"],
        maxLength: [55, "Le prénom ne doit pas comporter plus de 55 lettres"],
    },

    email: {
        type: String,
        required: [true, "Choisissez une adresse email ?"],
        unique: true,
        trimp: true,
        lowercase: true,
        validate: [isEmail, "Votre email est invalide"]

    },

    password: {
        type: String,
        required: [true, "Choisissez un mot de passe ?"],
        trimp: true,
        minLength: [6, "Le mot de passe doit contenir 6 caractères avec au moins une majucule, un chiffre et un caractère spécial"],
        //validate: [/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/, "Le mot de passe doit contenir 6 caractères avec au moins une majucule, un chiffre et un caractère spécial"]
    },


    genre: { type: String },
    avatar: { type: String },

    bio: {
        type: String,
        max: 1024,

    },

    role: { type: String, default: "user" },
    followers: { type: [String] },
    following: { type: [String] },
},
    {
        timestamps: true,

    })



user.plugin(uniqueValidator);
module.exports = mongoose.model("user", user)