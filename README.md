# car_parking_lot
car parking lot system

npm start

createParkingLot
parkCar - findNearestAvailableSlot
leaveCarByCarNumber - findmycar
getSlotByCarNumber  findmycar
findAllAvailableSlots
findAllAllocatedSlots
getParkingStatus

curl --location --request POST 'http://localhost:3000/v1/parkingLot/createParkingLot' \
--header 'Content-Type: application/json' \
--data-raw '{
    "M":10,
    "L":10,
    "S":10
}'

curl --location --request GET 'http://localhost:3000/v1/parkingLot/getParkingStatus'

curl --location --request POST 'http://localhost:3000/v1/parkingLot/addVehical' \
--header 'Content-Type: application/json' \
--data-raw '{
    "type":"M",
    "number":"L1234"
}'

curl --location --request DELETE 'http://localhost:3000/v1/parkingLot/leaveCarByCarNumber' \
--header 'Content-Type: application/json' \
--data-raw '{
    "type":"M",
    "number":"789"
}'

curl --location --request GET 'http://localhost:3000/v1/parkingLot/getSlotByTicket/M_L1234'

curl --location --request GET 'http://localhost:3000/v1/parkingLot/findAllAvailableSlots'

curl --location --request GET 'http://localhost:3000/v1/parkingLot/findAllAllocatedSlots'