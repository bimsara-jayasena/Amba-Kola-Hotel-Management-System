import db from '../config/db.js';

const roomStatus={
    get:async()=>{
        try {
            const qry="SELECT * FROM room_status";
            const [response]=await db.promise().query(qry);
            return response;
        } catch (error) {
            throw error;
        }
    },
    create:async(statusObj)=>{
        try {
            const {status,room_quantity}=statusObj;
            const qry="INSERT INTO room_status(status,room_quantity)VALUES(?,?)";
            await db.promise().query(qry,[status,room_quantity]);
            return true;
        } catch (error) {
            throw error;
        }
    },
    update:async(statusObj)=>{
        try {
            const {status_id,status,room_quantity}=statusObj;
            const qry="UPDATE room_status(status,room_quantity)SET status=?,room_quantity=? WHERE status_id=?";
            await db.promise().query(qry,[status,room_quantity,status_id]);
            return true;
        } catch (error) {
            throw error;
        }
    }

}
export default roomStatus;