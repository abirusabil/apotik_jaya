import { Module } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { MedicineController } from './medicine.controller';
import { MedicineRepository } from './medicine.repository';

@Module({
  controllers: [MedicineController],
  providers: [MedicineService,MedicineRepository],
})
export class MedicineModule {}
