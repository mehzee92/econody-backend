const otplib = require('otplib');
const qrcode = require('qrcode');

const getQR=async(email)=>{
    const secret = otplib.authenticator.generateSecret();
    const otpauth = otplib.authenticator.keyuri(email, 'CharCoin', secret);
  try {
    const qrCodeImageUrl = await qrcode.toDataURL(otpauth);
     return { qrCodeImageUrl, secret };
  } catch (err) 
  {
    return {success:false, message:"Failed to generate QR"};
  }
}

const verify=async(token, secret) => {
  const isValid = otplib.authenticator.check(token, secret);
  if (isValid) 
  {
     return { success: true, message: 'Token is valid' };
  } 
  else 
  {
    return { success: false, message: 'Failed to verify'};
  }
}



module.exports = {
  getQR, 
  verify 
}