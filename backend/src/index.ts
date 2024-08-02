import express from "express"
import { router } from "./router";


const app = express()

app.use(express.json());

app.use("/api/v1", router);

app.get('/', (req, res) => {
    res.send("hello")
})

app.listen(3000, () => {
    console.log("Server started");
})