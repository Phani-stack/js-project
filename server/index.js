import express from "express";
import "dotenv/config";

const app = express();

const port = process.env.PORT;

app.get("/", (request, response) => {
    try {
        response.status(200).json({ 
            "message" : "Connection established"
        });
    } catch (error) {
        response.status(404).json({
            "message" : error
        });
    }
});

app.listen(port, () => console.log("Application Running on http://localhost:" + port));