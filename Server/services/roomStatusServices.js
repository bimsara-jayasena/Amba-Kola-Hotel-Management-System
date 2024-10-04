import roomStatus from "../models/StatusModel.js";

const create=async(statusObj)=>{
    return await roomStatus.create(statusObj);
}
const getAll=async()=>{
    return await roomStatus.get();
}
const update=async(statusObj)=>{
    return await roomStatus.update(statusObj)
}
export default {create,getAll,update}