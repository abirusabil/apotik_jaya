import { Injectable } from '@nestjs/common';
import { CreateSuplierDto } from './dto/create-suplier.dto';
import { UpdateSuplierDto } from './dto/update-suplier.dto';
import { SuplierRepository } from './suplier.repository';

@Injectable()
export class SuplierService {

  constructor(private readonly suplierRepository: SuplierRepository) {}

  create(createSuplierDto: CreateSuplierDto) {
    return this.suplierRepository.create(createSuplierDto);
  } 

  findAll(page?: number, limit?: number, search?: string) {
    return this.suplierRepository.findAll(page, limit, search);
  }

  findOne(id: number) {
    return this.suplierRepository.findOne(id);
  }

  update(id: number, updateSuplierDto: UpdateSuplierDto) {
    return this.suplierRepository.update(id, updateSuplierDto);
  }

  remove(id: number) {
    return this.suplierRepository.remove(id);
  }

}
