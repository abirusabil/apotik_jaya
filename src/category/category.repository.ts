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

    async findAll(page = 1, limit = 10, search?: string) {
        const skip = (page - 1) * limit;

        // Filter data hanya yang belum dihapus
        const where: any = { deletedAt: null };

        // Tambahkan filter pencarian jika ada input search
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
            ];
        }

        // Jalankan query paralel untuk efisiensi
        const [data, total] = await Promise.all([
            this.prisma.category.findMany({
                where,
                orderBy: { id: 'asc' },
                skip,
                take: limit,
            }),
            this.prisma.category.count({ where }),
        ]);

        // Kembalikan hasil dengan metadata pagination
        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
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