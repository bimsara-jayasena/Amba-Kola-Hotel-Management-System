import department from "../models/departmentModel.js";

const create=async(departmentObj)=>{
    return await department.create(departmentObj)
}
const getAll=async()=>{
    return await department.getAll();
}
const get=async(id)=>{
    return await department.get(id);
}
const update=async(departmentObj)=>{
    return await department.update(departmentObj);
}
const remove=async(id)=>{
    return await department.remove(id);
}
export default {create,getAll,get,update,remove}