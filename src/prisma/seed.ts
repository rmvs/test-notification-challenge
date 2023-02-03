import {CategoryType, NotificationType}  from '@/lib/models'
import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main(){
    console.log('SEEDING DATABASE')

    let categories: any = {}, channels: any = {};

    for(const category of Object.keys(CategoryType)){
        if(! (categories[category] = (await prisma.category.findFirst({ where: { name: category } }))?.id)){
            categories[category] = (await prisma.category.create({
                data: {
                    name: category
                },
            })).id
        }        
    }

    for(const notification of Object.keys(NotificationType)){
        if( ! ( channels[notification] = (await prisma.channel.findFirst({ where: { name: notification } })))?.id ){
            channels[notification] = (await prisma.channel.create({
                data: {
                    name: notification
                }
            })).id
        }        
    }
    
    if( ! (await prisma.user.findFirst({where: { email: 'john@example.com' }}))){
        await prisma.user.create({
            data: {
                email: 'john@example.com',
                phoneNumber: '7777777',
                name: 'John',
                subscriptions: {                
                    create: [
                        {
                            category: {
                                connect: {
                                    id: categories[CategoryType.FINANCE],               
                                }
                            }
                        },
                        {
                            category: {
                                connect: {
                                    id: categories[CategoryType.SPORTS]
                                }
                            }
                        }
                    ]
                },
                registeredChannels: {
                    create: [
                        {
                            channel: {
                                connect: {
                                    id: channels[NotificationType.PUSH],
                                }
                            }
                        },
                        {
                            channel: {
                                connect: {
                                    id: channels[NotificationType.SMS]
                                }
                            }
                        }
                    ]
                }
            },
        });
    } 
    
    if( !( await prisma.user.findFirst({ where: { email: 'mary@example.com'} })) ){
        await prisma.user.create({
            data: {
                email: 'mary@example.com',
                phoneNumber: '7777777',
                name: 'Mary',
                registeredChannels: {
                    create: [
                        {
                            channel: {
                                connect: {
                                    id: channels[NotificationType.PUSH]
                                }
                            },
                        },
                        {
                            channel: {
                                connect: {
                                    id: channels[NotificationType.EMAIL]
                                }
                            }
                        }
                    ]
                },
                subscriptions: {
                    create: [
                        {
                            category: {
                                connect: {
                                    id: categories[CategoryType.SPORTS]
                                }
                            }
                        }
                    ]
                }
            }
        });
    }  
    
    if( ! await prisma.user.findFirst({ where: { email: 'edward@example.com'} }) ){
        await prisma.user.create({
            data: {
                email: 'edward@example.com',
                phoneNumber: '7777777',
                name: 'Edward',
                registeredChannels: {
                    create: {
                        channel: {
                            connect: {
                                id: channels[NotificationType.PUSH]
                            }
                        }
                    }
                },
                subscriptions: {
                    create: [
                        {
                            category: {
                                connect: {
                                    id: categories[CategoryType.MOVIES]
                                }
                            }
                        }
                    ]
                }
            }
        });
    }        
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })