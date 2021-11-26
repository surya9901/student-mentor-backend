const port = process.env.PORT || 5000

const express = require("express")
const app = express()
app.use(express.json())

const dotenv = require("dotenv")
dotenv.config()

const cors = require("cors")
app.use(cors({
    origin: "*"
}))

const mongodb = require("mongodb")
const mongoClient = mongodb.MongoClient;
const url = process.env.DB || "mongodb://localhost:27017"

app.get("/mentor", async (req, res) => {
    try {
        let client = await mongoClient.connect(url)
        let db = client.db("student_mentor")
        let data = await db.collection("mentor").find().toArray()
        await client.close();
        res.json(data);
    } catch (error) {
        res.status(500).json({
            message: "something went wrong"
        })
    }
})

app.post("/create-mentor", async (req, res) => {
    try {
        let client = await mongoClient.connect(url);
        let db = client.db("student_mentor")
        let data = await db.collection("mentor").insertOne(req.body)
        await client.close();
        res.json({
            message: "Mentor Created"
        })
    } catch (error) {
        res.status(500).json({
            message: "something went wrong"
        })
    }
})

app.delete("/delete-mentor/:id", async (req, res) => {
    try {
        let client = await mongoClient.connect(url)
        let db = client.db("student_mentor")
        let data = await db.collection("mentor").findOneAndDelete({ _id: mongodb.ObjectId(req.params.id) })
        await client.close()
        res.json({
            message: "Mentor deleted"
        })
    } catch (error) {
        res.status(500).json({
            message: "something went wrong"
        })
    }
})

app.put("/edit-mentor/:id", async (req, res) => {
    try {
        let client = await mongoClient.connect(url)
        let db = client.db("student_mentor")
        let data = await db.collection("mentor").findOneAndUpdate({ _id: mongodb.ObjectId(req.params.id) }, { $set: req.body })
        await client.close()
        res.json({
            message: "Mentor updated"
        })
    } catch (error) {
        res.status(500).json({
            message: "something went wrong"
        })
    }
})

app.get("/student", async (req, res) => {
    try {
        let client = await mongoClient.connect(url)
        let db = client.db("student_mentor")
        let data = await db.collection("student").find().toArray()
        await client.close();
        res.json(data);
    } catch (error) {
        res.status(500).json({
            message: "something went wrong"
        })
    }
})

app.post("/create-student", async (req, res) => {
    try {
        let client = await mongoClient.connect(url);
        let db = client.db("student_mentor")
        let data = await db.collection("student").insertOne(req.body)
        await client.close();
        res.json({
            message: "Student Created"
        })
    } catch (error) {
        res.status(500).json({
            message: "something went wrong"
        })
    }
})

app.delete("/delete-student/:id", async (req, res) => {
    try {
        let client = await mongoClient.connect(url)
        let db = client.db("student_mentor")
        let data = await db.collection("student").findOneAndDelete({ _id: mongodb.ObjectId(req.params.id) })
        await client.close()
        res.json({
            message: "Student deleted"
        })
    } catch (error) {
        res.status(500).json({
            message: "something went wrong"
        })
    }
})

app.put("/edit-student/:id", async (req, res) => {
    try {
        let client = await mongoClient.connect(url)
        let db = client.db("student_mentor")
        let data = await db.collection("student").findOneAndUpdate({ _id: mongodb.ObjectId(req.params.id) }, { $set: req.body })
        await client.close()
        res.json({
            message: "Student updated"
        })
    } catch (error) {
        res.status(500).json({
            message: "something went wrong"
        })
    }
})

app.get("/filter-student/:id", async (req, res) => {
    try {
        let client = await mongoClient.connect(url)
        let db = client.db("student_mentor")
        let data = await db.collection("student").find({ "student_details.Mentor": `${req.params.id}` }).toArray()
        await client.close()
        res.json(data)
    } catch (error) {
        res.status(500).json({
            message: "something went wrong"
        })
    }
})

app.put("/update-multiple", async (req, res) => {
    try {
        const client = await mongoClient.connect(url)
        const db = client.db("student_mentor")
        const data = await db.collection("student").updateMany({ "student_details.Mentor": `${req.body.showMentor}` }, { $set: { "student_details.Mentor": `${req.body.assignMentor}` } })
        console.log(data)
        await client.close()
        res.json({
            message: "Multiple users updated"
        })
    } catch (error) {
        res.status(500).json({
            message: "something went wrong"
        })
    }
})

app.listen(port, () => {
    console.log(`App listening to ${port}`)
})