const { query, update, toSql } = require('./db');

const addStaking = async (data) => {
  const {
    user_wallet,
    token_address,
    staked_amount,
    staking_package,
    staking_start,
    staking_end,
    reward_rate_percent,
    reward_amount = 0.0,
    claimed_rewards = 0.0,
    status = 'active',
  } = data;

  const sql = `
    INSERT INTO staking_records (
      user_wallet, token_address, staked_amount, staking_package,
      staking_start, staking_end, reward_rate_percent, reward_amount,
      claimed_rewards, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    user_wallet,
    token_address,
    staked_amount,
    staking_package,
    toSql(staking_start),
    toSql(staking_end),
    reward_rate_percent,
    reward_amount,
    claimed_rewards,
    status,
  ];

  return await update(sql, values);
};

const getStaking = async (id) => {
  const sql = `SELECT * FROM staking_records WHERE id = ?`;
  const [result] = await query(sql, [id]);
  return result;
};

const getStakings = async (limit = 50) => {
  const sql = `
    SELECT id, user_wallet, token_address, staked_amount, staking_package,
           staking_start, staking_end, reward_rate_percent, reward_amount,
           claimed_rewards, status, created_at, updated_at
    FROM staking_records
    ORDER BY id DESC
    LIMIT ?
  `;
  const [result] = await query(sql, [limit]);
  return result;
};

const updateStaking = async (id, data) => {
  const fields = [];
  const values = [];

  Object.entries(data).forEach(([key, value]) => {
    fields.push(`${key} = ?`);
    values.push(toSql(value));
  });

  const sql = `UPDATE staking_records SET ${fields.join(', ')} WHERE id = ?`;
  await query(sql, [...values, id]);

  return { status: "success", message: "Staking record updated successfully" };
};

const deleteStaking = async (id) => {
  const sql = `DELETE FROM staking_records WHERE id = ?`;
  await query(sql, [id]);
  return { status: "success", message: "Staking record deleted" };
};


module.exports = {
  addStaking,
  getStaking,
  getStakings,
  updateStaking,
  deleteStaking,
};

