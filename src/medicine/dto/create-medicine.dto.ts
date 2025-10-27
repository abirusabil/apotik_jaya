import { IsNotEmpty } from "class-validator";

export class CreateMedicineDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string

    @IsNotEmpty()
    price: number;
   
    @IsNotEmpty()
    suplierId: number;

    @IsNotEmpty()
    categoryId: number;
}
