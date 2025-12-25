import express, { response } from "express";
import "dotenv/config";
import { rateLimit } from 'express-rate-limit';
import { query, validationResult } from 'express-validator';

const app = express();

app.use(express.json());

const limiter = rateLimit({
    limit: 3,
    windowMs: 60 * 1000,
    message: "Too many requests please try after some time."
});


const port = process.env.PORT;

app.get("/", (request, response) => {
    try {
        response.status(200).json({
            "message": "Connection established"
        });
    } catch (error) {
        response.status(500).json({
            "message": error
        });
    }
});

app.get("/rate-limit-testing", limiter, (request, response) => {
    try {
        response.status(200).json({ message: "Working" })
    } catch (error) {
        response.status(400).json({ error: error });
    }
});


app.get("/express-validator", query('person').notEmpty(), (request, response) => {
    const result = validationResult(request);
    if (result.isEmpty()) {
        return response.send(`Hello, ${request.query.person}!`);
    }

    response.send({ errors: result.array() });
});


app.listen(port, () => {
    console.log("Application Running on http://localhost:" + port)
});