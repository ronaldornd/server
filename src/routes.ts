import express from "express";

import { SubmitFeedbackService } from "./services/submit-feedback-service";
import { PrismaFeedbacksRepository } from "./repository/prisma/prisma-feedbacks-repository";
import { NodemailerAdapter } from "./adapters/nodemailer/nodemailer-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const routes = express.Router();
const app = express();

app.use(express.json());


routes.post('/del', async (req, res) => {
    await prisma.feedback.delete({
        where: {
            id: req.body.id,
        }
    });
    return res.status(201).send();
})
routes.get('/', async (req, res) => {
    const feedbacks = await prisma.feedback.findMany({
        orderBy: {
            created_at: "asc"
        }
    });
    res.json(feedbacks);
})
routes.post('/feedbacks', async (req, res) => {
    const { type, comment, created_at } = req.body;

    try {
        const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
        const nodemailerAdapter = new NodemailerAdapter();
        const feedbacksRepository = new SubmitFeedbackService(
            prismaFeedbacksRepository,
            nodemailerAdapter
        )

        await feedbacksRepository.execute({
            type,
            comment,
            created_at,
        })

        return res.status(201).send();
    } catch (err) {
        return res.status(500).send();
    }
});
