const express = require("express");
const Deku = require("dekuai");
const deku = new Deku();
const app = express();

const supportedCharacters = [
  "deku", "gojo", "sukuna", "rimuru", "cid", 
  "luffy", "rudeus", "ichigo", "naruto", "boruto"
];

app.get("/cai", async (req, res) => {
  const q = req.query.prompt;
  const cid = req.query.id;
  const char = req.query.char;
  
  // Check if required parameters are missing
  if (!q || !cid || !char) {
    return res.status(400).send("Missing required parameters: 'prompt', 'id', and 'char' are required.");
  }

  // Check if the character is valid
  if (!supportedCharacters.includes(char)) {
    return res.status(400).send("Invalid character. Supported characters: " + supportedCharacters.join(", "));
  }

  try {
    const response = await deku[char](q, cid);
    res.send({ response });
  } catch (error) {
    res.status(500).send("Error occurred: " + error.message);
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
