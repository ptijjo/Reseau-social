const mongoose = require('mongoose');

const post = mongoose.Schema({

    posterId: { type: String, required: true },
    posterAvatar: { type: String, required: true },
    message: { type: String, required: true, trim: true, maxlength: 500 },
    picture: { type: String },
    video: { type: String },
    like: { type: Number, default: 0 },
    likers: { type: [String] },
    nbreCommentaire: { type: Number },
    commentaire: [{
        commenteur: { type: String },
        contenu: { type: String },
        timestamps: { type: Number },

    }]


},
    {
        timestamps: true,

    })




module.exports = mongoose.model("post", post)