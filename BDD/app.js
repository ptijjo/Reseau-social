const express = require('express')
const cors = require('cors');
const app = express();
const url = require("./env/url-connection");
const serveur = require("mongoose");
const bcrypt = require("bcrypt");
const codeToken = require('./env/code-token');
const token = require("jsonwebtoken");
const auth = require("./midlleware/auth");
const avatar = require("./midlleware/avatar");
const picture = require("./midlleware/picture");
const fs = require('fs');

const path = require("path");


const User = require("./models/users");
const Post = require("./models/posts");
app.use(express.json());

app.use('/env', express.static(path.join(__dirname, 'env')));
app.use('/avatar', express.static(path.join(__dirname, 'avatar')));
app.use('/picture', express.static(path.join(__dirname, 'picture')));

app.use(cors());







/************************************ CONNECTION MONGODB ***************************************************************************/
serveur.connect(url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Echec connection MongoDB !'));
/**XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */


/*******  Créer User *****/

app.post('/signup', (req, res, next) => {
    const url_avatar = `${req.protocol}://${req.get('host')}/env/avatar.jpg`;
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                ...req.body,
                password: hash,
                avatar: url_avatar,

            })
            User.findOne({ email: req.body.email })
                .then(mail => {
                    if (mail) { return res.json({ message: "Email déjà existant ! " }) }
                    user.save()
                        .then(user => res.status(201).json({ user }))
                        .catch(error => res.status(400).json({ error }))

                })
                .catch(error => res.status(400).json({ error }))

        })

        .catch(error => res.status(400).json({ error }))

})

/************* Connection User **************************/

app.post('/signin', (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) { return res.json({ message: "Email / Mot de passe incorrects !" }) }
            bcrypt.compare(req.body.password, user.password)
                .then(valide => {
                    if (!valide) { return res.json({ message: "Email / Mot de passe incorrects !" }) }
                    return res.status(200).json({
                        Id: user._id,
                        userId: user.prenom + " " + user.nom,
                        nom: user.nom,
                        prenom: user.prenom,
                        avatar: user.avatar,
                        token: token.sign(
                            { userId: user.prenom + " " + user.nom, nom: user.nom, prenom: user.prenom, avatar: user.avatar, Id: user._id },
                            codeToken,
                            { expiresIn: "24h" },
                        )
                    })
                })
                .catch(error => res.status(500).json({ error }))

        })
        .catch(error => res.status(400).json({ error }))
})

/*********  who connected */
app.get('/connected', auth, (req, res, next) => {

    const auth = req.headers.authorization.split(' ')[1];
    const decodedToken = token.verify(auth, codeToken);
    const userId = decodedToken.userId;
    const nom = decodedToken.nom;
    const prenom = decodedToken.prenom;
    const avatar = decodedToken.avatar;
    const Id = decodedToken.Id;

    res.status(200).json({ nom, prenom, userId, avatar, Id })
})

// Rechercher tous les utilisateurs
app.get("/users/", auth, (req, res, next) => {
    User.find()
        .then(user => res.status(200).json({ user }))
        .catch(error => res.status(400).json({ error }))
})

// rechercher un utilisateur
app.get('/profil/:id', auth, (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({ error }));
})

// update profil connecté sans photo
app.put('/update/profil/bio/:id', auth, (req, res, next) => {

    User.findOne({ _id: req.params.id })
        .then(() => {

            if (req.params.id !== req.auth.Id) { res.status(401).json({ message: " Non authorisé !" }) }

            User.updateOne({ _id: req.params.id },
                {
                    $set: {
                        bio: req.body.bio,
                    }
                },
                {
                    new: true, upsert: true, setDefaultsOnInsert: true,
                })
                .then((bio) => {
                    res.status(200).json({ bio })
                })
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(400).json({ error }))
})

// update profil avatar

app.put('/update/profil/avatar/:id', auth, avatar, (req, res, next) => {

    User.findOne({ _id: req.params.id })
        .then((user) => {
            if (req.params.id !== req.auth.Id) { res.status(400).json({ message: " Non authorisé !" }) }
            const file = user.avatar.split("/avatar/")[1];
            fs.unlink(`avatar/${file}`, () => { });
            User.updateOne({ _id: req.params.id },
                {

                    $set: {

                        avatar: `${req.protocol}://${req.get('host')}/avatar/${req.file.filename}`.split(' ').join(''),
                    }
                },
                {
                    new: true, upsert: true, setDefaultsOnInsert: true,
                })
                .then((up) => {

                    User.findOne({ _id: req.params.id })
                        .then(avat => res.status(200).json({ avat }))
                        .catch(err => console.log(err))
                })
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(400).json({ error }))

})

/**********************************************CREATION POST**************************************** */
// Création de post

app.post('/post', auth, (req, res, next) => {
    const post = new Post({
        posterId: req.auth.userId,
        posterAvatar: req.auth.avatar,
        message: req.body.message,
        video: req.body.video,
        likers: [],
        nbreCommentaire: 0,
        commentaire: [],
    })

    post.save()
        .then(post => res.status(201).json({ post }))
        .catch(error => res.status(400).json({ error }))
})

// Create Post photo
app.post('/post/photo', auth, picture, (req, res, next) => {
    const url_photo = `${req.protocol}://${req.get('host')}/picture/${req.file.filename}`.split(' ').join('');
    const post = new Post({
        posterId: req.auth.userId,
        posterAvatar: req.auth.avatar,
        message: req.body.message,
        video: req.body.video,
        likers: [],
        picture: url_photo,
        nbreCommentaire: 0,
        commentaire: [],
    })

    post.save()
        .then(post => res.status(201).json({ post }))
        .catch(error => res.status(400).json({ error }))
})



// recuperer les post
app.get('/post', auth, (req, res, next) => {
    Post.find()
        .then(post => res.status(200).json({ post }))
        .catch(error => res.status(400).json({ error }))
})

// Modifier un post
app.put('/post/:id', auth, (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((user) => {

            if (user.posterId !== req.auth.userId) {
                res.status(401).json({ message: "Pas authorisé !" })
            }

            Post.updateOne({ _id: req.params.id },
                {
                    $set: {
                        message: req.body.message,
                    }
                },
                {
                    new: true, upsert: true, setDefaultsOnInsert: true,
                })

                .then((message) => {
                    res.status(200).json({ message })
                })
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(400).json({ error }))

})


// Supprimer un post 

app.delete('/post/:id', auth, (req, res, next) => {

})



module.exports = app;