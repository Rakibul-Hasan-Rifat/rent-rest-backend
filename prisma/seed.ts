import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, UserRole } from "./generated/prisma/client";
import bcrypt from "bcryptjs"
import envVars from "../src/config/envVars";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    // const result = await prisma.user.createMany({
    //     data: [
    //         {
    //             name: "Rakibul Hasan",
    //             email: "rakibul.hasan@gmail.com",
    //             password: await bcrypt.hash("12345", envVars.bcrypt_salt),
    //             role: UserRole.ADMIN,
    //         },
    //         {
    //             name: "Rifat",
    //             email: "rifat@gmail.com",
    //             password: await bcrypt.hash("12345", envVars.bcrypt_salt),
    //             role: UserRole.TENANT
    //         },
    //         {
    //             name: "Arafat",
    //             email: "arafat@gmail.com",
    //             password: await bcrypt.hash("12345", envVars.bcrypt_salt),
    //             role: UserRole.LANDLORD
    //         }
    //     ]
    // })

    const response = await Promise.all([
        prisma.user.create({
            data: {
                name: "Rafiul Islam",
                email: "rafiul.islam@example.com",
                password: await bcrypt.hash("12345", envVars.bcrypt_salt),
                role: UserRole.ADMIN,
                properties: {
                    create: {
                        title: "New Villa",
                        price: 2000,
                        addressLine: "Blog-5",
                        city: "New Market",
                        district: "Chattogram",
                        category: {
                            create: {
                                name: "Villa",
                            },
                        },
                    },
                },
                rentalRequests: {
                    create: {
                        leaseDuration: 1,
                        review: {
                            create: {
                                rating: 4,
                            },
                        },
                    },
                },
            },
        }),
        prisma.user.create({
            data: {
                name: "Tanjila Akter",
                email: "tanjila.akter@example.com",
                password: await bcrypt.hash("12345", envVars.bcrypt_salt),
                role: UserRole.LANDLORD,
                properties: {
                    create: {
                        title: "Cozy Apartment",
                        price: 1200,
                        addressLine: "Road-3, Block-C",
                        city: "Agrabad",
                        district: "Chattogram",
                        category: {
                            create: {
                                name: "Apartment",
                            },
                        },
                    },
                },
                rentalRequests: {
                    create: {
                        leaseDuration: 6,
                        review: {
                            create: {
                                rating: 5,
                            },
                        },
                    },
                },
            },
        }),
        prisma.user.create({
            data: {
                name: "Shakib Hasan",
                email: "shakib.hasan@example.com",
                password: await bcrypt.hash("12345", envVars.bcrypt_salt),
                role: UserRole.TENANT,
                properties: {
                    create: {
                        title: "Modern Duplex",
                        price: 3500,
                        addressLine: "House-12, Lane-2",
                        city: "Khulshi",
                        district: "Chattogram",
                        category: {
                            create: {
                                name: "Duplex",
                            },
                        },
                    },
                },
                rentalRequests: {
                    create: {
                        leaseDuration: 12,
                        review: {
                            create: {
                                rating: 3,
                            },
                        },
                    },
                },
            },
        }),
        prisma.user.create({
            data: {
                name: "Mim Sultana",
                email: "mim.sultana@example.com",
                password: await bcrypt.hash("12345", envVars.bcrypt_salt),
                role: UserRole.TENANT,
                properties: {
                    create: {
                        title: "Studio Flat",
                        price: 800,
                        addressLine: "Plot-9, GEC Circle",
                        city: "GEC",
                        district: "Chattogram",
                        category: {
                            create: {
                                name: "Studio",
                            },
                        },
                    },
                },
                rentalRequests: {
                    create: {
                        leaseDuration: 3,
                        review: {
                            create: {
                                rating: 4,
                            },
                        },
                    },
                },
            },
        }),
        prisma.user.create({
            data: {
                name: "Arif Chowdhury",
                email: "arif.chowdhury@example.com",
                password: await bcrypt.hash("12345", envVars.bcrypt_salt),
                role: UserRole.TENANT,
                properties: {
                    create: {
                        title: "Hillside Cottage",
                        price: 1500,
                        addressLine: "Foy's Lake Road",
                        city: "Foy's Lake",
                        district: "Chattogram",
                        category: {
                            create: {
                                name: "Cottage",
                            },
                        },
                    },
                },
                rentalRequests: {
                    create: {
                        leaseDuration: 2,
                        review: {
                            create: {
                                rating: 5,
                            },
                        },
                    },
                },
            },
        }),
    ])
    console.log({ response });
}
main()
    .then(async () => {
        process.exit(0)
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        await pool.end();
        process.exit(1);
    });