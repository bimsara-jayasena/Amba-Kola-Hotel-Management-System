import employeModel from "../models/employeModel.js";

const getAll=async()=>{
    return await employeModel.getAll();
}
const get=async(id)=>{
    return await employeModel.get(id);
}
const create=async(employe)=>{
 
    return await employeModel.create(employe)
}
const update=async(employe)=>{
    return await employeModel.update(employe);
}
const remove=async(id)=>{
    return await employeModel.remove(id);
}
export default {getAll,get,get,update,create,remove};