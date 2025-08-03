const { query, update, toSql } = require('./db');

const addVesting = async (data) => {
  const {
    wallet_address,
    token_address,
    total_allocated,
    start_date,
    cliff_duration_days = 0,
    vesting_duration_days,
    vesting_interval_days = 30,
    tokens_released = 0,
    last_release_date,
    is_active = 1,
    status,
    created_by,
    modified_by
  } = data;

  const sql = `
    INSERT INTO vesting_schedules (
      wallet_address, token_address, total_allocated, start_date,
      cliff_duration_days, vesting_duration_days, vesting_interval_days,
      tokens_released, last_release_date, is_active,
      status, created_by, modified_by
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
    toSql(last_release_date),
    is_active,
    status,
    created_by,
    modified_by
  ];

  return await update(sql, values);
};

const getVesting = async (id) => {
  const sql = `SELECT * FROM vesting_schedules WHERE id = ?`;
  const [result] = await query(sql, [id]);
  return result;
};

const getVestings = async (limit = 50) => {
  const sql = `
    SELECT id, wallet_address, token_address, total_allocated, start_date,
           cliff_duration_days, vesting_duration_days, vesting_interval_days,
           tokens_released, last_release_date, is_active,
           status, created_by, created_on, modified_by, modified_on
    FROM vesting_schedules
    ORDER BY id DESC
    LIMIT ?
  `;
  const [result] = await query(sql, [limit]);
  return result;
};

const updateVesting = async (id, data) => {
  const fields = [];
  const values = [];

  Object.entries(data).forEach(([key, value]) => {
    fields.push(`${key} = ?`);
    values.push(toSql(value));
  });

  const sql = `UPDATE vesting_schedules SET ${fields.join(', ')} WHERE id = ?`;
  await query(sql, [...values, id]);

  return { status: "success", message: "Vesting record updated successfully" };
};

const deleteVesting = async (id) => {
  const sql = `DELETE FROM vesting_schedules WHERE id = ?`;
  await query(sql, [id]);
  return { status: "success", message: "Vesting record deleted" };
};

module.exports = {
  addVesting,
  getVesting,
  getVestings,
  updateVesting,
  deleteVesting
};
