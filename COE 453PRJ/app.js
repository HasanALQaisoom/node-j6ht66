const express = require('express');
const { ObjectId } = require('mongodb');
const { connectToDb, getDb } = require('./db');

// int  app & middleware
const app = express();
app.use(express.json()); //enable us to pass any json came from the req to use it in the post

// db connection
let db;
connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log('app listening on port 3000');
    });
    db = getDb();
  }
});

//return menu
app.get('/menu', (req, res) => {
  let menu = [];
  db.collaction('menu')
    .find() //pointing to the hole menu
    .sort({ FoodType: A })
    .forEch((menu) => menu.push(menu))
    .then(() => {
      res.status(200).json(menu);
    })
    .catch(() => {
      res.status(500).json({ error: 'Could not fetch the decuments' });
    });
  res.json({ mssg: 'welcome to the API' });
});

//return specific menu
app.get('/menu/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collaction('menu')
      .findOne({ _id: ObjectId(req.params.id) })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json({ error: 'Could not fetch the decument' });
      });
  } else {
    res.status(500).json({ error: 'Not valid ID' });
  }
});

//post API
app.post('/menu', (req, res) => {
  const item = req.body;

  db.collaction('/menu')
    .insertOne(item)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Could not creat a new decument' });
    });
});
// Delet API
app.delete('/menu/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collaction('menu')
      .deleteOne({ _id: ObjectId(req.params.id) })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: 'Could not delete the decument' });
      });
  } else {
    res.status(500).json({ error: 'Not valid ID' });
  }
});

// updat API
app.patch('/menu/:id', (req, res) => {
  const updates = rq.body;

  if (ObjectId.isValid(req.params.id)) {
    db.collaction('menu')
      .updateOne({ _id: ObjectId(req.params.id) }, { $set: updates })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: 'Could not update the decument' });
      });
  } else {
    res.status(500).json({ error: 'Not valid ID' });
  }
});
