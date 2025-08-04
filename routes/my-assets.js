var express = require('express');
var router = express.Router();
const authenticateToken = require("./../middlewares/auth");
const myAssetsModel = require("./../models/my-assets");


//authenticateToken
router.get('/', async function(req, res) {
  const username = "admin"
  const myAssets = await myAssetsModel.getMyAssets(username);
    res.json(myAssets);
});


//authenticateToken,
router.post('/add',  async function(req, res) {
  const user =  'admin'; //req?.user;
  const result = await myAssetsModel.addMyAsset({...user, ...req.body});
  if(result.affectedRows==1) {
      res.status(200).json({status:"success", ...result});
  } else {
     res.status(200).json({status:"error", ...result});
  }
});

//authenticateToken,
router.post('/update',  async function(req, res) {
  const user = 'admin'; //req?.user;
  const result = await myAssetsModel.updateMyAsset(req.body.id, {...req.body, ...user});
  if(result.affectedRows==1) {
      res.status(200).json({status:"success", ...result});
  } else {
     res.status(200).json({status:"error", ...result});
  }
});


// authenticateToken,
router.post('/delete',  async function(req, res) {
  const user =  "admin"; //req?.user;
  const result = await myAssetsModel.deleteAsset(req.body.id, user);
  if(result.affectedRows==1) {
      res.status(200).json({status:"success", ...result});
  } else {
     res.status(200).json({status:"error", ...result});
  }
});


router.get('/:id',  authenticateToken,  async function(req, res) {
  const causes = await myAssetsModel.getCause(req.params.id);
  res.json(causes);
});



module.exports = router;




