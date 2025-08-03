const { query, update, toSql } = require('./db');


const addCategory=async(data)=>{

    const {  name, color, username, file  } = data;
    
    const icon = `/uploads/${file.filename}`;
    
    const sql = `INSERT INTO categories(name, color, icon, created_by) 
                 VALUES(?,?,?,?);`;
      const result = await update(sql, [name, color, icon, username]);
      return result[0];
}


const getCategory=async(id)=>{

        const sql = `SELECT id, name, color, icon FROM categories WHERE id=?`;
         const [result] = await query(sql, [id]);
         return result;
}


const getCategories=async()=>{
    const sql = `SELECT id, name, color, icon, status FROM categories`;
    const [result] = await query(sql);
    return result;
}

const updateCategory = async (id, data) => {
  const fields = [];
  const params = [];

  if (data.name) {
    fields.push("name = ?");
    params.push(data.name);
  }

  if (data.color) {
    fields.push("color = ?");
    params.push(data.color);
  }

  if (data.file) {
    fields.push("icon = ?");
    params.push(`/uploads/${data.file.filename}`);
  }

  if (fields.length === 0) return { message: "Nothing to update." };

  const sql = `UPDATE categories SET ${fields.join(', ')} WHERE id = ?`;
  params.push(id);
  const result = await update(sql, params);
  return result[0];
};

const deleteCategory = async (id) => {
  const sql = `DELETE FROM categories WHERE id = ?`;
  const result = await update(sql, [id]);
  return result[0];
};

module.exports = {
  addCategory,
  getCategory,
  getCategories,
  updateCategory,
  deleteCategory
};