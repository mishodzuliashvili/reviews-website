import { prisma } from "@/lib/prisma";

export function createReview(
    title: string,
    item: string,
    grade: number,
    text: string,
    group: string,
    tags: string[],
    images: string[],
    userId: string
) {
    return prisma.review.create({
        data: {
            title,
            grade,
            text,
            piece: {
                connectOrCreate: {
                    where: { value: item },
                    create: { value: item },
                },
            },
            tags: {
                connectOrCreate: tags.map((tag) => ({
                    where: { value: tag },
                    create: { value: tag },
                })),
            },
            images: {
                connectOrCreate: images.map((image) => ({
                    where: { url: image },
                    create: { url: image },
                })),
            },
            author: {
                connect: { id: userId },
            },
            group: {
                connectOrCreate: {
                    where: { value: group },
                    create: { value: group },
                },
            },
        },
    });
}

export type ResultOfGetRecentReviews = Awaited<
    ReturnType<typeof getRecentReviews>
>;

export function getRecentReviews() {
    return prisma.review.findMany({
        orderBy: {
            createdAt: "desc",
        },
        take: 10,
        include: {
            images: true,
            author: {
                select: {
                    name: true,
                },
            },
            tags: true,
            comments: true,
            likes: true,
            _count: {
                select: {
                    likes: true,
                },
            },
        },
    });
}

export type ResultOfSearchFullText = Awaited<ReturnType<typeof searchFullText>>;

export function searchFullText(text: string) {
    return prisma.review.findMany({
        orderBy: {
            createdAt: "desc",
        },
        where: {
            OR: [
                {
                    title: {
                        contains: text,
                    },
                },
                {
                    text: {
                        contains: text,
                    },
                },
                {
                    piece: {
                        value: {
                            contains: text,
                        },
                    },
                },
                {
                    group: {
                        value: {
                            contains: text,
                        },
                    },
                },
                {
                    comments: {
                        some: {
                            text: {
                                contains: text,
                            },
                        },
                    },
                },
                {
                    tags: {
                        some: {
                            value: {
                                contains: text,
                            },
                        },
                    },
                },
            ],
        },
        include: {
            group: true,
            author: true,
            images: true,
            tags: true,
            likes: true,
            rates: true,
            piece: true,
        },
    });
}
