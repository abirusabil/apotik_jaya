import { Injectable } from '@nestjs/common'
import { PrismaService } from '../common/prisma/prisma.service'
import { CreateMedicineDto } from './dto/create-medicine.dto'

@Injectable()
export class MedicineRepository {
  constructor(private prisma: PrismaService) {}

  /* -------------------- CREATE -------------------- */
  create(data: CreateMedicineDto) {
    return this.prisma.medicine.create({
      data,
      include: {
        suplier: { select: { id: true, name: true } },
        category: { select: { id: true, name: true } },
      },
    })
  }

  /* -------------------- READ ALL -------------------- */
  async findAll(page = 1, limit = 10, search?: string) {
    const skip = (page - 1) * limit
    const where: any = { deletedAt: null }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [data, total] = await Promise.all([
      this.prisma.medicine.findMany({
        where,
        include: {
          suplier: { select: { id: true, name: true } },
          category: { select: { id: true, name: true } },
        },
        orderBy: { id: 'asc' },
        skip,
        take: limit,
      }),
      this.prisma.medicine.count({ where }),
    ])

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }
  }

  /* -------------------- READ ONE -------------------- */
  findOne(id: number) {
    return this.prisma.medicine.findFirst({
      where: { id, deletedAt: null },
      include: {
        suplier: { select: { id: true, name: true } },
        category: { select: { id: true, name: true } },
      },
    })
  }

  /* -------------------- UPDATE -------------------- */
  async update(id: number, data: Partial<CreateMedicineDto>) {
    return this.prisma.medicine.updateMany({
      where: { id, deletedAt: null },
      data,
    })
  }

  /* -------------------- SOFT DELETE -------------------- */
  async remove(id: number) {
    return this.prisma.medicine.updateMany({
      where: { id, deletedAt: null },
      data: { deletedAt: new Date() },
    })
  }
}
