


const { update, query, toSql } = require('./db');


const addMyStake = async (data) => {
  const {
    username,
    staker_wallet,
    asset_id,
    token_address,
    staked_amount,
    staking_start,
    staking_end,
    asset_metadata,
    status = "active"
  } = data;

  if (!username || !staker_wallet || !asset_id || !staking_start || !staking_end) {
    return { success: false, message: 'Missing required fields' };
  }

  const sql = `
    INSERT INTO stakings (
        username,
        staker_wallet,
        asset_id,
        token_address,
        staked_amount,
        staking_start,
        staking_end,
        asset_metadata,
        status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    username,
    staker_wallet,
    asset_id,
    token_address,
    staked_amount,
    toSql(staking_start),
    toSql(staking_end),
    typeof asset_metadata === 'string' ? asset_metadata : JSON.stringify(asset_metadata),
    status
  ];

  try {
    const [result] = await update(sql, values);
    return { success: true, insertId: result.insertId };
  } catch (error) {
    console.error('Error adding stake:', error);
    return { success: false, error };
  }
};





const updateMyStake = async (data) => {
  if (!data.id || !data.username) {
    return { success: false, message: 'Both id and username are required' };
  }

  const updates = { ...data };
  const id = updates.id;
  const username = updates.username;
  delete updates.id;
  delete updates.username;

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

    const sql = `UPDATE stakings SET ${fields.join(', ')} WHERE id = ? AND username = ?`;
    values.push(id, username);

    const result = await update(sql, values);
    return { success: true, affectedRows: result.affectedRows };
  } catch (error) {
    console.error('Error updating stake:', error);
    return { success: false, error };
  }
};




const deleteMyStake = async (data) => {
  const { id, username } = data;

  if (!id || !username) {
    return { success: false, message: 'Both id and username are required' };
  }

  try {
    const sql = `DELETE FROM stakings WHERE id = ? AND username = ?`;
    const values = [id, username];

    const [result] = await update(sql, values);

    if (result.affectedRows === 0) {
      return { success: false, message: 'No matching stake found to delete' };
    }

    return { success: true, message: 'Stake deleted successfully', affectedRows: result.affectedRows };
  } catch (error) {
    console.error('Error deleting stake:', error);
    return { success: false, error };
  }
};



const getMyStake = async (id) => {
  if (!id) {
    return { success: false, message: 'Stake ID is required' };
  }

  try {
    const sql = `SELECT * FROM stakings WHERE id = ?`;
    const [result] = await query(sql, [id]);

    if (!result || result.length === 0) {
      return { success: false, message: 'No stake found with the given ID' };
    }

    return { success: true, stake: result[0] };
  } catch (error) {
    console.error('Error fetching stake:', error);
    return { success: false, error };
  }
};


const getMyStakes = async (username) => {
  if (!username) {
    return { success: false, message: 'Stake username is required' };
  }

  try {
    const sql = `SELECT * FROM stakings WHERE username = '${username}'`;
    const [result] = await query(sql);
    console.log(result);
    if (!result || result.length === 0) {
      return { success: false, message: 'No stake found' };
    }

    const len = result.length;
    for(var i=0; i<len; i++) {
      try {
          result[i].asset_metadata = JSON.parse(result[i].asset_metadata);
      } 
      catch(error) 
      {
         result[i].asset_metadata = {
                                    name: "-",
                                    thumbnail: "-",
                                    category: "-"
                                };

      }  
    }
    return { success: true, data: result };
  } catch (error) {
    console.error('Error fetching stake:', error);
    return { success: false, error };
  }
};



module.exports = { 
    addMyStake,
    updateMyStake,
    deleteMyStake,
    getMyStake,
     getMyStakes
};
