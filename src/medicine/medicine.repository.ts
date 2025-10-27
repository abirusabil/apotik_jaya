import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import { CreateMedicineDto } from "./dto/create-medicine.dto";

@Injectable()
export class MedicineRepository {
    // Implement repository methods here
    constructor(private prisma: PrismaService) { }

    create(data: CreateMedicineDto) {
        return this.prisma.medicine.create({
            data
        });
    }
    findAll(page = 1, limit = 10) {
        const skip = (page - 1) * limit;

        return Promise.all([
            this.prisma.medicine.findMany({
                where: { deletedAt: null },
                skip,
                take: limit,
                orderBy: { id: 'asc' },
            }),
            this.prisma.medicine.count({
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
        return this.prisma.medicine.findFirst({
            where: { id, deletedAt: null },
        });
    }
    update(id: number, data: Partial<CreateMedicineDto>) {
        return this.prisma.medicine.update({
            where: { id },
            data,
        });
    }
    remove(id: number) {
        return this.prisma.medicine.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
}