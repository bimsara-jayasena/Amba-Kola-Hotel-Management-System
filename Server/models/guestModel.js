import db from "../config/db.js";
const guest = {
  getAll: async () => {
    try {
      const query ="SELECT * FROM guests";
      const [res] = await db.promise().query(query);
      return res;
    } catch (error) {
      throw error;
    }
  },
  get: async (id) => {
    try {
      const qry ="SELECT g.guest_id, g.first_name,g.last_name,g.email,g.contact_no,g.passport_id,g.NIC_no,g.age,m.plan,g.arrived,g.departure,r.room,p.payment FROM guest as g" +
      " INNER JOIN meal_plans as m ON m.id=g.meal_plan" +
      " INNER JOIN rooms as r ON r.room_id=g.room" +
      " WHERE g.guest_id=?";
      const [res] = await db.promise().query(qry, [id]);
      return res;
    } catch (error) {
      throw error;
    }
  },
  
  create: async (guest) => {
    try {
        const {
            first_name,
            last_name,
            email,
            contact_no,
            passport_id,
            NIC_no,
            age,
            meal_plan,
            departure_date,
            departure_time,
            room
        }=guest;
      //get meal_plan id
      const getMealId = "SELECT id FROM meal_plans WHERE plan=?";
      const [meal_res] = await db.promise().query(getMealId, [meal_plan]);
      const meal_id = meal_res[0].id;

      //get room id
      const getRoomId = "SELECT room_id FROM rooms WHERE room=?";
      const [room_res] = await db.promise().query(getRoomId, [room]);
      const role_id = role_res[0].role_id;

      //create guest
      const qry ="INSERT INTO guests(first_name,last_name,passport_id,NIC_no,contact_no,age,email,meal_plan,departure_date,departure_time,room)VALUES(?,?,?,?,?,?,?,?,?,?,?)";
      const [res] = await db.promise().query(qry, [
          first_name,
          last_name,
          passport_id,
          NIC_no,
          contact_no,
          age,
          email,
          meal_plan,
          departure_date,
          departure_time,
          room
        ]);
      

      return { success: "updated success" };
    } catch (error) {
      throw error;
    }
  },
  update: async (employe) => {
    try {
      const {
        id,
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
        password,
      } = employe;
      console.log(employe);
      //get department id
      const getDepId = "SELECT dep_id FROM departments WHERE department=?";
      const [dep_res] = await db.promise().query(getDepId, [department]);
      const dep_id = dep_res[0].dep_id;

      //get role id
      const getRoleId = "SELECT role_id FROM roles WHERE role=?";
      const [role_res] = await db.promise().query(getRoleId, [role]);
      const role_id = role_res[0].role_id;

      //update employe
      const qry ="UPDATE employees SET first_name=?,last_name=?,email=?,contact_no=?,dep_id=?,role_id=?,password=? WHERE emp_id=?";
      await db .promise().query(qry, [
          first_name,
          last_name,
          email,
          contact_no,
          dep_id,
          role_id,
          password,
          id,
        ]);

      //create address record
      const addressqry = "UPDATE addresses SET street=?,city=?,postal_code=?,state=? WHERE emp_id=?";
      await db .promise().query(addressqry, [street, city, postal_code, state, id]);

      return { success: "updated success" };
    } catch (error) {
      throw error;
    }
  },
  remove: async (id) => {
    try {
      const delQry = "DELETE FROM employees WHERE emp_id=?";
      await db.promise().query(delQry, [id]);
      return { success: "deleted success" };
    } catch (error) {
      throw error;
    }
  },
};
export default guest;
