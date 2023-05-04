const express = require('express')
const mysql = require('mysql')

const app = express()
const PORT = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'app'
}

const queryStudents = (res) => {
  let table = '<table>'
  try{
    const connect = mysql.createConnection(config)
    connect.query(
      `CREATE TABLE IF NOT EXISTS 
        app.student(
          id INT NOT NULL AUTO_INCREMENT,
          name VARCHAR(255) NOT NULL,
          PRIMARY KEY (id)
        )`
    )
    connect.query(
      `INSERT INTO student(name) 
      VALUES('Ketty'), ('John'), ('Tim')`
    )

    connect.query(
      `SELECT * FROM student`, 
      (error, results) => {
        if (error) throw error

        table += '<tr><th>Id</th><th>Students</th></tr>'       
        results.forEach(student => {
          table = table + `<tr><td>${student.id}</td><td>${student.name}</td></tr>`
        })
        table = table + '</table>'

        res.send(`<h1>Full Cycle Rocks!!</h1>
          ${table}`
        )
      }
    )
    connect.end()
  } catch(e) {
    console.error(e)
  }
}

app.get('/', (_, res) => {
  queryStudents(res)
})

app.listen(PORT, ()=> {
  console.log(`Running on port: ${PORT}`)
})
