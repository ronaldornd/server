import express from "express";
import { SubmitFeedbackService } from "./services/submit-feedback-service";
import { PrismaFeedbacksRepository } from "./repository/prisma/prisma-feedbacks-repository";
import { NodemailerAdapter } from "./adapters/nodemailer/nodemailer-adapter";

export const routes = express.Router();


routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshoot } = req.body;

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
});
