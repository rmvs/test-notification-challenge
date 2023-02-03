import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main(){
    console.log('SEEDING DATABASE')


    const sms = await prisma.channel.create({
        data: {
            name: "SMS"
        }
    })


    const push = await prisma.channel.create({
        data: {
            name: "PUSH NOTIFICATION"
        }
    })

    const email = await prisma.channel.create({
        data: {
            name: "EMAIL"
        }
    })


    const sports = await prisma.category.create({
        data: {
            name: 'SPORTS'
        }
    })

    const finance = await prisma.category.create({
        data: {
            name: 'FINANCE'
        }
    })

    const movies = await prisma.category.create({
        data: {
            name: 'MOVIES'
        }
    })

    const user1 = await prisma.user.create({
        data: {
            email: 'john@example.com',
            phoneNumber: '7777777',
            name: 'John',
            subscriptions: {                
                create: [
                    {
                        category: {
                            connect: {
                                id: finance.id
                            }
                        }
                    },
                    {
                        category: {
                            connect: {
                                id: movies.id
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
                                id: sms.id
                            }
                        }
                    },
                    {
                        channel: {
                            connect: {
                                id: email.id
                            }
                        }
                    }
                ]
            }
        },
        include: {
            registeredChannels: {
                include: {
                    channel: true
                }
            },
            subscriptions: {
                include: {
                    category: true
                }
            },
        }
    });


    const user2 = await prisma.user.create({
        data: {
            email: 'mary@example.com',
            phoneNumber: '7777777',
            name: 'Mary',
            registeredChannels: {
                create: [
                    {
                        channel: {
                            connect: {
                                id: push.id,
                            }
                        },
                    },{
                        channel: {
                            connect: {
                                id: email.id
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
                                id: sports.id
                            }
                        }
                    }
                ]
            }
        },
        include: {
            registeredChannels: {
                include: {
                    channel: true
                }
            },
            subscriptions: {
                include: {
                    category: true
                }
            }
        }
    });

    const user3 = await prisma.user.create({
        data: {
            email: 'edward@example.com',
            phoneNumber: '7777777',
            name: 'Edward',
            registeredChannels: {
                create: {
                    channel: {
                        connect: {
                            id: sms.id
                        }
                    }
                }
            },
            subscriptions: {
                create: [
                    {
                        category: {
                            connect: {
                                id: finance.id
                            }
                        }
                    }
                ]
            }
        },
        include: {
            registeredChannels: true,
            subscriptions: {
                include: {
                    category: true
                }
            }
        }
    });    
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