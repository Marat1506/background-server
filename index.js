// 'mongodb+srv://maratmirzabalaev:15062004marat@cluster0.sctfqvp.mongodb.net/Abistep'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { addAnketa, getAnketaById, getAnkets, removeAnketa, updateAnketa } from './anketaService.js'

const app = express()
const port = 3000

const url = 'mongodb+srv://maratmirzabalaev:15062004marat@cluster0.1egkm.mongodb.net/'
mongoose
.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then((res) => console.log("Connect to DB"))
.catch((err) => console.log("DB vonnection error:" + err))

app.use(express.json())
app.use(cors())


app.get('/getAnkets', async(req, res) => {
    getAnkets(req, res)
})
app.get('/getAnketaById', async(req, res) => {
    getAnketaById(req, res)
})
app.post('/addAnketa', async (req, res) => {
    addAnketa(req, res)
  });
app.post('/removeAnketa', (req, res) => {
    removeAnketa(req, res)
})
app.post('/updateAnketa', async(req, res) => {
    updateAnketa(req, res)
})

app.listen(port, () => {
    console.log("conncet to 3000 port")
})
