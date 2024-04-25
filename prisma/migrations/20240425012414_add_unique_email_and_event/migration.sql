/*
  Warnings:

  - A unique constraint covering the columns `[event_id,email]` on the table `attendess` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "attendess_event_id_email_key" ON "attendess"("event_id", "email");
