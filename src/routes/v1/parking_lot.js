const express = require('express');
// const validate = require('../../middlewares/validate');
// const userValidation = require('../../validations/user.validation');
const parkingLotController = require('../../controllers/parking_lot');

const router = express.Router();

router
  .post('/createParkingLot',[],parkingLotController.createParkingLot)
  .get('/getParkingStatus',[],parkingLotController.getParkingStatus)
  .post('/addVehical',[],parkingLotController.addVehical)
  .delete('/leaveCarByCarNumber', [], parkingLotController.leaveCarByCarNumber)
  .get('/getSlotByTicket/:id', [], parkingLotController.getSlotByTicket)
  .get('/findAllAvailableSlots', [], parkingLotController.findAllAvailableSlots)
  .get('/findAllAllocatedSlots',[],parkingLotController.findAllAllocatedSlots)


module.exports = router;