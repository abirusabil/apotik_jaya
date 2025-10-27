import { Test, TestingModule } from '@nestjs/testing';
import { MedicineService } from './medicine.service';
import { MedicineRepository } from './medicine.repository';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';

describe('MedicineService', () => {
  let service: MedicineService;
  let repository: MedicineRepository;

  const mockMedicineRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MedicineService,
        {
          provide: MedicineRepository,
          useValue: mockMedicineRepository, // 🔹 gunakan mock
        },
      ],
    }).compile();

    service = module.get<MedicineService>(MedicineService);
    repository = module.get<MedicineRepository>(MedicineRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call repository.create when create is called', async () => {
    const dto: CreateMedicineDto = { name: 'Paracetamol', price: 5000 };
    repository.create = jest.fn().mockResolvedValue({ id: 1, ...dto });

    const result = await service.create(dto);
    expect(repository.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual({ id: 1, ...dto });
  });

  it('should return all medicines', async () => {
    const medicines = [{ id: 1, name: 'Amoxicillin', price: 10000 }];
    repository.findAll = jest.fn().mockResolvedValue(medicines);

    const result = await service.findAll();
    expect(repository.findAll).toHaveBeenCalled();
    expect(result).toEqual(medicines);
  });

  it('should return one medicine', async () => {
    const medicine = { id: 1, name: 'Ibuprofen', price: 8000 };
    repository.findOne = jest.fn().mockResolvedValue(medicine);

    const result = await service.findOne(1);
    expect(repository.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(medicine);
  });

  it('should update a medicine', async () => {
    const dto: UpdateMedicineDto = { name: 'Cough Syrup' };
    const updated = { id: 1, ...dto };
    repository.update = jest.fn().mockResolvedValue(updated);

    const result = await service.update(1, dto);
    expect(repository.update).toHaveBeenCalledWith(1, dto);
    expect(result).toEqual(updated);
  });

  it('should soft delete a medicine', async () => {
    const deleted = { id: 1, deletedAt: new Date() };
    repository.remove = jest.fn().mockResolvedValue(deleted);

    const result = await service.remove(1);
    expect(repository.remove).toHaveBeenCalledWith(1);
    expect(result).toEqual(deleted);
  });
});
