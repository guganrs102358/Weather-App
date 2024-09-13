const express = require('express');
const router = express.Router();
const Data = require('./data');


router.post('/Home', async (req, res) => {
  try {
    const newData = await Data.create(req.body);
    res.status(201).json(newData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET endpoint to fetch all data
router.get('/', async (req, res) => {
  try {
    const datas = await Data.find();
    res.json(datas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;




