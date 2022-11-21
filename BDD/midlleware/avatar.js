const multer = require('multer'); // on importe multer

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({ // on enregistre sur le disque
    destination: (req, file, callback) => { // on indique ou on va enregistrer les fichiers
        callback(null, 'avatar');
    },
    filename: (req, file, callback) => {
        //const nom = file.originalname.split(' ').join('_');
        const name = file.originalname;
        const user = req.auth.nom;
        const extension = MIME_TYPES[file.mimetype];
        //callback(null, name + '.' + extension);
        callback(null, user + "_" + name);
    }

});


module.exports = multer({ storage: storage }).single('avatar');