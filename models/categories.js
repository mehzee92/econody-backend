const { query, update } = require('./db');

// Add a new category
const addCategory = async (data) => {
  const { name, icon, status = "active" } = data;

  const sql = `
    INSERT INTO categories (name, icon, status)
    VALUES (?, ?, ?)
  `;
  const values = [name, icon, status];

  const [result] = await update(sql, values);
  return result;
};

// Get a single category by ID
const getCategory = async (id) => {
  const sql = `SELECT * FROM categories WHERE id = ?`;
  const [result] = await query(sql, [id]);
  return result;
};

// Get all categories with optional limit
const getCategories = async (limit = 100) => {
  const sql = `SELECT * FROM categories ORDER BY id DESC LIMIT ?`;
  const [result] = await query(sql, [limit]);
  return result;
};



// Update category
const updateCategory = async (data) => {
  if (!data.id) {
    return { status: "error", message: "Category ID is required" };
  }

  const id = data.id;
  delete data.id;

  const fields = [];
  const values = [];

  Object.entries(data).forEach(([key, value]) => {
    fields.push(`${key} = ?`);
    values.push(value);
  });

  if (fields.length === 0) {
    return { status: "error", message: "No fields to update" };
  }

  const sql = `UPDATE categories SET ${fields.join(', ')} WHERE id = ?`;
  await query(sql, [...values, id]);

  return { status: "success", message: "Category updated successfully" };
};

// Delete category
const deleteCategory = async (id) => {
  const sql = `DELETE FROM categories WHERE id = ?`;
  await query(sql, [id]);
  return { status: "success", message: "Category deleted" };
};

module.exports = {
  addCategory,
  getCategory,
  getCategories,
  updateCategory,
  deleteCategory
};
