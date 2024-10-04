import db from '../config/db.js';

const room={
    create:async(roomObj)=>{
        try {
            const {room_key,room_type,room_price,room_status}=roomObj;
            //find status id
            const find="SELECT status_id FROM room_status WHERE status=?";
            const [statusRes]=await db.promise().query(find,[room_status]);
            const status_id=statusRes[0].status_id;
            //find type id
            const findType="SELECT type_id FROM room_type WHERE type=?";
            const [typeRes]=await db.promise().query(findType,[room_type]);
            const type_id=typeRes[0].type_id;
            //add room
            const add="INSERT INTO rooms(room_key,type,room_price,room_status) VALUES(?,?,?,?)";
            await db.promise().query(add,[room_key,type_id,room_price,status_id]);
            return true;
        } catch (error) {
            throw error;
        }
    },
    getAll:async()=>{
        try {
            const qry="SELECT r.room_id,r.room_key,t.type,r.room_price,s.status FROM rooms as r"+
            " INNER JOIN room_status as s ON r.room_status=s.status_id"+
            " INNER JOIN room_type AS t ON r.type=t.type_id";
            const [res]=await db.promise().query(qry);
            return res;
        } catch (error) {
            throw error;
        }
    },
    get:async(id)=>{
        try {
            const qry="SELECT r.room_key,t.type,r.room_price,s.status FROM rooms as r"+
                        " INNER JOIN room_status as s ON r.room_status=s.status_id"+
                        " INNER JOIN room_type AS t ON r.type=t.type_id"+
                        " WHERE r.room_id=?";
            const [res]=await db.promise().query(qry,[id]);
            return res;
        } catch (error) {
            throw error;
        }
    },
    update:async(roomObj)=>{
        try {
            //const {id,room_key,room_type,room_price,room_status}=roomObj;
            const keys=[];
            const values=[];
           
            Object.keys(roomObj).map((k)=>{
                
                keys.push(k);
                values.push(roomObj[k]);
            });

            //find status id
            const changeStatus=keys.some((k)=>k==="room_status");
            const changeType=keys.some((k)=>k=="type");
            
          if(changeStatus){
            const find="SELECT status_id FROM room_status WHERE status=?";
            const [statusRes]=await db.promise().query(find,[roomObj["room_status"]]);
            const status_id=statusRes[0].status_id;
           
            let updated=values.map((value)=>value==roomObj["room_status"]? status_id : value);
            values.length=0;
            values.push(...updated)

         
            
          }
          if(changeType){
            const findType="SELECT type_id FROM room_type WHERE type=?";
            const [typeRes]=await db.promise().query(findType,roomObj["type"]);
            const type_id=typeRes[0].type_id;
            
            const updated=values.map((value)=>value==roomObj["type"]? type_id : value);
            values.length=0;
            console.log(updated);
            values.push(...updated);
          }

           let add="UPDATE rooms SET ";
           let qry="";
           keys.forEach((k,index)=>{
                if(k=="id"){
                    
                }else if(index==keys.length-2){
                    qry=qry+k+"=?";
                }else {
                    qry=qry+k+"=?,"
                }
           });
           add+=qry+" WHERE room_id=?";
            console.log("qry: ",add)
            console.log("values: ",values);
            await db.promise().query(add,values);
            return true;
        } catch (error) {
            throw error;
        }
    },
    remove:async(id)=>{
        try {
            const qry="DELETE FROM rooms WHERE room_id=?";
            const [res]=await db.promise().query(qry,[id]);
            return res;
        } catch (error) {
            throw error;
        }
    },

}
export default room;