const localStorage =require('localStorage')
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const get_parking_status = (type)=> {
    if(localStorage.getItem('parking_lot')!= null){
      let result =JSON.parse(localStorage.getItem('parking_lot'));
      if (!result || result.length<=0) {
        throw new ApiError(httpStatus.NOT_FOUND,'Data not found')
      }
      if(type!=null){
        result= result[0][type].data;
      }
     return result;
    }else{
      throw new ApiError(httpStatus.NOT_FOUND,'Data not found')
    }
  }

const calculate_hours=(dateOne)=>{
  const dateTwo = new Date()
  const dateOneObj = new Date(dateOne);
  const dateTwoObj = new Date(dateTwo);
  const milliseconds = Math.abs(dateTwoObj - dateOneObj);
  return parseFloat(milliseconds / 36e5).toFixed(0);
}  

module.exports = { get_parking_status ,calculate_hours};