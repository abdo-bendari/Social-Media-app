import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import { bootstrap } from './src/bootstrap.js'
const app = express()
const port = process.env.PORT||3000
app.use('/uploads',express.static('uploads'))
app.use(cors())
app.use(helmet())
app.use(morgan("common"))
bootstrap(app,express)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))