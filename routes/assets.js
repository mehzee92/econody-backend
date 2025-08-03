var express = require('express');
var router = express.Router();
const authenticateToken = require("./../middlewares/auth");
const assetsModel = require("./../models/assets");
const upload = require('../middlewares/upload');


router.get('/', authenticateToken, async function(req, res) {
  const causes = await assetsModel.getAssets();
    res.json(causes);
});



router.post('/add', authenticateToken, async function(req, res) {
  const user = req?.user;
  const result = await assetsModel.addAsset({...user, ...req.body});
  if(result.affectedRows==1) {
      res.status(200).json({status:"success", ...result});
  } else {
     res.status(200).json({status:"error", ...result});
  }
});


router.post('/update', authenticateToken, async function(req, res) {
  const user = req?.user;
  const result = await assetsModel.updateAsset(req.body, user);
  if(result.affectedRows==1) {
      res.status(200).json({status:"success", ...result});
  } else {
     res.status(200).json({status:"error", ...result});
  }
});




router.post('/delete', authenticateToken, async function(req, res) {
  const user = req?.user;
  const result = await assetsModel.deleteAsset(req.body.id, user);
  if(result.affectedRows==1) {
      res.status(200).json({status:"success", ...result});
  } else {
     res.status(200).json({status:"error", ...result});
  }
});



router.get('/:id',  authenticateToken,  async function(req, res) {
  const causes = await causesModel.getCause(req.params.id);
  res.json(causes);
});



module.exports = router;




