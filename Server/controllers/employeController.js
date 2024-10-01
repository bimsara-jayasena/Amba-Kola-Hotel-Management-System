import employeServices from "../services/employeServices.js";

const getAll=async(req,res)=>{
    try {
        const result=await employeServices.getAll();
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({"error":error.message});
    }
}
const get=async(req,res)=>{
    try {
        const {id}=req.params;
        const [result]=await employeServices.get(id);
        res.status(200).send(result);
    } catch (error) {
        
    }
}
const update=async(req,res)=>{
    try {
        const {id}=req.params;
        const employe= {
            id,
            ...req.body
           }
        await employeServices.update(employe);
        res.status(200).send({"success":"updated"})
    } catch (error) {
        
    }
}
const create=async(req,res)=>{
    try {
        const {
            first_name,
            last_name,
            email,
            contact_no,
            street,
            city,
            postal_code,
            state,
            department,
            role,
            password
        }=req.body;
        const employe={
        
            "first_name": "test",
            "last_name": "test",
            "email": "test@gmail.com",
            "contact_no": "+435302",
            "street": "testt",
            "city": "test",
            "postal_code": "44",
            "state": "test",
            "department": "executive",
            "role": "CEO",
            "password": "55246"
        }
        await employeServices.create(req.body);
        res.status(200).send({"success":"new employe added"});
    } catch (error) {
        res.status(500).send({"error":error.message})
    }
}
const remove=async(req,res)=>{
    try {
        const {id}=req.params;
        await employeServices.remove(id);
        res.status(200).send({"success":"record removed"})
    } catch (error) {
        res.status(500).send({"error":error})
    }
}
export default {getAll,get,update,create,remove};