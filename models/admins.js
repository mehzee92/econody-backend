
const { query, update, toSql } = require('./db');
const { getPermissionsObject } = require("./../lib/rbac");



const addAdmin = async ({
  username,
  name,
  email,
  accessPin,
  phone,
  password,
  pwd,
  authenticatorApp,
  permissions,
  salt
}) => {
  // Basic validation
  if (!username || !email || !password || !pwd || !accessPin || !salt) {
    return {
      success: false,
      error: "Missing required fields: username, email, password, pwd, accessPin, or salt"
    };
  }

  // Optional: check that permissions is a string (JSON string expected)
  if (typeof permissions !== 'string') {
    return {
      success: false,
      error: "permissions must be a JSON string"
    };
  }

  const fields = " username, name, email, access_pin, phone, password, pwd, authenticatorApp, salt, permissions, role ";
  const sql = `INSERT INTO users(${fields}) VALUES(?,?,?,?,?,?,?,?,?,?,?);`;

  try {
    const result = await update(sql, [
      username,
      name,
      email,
      accessPin,
      phone,
      password,
      pwd,
      authenticatorApp,
      salt,
      permissions,
      'admin'
    ]);

    console.log(result);
    return { success: true, result };
  } catch (err) {
    return {
      success: false,
      error: "Database error: " + err.message
    };
  }
};








const updateAdmin = async ({
  id,
  username,
  name,
  email,
  accessPin,
  phone,
  password,
  permissions,
  salt
}) => {
  // Basic validation
  if (!id || !username || !email || !password || !accessPin || !salt) {
    return {
      success: false,
      error: "Missing required fields: id, username, email, password, accessPin, or salt"
    };
  }

  // Validate permissions format
  if (typeof permissions !== 'string') {
    return {
      success: false,
      error: "permissions must be a JSON string"
    };
  }

  const sql = `
    UPDATE users SET 
      username = ?,  
      name = ?, 
      email = ?, 
      access_pin = ?, 
      phone = ?, 
      password = ?, 
      salt = ?, 
      permissions = ?
    WHERE id = ? AND role='admin';
  `;

  const values = [
    username,
    name,
    email,
    accessPin,
    phone,
    password,
    salt,
    permissions,
    id
  ];

  try {
    const result = await update(sql, values);
    return {
      success: true,
      result
    };
  } catch (err) {
    return {
      success: false,
      error: "Database error: " + err.message
    };
  }
};





const deleteAdmin = async (id) => {
  if (!id) {
    return {
      success: false,
      error: "Missing required field: id"
    };
  }

  const sql = `DELETE FROM users WHERE id = ? AND role='admin';`;
  const values = [id];

  try {
    const result = await update(sql, values);

    if (result.affectedRows === 0) {
      return {
        success: false,
        error: "No admin user found with the given id"
      };
    }

    return {
      success: true,
      message: "Admin deleted successfully",
      result
    };
  } catch (err) {
    return {
      success: false,
      error: "Database error: " + err.message
    };
  }
};





const getAdmin = async (id) => {
  if (!id) {
    return {
      success: false,
      error: "Missing required field: id"
    };
  }

  const sql = `SELECT 
                id, name, username, email, phone, authenticatorApp, permissions, 
                registeration, last_login, totp_qr 
               FROM users
               WHERE id = ? AND role = 'admin'`;

  try {
    const [result] = await query(sql, [id]);

    if (!result) {
      return {
        success: false,
        error: "Admin not found"
      };
    }

    return {
      success: true,
      data: result
    };
  } catch (err) {
    return {
      success: false,
      error: "Database error: " + err.message
    };
  }
};




const getPermissions = async (id) => {
  const sql = `SELECT permissions 
               FROM users 
               WHERE id = ? AND role = 'admin' LIMIT 1`;
  const results = await query(sql, [id]);
  let permissions = "";
  if (results?.length > 0) {
    permissions = getPermissionsObject(results[0].permissions);
  }
  return permissions;
};



// ________________
  // const len = result.length;
  // for(let i=0; i<len; i++)
  // {
  //   const permissionsString = result[i].permissions;
  //   result[i].permissions = getPermissionsObject(permissionsString);
  // }
  // console.log(result);

const getAdmins = async (p = 1, limit = 10) => {
  const offset = (p - 1) * limit;

  const sql = `
    SELECT 
      id, username, name, email, access_pin AS accessPin, 
      phone, pwd AS password, authenticatorApp, 
      permissions, totp_qr
    FROM users 
    WHERE role = 'admin'
    LIMIT ? OFFSET ?
  `;

  try {
    const results = await query(sql, [limit, offset]);
    // If using mysql2 or similar, it's [rows, fields]
    const admins = Array.isArray(results) ? results[0] : results;

    return {
      success: true,
      data: admins
    };
  } catch (err) {
    return {
      success: false,
      error: "Database error: " + err.message
    };
  }
};






