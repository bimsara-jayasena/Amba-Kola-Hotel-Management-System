import db from "../config/db.js";

const department = {
  getAll: async () => {
    try {
      const qry =
        "SELECT d.dep_id,d.department,d.emp_quantity,r.role" +
        " FROM departments as d" +
        " INNER JOIN roles as r ON d.dep_id=r.dep_id";
      const [rows] = await db.promise().query(qry);

      const response = rows.reduce((acc, row) => {
        const existingObj = acc.find((value) => value.dep_id == row.dep_id);

        if (existingObj) {
          existingObj.role.push(row.role);
        } else {
          const modifiedObj = {
            dep_id: row.dep_id,
            department: row.department,
            emp_quantity: row.emp_quantity,
            role: [row.role],
          };
          acc.push(modifiedObj);
        }

        return acc;
      }, []);

      return response;
    } catch (error) {
      throw error;
    }
  },
  get: async (id) => {
    try {
      const qry =
        "SELECT d.dep_id, d.department,d.emp_quantity,r.role_id,r.role,r.emp_quantity as role_quantity FROM departments as d INNER JOIN roles as r ON d.dep_id=r.dep_id WHERE d.dep_id=?";
      const [rows] = await db.promise().query(qry, [id]);

      const response = rows.reduce((acc, row) => {
        const {
          dep_id,
          department,
          emp_quantity,
          role_id,
          role,
          role_quantity,
        } = row;
        const existingObj = acc.find((obj) => obj.dep_id == dep_id);
        if (existingObj) {
          existingObj.role.push({
            id: role_id,
            r: role,
            quantity: role_quantity,
          });
        } else {
          acc.push({
            dep_id,
            department,
            emp_quantity,
            role: [{ id: role_id, r: role, quantity: role_quantity }],
          });
        }
        return acc;
      }, []);
      return response;
    } catch (error) {
      throw error;
    }
  },
  create: async (departmentObj) => {
    try {
      const { department, emp_quantity, roles } =departmentObj;
      const qry = "INSERT INTO departments(department,emp_quantity)VALUES(?,?)";
      const [result] = await db
        .promise()
        .query(qry, [department, emp_quantity]);
      const dep_id = result.insertId;
      //add roles to the roles table
      const addQuery ="INSERT INTO roles(role,emp_quantity,dep_id)VALUES(?,?,?)";
      if (Array.isArray(roles) && roles.length > 0) {
        for (const role of roles) {
          if (role !== "") {
            await db.promise().query(addQuery, [role, emp_quantity, dep_id]);
          }
        }
      } else if (roles !== "") {
        await db.promise().query(addQuery, [roles, emp_quantity, dep_id]);
      }
     return true;
    } catch (error) {
        throw error;
    }
  },
  update: async (departmentObj) => {
    try {
      const { department, id } = departmentObj;
      const updateqry = "UPDATE departments SET department=? WHERE dep_id=?";
      await db.promise().query(updateqry, [department, id]);

      return true;
    } catch (error) {
      throw error;
    }
  },
  remove: async (id) => {
    try {
      const qry = "DELETE FROM departments WHERE dep_id=?";
      await db.promise().query(qry, [id]);
      return true;
    } catch (error) {
      throw error;
    }
  },
};
export default department;
