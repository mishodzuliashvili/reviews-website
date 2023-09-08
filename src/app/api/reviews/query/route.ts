import getQueries from "@/lib/getQueries";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { tagValues, groupValues, pieceValues, take } =
            await request.json();
        const { sortBy, userId, searchTerm } = getQueries(request, [
            "sortBy",
            "userId",
            "searchTerm",
        ]) as {
            sortBy?: string;
            userId?: string;
            searchTerm?: string;
        };

        const sortByObj: Record<string, Prisma.ReviewFindManyArgs> = {
            createdAt: {
                orderBy: {
                    createdAt: "desc",
                },
            },
            grade: {
                orderBy: {
                    grade: "desc",
                },
            },
            likes: {
                orderBy: {
                    likes: {
                        _count: "desc",
                    },
                },
            },
            rates: {
                orderBy: {
                    rates: {
                        _count: "desc",
                    },
                },
            },
        };
        const reviews = await prisma.review.findMany({
            ...sortByObj[sortBy || "createdAt"],
            take: take || 10,
            where: {
                ...(userId && { authorId: userId }),
                ...(tagValues?.length > 0 && {
                    tags: {
                        some: {
                            value: {
                                in: tagValues,
                            },
                        },
                    },
                }),
                ...(groupValues?.length > 0 && {
                    group: {
                        value: {
                            in: groupValues,
                        },
                    },
                }),
                ...(pieceValues?.length > 0 && {
                    piece: {
                        value: {
                            in: pieceValues,
                        },
                    },
                }),
                ...(searchTerm && {
                    OR: [
                        {
                            title: {
                                contains: searchTerm,
                            },
                        },
                        {
                            text: {
                                contains: searchTerm,
                            },
                        },
                        {
                            piece: {
                                value: {
                                    contains: searchTerm,
                                },
                            },
                        },
                        {
                            group: {
                                value: {
                                    contains: searchTerm,
                                },
                            },
                        },
                        {
                            comments: {
                                some: {
                                    text: {
                                        contains: searchTerm,
                                    },
                                },
                            },
                        },
                        {
                            tags: {
                                some: {
                                    value: {
                                        contains: searchTerm,
                                    },
                                },
                            },
                        },
                    ],
                }),
            },
            include: {
                tags: true,
                images: true,
                group: true,
                author: true,
                piece: true,
                likes: true,
                rates: true,
            },
        });

        return NextResponse.json(reviews);
    } catch (error) {
        return new NextResponse("Could not get reviews.", { status: 500 });
    }
}