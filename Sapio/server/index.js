// express imports
const express = require('express');
const cors = require('cors');
const app = express();

// helping function imports

const { handleQueryRequest } = require('./controllers/dataController');

// Enable cross-origin requests from React
app.use(cors());
app.use(express.json());

app.post('/api/get-data', handleQueryRequest);

app.get('/api/ping', (req, res) => {
  res.json({ message: 'Hello World!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));