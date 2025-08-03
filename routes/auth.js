const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const config = require("./../config");
const bs58 = require('bs58').default;
const bcrypt = require('bcryptjs');
const nacl = require('tweetnacl');
const { PublicKey } = require('@solana/web3.js');
const userModel = require("./../models/user");

const getTokens=async(payload)=>
{
    const accessToken = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '10h' });
    const refreshToken = jwt.sign({id:payload.id}, config.JWT_SECRET, { expiresIn: '30d' });
    await userModel.saveRefreshToken(payload.username, refreshToken);
    return {
      accessToken, refreshToken
    }
}


const verifySignature = (message, signature, publicKey) => {
  const messageBytes = new TextEncoder().encode(message);
  const signatureBytes = bs58.decode(signature);
  const pubKeyBytes = new PublicKey(publicKey).toBytes();
  return nacl.sign.detached.verify(messageBytes, signatureBytes, pubKeyBytes);
};



// Generate a nonce for a wallet
router.post('/get-nonce', async (req, res) => {
  const { publicKey } = req.body;

  if (!publicKey) {
    return res.status(400).json({ status: "error", message: "Missing publicKey" });
  }

  try {
    const nonce = `Login request at ${new Date().toISOString()} by ${publicKey}`;
    await userModel.saveNonce(publicKey, nonce);

    const result = await userModel.getLastNonce(publicKey);

    if (!result) {
      return res.status(500).json({ status: "error", message: "Failed to fetch nonce" });
    }

    res.json({ status: "success", nonce: result.nonce });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Internal server error", error: err.message });
  }
});





// Login endpoint (returns JWT)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  // Check if username or password is missing
  if (!username || !password) {
    return res.status(400).json({ status: "error", message: "Username and password are required." });
  }

  try {
    const result = await userModel.getUserByUsername(username);

    if (!result) {
      return res.status(401).json({ status: "error", message: 'Invalid credentials' });
    }

    const salt = result.salt;
    const passwordHashFromDB = result.password;
    const hashedPassword = bcrypt.hashSync(password + config.JWT_SECRET, salt);

    if (username === result.username && hashedPassword === passwordHashFromDB) {
      const payload = {
        username,
        role: result.role,
        wallet: result.wallet,
        name: result.name,
        id: result.id
      };

      const { refreshToken, accessToken } = await getTokens(payload);

      res.json({ status: "success", refreshToken, accessToken, ...payload });
    } else {
      res.status(401).json({ status: "error", message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Something went wrong",
      error: err.message || err
    });
  }
});





// Login endpoint (returns JWT)
router.post('/token', async(req, res) => {
  const refreshToken = req.body.refreshToken;
  const errorResponse = {status:"error", message:"Wrong refresh token received."}
  
  if(!refreshToken) 
  {
     errorResponse.message = "Refresh token not received."
     res.status(401).json(errorResponse);
     return;
  }

  const result =  await userModel.getUserByRefreshToken(refreshToken)

  if(result && result.id)
  {
    const payload = { username:result.username, role:result.role, wallet:result.wallet, name:result.name, id:result.id };
    const accessToken = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '2h' });
    res.json({status:"success", accessToken, ...result});    
    return;
  } 
  else 
  {
    errorResponse.message = "Refresh token failed to verify."
    res.status(401).json(errorResponse);
  }

});





router.delete('/token', async(req, res) => 
{
  const refreshToken = req.headers["refresh-token"];
  if(!refreshToken) {
    res.json({status:"error", message:"refreshToken not provided."});
    return;
  } 
  const result =  await userModel.deleteRefreshToken(refreshToken); 
  res.status(200).json({status:"success", ...result});
});


router.get("/profile", async(req, res)=>{
   const { publicKey } = req.body;
   const result = await userModel.getUserDetails(publicKey);
   res.status(200).json(result);
})





router.post('/verify-signature', async (req, res) => {
  const { signature, publicKey } = req.body;

  if (!signature || !publicKey) {
    return res.json({ status: "error", message: "Missing signature or publicKey" });
  }

  const result = await userModel.getLastNonce(publicKey);
  const nonce = result?.nonce;

  if (!nonce) {
    return res.json({ status: "error", message: "Nonce not found or already used" });
  }

  let payload = await userModel.getUserDetails(publicKey);

  if (!payload) {
    const createResult = await userModel.createUser(publicKey); // Add await
    if (!createResult) {
      return res.status(500).json({ status: "error", message: "User creation failed" });
    }
    payload = await userModel.getUserDetails(publicKey);
  }

  try {
    const isVerified = verifySignature(nonce, signature, publicKey);

    if (isVerified) {
      const { refreshToken, accessToken } = await getTokens(payload);
      return res.json({ status: "success", refreshToken, accessToken, ...payload });
    } else {
      return res.json({ status: "error", message: "Signature verification failed" });
    }
  } catch (err) {
    return res.status(500).json({ status: "error", message: "Server error: " + err.message });
  }
});






module.exports = router;
