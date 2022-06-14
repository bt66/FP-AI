require('dotenv').config()
console.log(process.env)

const express = require('express');
const db = require("./models");
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
const { check, validationResult } = require('express-validator');

db.mongoose.connect(
  `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.DB_NAME}`
  ).then(() => {
      console.log("Connection to database Success")
  })
  .catch(err => {
      console.log("Connection error ", err)
      process.exit();
  }
)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/getData/:deviceId', (req, res) => {
  db.MeasureResult.find({'deviceId':req.params.deviceId},function (err, docs) {
    console.log(docs)
    res.json(docs)
  })
})

app.get('/getData', (req, res) => {
  db.MeasureResult.find(function (err, docs) {
    console.log(docs)
    res.json(docs)
  })
})

app.post('/insertData',
  check('deviceId','deviceId is required').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  // res.send('Got a POST request')
    console.log(req.body)
    try {
      const result = await db.MeasureResult.create({
        deviceId: req.body.deviceId,
        temperature: req.body.tempereture,
        humadity: req.body.humidity,
      })
      console.log(result);
      res.json(result);
    }
    catch (error) {
      console.log(error);
      res.json(error)
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})