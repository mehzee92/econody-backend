var express = require('express');
var router = express.Router();
const authenticateToken = require("./../middlewares/auth");
const marketplaceModel = require("./../models/marketplace");



// authenticateToken,
router.get('/',  async function(req, res) {
    if(!req.query) {
     req.query = {
        page:1,
        limit:10
     }
  }
    const marketplace = await marketplaceModel.getListedAssets(req.query);
    res.json(marketplace);
});


router.get('/asset-detail',   async function(req, res) {
  const id = req.query.id;
  const marketplace = await marketplaceModel.getAssetDetail(id);
  res.json(marketplace);
});


router.get('/asset-listings/:id',   async function(req, res) 
{
  const id = req.params.id;
  const marketplace = await marketplaceModel.getAssetListings(id);
  res.json(marketplace);
});





router.post('/list', authenticateToken, async function(req, res) {
  const user = req?.user;
  const result = await marketplaceModel.addAsset({...user, ...req.body});
  if(result.affectedRows==1) {
      res.status(200).json({status:"success", ...result});
  } else {
     res.status(200).json({status:"error", ...result});
  }
});


module.exports = router;




