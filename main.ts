import express from 'express'
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/users-list', (req, res) => {
    const usersList = req.body;
    
    res.send({
      message: 'New user was added to the list',
    });
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})