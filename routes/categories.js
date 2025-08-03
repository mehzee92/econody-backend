const express = require('express');
const router = express.Router();
const authenticateToken = require("./../middlewares/auth");
const categoriesModel = require("./../models/categories"); // renamed from assetsModel

// Get all categories
router.get('/',  async function (req, res) {
  try {
    const categories = await categoriesModel.getCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});


// Add new category
router.post('/add', authenticateToken, async function (req, res) {
  try {
    const result = await categoriesModel.addCategory(req.body);
    if (result.affectedRows === 1) {
      res.status(200).json({ status: "success", ...result });
    } else {
      res.status(200).json({ status: "error", ...result });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});



// Update category
router.post('/update', authenticateToken, async function (req, res) {
  try {
    const result = await categoriesModel.updateCategory(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Delete category
router.post('/delete', authenticateToken, async function (req, res) {
  try {
    const result = await categoriesModel.deleteCategory(req.body.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Get single category by ID
router.get('/:id', authenticateToken, async function (req, res) {
  try {
    const category = await categoriesModel.getCategory(req.params.id);
    res.json(category);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

module.exports = router;
