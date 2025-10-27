import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { SuplierService } from './suplier.service';
import { CreateSuplierDto } from './dto/create-suplier.dto';
import { UpdateSuplierDto } from './dto/update-suplier.dto';

@Controller('suplier')
export class SuplierController {
  constructor(private readonly suplierService: SuplierService) {}

  @Post()
  create(@Body() createSuplierDto: CreateSuplierDto) {
    return this.suplierService.create(createSuplierDto);
  }

  @Get()
  findAll(@Query('page') page = '1', @Query('limit') limit = '10') {
    return this.suplierService.findAll(+page, +limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suplierService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSuplierDto: UpdateSuplierDto) {
    return this.suplierService.update(+id, updateSuplierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suplierService.remove(+id);
  }
}
