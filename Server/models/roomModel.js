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
            const qry="SELECT * FROM rooms";
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
            const {id,room_key,room_type,room_price,room_status}=roomObj;
            //find status id
            const find="SELECT status_id FROM room_status WHERE status=?";
            const [statusRes]=await db.promise().query(find,[room_status]);
            const status_id=statusRes[0].status_id;
            //find type id
            const findType="SELECT type_id FROM room_type WHERE type=?";
            const [typeRes]=await db.promise().query(findType,[room_type]);
            const type_id=typeRes[0].type_id;
            //add room
            const add="UPDATE rooms SET room_key=?,type=?,room_price=?,room_status=? WHERE room_id=?";
            await db.promise().query(add,[room_key,type_id,room_price,status_id,id]);
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