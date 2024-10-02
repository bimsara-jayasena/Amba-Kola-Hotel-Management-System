import db from "../config/db.js";

const role = {
  create: async (roleObj) => {
    try {
      const { role, emp_quantity, department } = roleObj;
      //find related department id
      const findQry = "SELECT dep_id FROM departments WHERE department=?";
      const [depRes] = await db.promise().query(findQry, [department]);
      if (depRes.length > 0) {
        const dep_id = depRes[0].dep_id;
        //create new role record
        const addQry =
          "INSERT INTO roles(role,emp_quantity,dep_id)VALUES(?,?,?)";
        await db.promise().query(addQry, [role, emp_quantity, dep_id]);
        return true;
      }
    } catch (error) {
      throw error;
    }
  },
  getAll: async () => {
    try {
      const qry = "SELECT * FROM roles";
      const [response] = await db.promise().query(qry);
      return response;
    } catch (error) {
      throw error;
    }
  },
  update: async (roleObj) => {
    try {
      const { id, role } = roleObj;
      //find if role is exist
      const find = "SELECT * FROM roles  WHERE role_id=?";
      const [result] = await db.promise().query(find,[id]);
      if (result.length > 0) {
        const updateQry = "UPDATE roles SET role=? WHERE role_id=?";
        const [response] = await db.promise().query(updateQry, [role, id]);

        return response;
      }
    } catch (error) {
      throw error;
    }
  },
  remove: async (id) => {
    try {
      const delQry = "DELETE FROM roles WHERE role_id=?";
      await db.promise().query(delQry, [id]);
      return true;
    } catch (error) {
      throw error;
    }
  },
};
export default role;
