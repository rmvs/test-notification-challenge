import { NextApiRequest, NextApiResponse } from "next";
import * as fs from 'fs';
import { store } from "@/store";
import { prisma } from "@/lib/services/db";

export default async function handler(req: NextApiRequest,res: NextApiResponse){    
    try{
        if(req.method == 'POST'){
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
            
        }
        res.status(200).send({});
    }catch(e: any){
        console.error(e.message)
        res.status(500).send({'error':e.message});
    }    
}