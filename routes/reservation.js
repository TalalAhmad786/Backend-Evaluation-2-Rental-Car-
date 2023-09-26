const express = require('express');
const router = express.Router();

const reservationController = require('../app/api/controllers/reservation');//Controller= require('../app/api/controllers/reservation');

router.get('/',reservationController.getAll);
router.post('/:carId',reservationController.create);
router.get('/:userId',reservationController.getById);
router.delete('/:reservationId',reservationController.cancelReservation);

module.exports = router;