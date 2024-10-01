import db from "../config/db.js";
const employe = {
  getAll: async () => {
    try {
      const query =
        "SELECT e.emp_id, e.first_name,e.last_name,e.email,e.contact_no,e.password,a.street,a.city,a.postal_code,a.state,d.department,r.role FROM employees as e" +
        " INNER JOIN addresses as a ON e.emp_id=a.emp_id" +
        " INNER JOIN departments as d ON d.dep_id=e.dep_id" +
        " INNER JOIN roles as r ON r.role_id=e.role_id";
      const [res] = await db.promise().query(query);
      return res;
    } catch (error) {
      throw error;
    }
  },
  get: async (id) => {
    try {
      const qry = "SELECT * FROM employees WHERE emp_id=?";
      const [res] = await db.promise().query(qry, [id]);
      return res;
    } catch (error) {
      throw error;
    }
  },
  create: async (employe) => {
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
        }=employe;
      //get department id
      const getDepId = "SELECT dep_id FROM departments WHERE department=?";
      const [dep_res] = await db.promise().query(getDepId, [department]);
      const dep_id = dep_res[0].dep_id;

      //get role id
      const getRoleId = "SELECT role_id FROM roles WHERE role=?";
      const [role_res] = await db.promise().query(getRoleId, [role]);
      const role_id = role_res[0].role_id;

      //create employe
      const qry ="INSERT INTO employees(first_name,last_name,email,contact_no,dep_id,role_id,password)VALUES(?,?,?,?,?,?,?)";
      const [res] = await db.promise().query(qry, [
          first_name,
          last_name,
          email,
          contact_no,
          dep_id,
          role_id,
          password,
        ]);
      const emp_id = res.insertId;

      //create address record
      const addressqry =
        "INSERT INTO addresses(emp_id,street,city,postal_code,state)VALUES(?,?,?,?,?)";
      await db.promise().query(addressqry, [emp_id, street, city, postal_code, state]);

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
export default employe;
