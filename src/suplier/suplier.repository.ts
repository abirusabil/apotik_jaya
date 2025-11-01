import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import { CreateSuplierDto } from "./dto/create-suplier.dto";

@Injectable()
export class SuplierRepository {
    constructor(private prisma: PrismaService) { }

    create(data: CreateSuplierDto) {
        return this.prisma.suplier.create({
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
                { email: { contains: search, mode: 'insensitive' } }, // opsional
            ];
        }

        // Jalankan query paralel untuk efisiensi
        const [data, total] = await Promise.all([
            this.prisma.suplier.findMany({
                where,
                orderBy: { id: 'asc' },
                skip,
                take: limit,
            }),
            this.prisma.suplier.count({ where }),
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
        return this.prisma.suplier.findFirst({
            where: { id, deletedAt: null },
        });
    }

    update(id: number, data: Partial<CreateSuplierDto>) {
        return this.prisma.suplier.update({
            where: { id },
            data,
        });
    }

    remove(id: number) {
        return this.prisma.suplier.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }

}