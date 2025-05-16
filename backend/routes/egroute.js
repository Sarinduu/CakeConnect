// routes/imageRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const {
  uploadImageToSupabase,
  deleteImageFromSupabase,
} = require("../utils/supabaseImageHandler");

// 📤 Upload Route
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { url, filename } = await uploadImageToSupabase(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype
    );

    // Save URL and filename in DB if needed
    res.json({ url, filename });
  } catch (err) {
    console.error("Upload error:", err.message);
    res.status(500).json({ error: "Image upload failed" });
  }
});

// 🗑️ Delete Route
router.delete("/delete/:filename", async (req, res) => {
  try {
    await deleteImageFromSupabase(req.params.filename);
    res.json({ message: "Image deleted" });
  } catch (err) {
    console.error("Delete error:", err.message);
    res.status(500).json({ error: "Image deletion failed" });
  }
});

// Public route
router.get("/public", (req, res) => {
  res.send("Anyone can access this");
});

// Protected route for any logged-in user
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

// Only bakers can access
router.get("/baker/products", protect, checkRole("baker"), (req, res) => {
  res.send("Baker-only product access");
});

// Admin-only route
router.delete(
  "/admin/user/:id",
  protect,
  checkRole("admin"),
  async (req, res) => {
    // delete logic here
  }
);

router.get(
  "/protected",
  protect,
  checkRole("admin", "baker", "customer"),
  (req, res) => {
    res.send(`Hello ${req.user.role}, you're authorized!`);
  }
);

module.exports = router;
