-- CreateTable
CREATE TABLE "feedbacks" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "screenshoot" TEXT,

    CONSTRAINT "feedbacks_pkey" PRIMARY KEY ("id")
);
