import db from "../config/db.js";
const restaurent = {
  getAll: async () => {
    try {
       
      const query ="SELECT * FROM restaurent";
      const [res] = await db.promise().query(query);
      return res;
    } catch (error) {
      throw error;
    }
  },
  get: async (id) => {
    try {
      
      const qry ="SELECT * FROM restaurent WHERE item_id=?";
      const [res] = await db.promise().query(qry, [id]);
      return res;
    } catch (error) {
      throw error;
    }
  },
  
  create: async (itemObj) => {
    try {
      
        const {item, price, availability}=itemObj;
      
      //create guest
      const qry ="INSERT INTO restaurent(item,price,availability)VALUES(?,?,?)";
     await db.promise().query(qry, [ item, price, availability ]);
      return { success: "new record added successfully" };
    } catch (error) {
      throw error;
    }
  },
  update: async (itemObj) => {
    try {
        
      const {
        id,
        item,
        price,
        availability
      } = itemObj;
      
      
      //update employe
      const qry ="UPDATE restaurent SET item=?,price=?,availability=? WHERE item_id=?";
      const [res]=await db .promise().query(qry, [ item,price,availability,id ]);
      return res;
      
    } catch (error) {
      throw error;
    }
  },
  remove: async (id) => {
    try {
      const delQry = "DELETE FROM restaurent WHERE item_id=?";
      await db.promise().query(delQry, [id]);
      return { success: "deleted success" };
    } catch (error) {
      throw error;
    }
  },
};
export default restaurent;
