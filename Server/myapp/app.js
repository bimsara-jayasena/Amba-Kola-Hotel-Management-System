import bodyParser from 'body-parser';
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
const port=5555;
const app=express();
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"amba_kola_hms"
});
db.connect((err)=>{
    if(err){
        console.error(err.message);
    }else{
        console.log("connected database");
    }
})
app.use(bodyParser.json());
app.use(cors({
    origin:["http://localhost:3000","http://localhost:3001"],
    methods:['GET','POST','PUT','DELETE']
}))
//add department
app.post('/departments/add',async(req,res)=>{
    try {
        const {department,emp_quantity,roles}=req.body;
        const qry="INSERT INTO departments(department,emp_quantity)VALUES(?,?)";
        const [result]=await db.promise().query(qry,[department,emp_quantity]);
        const dep_id=result.insertId;
        //add roles to the roles table
        const addQuery="INSERT INTO roles(role,emp_quantity,dep_id)VALUES(?,?,?)";
        if(Array.isArray(roles)&&roles.length>0){
            
            for(const role of roles){
               if(role!==""){
                await db.promise().query(addQuery,[role,emp_quantity,dep_id]);
               }
            }
        }else if(roles!==""){
            await db.promise().query(addQuery,[roles,emp_quantity,dep_id]);
        }
        res.status(200).send({"success":"added new department record"});
    } catch (error) {
        res.status(500).send({"error":error.message})
    }
})
//add role
app.post('/roles/add',async(req,res)=>{
    try {
        const {role,emp_quantity,department}=req.body;
        //find related department id
        const findQry="SELECT dep_id FROM departments WHERE department=?";
        const [depRes]=await db.promise().query(findQry,[department]);
        if(depRes.length>0){
            const dep_id=depRes[0].dep_id;
            //create new role record
            const addQry="INSERT INTO roles(role,emp_quantity,dep_id)VALUES(?,?,?)";
            await db.promise().query(addQry,[role,emp_quantity,dep_id]);
            res.status(200).send({"success":"new role added"});
        }else{
            res.status(404).send({"error":"department not found"});
        }
    } catch (error) {
        res.status(500).send({"error":error});
    }
})
//add employe
app.post('/employees/add',async(req,res)=>{
    try {
        //get fields
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
       
        
        //get role id
        const roleQry="SELECT role_id FROM roles WHERE role=?";
        const [roleRes]=await db.promise().query(roleQry,[role]);
        const role_id=roleRes[0].role_id;

        //get department id
        const getDepId="SELECT dep_id FROM departments WHERE department=?";
        const [depRes]=await db.promise().query(getDepId,[department]);
        const dep_id=depRes[0].dep_id;

        //add employe
        const addEmp="INSERT INTO employees(first_name,last_name,email,contact_no,role_id,dep_id,password)VALUES(?,?,?,?,?,?,?)";
        const [empRes]=await db.promise().query(addEmp,[first_name,last_name,email,contact_no,role_id,dep_id,password]);
        const emp_id=empRes.insertId;
         //add new address
         const addressQry="INSERT INTO addresses(emp_id,street,city,postal_code,state)VALUES(?,?,?,?,?)";
         await db.promise().query(addressQry,[emp_id,street,city,postal_code,state]);
         
        res.status(200).send({"success":"successfully added new employee record"});
    
    } catch (error) {
        res.status(500).send({"error":error.message});
    }
})
//get employees
app.get('/employees',async(req,res)=>{
    try {
        const qry="SELECT e.emp_id, e.first_name,e.last_name,e.email,e.contact_no,a.street,a.city,a.postal_code,a.state,d.department,r.role FROM employees as e"+ 
                    " INNER JOIN addresses as a ON e.emp_id=a.emp_id"+
                    " INNER JOIN departments as d ON d.dep_id=e.dep_id"+
                    " INNER JOIN roles as r ON r.role_id=e.role_id";
        const [rows]=await db.promise().query(qry);
        res.status(200).send(rows);
        
       
    } catch (error) {
        res.status(500).send({"error":error.message});
    }
})
//find employe by id
app.get('/employees/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const qry="SELECT e.emp_id, e.first_name,e.last_name,e.email,e.contact_no,a.street,a.city,a.postal_code,a.state,d.department,r.role FROM employees as e"+ 
                    " INNER JOIN addresses as a ON e.emp_id=a.emp_id"+
                    " INNER JOIN departments as d ON d.dep_id=e.dep_id"+
                    " INNER JOIN roles as r ON r.role_id=e.role_id"+
                    " WHERE e.emp_id=?";
        const [rows]=await db.promise().query(qry,[id]);
        res.status(200).send(rows);
        
       
    } catch (error) {
        res.status(500).send({"error":error.message});
    }
})
//update employe
app.put('/employees/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const {first_name,last_name,email,contact_no,street,city,postal_code,state,department,role}=req.body;
        //get department Id;
        const depQry="SELECT dep_id FROM departments WHERE department=?";
        const [depresult]=await db.promise().query(depQry,[department]);
        const dep_id=depresult[0].dep_id;

        //get role Id;
        const roleQuery="SELECT role_id FROM roles WHERE role=?";
        const [roleRes]=await db.promise().query(roleQuery,[role]);
        const role_id=roleRes[0].role_id;

        //update employe table
        const query="UPDATE employees"+
                    " SET first_name=?,last_name=?,email=?,contact_no=?,role_id=?,dep_id=?"+
                    " WHERE emp_id=?";
        const [result]=await db.promise().query(query,[first_name,last_name,email,contact_no,role_id,dep_id,id]);

        //update addresses table
        const address="UPDATE addresses"+
                     " SET street=?,city=?,postal_code=?,state=?"+
                     " WHERE emp_id=?";
        await db.promise().query(address,[street,city,postal_code,state,id]);

        res.status(200).send({"success":"record updated succesfully"});
    
    } catch (error) {
        res.status(500).send({"error":error.message});
    }
})
//delete employe
app.delete('/employees/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const qry="DELETE FROM employees WHERE emp_id=?";
        await db.promise().query(qry,[id]);
        res.status(200).send({"success":"record removed"});
    } catch (error) {
        res.status(500).send({"error":error.message});
    }
})
//get departments
app.get('/departments',async(req,res)=>{
    try {
   
        const qry="SELECT d.dep_id,d.department,d.emp_quantity,r.role"+
        " FROM departments as d"+
        " INNER JOIN roles as r ON d.dep_id=r.dep_id";
        const [rows]=await db.promise().query(qry);

        const response = rows.reduce((acc, row) => {
           
           const existingObj=acc.find((value)=>value.dep_id==row.dep_id);
           
           if(existingObj){
            existingObj.role.push(row.role);
           }
          
           else{
             const modifiedObj={
                "dep_id":row.dep_id,
                "department": row.department,
                "emp_quantity":row.emp_quantity,
                "role":[row.role]
             }
             acc.push(modifiedObj);
           }
        
            return acc
        }, []);

       
        res.status(200).send(response);
        
    } catch (error) {
        res.status(500).send({"error":error.message});
    }
})
//get department by id
app.get('/departments/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const qry="SELECT d.dep_id, d.department,d.emp_quantity,r.role_id,r.role,r.emp_quantity as role_quantity FROM departments as d INNER JOIN roles as r ON d.dep_id=r.dep_id WHERE d.dep_id=?";
        const [rows]=await db.promise().query(qry,[id]);

        const response=rows.reduce((acc,row)=>{
                const {dep_id,department,emp_quantity,role_id,role,role_quantity}=row;
                const existingObj=acc.find((obj)=>obj.dep_id==dep_id);
                if(existingObj){
                    existingObj.role.push({id:role_id,r:role,quantity:role_quantity});
                }else{
                    acc.push({
                        dep_id,
                        department,
                        emp_quantity,
                        role:[{id:role_id,r:role,quantity:role_quantity}]
                    });
                }
                return acc;
        },[])
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({"error":error.message});
    }
})
//update department
app.put('/departments/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const {department}=req.body
        const updateqry="UPDATE departments SET department=? WHERE dep_id=?";
        await db.promise().query(updateqry,[department,id]);

        res.status(200).send({"success":"success"});
    } catch (error) {
        res.status(500).send({"error":error.message});
    }
})
//remove department
app.delete('/departments/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const sql="DELETE FROM departments WHERE dep_id=?";
        await db.promise().query(sql,[id])
        res.status(200).send({"success":"record removed"});
    } catch (error) {
        res.status(500).send({"error":error.message});
    }
})
app.get('/roles',async(req,res)=>{
    try {
        const qry="SELECT * FROM roles";
        const [rows]=await db.promise().query(qry);
        res.status(200).send(rows);
    } catch (error) {
        res.status(500).send({"error":error.message});
    }
})
app.put('/roles/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const {role}=req.body;
        const updateQry="UPDATE roles SET role=? WHERE role_id=?";
        const [response]=await db.promise().query(updateQry,[role,id]);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({"error":error.message});
    }
})
app.delete('/roles/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const delQry="DELETE FROM roles WHERE role_id=?";
        await db.promise().query(delQry,[id]);
        res.status(200).send({"success":"success"});
    } catch (error) {
        res.status(500).send({"error":error.message});
    }
})
app.listen(port);