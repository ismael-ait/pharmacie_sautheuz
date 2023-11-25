const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2')

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


// Connexion mysql
const pool = mysql.createPool({
    connectionLimit : 10,
    host :              'localhost',
    user :              'root',
    password :          'password8',
    database :          'Pharmacie'

})


// Test pour afficher tous les champs d'une table
app.get('', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * FROM Medecin', (err, rows) => {
            connection.release() 
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })


})


// Test pour afficher tous les champs par id
app.get('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        
        connection.query('SELECT * FROM Medecin WHERE Medecin_Id = ?', [req.params.id], (err, rows) => {
            connection.release() 
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})
































// Écoute sur le port 5000
app.listen(port, () => console.log(`Écoute sur le port ${port}`))
