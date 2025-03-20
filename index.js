const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Store codes in memory
let codes = {};

app.use(express.json());

// Route cho đường dẫn gốc
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Endpoint để nhận mã từ máy A
app.post("/send-code/:profileId", (req, res) => {
  const profileId = req.params.profileId;
  const code = req.body.code;
  
  // Kiểm tra dữ liệu
  if (!code) {
    return res.status(400).json({ error: "Missing code in request body" });
  }
  
  codes[profileId] = code;
  console.log(`Received code for profile ${profileId}: ${code}`);
  res.json({ success: true, message: "Code received" });
});

// Endpoint để máy B lấy mã
app.get("/get-code/:profileId", (req, res) => {
  const profileId = req.params.profileId;
  const code = codes[profileId];

  if (code) {
    res.json({ 
      status: "1",
      code: code 
    });
  } else {
    res.json({ 
      status: "0"
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