const saveNonce = async (publicKey, nonce) => {
  if (!publicKey || !nonce) {
    return { status: "error", message: "Missing wallet or nonce" };
  }

  try {
    const sql = `UPDATE users SET nonce = ? WHERE wallet = ? AND role = 'admin';`;
    const result = await update(sql, [nonce, publicKey]);

    if (result.affectedRows === 0) {
      return { status: "error", message: "Wallet not found." };
    }

    return { status: "success" };
  } catch (error) {
    return { status: "error", message: "Database error: " + error.message };
  }
};





const getLastNonce = async (publicKey) => {

  if (!publicKey) {
    return {
      status: "error",
      message: "Missing wallet address"
    };
  }

  try {
    const sql = "SELECT nonce FROM users WHERE wallet = ? AND role='admin';";
    const [rows] = await query(sql, [publicKey]);

    return {
      status: "success",
      nonce: rows?.[0]?.nonce ?? null
    };
  } catch (error) {
    return {
      status: "error",
      message: "Database error: " + error.message
    };
  }
};



    const getUserByRefreshToken=async(refreshToken)=> 
    {
      const sql1 = " SELECT id, username, role, name, wallet "+
                   " FROM users "+
                   " WHERE refreshToken=? AND role='admin';"; 
      const [rows] = await query(sql1, [refreshToken]); 
      if(rows.length>0) {
        return {...rows[0], status:"success"}
      } else {
        return {status:"error", message:"Token not found"}
      }
    }


    const updateLastLogin=async(username, last_ip)=> 
    {
      try
      {
          const sql1 = "UPDATE users SET last_ip=? WHERE username=?;"; 
          const result = await update(sql1, [last_ip, username]); 
          return { status:"success", ...result};
      } 
      catch(error) 
      {
        return {status:"error", message:"Token not found"};
      }
    }  

 

  const getUserDetails=async(wallet)=>{
        const sql1 = " SELECT id, username, role, name, wallet, image, "+
                     " created_on FROM users WHERE wallet=? AND role='admin' ;"; 
        const [rows] = await query(sql1, [wallet]); 
        if(rows && rows.length>0) 
        {
          return rows[0];
        }
        else 
        {
          return null;
        }
  }



  const createUser = async (wallet) => {
    if (!wallet || typeof wallet !== "string" || wallet.length < 4) {
      return null;
    }
    const name = wallet.slice(-4);
    const timestamp = Date.now();
    const last2 = timestamp.toString().slice(-2);
    const username = "u" + last2 + "_" + name;

    try {
      const sql = "INSERT INTO users(wallet, username, name, role) VALUES (?, ?, ?, 'admin');";
      const result = await update(sql, [wallet, username, name]);
      return result;
    } catch (error) {
      console.error("Error creating user:", error);
      return null;
    }
  };





  const getUserByUsername=async(username)=>{
    try 
    {
        const sql1 = " SELECT id, username, role, permissions, totp_secret, "+
                     " access_pin, salt, name, password, wallet, image, "+
                     " created_on FROM users WHERE username=? AND role='admin' limit 1;"; 
        const [rows] = await query(sql1, [username]); 
        if(rows.length>0)
        {
          return rows[0];
        }
        else 
        {
          return {status:"error"};
        }
    } 
    catch(error) 
    {
        console.log(error);
    } 
  }




  const getSecret=async(email)=>{
      const sql1 = "SELECT totp_secret FROM users WHERE email=? AND role='admin' limit 1;"; 
      const [rows] = await query(sql1, [email]); 
      if(rows.length>0)
      {
        return rows[0].totp_secret;
      }
      else 
      {
        return "";
      }
  }


  const updateTotp=async(secret, qr, email)=>
  {
      const sql1 = "UPDATE users SET totp_secret=?, totp_qr=? WHERE email=? AND role='admin';"; 
      const [rows] = await query(sql1, [secret, qr, email]); 
      if(rows.length>0)
      {
        return rows[0];
      }
      else 
      {
        return {status:"error"};
      }    
  }


  const deleteRefreshToken=async(refreshToken)=>{
      const sql1 = "UPDATE users SET refreshToken='' WHERE refreshToken=? AND role='admin';"; 
      const result = await update(sql1, [refreshToken]); 
      return result;
  }


  const fetchTotpQr = async (email) => {
    const sql = "SELECT totp_qr FROM users WHERE email = ? AND role='admin' LIMIT 1;";
    const [result] = await query(sql, [email]);
    return result.length > 0 ? result[0].totp_qr : null;
  };


  const saveRefreshToken=async(username, refreshToken)=>{
      console.log({refreshToken, username})
      const sql = "UPDATE users SET refreshToken=? WHERE username=? AND role='admin';"; 
      const result = await update(sql, [refreshToken, username]); 
      return result;
  }


module.exports = {
  addAdmin,
  getAdmin,
  getAdmins,
  getPermissions,
  updateAdmin,
  deleteAdmin,
  getUserDetails,
  getUserByUsername,
  getUserByRefreshToken,
  deleteRefreshToken,
  saveRefreshToken,
  updateTotp,
  getSecret,
  updateLastLogin,
  fetchTotpQr,
  saveNonce,
  getLastNonce,
  createUser,  
}









