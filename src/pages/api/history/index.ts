import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try{
        if(req.method === 'POST'){
            const { message, category } = req.body;    
            const _category = await prisma.category.findFirst({
                where: {
                    name: category
                }
            });
            if(_category){
                const log = await prisma.logHistory.create({
                    data: {
                        message: message,
                        category: {
                            connect: {
                                id: _category.id
                            }
                        },
                    }
                })
            }else{
                throw "Category not found"
            } 
            res.status(200).send({})
        }else if(req.method === 'GET'){
            const history = await Promise.all(( await prisma.logHistory.findMany({ orderBy: { createdAt: Prisma.SortOrder.asc  }, select: { category: { select: { name: true } }, id: true, createdAt: true, message: true}}))
                            .map(async(h: any) => ({...h, key: h.id,category: h.category.name, sentTo: (await prisma.user.findMany({ where: { subscriptions: { some: { category: { name: h.category.name }}}},
                            select: { registeredChannels: { include: { channel: { select: { name: true } }, user: true } }, id: true, email: true, subscriptions: { include: { category: true } } }}))
                            .map(({ registeredChannels, id, email }) => ({key: id, id, email, channels: registeredChannels.flatMap( ({ channel }) => channel.name) }))})));
            res.status(200).send({history});
        }else{
            throw "Method not supported"
        }
    }catch(ex: any){
        res.status(500).send({ detail: String(ex)})
    }
}