//ROTAS
const express = require('express')
const app = express()



app.use(require('./routes'))

app.listen(4000, () => {
    console.log('Welcome to EHSQ Incident Classifier. Classifier Started at port 4000')
});