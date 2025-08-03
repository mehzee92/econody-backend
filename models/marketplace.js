const { query, update, toSql } = require('./db');


const getAssetDetail=async(id)=>{
        const sql = `
                    SELECT 
                    id,
                    asset_name,
                    token_symbol,
                    token_icon,
                    currency,
                    title,
                    thumbnail,
                    ddl_agreement,
                    ownership_declaration,
                    tokenization_whitepaper,
                    revenue_distribution, 
                    buyback_policy,
                    description,
                    total_supply,
                    decimals,
                    token_standard,
                    blockchain,
                    token_address,
                    explorer_url,
                    category,
                    valuation,
                    expected_yield_percent,
                    offering_type,
                    offering_start_date,
                    offering_end_date,
                    is_fractionalized,
                    country_of_asset,
                    progress,
                    investors,
                    apr,
                    listed_quantity
                    FROM assets
                    WHERE is_listed = 1 AND status = 'active' AND id=?`;
         const [result] = await query(sql, [id]);
         return result[0];
}








const getAssetListings=async(id)=>{
        const sql = `
                    SELECT 
                        id,
                        asset_id,
                        seller_id,
                        seller_name,
                        quantity,
                        total_price,
                        cliff
                    FROM listings
                        WHERE asset_id=?`;
         const [result] = await query(sql, [id]);
         return result;
}


const getListedAssets = async (params) => {
    const { limit = 10, page = 1, title, category } = params;

    let sql = `
            SELECT 
                id, asset_name, title, category, thumbnail, 
                valuation, currency, apr, progress, investors, tags
            FROM assets
            WHERE 
                is_listed = 1
                AND status = 'active'
                AND title IS NOT NULL AND title != ''
                AND asset_name IS NOT NULL AND asset_name != ''
                AND category IS NOT NULL AND category != ''
                AND thumbnail IS NOT NULL AND thumbnail != ''
    `;

    const values = [];

    // Apply title filter (if provided)
    if (title) {
        sql += ` AND title LIKE ?`;
        values.push(`%${title}%`);
    }

    // Apply category filter (if provided)
    if (category) {
        sql += ` AND category = ?`;
        values.push(category);
    }

    // Add pagination
    const offset = (page - 1) * limit;
    sql += ` LIMIT ? OFFSET ?`;
    values.push(parseInt(limit), parseInt(offset));

    const [result] = await query(sql, values);
    return result;
};



const listAsset = async (id, value) => {
  // value 1 = listed 
  // value 0 = deslited
  const sql = `UPDATE assets SET is_listed=? WHERE id = ?`;
  const result = await update(sql, [value, id]);
  return result[0];
};


module.exports = 
{
  getListedAssets,
  listAsset,
  getAssetDetail,
  getAssetListings
};