var express = require("express");
var cors = require("cors");
require("dotenv").config();
const multer = require("multer");

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/fileanalyse", function (req, res) {
  const upload = multer({ dest: "uploads/" }).single("upfile");

  upload(req, res, function (err) {
    if (err) {
      return res.status(400).json({ error: "File upload failed" });
    }
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    res.json({
      name: file.originalname,
      type: file.mimetype,
      size: file.size,
    });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
