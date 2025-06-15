const express = require('express');
const cors = require('cors');
const app = express();

// Enable cross-origin requests from React
app.use(cors());
app.use(express.json());

app.get('/api/ping', (req, res) => {
  res.json({ message: 'Hello World!' });
});

let clickCount = 0;
app.post('/api/click', (req, res) => {
  console.log("Backend count:", clickCount);

    let resptext = ''
    if (req.body.text == "Adam") {
        resptext = "Good Job!";
    } else {
        resptext = "Wrong input!";
    };

  res.json({ count: clickCount, message: resptext });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));