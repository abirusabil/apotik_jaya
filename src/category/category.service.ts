import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {

  constructor(private readonly repo:CategoryRepository) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.repo.create(createCategoryDto);
  }   
  findAll(page?: number, limit?: number , search?:string) {
    return this.repo.findAll(page, limit, search);
  }
  findOne(id: number) {
    return this.repo.findOne(id);
  }
  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.repo.update(id, updateCategoryDto);
  }
  remove(id: number) {
    return this.repo.remove(id);
  }
}
