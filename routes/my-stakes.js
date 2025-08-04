const express = require('express');
const router = express.Router();
const authenticateToken = require("./../middlewares/auth");
const myStakesModel = require("./../models/my-stakes");

// GET all stakes (protected)
// authenticateToken,
router.get('/',  async function(req, res) {
  const username = "admin";
  const myAssets = await myStakesModel.getMyStakes(username);
  res.json(myAssets);
});






// Add new stake
router.post('/add', authenticateToken, async function(req, res) {
  const username = req.user?.username || "admin";
  const result = await myStakesModel.addMyStakes({ username, ...req.body });
  if (result.affectedRows === 1) {
    res.status(200).json({ status: "success", ...result });
  } else {
    res.status(400).json({ status: "error", ...result });
  }
});

// Update stake
router.post('/update', authenticateToken, async function(req, res) {
  const username = req.user?.username || "admin";
  const result = await myStakesModel.updateMyAsset(req.body.id, { ...req.body, username });
  if (result.affectedRows === 1) {
    res.status(200).json({ status: "success", ...result });
  } else {
    res.status(400).json({ status: "error", ...result });
  }
});

// Delete stake
router.post('/delete', authenticateToken, async function(req, res) {
  const username = req.user?.username || "admin";
  const result = await myStakesModel.deleteAsset(req.body.id, username);
  if (result.affectedRows === 1) {
    res.status(200).json({ status: "success", ...result });
  } else {
    res.status(400).json({ status: "error", ...result });
  }
});

// Get stake by ID
router.get('/:id', authenticateToken, async function(req, res) {
  const stake = await myStakesModel.getMyStake(req.params.id);
  res.json(stake);
});

module.exports = router;
