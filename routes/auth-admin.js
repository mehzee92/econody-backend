const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const config = require("../config");
const bcrypt = require('bcryptjs');
const adminsModel = require("./../models/admins");
const totp = require("../lib/totp");


const getTokens=async(payload)=>
{
    const accessToken = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '10h' });
    const refreshToken = jwt.sign({id:payload.id}, config.JWT_SECRET, { expiresIn: '30d' });
    await adminsModel.saveRefreshToken(payload.username, refreshToken);
    return {
      accessToken, refreshToken
    }
}


router.post('/login',    async(req, res) =>  {
    
    const { 
        username, 
        pin, 
        token, 
        password } = req.body;

    console.log({username, pin, token, password});

    let result
    try {
        result = await adminsModel.getUserByUsername(username);
    } 
    catch(error)
    {
        console.log(error)
    }



    if(!result) {
        res.status(401).json({status:"error", message: 'User not found'});
        return;
    }

    const salt = result.salt;
    const passwordHashFromDB = result.password;
    const hashedPassword = bcrypt.hashSync(password+config.JWT_SECRET, salt);

    const valid  = await totp.verify(token, result.totp_secret);

    console.log(valid);

    if(!valid.success)
    {
        res.status(401).json({status:"error", valid, message: 'Wrong token'});
        return;
    }

    if(hashedPassword !== passwordHashFromDB)
    {
        return res.status(401).json({status:"error", message: 'Wrong password'});
         return;
    }


    if (hashedPassword === passwordHashFromDB &&  pin==result.access_pin) 
    {
        const payload = { username, permissions:result.permissions, role:result.role, wallet:result.wallet, name:result.name, id:result.id };

        const { refreshToken, accessToken } = await getTokens(payload);

        // const last_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        // adminsModel.updateLastLogin(username, last_ip);

        res.json({status:"success", refreshToken, accessToken, ...payload });   
        
    } 
    else 
    {
        res.status(401).json({status:"error", ...result, message: 'Invalid credentials'});
    }    
});




module.exports = router;
