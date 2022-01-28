require('dotenv').config()
const express = require('express');
const sequelize = require('./db.js')
const models = require('./models/models.js')
const cors = require('cors')
const path = require('path')
const PORT = process.env.PORT;

const router = require('./routes/index.js')
const app = express();

const errorHandler = require('./middleware/ErrorHandlingMiddleware.js')
const fileUpload = require('express-fileupload')
app.use(cors())
app.use(express.json())
app.use('/static', express.static(path.resolve(__dirname, 'static')))

app.use(fileUpload({}))

app.use('/api', router)

// обработка ошибок, последний middleware
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log('server is running on port ' + PORT)
        })
    } catch (e) {
        console.log(e);
    }

}


start()

