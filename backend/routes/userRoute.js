const express = require('express')
const registerDB = require('../db/registerDB');

const userRoute = express.Router();


userRoute.get('/all', (req,res) => {
    let getAllUserQuery = `SELECT * FROM users`
    registerDB.query(getAllUserQuery, (error, result) => {
        if(error){
            res.status(500).json(error);
        } else {
            res.status(200).json(result);
        }
    })
})

userRoute.get('/:userID', (req,res) => {
    let getUserQuery = `SELECT * FROM users where id=${req.params.userID}`
    registerDB.query(getUserQuery, (error, result) => {
        if(error){
            res.status(500).json(error);
        } else {
            res.status(200).json(result);
        }
    })
})

userRoute.post('/new-user', (req,res) => {
    let body = req.body
    let dateTime = new Date().toISOString().slice(0, 19).replace('T', ' ')
    let addNewUserQuery = `INSERT INTO users VALUES (NULL, '${body.firstname}', '${body.lastname}', '${body.username}', '${body.password}', '${dateTime}')`
    registerDB.query(addNewUserQuery, (error, result) => {
        if(error){
            res.status(500).json(error);
        } else {
            res.status(200).json({message: 'ok'});
        }
    })
})

userRoute.post('/login', (req,res) => {
    let body = req.body
    let findUserQuery = `SELECT * FROM users where username='${body.username}' AND password='${body.password}'`
    registerDB.query(findUserQuery, (error, result) => {
        if(error){
            res.status(500).json(error);
        } else {
            res.status(200).json(result);
        }
    })
})

userRoute.put('/update/:userID', (req,res) => {
    let body = req.body
    let updateUserQuery = `UPDATE users SET firstname='${body.firstname}', lastname='${body.lastname}', username='${body.username}', password='${body.password}' WHERE id=${req.params.userID}`
    registerDB.query(updateUserQuery, (error, result) => {
        if(error){
            res.status(500).json(error);
        } else {
            res.status(200).json(result);
        }
    })
})

userRoute.delete('/remove/:userID', (req,res) => {
    let removeUserQuery = `DELETE FROM users WHERE id=${req.params.userID}`
    registerDB.query(removeUserQuery, (error, result) => {
        if(error){
            res.status(500).json(error);
        } else {
            res.status(200).json(result);
        }
    })
})

module.exports = userRoute