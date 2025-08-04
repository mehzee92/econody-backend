const express = require('express');
const router = express.Router();
const authenticateToken = require("./../middlewares/auth");
const galleryModel = require("./../models/galleryModel");

// Get all images by asset_id
router.get('/asset/:asset_id', /* authenticateToken, */ async function (req, res) {
    try {
        const asset_id = parseInt(req.params.asset_id);
        const images = await galleryModel.getGalleryByAsset(asset_id);
        res.json({ status: "success", data: images });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Server error", error });
    }
});

// Get a single image by id
router.get('/:id', /* authenticateToken, */ async function (req, res) {
    try {
        const id = parseInt(req.params.id);
        const image = await galleryModel.getGalleryImageById(id);
        res.json(image);
    } catch (error) {
        res.status(500).json({ status: "error", message: "Server error", error });
    }
});



// Add a new image
router.post('/add', /* authenticateToken, */ async function (req, res) {
    try {
        const { asset_id, image_url } = req.body;
        const result = await galleryModel.addGalleryImage({ asset_id, image_url });

        if (result.success) {
            res.status(200).json({ status: "success", ...result });
        } else {
            res.status(400).json({ status: "error", ...result });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: "Server error", error });
    }
});

// Update image by id
router.post('/update', /* authenticateToken, */ async function (req, res) {
    try {
        const { id, ...updates } = req.body;
        const result = await galleryModel.updateGalleryImage(id, updates);

        if (result.success) {
            res.status(200).json({ status: "success", ...result });
        } else {
            res.status(400).json({ status: "error", ...result });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: "Server error", error });
    }
});

// Soft-delete (deactivate) an image
router.post('/delete', /* authenticateToken, */ async function (req, res) {
    try {
        const { id } = req.body;
        const result = await galleryModel.deleteGalleryImage(id);

        if (result.success) {
            res.status(200).json({ status: "success", ...result });
        } else {
            res.status(400).json({ status: "error", ...result });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: "Server error", error });
    }
});

module.exports = router;
