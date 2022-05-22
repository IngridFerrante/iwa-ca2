const { route } = require("express/lib/application");

module.exports.UPLOAD_PATH = 'uploads';

const   express = require("express"),
        router = express.Router(),
        ticketCtrl = require("./ticket-controller"),
        multer = require('multer'),
        upload = multer({ dest: module.exports.UPLOAD_PATH }),
        app = express(),
        path = require('path');

router.use(express.static(__dirname + '/public/'));

router.post('/tickets', ticketCtrl.createTicket);
router.get('/tickets', ticketCtrl.getTickets);
router.get('/tickets/:id', ticketCtrl.getTicket);
router.put('/tickets/:id', ticketCtrl.updateTicket);
router.delete('/tickets/:id', ticketCtrl.deleteTicket);

router.get('/',(req, res) => {
    res.sendFile('index.html', {
        root: path.join(__dirname, './views')
    })
});


module.exports = router;