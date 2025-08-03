const { query, update } = require('./db');

// Add a new listing
const addListing = async (data) => {
  const {
    asset_id, seller_id, seller_name,
    quantity, total_price, cliff, status
  } = data;

  const sql = `
    INSERT INTO marketplace (
      asset_id, seller_id, seller_name,
      quantity, total_price, cliff, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    asset_id, seller_id, seller_name,
    quantity, total_price, cliff, status
  ];

  return await update(sql, values);
};

// Get single listing by ID
const getListing = async (id) => {
  const sql = `SELECT * FROM marketplace WHERE id = ?`;
  const [result] = await query(sql, [id]);
  return result;
};

// Get multiple listings
const getListings = async (limit = 25) => {
  const sql = `
    SELECT id, asset_id, seller_id, seller_name,
           quantity, total_price, cliff, status
    FROM marketplace
    ORDER BY id DESC
    LIMIT ?
  `;
  const [result] = await query(sql, [limit]);
  return result;
};

// Update a listing
const updateListing = async (id, data) => {
  const fields = [];
  const values = [];

  Object.entries(data).forEach(([key, value]) => {
    fields.push(`${key} = ?`);
    values.push(value);
  });

  const sql = `UPDATE marketplace SET ${fields.join(', ')} WHERE id = ?`;
  await query(sql, [...values, id]);

  return { status: "success", message: "Listing updated successfully" };
};

// Delete a listing
const deleteListing = async (id) => {
  const sql = `DELETE FROM marketplace WHERE id = ?`;
  await query(sql, [id]);
  return { status: "success", message: "Listing deleted" };
};

module.exports = {
  addListing,
  getListing,
  getListings,
  updateListing,
  deleteListing,
};
