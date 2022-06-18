export interface FeedbackCreateData {
    type: string,
    comment: string,
    screenshoot?: string,
}
export interface FeedbacksRepository {
    create: (data: FeedbackCreateData) => Promise<void>;
}