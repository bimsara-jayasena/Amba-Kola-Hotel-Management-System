import db from  '../config/db.js';

const roomType={
    get:async()=>{
        try {
            const qry="SELECT * FROM room_type";
            const [response]=await db.promise().query(qry);
            return response;
        } catch (error) {
            throw error;
        }
    },
    create:async(typeObj)=>{
        try {
            const {type,room_quantity}=typeObj;
            const qry="INSERT INTO room_type(type,room_quantity)VALUES(?,?)";
            await db.promise().query(qry,[type,room_quantity]);
            return true;
        } catch (error) {
            throw error;
        }
    },
    update:async(typeObj)=>{
        try {
            const {id,type,room_quantity}=typeObj;
            const qry="UPDATE room_type SET type=?,room_quantity=? WHERE type_id=?";
            await db.promise().query(qry,[type,room_quantity,id]);
            return true;
        } catch (error) {
            throw error;
        }
    },
    remove:async(id)=>{
        try {
            const qry="DELETE FROM room_type WHERE type_id=?";
            await db.promise().query(qry,[id]);
            return true;
        } catch (error) {
            throw error;
        }
    }
}
export default roomType;