const express = require('express');
const parking_lot_route = require('./parking_lot');
const router = express.Router();

const defaultRoutes = [
  {
    path: '/parkingLot',
    route: parking_lot_route,
  },
];

router.get('/ping',(req, res) => res.send('pong'));

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});


module.exports = router;