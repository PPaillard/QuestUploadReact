const { v4: uuidv4 } = require("uuid");
const { rename } = require("node:fs");

const express = require("express");

// Ajout de multer
const multer = require("multer");

const upload = multer({ dest: "./public/uploads/" });

const router = express.Router();

router.post("/api/avatar", upload.single("avatar"), (req, res) => {
  // req.file is the `avatar` file
  console.warn(req.file);
  const { destination, filename, originalname } = req.file;
  const uuid = uuidv4();
  rename(
    `${destination}${filename}`,
    `${destination}${uuid}${originalname}`,
    (err) => {
      if (err) throw err;
      req.filename = `${uuid}${originalname}`;
      res.send("Tout c'est bien passé!");
    }
  );
});

const itemControllers = require("./controllers/itemControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

module.exports = router;
