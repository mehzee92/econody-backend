var express = require('express');
var router = express.Router();
const authenticateToken = require("./../middlewares/auth");
const myVestingModel = require("./../models/my-vestings");



//authenticateToken
router.get('/', async function(req, res) {
  const username = "admin"
  const myAssets = await myVestingModel.getMyVestings(username);
    res.json(myAssets);
});



//authenticateToken,
router.post('/add',  async function(req, res) {
  const username =  'admin'; //req?.user;
  const result = await myVestingModel.addMyVesting({username, ...req.body});
  if(result.affectedRows==1) {
      res.status(200).json({status:"success", ...result});
  } else {
     res.status(200).json({status:"error", ...result});
  }
});

//authenticateToken,
router.post('/update',  async function(req, res) {
  const username = 'admin'; //req?.user;
  const result = await myVestingModel.updateMyAsset({...req.body, username});
  if(result.affectedRows==1) {
      res.status(200).json({status:"success", ...result});
  } else {
     res.status(200).json({status:"error", ...result});
  }
});



// authenticateToken,
router.post('/delete',  async function(req, res) {
  const user =  "admin"; //req?.user;
  const result = await myVestingModel.deleteAsset(req.body.id, user);
  if(result.affectedRows==1) {
      res.status(200).json({status:"success", ...result});
  } else {
     res.status(200).json({status:"error", ...result});
  }
});


router.get('/:id',  authenticateToken,  async function(req, res) {
  const causes = await myVestingModel.getCause(req.params.id);
  res.json(causes);
});



module.exports = router;