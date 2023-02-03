import { prisma } from "@/lib/services/db";
import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    let history = await Promise.all((await prisma.logHistory.findMany({
        orderBy: {
            createdAt: Prisma.SortOrder.asc
        } as any,
        select: {
            category: {
                select: {
                    name: true,                    
                }
            },
            message: true,
            createdAt: true,
            id: true
        }
    })).map(async(h: any) => ({...h, key: h.id,category: h.category.name, sentTo: (await prisma.user.findMany({
        where: {
            subscriptions: {
                some: {
                    category: {
                        name: h.category.name
                    }
                }
            }
        },
        select: {
            registeredChannels: {
                include: {
                    channel: {
                        select: {
                            name: true,
                        },
                    },
                    user: true
                }
            },
            id: true,
            email: true,
            name: true,
            subscriptions: {
                include: {
                    category: true
                }
            }
        }
    }))
    .map(({ registeredChannels, id, email }) => ({ id, email, channels: registeredChannels.flatMap( ({ channel }) => channel.name) }))})))
    res.status(200).send({history});
}