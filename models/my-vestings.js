const { update, query, toSql } = require("./db");

const addMyVestings = async (data) => {
  const {
    wallet_address,
    token_address,
    total_allocated,
    start_date,
    cliff_duration_days,
    vesting_duration_days,
    vesting_interval_days,
    tokens_released = 0,
    last_release_date = null,
    is_active = 1,
    status = "active",
    asset_metadata // required JSON string
  } = data;

  const sql = `
    INSERT INTO vesting_schedules (
      wallet_address,
      token_address,
      total_allocated,
      start_date,
      cliff_duration_days,
      vesting_duration_days,
      vesting_interval_days,
      tokens_released,
      last_release_date,
      is_active,
      status,
      asset_metadata
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    wallet_address,
    token_address,
    total_allocated,
    toSql(start_date),
    cliff_duration_days,
    vesting_duration_days,
    vesting_interval_days,
    tokens_released,
    last_release_date ? toSql(last_release_date) : null,
    is_active,
    status,
    asset_metadata // already a JSON string, required
  ];

  try {
    const [result] = await update(sql, values);
    return { success: true, insertId: result.insertId };
  } catch (error) {
    console.error("Error adding vesting:", error);
    return { success: false, error };
  }
};






const updateMyAsset = async (data) => {
  // Extract and remove id and username from data
  const vestingId = data.id;
  delete data.id;

  const username = data.username;
  delete data.username;

  // If nothing left to update
  if (Object.keys(data).length === 0) {
    return { success: false, error: "No fields provided to update." };
  }

  // Prepare dynamic SQL
  const fields = [];
  const values = [];

  for (let key in data) {
    let value = data[key];

    if (
      (key === "start_date" || key === "last_release_date") &&
      value !== null &&
      value !== undefined
    ) {
      value = toSql(value);
    }

    fields.push(`${key} = ?`);
    values.push(value);
  }

  // Add WHERE clause values
  const sql = `
    UPDATE vesting_schedules
    SET ${fields.join(", ")}
    WHERE id = ? AND username = ?
  `;

  values.push(vestingId, username);

  try {
    const [result] = await update(sql, values);
    return { success: true, affectedRows: result.affectedRows };
  } catch (error) {
    console.error("Error updating vesting:", error);
    return { success: false, error };
  }
};





const deleteMyStake = async ({ id, username }) => {
  if (!id || !username) {
    return { success: false, error: "Missing id or username." };
  }

  const sql = `
    DELETE FROM vesting_schedules
    WHERE id = ? AND username = ?
  `;

  try {
    const [result] = await update(sql, [id, username]);
    return {
      success: true,
      affectedRows: result.affectedRows
    };
  } catch (error) {
    console.error("Error deleting stake:", error);
    return { success: false, error };
  }
};



const getMyVestings = async (username) => {
  if (!username) {
    return { success: false, error: "Missing username." };
  }

  const sql = `
    SELECT 
      id,
      wallet_address,
      token_address,
      total_allocated,
      start_date,
      cliff_duration_days,
      vesting_duration_days,
      vesting_interval_days,
      tokens_released,
      last_release_date,
      is_active,
      status,
      asset_metadata
    FROM vesting_schedules
    WHERE username = ?
  `;

  try {
    const [rows] = await query(sql, [username]);

    const len = rows.length;
    for(var i=0; i<len; i++) 
    {
        try {
          rows[i].asset_metadata = JSON.parse(rows[i].asset_metadata);
        } catch(error) 
        {
          rows[i].asset_metadata = {name:"-", thumbnail:"-", category:"-"}
        }
        
    }
    return rows;
  } catch (error) {
    console.error("Error fetching vestings:", error);
    return { success: false, error };
  }
};




module.exports = {
  addMyVestings, 
  updateMyAsset, 
  deleteMyStake,
  getMyVestings
};
