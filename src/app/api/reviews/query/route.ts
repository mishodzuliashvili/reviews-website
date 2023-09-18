import getQueries from "@/lib/getQueries";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";
import { reviewInclude } from "../route";
import { calculateAvarageRate } from "@/lib/utils";
import { ReviewReturnedType } from "@/contexts/ReviewsContext";

export const dynamic = "force-dynamic";

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
            rates: {},
        };
        const reviews = await prisma.review
            .findMany({
                ...sortByObj[sortBy || "createdAt"],
                ...(take && { take: Number(take) }),
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
                include: reviewInclude,
            })
            .then((reviews: any[]) =>
                sortBy === "rates"
                    ? reviews.sort(
                          (a, b) =>
                              calculateAvarageRate(b.piece?.rates || []) -
                              calculateAvarageRate(a.piece?.rates || [])
                      )
                    : reviews
            );
        return NextResponse.json(reviews);
    } catch (error) {
        return NextResponse.json(
            {
                error: "Reviews could not be fetched.",
            },
            {
                status: 500,
            }
        );
    }
}
