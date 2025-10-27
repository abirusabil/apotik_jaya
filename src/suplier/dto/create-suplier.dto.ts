import { IsNotEmpty, } from "class-validator";

export class CreateSuplierDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    email: string;
}


