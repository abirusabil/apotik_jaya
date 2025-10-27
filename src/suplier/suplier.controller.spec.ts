import { Test, TestingModule } from '@nestjs/testing';
import { SuplierController } from './suplier.controller';
import { SuplierService } from './suplier.service';
import { SuplierRepository } from './suplier.repository';

describe('SuplierController', () => {
  let controller: SuplierController;

  const mockService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuplierController],
      providers: [
        {
          provide: SuplierService,
          useValue: mockService,
        },
        {
          provide: SuplierRepository,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<SuplierController>(SuplierController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
