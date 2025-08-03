const { query, update } = require('./db');


const getGalleryByAsset = async (asset_id) => {
    const sql = `
        SELECT 
            asset_id,
            image_url
        FROM gallery
        WHERE 
            asset_id = ? AND status = 'active'
    `;
    try {
        const [rows] = await query(sql, [asset_id]);
        return rows;
    } catch (error) {
        console.error('Error fetching gallery images:', error);
        return [];
    }
};

// Get a specific image by ID
const getGalleryImageById = async (id) => {
    const sql = `
        SELECT 
            id,
            asset_id,
            image_url,
            status
        FROM gallery
        WHERE 
            id = ?
    `;
    try {
        const [rows] = await query(sql, [id]);
        if (rows.length > 0) {
            return { success: true, ...rows[0] };
        }
        return { success: false, message: 'Image not found' };
    } catch (error) {
        console.error('Error fetching image:', error);
        return { success: false, error };
    }
};

// Add a new gallery image
const addGalleryImage = async (data) => {
    const { asset_id, image_url } = data;

    const sql = `
        INSERT INTO gallery (
            asset_id,
            image_url,
            status
        ) VALUES (?, ?, 'active')
    `;

    try {
        const result = await update(sql, [asset_id, image_url]);
        return { success: true, insertId: result.insertId };
    } catch (error) {
        console.error('Error adding image:', error);
        return { success: false, error };
    }
};

// Update an existing gallery image
const updateGalleryImage = async (id, updates) => {
    try {
        const fields = [];
        const values = [];

        for (const [key, value] of Object.entries(updates)) {
            fields.push(`${key} = ?`);
            values.push(value);
        }

        if (fields.length === 0) {
            return { success: false, message: 'No fields to update' };
        }

        const sql = `UPDATE gallery SET ${fields.join(', ')} WHERE id = ?`;
        values.push(id);

        const result = await update(sql, values);
        return { success: true, affectedRows: result.affectedRows };
    } catch (error) {
        console.error('Error updating image:', error);
        return { success: false, error };
    }
};

// Delete (or deactivate) a gallery image
const deleteGalleryImage = async (id) => {
    try {
        const sql = `UPDATE gallery SET status = 'inactive' WHERE id = ?`;
        const result = await update(sql, [id]);

        if (result.affectedRows === 0) {
            return { success: false, message: 'Image not found or already inactive' };
        }

        return { success: true, affectedRows: result.affectedRows };
    } catch (error) {
        console.error('Error deleting image:', error);
        return { success: false, error };
    }
};

module.exports = {
    getGalleryByAsset,
    getGalleryImageById,
    addGalleryImage,
    updateGalleryImage,
    deleteGalleryImage
};
