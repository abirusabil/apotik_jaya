import { Injectable } from '@nestjs/common';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { MedicineRepository } from './medicine.repository';

@Injectable()
export class MedicineService {
  constructor(private readonly medicineRepository: MedicineRepository ) {}

  create(createMedicineDto: CreateMedicineDto) {
    return this.medicineRepository.create(createMedicineDto);
  }
  
  findAll(page?: number, limit?: number) {
    return this.medicineRepository.findAll(page, limit);
  }

  findOne(id: number) {
    return this.medicineRepository.findOne(id);
  } 
  update(id: number, updateMedicineDto: UpdateMedicineDto) {
    return this.medicineRepository.update(id, updateMedicineDto);
  }   
  remove(id: number) {
    return this.medicineRepository.remove(id);
  }
}
