-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "registered_channel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idChannel" TEXT NOT NULL,
    "idUser" TEXT NOT NULL,
    CONSTRAINT "registered_channel_idChannel_fkey" FOREIGN KEY ("idChannel") REFERENCES "channel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "registered_channel_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "channel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "subscription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idCategory" TEXT NOT NULL,
    "idUser" TEXT NOT NULL,
    CONSTRAINT "subscription_idCategory_fkey" FOREIGN KEY ("idCategory") REFERENCES "category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "subscription_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "log_history" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "message" TEXT NOT NULL,
    "idCategory" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "log_history_idCategory_fkey" FOREIGN KEY ("idCategory") REFERENCES "category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
