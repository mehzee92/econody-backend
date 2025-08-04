const { query, update } = require('./db');

// Add a new gallery image
const addGalleryImage = async (data) => {
  try {
    const { asset_id, image_url, status } = data;

    const sql = `
      INSERT INTO gallery (asset_id, image_url, status)
      VALUES (?, ?, ?)
    `;

    const values = [asset_id, image_url, status];
    return await update(sql, values);
  } catch (error) {
    console.error('Error in addGalleryImage:', error);
    throw error;
  }
};

// Update a gallery image by ID
const updateGalleryImage = async (id, data) => {
  try {
    const fields = [];
    const values = [];

    Object.entries(data).forEach(([key, value]) => {
      fields.push(`${key} = ?`);
      values.push(value);
    });

    const sql = `UPDATE gallery SET ${fields.join(', ')} WHERE id = ?`;
    await query(sql, [...values, id]);

    return { status: "success", message: "Gallery image updated successfully" };
  } catch (error) {
    console.error('Error in updateGalleryImage:', error);
    throw error;
  }
};

// Delete a gallery image by ID
const deleteGalleryImage = async (id) => {
  try {
    const sql = `DELETE FROM gallery WHERE id = ?`;
    await query(sql, [id]);
    return { status: "success", message: "Gallery image deleted" };
  } catch (error) {
    console.error('Error in deleteGalleryImage:', error);
    throw error;
  }
};

// Get all gallery images (optional: with limit)
const getGalleryImages = async (limit = 25) => {
  try {
    const sql = `
      SELECT id, asset_id, image_url, status
      FROM gallery
      ORDER BY id DESC
      LIMIT ?
    `;
    const [result] = await query(sql, [limit]);
    return result;
  } catch (error) {
    console.error('Error in getGalleryImages:', error);
    throw error;
  }
};

// Get a single gallery image by ID
const getGalleryImageById = async (id) => {
  try {
    const sql = `SELECT * FROM gallery WHERE id = ?`;
    const [result] = await query(sql, [id]);
    return result;
  } catch (error) {
    console.error('Error in getGalleryImageById:', error);
    throw error;
  }
};

// Get all gallery images for a specific asset_id
const getGalleryByAsset = async (asset_id) => {
  try {
    const sql = `SELECT * FROM gallery WHERE asset_id = ? ORDER BY id DESC`;
    const [result] = await query(sql, [asset_id]);
    return result;
  } catch (error) {
    console.error('Error in getGalleryByAsset:', error);
    throw error;
  }
};

module.exports = {
  addGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  getGalleryImages,
  getGalleryImageById,
  getGalleryByAsset,
};