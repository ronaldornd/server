import { prisma } from "../../prisma";
import { FeedbackCreateData, FeedbacksRepository } from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
    async create({ type, comment, created_at }: FeedbackCreateData) {
        await prisma.feedback.create({
            data: {
                type,
                comment,
                created_at
            }
        })
    };

}