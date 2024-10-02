import roomModel from '../models/roomModel.js';

const add=async(roomObj)=>{
    return await roomModel.create(roomObj);
}
const getAll=async()=>{
    return await roomModel.getAll();
}
const get=async(id)=>{
    return await roomModel.get(id);
}
const update=async(roomObj)=>{
    return await roomModel.update(roomObj);
}
const remove=async(id)=>{
    return await roomModel.remove(id)
}
export default {add,getAll,get,update,remove};