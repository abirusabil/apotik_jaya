import { Module } from '@nestjs/common';
import { SuplierService } from './suplier.service';
import { SuplierController } from './suplier.controller';
import { SuplierRepository } from './suplier.repository';

@Module({
  controllers: [SuplierController],
  providers: [SuplierService,SuplierRepository],
  
})
export class SuplierModule {}
