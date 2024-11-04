import { error } from "console";
import mongoose, { Schema } from "mongoose";
import { type } from "os";



export const AnketaSchema = Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    family_status: {
        type: String,
        required: true,
        default: "Не женат / Не замужем"
    },
    university: {
        type: String,
        required: true,
    },
    place_birth: {
        type: String,
        required: true
    },
    skills: {
        type: Array,
        required: true
    }
})

export const Ankets = mongoose.model('ankets', AnketaSchema)

export async function addAnketa(req, res) {
    try {
        console.log("post = ", req.body)

        const anketa = await Ankets.create({
            name: req.body.name,
            age: req.body.age,
            family_status: req.body.family_status,
            university: req.body.university,
            place_birth: req.body.place_birth,
            skills: req.body.skills
        })
        console.log("anketa = ", anketa)
        return res.status(201).json(anketa);

    } catch (error) {
        return res.status(500).json("Ошибка: " + error)
    }
}

export async function getAnkets(req, res) {
    try {

        const ankets = await Ankets.find()
        console.log("ANNN = ", ankets)
        return res.status(200).json(ankets)
    } catch (error) {
        return res.status(500).json("Ошибка при получении анкет: ", error)
    }
}
export async function getAnketaById(req, res) {
    try {

        console.log("getAnketaById = ", req.query)
        const ankets = await Ankets.findOne({ _id: req.query.id })
        console.log("getAnketaById ankets= ", ankets)
        return res.status(200).json(ankets)
    } catch (error) {
        return res.status(500).json("Ошибка при получении анкет: ", error)
    }
}

export async function removeAnketa(req, res) {
    try {
        console.log("delete = ", req.body)
        const anketa = await Ankets.deleteOne({ _id: req.body._id });

        if (anketa.deletedCount > 0) {
            res.status(200).json({ message: 'Анкета успешно удалена' });
        } else {
            res.status(404).json({ message: 'Анкета не найдена' });
        }
    } catch (error) {
        console.error("Ошибка при удалении анкеты:", error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}

export async function updateAnketa(req, res) {
    console.log("reqUpdate = ", req.body)
    try {
        const anketa = await Ankets.updateOne({ _id: req.body._id }, {
            name: req.body.name,
            age: req.body.age,
            family_status: req.body.family_status,
            university: req.body.university,
            place_birth: req.body.place_birth,
            skills: req.body.skills
        })

        console.log("update = ", anketa)
        return res.status(201).json(anketa)
    } catch (error) {
        return res.status("Ошибка при обновлении анкеты")
    }
}