const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const registerDB = require('./db/registerDB')
const userRoute = require('./routes/userRoute')

const app = express()
const port = 2020
app.use(bodyParser.json())
app.use(cors())
app.listen(port, () => {
    console.log(`server run on port ${port}`);
})

registerDB.connect((error) => {
    if(error){
        console.log(error);
    } else{
        console.log('connect to register db');
    }
})

app.use('/api/users', userRoute)