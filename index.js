const express = require("express");  // Thêm dấu ngoặc kép
const app = express();
const port = process.env.PORT || 3000;  // Thêm dấu chấm phẩy

// Khai bao bien codes de luu tru ma
let codes = {};

app.use(express.json());

// Route cho duong dan goc
app.get("/", (req, res) => {  // Sửa cú pháp arrow function và thêm đường dẫn
  res.send("Server is running!");  // Thêm dấu ngoặc kép
});

// Endpoint de nhan ma tu may A
app.post("/send-code/:profileId", (req, res) => {  // Sửa đường dẫn và arrow function
  const profileId = req.params.profileId;
  const code = req.body.code;
  codes[profileId] = code;
  console.log(`Received code for profile ${profileId}: ${code}`);
  res.send("Code received");  // Thêm dấu ngoặc kép
});

// Endpoint de may B lay ma
app.get("/get-code/:profileId", (req, res) => {  // Sửa đường dẫn và arrow function
  const profileId = req.params.profileId;
  const code = codes[profileId];

  if (code) {
    res.json({ code });
  } else {
    res.json({ success: false });  // Thêm dấu hai chấm
  }
});

app.listen(port, () => {  // Sửa arrow function
  console.log(`Server running at http://localhost:${port}`);  // Sửa URL
});
