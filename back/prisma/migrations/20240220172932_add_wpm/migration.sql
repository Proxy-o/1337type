-- CreateTable
CREATE TABLE "Wpm" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Wpm_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Wpm" ADD CONSTRAINT "Wpm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
