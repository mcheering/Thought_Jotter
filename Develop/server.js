const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3040
const mainDir = path.join(__dirname, "/public")
//brings in public folder files, such ass css and js so formatting works and client side functions work.  
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/notes", (req, res) => {
      res.sendFile(path.join(mainDir, "notes.html"))
})

app.get("/api/notes", (req, res) => {
      res.sendFile(path.join(__dirname, "/db/db.json"))
})

app.get("/api/notes:id", (req, res) => {
      let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"))
      res.json(savedNotes[Number(req.params.id)])
})

app.get("*", (req, res) => {
      res.sendFile([ath.join(mainDir, "index.html")])
})

app.get("/", (req, res) => {
      res.sendFile([ath.join(mainDir, "index.html")])
})

app.post("/api/notes", (req, res) => {
      let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"))
      newNote = req.body
      let uniqueID = (savedNotes.length).toString()
      newNote.id = uniqueID
      savedNotes.push(newNote)

      fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes))
      res.json(savedNotes)
})

app.delete("/api/notes/:id", (req, res) => {
      let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"))
      let noteID = req.params.id
      let newID = 0
      savedNotes = savedNotes.filter(currNote => {
            return currNote.id != noteID
      })

      for (currNote of savedNotes) {
            currNote.id = newID.toString()
            newID++
      }

      fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes))
      res.json(savedNotes)
})

app.listen(PORT);
