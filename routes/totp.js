const express = require('express');
const router = express.Router();
const totp = require("./../lib/totp");
const userModel = require("./../models/user"); 
const authenticateToken = require("./../middlewares/auth");


// authenticateToken

router.post('/gen-qr', async(req, res) => {
  const { email } = req.body;
  
  const _totp  = await totp.getQR(email);
  await userModel.updateTotp(_totp.secret, _totp.qrCodeImageUrl, email);


  res.json({email, qrImageData:_totp.qrCodeImageUrl});
});


router.post('/verify', async(req, res) => {
  const { email, token } = req.body;
  const secret = await userModel.getSecret(email);
  const valid  = await totp.verify(token, secret);
  res.json({email, secret, valid:valid.success, token});
});

module.exports = router;
