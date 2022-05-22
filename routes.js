const { route } = require("express/lib/application");

module.exports.UPLOAD_PATH = 'uploads';

const   express = require("express"),
        router = express.Router(),
        concertCtrl = require("./concert-controller"),
        multer = require('multer'),
        upload = multer({ dest: module.exports.UPLOAD_PATH }),
        app = express(),
        path = require('path');

router.use(express.static(__dirname + '/public/'));

router.post('/concerts', concertCtrl.createConcert);
router.get('/concerts', concertCtrl.getConcerts);
router.get('/concerts/:id', concertCtrl.getConcert);
router.put('/concerts/:id', concertCtrl.updateConcert);
router.delete('/concerts/:id', concertCtrl.deleteConcert);

router.get('/',(req, res) => {
    res.sendFile('index.html', {
        root: path.join(__dirname, './views')
    })
});


module.exports = router;