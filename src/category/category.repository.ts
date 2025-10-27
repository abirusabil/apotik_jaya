import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import { CreateCategoryDto } from "./dto/create-category.dto";

@Injectable()
export class CategoryRepository {
    constructor(private prisma:PrismaService) {}

    create(data: CreateCategoryDto ) {
        return this.prisma.category.create({
            data
        });
    }

    findAll(page = 1, limit = 10) {
        const skip = (page - 1) * limit;

        return Promise.all([
            this.prisma.category.findMany({
                where: { deletedAt: null }, 
                orderBy: { id: 'asc' },
                skip,
                take: limit,
            }),
            this.prisma.category.count({
                where: { deletedAt: null },
            }),
        ]).then(([data, total]) => ({
            data,
            meta: {
                total,  
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        }));
    }

    findOne(id: number) {
        return this.prisma.category.findFirst({
            where: { id, deletedAt: null },
        });
    }

    update(id: number, data: Partial<CreateCategoryDto>) {
        return this.prisma.category.update({
            where: { id },
            data,
        });
    }

    remove(id: number) {
        return this.prisma.category.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
    // Implement repository methods here
}