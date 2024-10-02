import departmentServices from "../services/departmentServices.js";

const create=async(req,res)=>{
    try {
        
        await departmentServices.create(req.body);
        res.status(200).send({"success":"new record added"});
    } catch (error) {
        res.status(500).send({"error":error});
    }
}
const getAll=async(req,res)=>{
    try {
        const response=await departmentServices.getAll();
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({"error":error})
    }
}
const get=async(req,res)=>{
    try {
        const {id}=req.params;
        const response=await departmentServices.get(id);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({"error":error})
    }
}
const update=async(req,res)=>{
    try {
        const {id}=req.params;
        const departmentObj={
            id,
            ...req.body
        }
        await departmentServices.update(departmentObj);
        res.status(200).send({"success":"record updated"});
    } catch (error) {
        res.status(500).send({"error":error});
    }
}
const remove=async(req,res)=>{
    try {
        const {id}=req.params;
        await departmentServices.remove(id);
        res.status(200).send({"success":"record deleted"});
    } catch (error) {
        res.status(500).send({"error":error});
    }
}
export default {create,getAll,get,update,remove}