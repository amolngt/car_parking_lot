const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const localStorage =require('localStorage')
const {get_parking_status,calculate_hours} = require('../helpers');
const {All_CONST} = require('../config/constants');

const createParkingLot = catchAsync( (req, res) => {
  try{
    let medium=[],small=[],large=[];
    if(req.body.M >0){
      for (let i = 0; i < req.body.M; i++) {
        medium.push(null);
      }
    }
    if(req.body.S >0){
      for (let i = 0; i < req.body.S; i++) {
        small.push(null);
      }
    }
    if(req.body.L >0){
      for (let i = 0; i < req.body.L; i++) {
        large.push(null);
      }
    }
    parking_lot=[{
        M:{data:medium,size:req.body.M},
        S:{data:small,size:req.body.S},
        L:{data:large,size:req.body.L}
      }
    ]
    localStorage.setItem('parking_lot',JSON.stringify(parking_lot))
    res.status(httpStatus.CREATED).send(parking_lot);
  }catch(e){
    throw e;
  }
});

const getParkingStatus = catchAsync( (req, res) => {
  try{
    res.status(httpStatus.OK).send(get_parking_status(null));
  }catch(e){
    throw e;
  } 
});

const addVehical= catchAsync((req,res)=>{
  try{
    let k=0
    let status = get_parking_status(null);
    let typeof_vehical_status= status[0][req.body.type].data;
    for (let i = 0; i < typeof_vehical_status.length; i++) {
      if(typeof_vehical_status[i] != null && i === (status[0][req.body.type].size)-1){
        throw new ApiError(httpStatus.NOT_FOUND, req.body.type +' Full');
      }
      if(typeof_vehical_status[i] == null){
          k=i+1
          typeof_vehical_status[i]={plot_no:req.body.type+"-"+(k),ticket:req.body.type+"_"+req.body.number,number:req.body.number,date_time: new Date()};
          break;
      }
    }

    status[req.body.type]= typeof_vehical_status;
    localStorage.setItem('parking_lot',JSON.stringify(status))
    res.status(httpStatus.CREATED).send("Added successfully");
  }catch(e){
    throw e;
  }
})

const leaveCarByCarNumber = catchAsync( (req, res) => {
  try{
    let f= false;
    if(!req.body.type || !req.body.number){
      throw new ApiError(httpStatus.NOT_FOUND, 'Please enter details');
    }
    let status = get_parking_status(null);
    let typeof_vehical_status= status[0][req.body.type].data;
    for (let i = 0; i < typeof_vehical_status.length; i++) {
      if(typeof_vehical_status[i]!=null){
        if(typeof_vehical_status[i].number === req.body.number){
            typeof_vehical_status[i]=null;
            f=true
            break;
        }
      }
    }
    if(f === false){
        throw new ApiError(httpStatus.NOT_FOUND, 'Vehical not found');
    }
    status[req.body.type]= typeof_vehical_status;
    localStorage.setItem('parking_lot',JSON.stringify(status))
    res.status(httpStatus.CREATED).send("Deleted successfully");
  }catch(e){
    throw e;
  }
});

const getSlotByTicket = catchAsync( (req, res) => {
  try{
    let id= req.params.id;
    if(!id){
      throw new ApiError(httpStatus.NOT_FOUND, 'Please enter id');
    }
    // vehical number
    const number = id.split("_")[0];
    let vehicals = get_parking_status(number);
    let vehical = vehicals.filter(u => {
      if(u!=null){
        return u.ticket === id
      }
    });
    if (!vehical || vehical.length<=0) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Vehical not found');
    }
    //calculate hours
    vehical[0].hours = calculate_hours(vehical[0].date_time);
    //calculate money
    vehical[0].amount = All_CONST.RATE.get((vehical[0].hours >=3) ? '3' : vehical[0].hours);

    res.status(httpStatus.OK).send(vehical);
  }catch(e){
    throw e;
  }
});

const findAllAvailableSlots = catchAsync( (req, res) => {
  try{
    let arr={},set_all=[];
    let data = get_parking_status(null);
    let typeof_vehical_status= data[0];
    for (let element of Object.keys(typeof_vehical_status)) {
        if(typeof_vehical_status[element]!=null){
          let main=typeof_vehical_status[element].data;
          set_all=[]
          for (let i = 1; i <= main.length; i++) {
            if(main[i] == null){
              set_all.push(element+""+i);
            }
            if(set_all && Array.isArray(set_all) && set_all.length>0){
              arr[element]= set_all;
            }
          }
        
        }
    }
    return res.status(httpStatus.OK).send(arr);
  }catch(e){
    throw e;
  }
});

const findAllAllocatedSlots = catchAsync( (req, res) => {
  try{
    let arr={},set_all=[];
    let data = get_parking_status(null);
    let typeof_vehical_status= data[0];
    for (let element of Object.keys(typeof_vehical_status)) {
        if(typeof_vehical_status[element]!=null){
          let main=typeof_vehical_status[element].data;
          set_all=[];
          for (let i = 1; i <= main.length; i++) {
            if(main[i] != null){
              set_all.push(element+""+i);
            }
            if(set_all && Array.isArray(set_all) && set_all.length>0){
              arr[element]= set_all;
            }
          }
        }
    }
    return res.status(httpStatus.OK).send(arr);
  }catch(e){
    throw e;
  }
});


module.exports = {
  createParkingLot,
  getParkingStatus,
  addVehical,
  leaveCarByCarNumber,
  getSlotByTicket,
  findAllAvailableSlots,
  findAllAllocatedSlots
};