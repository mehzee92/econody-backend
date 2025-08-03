const { query, update, toSql } = require('./db');








  const saveNonce=async(publicKey, nonce)=>  {
    try
    {
        const sql1 = "UPDATE users SET nonce=? WHERE wallet=? AND role='user';"; 
        const result = await update(sql1, [nonce, publicKey]); 
        if (result.affectedRows === 0) {
          return { status: "error", message: "Wallet not found." };
        }
        return { status: "success" };
    } 
    catch(error) 
    {
      return {status:"error", message:"Token not found"};
    }
  }  


const getLastNonce = async (publicKey) => {
  try {
    const sql1 = "SELECT nonce FROM users WHERE wallet=? AND role='user';";
    const [result] = await query(sql1, [publicKey]);
    return { status: "success", nonce: result[0]?.nonce ?? null };
  } catch (error) {
    return { status: "error", message: "Token not found" };
  }
}; 


  const getUserByRefreshToken=async(refreshToken, role="user")=> 
  {
    const sql1 = "SELECT id, username, role, name, wallet FROM users WHERE refreshToken=? AND role='user';"; 
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
        const sql1 = "UPDATE users SET last_ip=? WHERE username=? AND role='user';"; 
        const result = await update(sql1, [last_ip, username]); 
        return { status:"success", ...result};
    } 
    catch(error) 
    {
      return {status:"error", message:"Token not found"};
    }
  }  

 

const getUserDetails=async(wallet)=>{
      const sql1 = "SELECT id, username, role, name, wallet, image, created_on FROM users WHERE wallet=? AND role='user';"; 
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
    const sql = "INSERT INTO users(wallet, username, name, role) VALUES (?, ?, ?, 'user');";
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
                   " access_pin, salt, name, password, wallet, image, created_on "+
                   " FROM users "+
                   " WHERE username=? AND role='user' limit 1;"; 
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
    const sql1 = "SELECT totp_secret FROM users WHERE email=? AND role='user' limit 1;"; 
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
    const sql1 = "UPDATE users SET totp_secret=?, totp_qr=? WHERE email=? AND role='user' ;"; 
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
    const sql1 = "UPDATE users SET refreshToken='' WHERE refreshToken=? AND role='user';"; 
    const result = await update(sql1, [refreshToken]); 
    return result;
}


const fetchTotpQr = async (email) => {
  const sql = "SELECT totp_qr FROM users WHERE email = ? AND role='user' LIMIT 1;";
  const [result] = await query(sql, [email]);
  return result.length > 0 ? result[0].totp_qr : null;
};


const saveRefreshToken=async(username, refreshToken)=>{
    console.log({refreshToken, username})
    const sql = "UPDATE users SET refreshToken=? WHERE username=? AND role='user';"; 
    const result = await update(sql, [refreshToken, username]); 
    return result;
}


module.exports = {
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