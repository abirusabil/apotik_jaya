import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import { CreateSuplierDto } from "./dto/create-suplier.dto";

@Injectable()
export class SuplierRepository {
    constructor(private prisma:PrismaService){}

    create(data: CreateSuplierDto) {
        return this.prisma.suplier.create({
            data
        });
    }

    findAll(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        return Promise.all([
            this.prisma.suplier.findMany({
                where: { deletedAt: null },
                orderBy: { id: 'asc' },
                skip,
                take: limit,
            }),
            this.prisma.suplier.count({
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