import express, { response } from "express";
import "dotenv/config";
import { rateLimit } from 'express-rate-limit';
import { body, matchedData, query, validationResult } from 'express-validator';

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


app.get("/express-validator",
    body('email').trim().isEmail().notEmpty(),
    body('name').trim().notEmpty(),
    (request, response) => {
        const data = validationResult(request);
        if (!data.isEmpty()) return response.status(400).json({message: "Bad Request, Validation error(s)", error: data.array() });

        const { name, email } = request.body;
        
        return response.status(200).json({
            name: name,
            email: email,
            message: "Good request, valid details"
        })
    }
);


app.listen(port, () => {
    console.log("Application Running on http://localhost:" + port)
});