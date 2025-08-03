var express = require('express');
var router = express.Router();
const authenticateToken = require("./../middlewares/auth");
const listingModel = require("./../models/listings"); // renamed from assetsModel to listingModel


router.get('/', authenticateToken, async function(req, res) {
  const listings = await listingModel.getListings(req.query); // renamed
  res.json(listings);
});


router.post('/add', authenticateToken, async function(req, res) {
  const user = req?.user;
  const result = await listingModel.addListing({ ...user, ...req.body }); // renamed
  if (result.affectedRows == 1) {
    res.status(200).json({ status: "success", ...result });
  } else {
    res.status(200).json({ status: "error", ...result });
  }
});

router.post('/update', authenticateToken, async function(req, res) {
  const user = req?.user;
  const result = await listingModel.updateListing(req.body, user); // renamed
  if (result.affectedRows == 1) {
    res.status(200).json({ status: "success", ...result });
  } else {
    res.status(200).json({ status: "error", ...result });
  }
});


router.post('/delete', authenticateToken, async function(req, res) {
  const user = req?.user;
  const result = await listingModel.deleteListing(req.body.id, user); // renamed
  if (result.affectedRows == 1) {
    res.status(200).json({ status: "success", ...result });
  } else {
    res.status(200).json({ status: "error", ...result });
  }
});

router.get('/:id', authenticateToken, async function(req, res) {
  const listing = await listingModel.getListing(req.params.id); // fixed incorrect reference to causesModel
  res.json(listing);
});



module.exports = router;
