const { query, update, toSql } = require('./db');


const getMyAssets=async(username)=>{
        const sql = `
                SELECT 
                    id,
                    asset_id, 
                    amount_held, 
                    bought_price, 
                    current_price, 
                    revenue_generated, 
                    asset_metadata
                FROM holdings
                WHERE 
                    status='active' AND username=?`;
        try 
        {
            const [rows] = await query(sql, [username]);
            const len = rows.length;
            for(var i=0; i<len; i++) 
            {
                rows[i].asset_metadata = JSON.parse(rows[i].asset_metadata);
            }
            return rows;
        } 
        catch(error) 
        {
            console.log(error);
            return [];
        }

}


const getMyAsset=async(username, asset_id)=>{
        const sql = `
                SELECT 
                    id,
                    asset_id, 
                    amount_held, 
                    bought_price, 
                    current_price, 
                    revenue_generated, 
                    asset_metadata
                FROM holdings
                WHERE 
                    status='active' AND username=? AND asset_id=?`;
        try 
        {
            const [rows] = await query(sql, [username, asset_id]);
            rows[0].asset_metadata = JSON.parse(rows[0].asset_metadata);
            rows[0].success = true
            return rows[0];
        } 
        catch(error) 
        {
            console.log(error);
            return {success:false};
        }
}





const addMyAssets = async (asset) => {
    const {
        username,
        asset_id,
        amount_held,
        bought_price,
        asset_metadata  } = asset;

    const sql = `
        INSERT INTO holdings (
            username,
            asset_id,
            amount_held,
            bought_price,
            asset_metadata,
            status
        ) VALUES (?, ?, ?, ?, ?, 'active')
    `;

    try {
        const metadataString = JSON.stringify(asset_metadata);
        const result = await update(sql, [
            username,
            asset_id,
            amount_held,
            bought_price,
            current_price,
            revenue_generated,
            metadataString
        ]);
        return { success: true, insertId: result.insertId };
    } catch (error) {
        console.error('Error inserting asset:', error);
        return { success: false, error };
    }
};


const updateMyAssets = async (id, updates) => {
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

        const sql = `UPDATE holdings SET ${fields.join(', ')} WHERE id = ?`;
        values.push(id);

        const result = await update(sql, values);
        return { success: true, affectedRows: result.affectedRows };
    } catch (error) {
        console.error('Error updating asset:', error);
        return { success: false, error };
    }
};


const deleteMyAsset = async (data) => {
    const { id, username } = data;
    try {
        const sql = `DELETE FROM holdings WHERE id = ? AND username=?`;
        const result = await update(sql, [id, username]);
        if (result.affectedRows === 0) {
            return { success: false, message: 'No asset found with the given ID' };
        }
        return { success: true, affectedRows: result.affectedRows };
    } catch (error) {
        console.error('Error deleting asset:', error);
        return { success: false, error };
    }
};



module.exports = {
  getMyAssets,
  getMyAsset,
  addMyAssets,
  updateMyAssets,
  deleteMyAsset
};