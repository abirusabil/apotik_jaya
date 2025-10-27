import { Test, TestingModule } from '@nestjs/testing';
import { SuplierService } from './suplier.service';
import { SuplierRepository } from './suplier.repository';

describe('SuplierService', () => {
  let service: SuplierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SuplierService,
        {
          provide: SuplierRepository,
          useValue: {}, // mock kosong untuk dependency
        },
      ],
    }).compile();

    service = module.get<SuplierService>(SuplierService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
