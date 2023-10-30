const connectToMongo = require('./connection/db');
const express = require('express')
var cors = require('cors')

connectToMongo();

const app = express()
const port = 5000


app.use(cors())

// to send in json format
app.use(express.json())

//routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`MyNotesApp listening at http://localhost:${port}`)
})


