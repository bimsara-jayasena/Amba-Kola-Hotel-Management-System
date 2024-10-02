import role from '../models/roleModel.js';

const create=async(roleObj)=>{
    return await role.create(roleObj)
}
const getAll=async()=>{
    return await role.getAll();
}
const update=async(roleObj)=>{
    return await role.update(roleObj);
}
const remove=async(id)=>{
    return await role.remove(id);
}
export default {create,getAll,update,remove}