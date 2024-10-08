import restaurentModel from "../models/restaurentModel.js";

const getAll=async()=>{
    return await restaurentModel.getAll();
}
const get=async(id)=>{
    return await restaurentModel.get(id);
}
const create=async(item)=>{
 
    return await restaurentModel.create(item)
}
const update=async(item)=>{
    return await restaurentModel.update(item);
}
const remove=async(id)=>{
    return await restaurentModel.remove(id);
}
export default {getAll,get,create,update,remove};