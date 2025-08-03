const { query, update, toSql } = require('./db');

const addAsset = async (data) => {
  const {
    asset_name,
    category,
    token_symbol,
    description,
    token_icon,
    total_supply,
    destination_wallet,
    username,
  } = data;

  const sql = `
    INSERT INTO assets (
      asset_name,
      category,
      token_symbol,
      description,
      token_icon,
      total_supply,
      destination_wallet, 
      status, 
      created_by
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    asset_name,
    category,
    token_symbol,
    description,
    token_icon,
    total_supply,
    destination_wallet,
    'init', // status
    username, // created_by
  ];

  const [result] = await update(sql, values);
  return result;
};



const getAsset = async (id) => {
  const sql = `SELECT * FROM assets WHERE id = ?`;
  const [result] = await query(sql, [id]);
  return result;
};

const getAssets = async (limit = 25) => {
  const sql = `SELECT * FROM assets ORDER BY id DESC LIMIT ?`;
  const [result] = await query(sql, [limit]);
  return result;
};



const updateAsset = async (data, user) => {

  if (!data.id) {
    return { status: "error", message: "Asset ID is required" };
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

  const sql = `UPDATE assets SET ${fields.join(', ')} WHERE id = ?`;
  await query(sql, [...values, id]);
  return { status: "success", message: "Asset updated successfully" };
};



const deleteAsset = async (id) => {
  const sql = `DELETE FROM assets WHERE id = ?`;
  await query(sql, [id]);
  return { status: "success", message: "Asset deleted" };
};



module.exports = {
  addAsset,
  getAsset,
  getAssets,
  updateAsset,
  deleteAsset,
};
