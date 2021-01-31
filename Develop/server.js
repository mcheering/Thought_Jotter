const express = require('express')
const fs = require('fs')
const { dirname } = require('path')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3040
//brings in public folder files, such ass css and js so formatting works and client side functions work.  
app.use(express.static('public'));
app.use(express.static('db'))
//uses node's fs module to read the json file that we have named db, which is where we are storing notes. 
fs.readFile("db/db.json", "utf8", (err, data) => {

      if (err) throw err;
//sets a constant of notes to the parsed json file so that we can now send it to the history sections. 
      const notes = JSON.parse(data);

      app.get('/index.html', (req, res) => {
            res.sendFile('./public/index.html', { root: __dirname })
      })

      app.get('/notes.html', (req, res) => {
            res.sendFile('./public/notes.html', { root: __dirname })
      })

      app.get('/api/notes', (req, res) => {
            res.sendFile(path.join(__dirname, './db', 'db.json'))
      })

      

})

app.listen(PORT);
