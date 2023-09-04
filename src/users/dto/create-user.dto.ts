import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({example: "example@example.com", description: "email for user"})
    email: string;

    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 10,
        minNumbers: 1,
        minUppercase: 1,
        minLowercase: 1,
        minSymbols: 1
    })
    @ApiProperty({example: "s3nh@Fort3", description: "password for user"})
    password: string;
}
