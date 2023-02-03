This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install dependencies

```bash
npm install
```

Setup database

```bash
npm run setup-db
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Description

The API has one endpoint (/api/notifications/) for posting and retrieving notification history (archive of logs).
Each notification has its own strategy to send messages. You can view at src/lib/business folder (no external API calling is performed).

You can run this app with docker container:

```bash
docker-compose -f docker/docker-compose.yml up -d
```
