const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_F@CEBANGS');
        const userId = decodedToken.userId;
        const nom = decodedToken.nom;
        const prenom = decodedToken.prenom;
        const avatar = decodedToken.avatar;
        const Id = decodedToken.Id;
        req.auth = {
            userId: userId,
            nom: nom,
            prenom: prenom,
            avatar: avatar,
            Id: Id,
        };
        next();
    }

    catch (error) {
        res.status(401).json({ error });
    }
}