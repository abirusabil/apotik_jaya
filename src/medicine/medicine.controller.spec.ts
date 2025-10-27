import { Test, TestingModule } from '@nestjs/testing';
import { MedicineController } from './medicine.controller';
import { MedicineService } from './medicine.service';
import { MedicineRepository } from './medicine.repository';

describe('MedicineController', () => {
  let controller: MedicineController;

  const mockService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicineController],
      providers: [
        {
          provide: MedicineService,
          useValue: mockService, // kita mock servicenya
        },
        {
          provide: MedicineRepository,
          useValue: {}, // mock kosong untuk dependency di service
        },
      ],
    }).compile();

    controller = module.get<MedicineController>(MedicineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
