var express = require('express');
var router = express.Router();
const authenticateToken = require("./../middlewares/auth");
const adminsModel = require("./../models/admins");

const { getPermissionKeys, roles } = require("./../lib/rbac");
const config = require("../config");
const bcrypt = require('bcryptjs');
const totp = require("../lib/totp");



router.get('/', authenticateToken, async function(req, res) {
    if(req.user.username != "admin") {
        res.json({status:"error", data:[], message:"only admin can perform this operation"});
        return;
    }  
    const admins = await adminsModel.getAdmins();
  res.json(admins);
});


router.get('/permissions', authenticateToken, async function(req, res) {
    const id = req.user.id;
    const permissionsObject = await adminsModel.getPermissions(id);
    res.json(permissionsObject);
});


router.get('/permissions-object', authenticateToken, async function(req, res) {
    if(req.user.username != "admin") {
        res.json({status:"error", message:"only admin can perform this operation"});
        return;
    }  
    const { id } = req.query;
    const permissionsObject = await adminsModel.getPermissions(id);
    res.json(permissionsObject);
});




router.get('/:id', authenticateToken, async function(req, res) {
    if(req.user.username != "admin") {
        res.json({status:"error", message:"only admin can perform this operation"});
        return;
    }  
    const admins = await adminsModel.getAdmin(req.params.id);
  res.json(admins);
});



router.post('/delete', authenticateToken, async function(req, res) {
    if(req.user.username != "admin") {
        res.json({status:"error", message:"only admin can perform this operation"});
        return;
    }

    const result = await adminsModel.deleteAdmin(req.body.id);
    if(result.affectedRows>0)
    {
        res.json({status:"success"});
    } else {
       res.json({status:"error", ...result});
    }
});



router.post('/add', authenticateToken, async function(req, res) {

    if(req.user.username != "admin") {
        res.json({status:"error",  message:"only admin can perform this operation"});
        return;
    }  

    const permissions = getPermissionKeys(req.body.permissions, roles)

    const { username, name, email, accessPin, phone, password,  authenticatorApp  } = req.body;
      const pwd = password;
      const salt = bcrypt.genSaltSync(10);
      console.log({salt})
      const hashedPassword = bcrypt.hashSync(password+config.JWT_SECRET, salt);
    

    const result = await adminsModel.addAdmin({ 
      username, 
      name, 
      email, 
      accessPin,  
      phone,
      password:hashedPassword, 
      salt,
      permissions,
      authenticatorApp,
      pwd
    });


    if(result?.errno)
    {
      res.json({status:"error", message:result.message}); 
      return;
    } 

    const _totp  = await totp.getQR(email);
    await adminsModel.updateTotp(_totp.secret, _totp.qrCodeImageUrl, email);


    res.json({status:"success", message:"Admin added successfully", });
  
});

router.post('/update', authenticateToken, async function(req, res) {

    if(req.user.username != "admin") {
        res.json({status:"error",  message:"only admin can perform this operation"});
        return;
    } 

    const permissions = getPermissionKeys(req.body.permissions, roles)
    const { id, username, name, email, accessPin,  password, phone  } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password+config.JWT_SECRET, salt);

    const result = await adminsModel.updateAdmin({ 
      id,
      username, 
      name, 
      email, 
      accessPin,  
      phone,
      password:hashedPassword, 
      salt,
      permissions
    });

    if(result?.errno)
    {
      res.json({status:"error", message:result.message}); 
      return;
    } 

    res.json({status:"success", message:"Admin added successfully", });
});


router.post('/update-totp', authenticateToken, async function(req, res) { 

    if(req.user.username != "admin") {
        res.json({status:"error",  message:"only admin can perform this operation"});
        return;
    }   

    const { email } = req.body;
    const _totp  = await totp.getQR(email);
    await adminsModel.updateTotp(_totp.secret, _totp.qrCodeImageUrl, email);  
    const totp_qr = await adminsModel.fetchTotpQr(email);

    if(totp_qr)
    {
      res.json({status:"success", totp_qr});
    } else {
      res.json({status:"error"});
    }


});


module.exports = router;