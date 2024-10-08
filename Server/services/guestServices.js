import guestModel from "../models/guestModel.js";

const getAll=async()=>{
    return await guestModel.getAll();
}
const get=async(id)=>{
    return await guestModel.get(id);
}
const create=async(guest)=>{
 
    return await guestModel.create(employe)
}
/* const update=async(employe)=>{
    return await employeModel.update(employe);
}
const remove=async(id)=>{
    return await employeModel.remove(id);
} */
export default {getAll,get,create};