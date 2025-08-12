import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateContactDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    phoneNumber:string;

    @IsString()
    address:string;
}
