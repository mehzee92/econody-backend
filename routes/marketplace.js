var express = require('express');
var router = express.Router();
const authenticateToken = require("./../middlewares/auth");
const marketplaceModel = require("./../models/marketplace");



// authenticateToken,
router.get('/', async (req, res) => {
  try {
    // Destructure with defaults
    const { page = 1, limit = 10, ...otherQueryParams } = req.query;

    // Validate page and limit
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    if (isNaN(pageNum) || pageNum < 1 || isNaN(limitNum) || limitNum < 1) {
      return res.status(400).json({ status: 'error', message: 'Invalid page or limit value' });
    }

    // Fetch data
    const marketplace = await marketplaceModel.getListedAssets({
      page: pageNum,
      limit: limitNum,
      ...otherQueryParams
    });

    res.json({ status: 'success', data: marketplace });
  } catch (err) {
    console.error('Error fetching marketplace data:', err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
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




