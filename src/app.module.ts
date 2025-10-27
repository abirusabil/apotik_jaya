import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './common/prisma/prisma.module';
import { SuplierModule } from './suplier/suplier.module';
import { CategoryModule } from './category/category.module';
import { MedicineModule } from './medicine/medicine.module';

@Module({
  imports: [PrismaModule, SuplierModule, CategoryModule, MedicineModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
