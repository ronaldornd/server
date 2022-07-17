export interface FeedbackCreateData {
    type: string,
    comment: string,
    created_at: string,
}
export interface FeedbacksRepository {
    create: (data: FeedbackCreateData) => Promise<void>;
}