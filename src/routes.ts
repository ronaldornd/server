import express from "express";
import { SubmitFeedbackService } from "./services/submit-feedback-service";
import { PrismaFeedbacksRepository } from "./repository/prisma/prisma-feedbacks-repository";
import { NodemailerAdapter } from "./adapters/nodemailer/nodemailer-adapter";
import { prisma } from "./prisma";

export const routes = express.Router();

routes.delete('/delete', async (req) => {
    const feedbacks = await prisma.feedback.delete(req)
})
routes.get('/all', async (req, res) => {
    const feedbacks = await prisma.feedback.findMany(req)
    res.json(feedbacks);
})
routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshoot } = req.body;

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
            screenshoot
        })

        return res.status(201).send();
    } catch (err) {
        return res.status(500).send();
    }
});
