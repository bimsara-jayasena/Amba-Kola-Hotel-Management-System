import roomType from "../models/roomTypeModel.js";

const create=async(typeObj)=>{
    return await roomType.create(typeObj);
}
const getAll=async()=>{
    return await roomType.get();
}
const update=async(typeObj)=>{
    return await roomType.update(typeObj)
}
const remove=async(id)=>{
    return await roomType.remove(id);
}
export default {create,getAll,update,remove}