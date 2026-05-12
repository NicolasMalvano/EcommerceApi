import { ApiHideProperty, ApiProperty, PickType } from "@nestjs/swagger";
import { IsEmail, IsEmpty, isEmpty, IsIn, IsNotEmpty, IsNumber, IsOptional, isPostalCode, IsString, IsStrongPassword, MaxLength, MinLength, Validate } from "class-validator";
import { MatchPassword } from "../../../decorators/matchPassword.decorator";

export class registerUserDTO{
    @IsNotEmpty({message: 'No puede estar vacío'})
    @IsString({message: 'Debe ser un string'})
    @MinLength(3 , {message: 'Minimo de 3 caracteres'})
    @MaxLength(80, {message: 'Maximo de 80 caracteres'})
    @ApiProperty({description:'Debe ser un string de entre 3 y 80 caracteres', example: 'TestUser01'})
    name: string;

    @IsNotEmpty({message: 'No puede estar vacío'})
    @IsEmail({}, {message: 'Debe tener formato de email'})
    @ApiProperty({description:'Debe ser un email válido', example: 'TestUser01@mail.com'})
    email: string;

    @IsNotEmpty({message: 'No puede estar vacío'})
    @IsString({message: 'Debe ser un string'})
    @MinLength(8 , {message: 'Minimo de 8 caracteres'})
    @MaxLength(80, {message: 'Maximo de 80 caracteres'})
    @IsStrongPassword({
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1,    
    }, {message: 'Debe tener mínimo una mayúscula, un número, un símbolo y una minúscula'})
    @ApiProperty({description:'Debe tener mínimo una mayúscula, un número, un símbolo y una minúscula', example: 'Testpassword01!'})
    password: string;

    @IsNotEmpty({message: 'No puede estar vacío'})
    @Validate(MatchPassword, ['password'])
    @ApiProperty({description:'Debe ser idéntico al password', example: 'Testpassword01!'})
    confirmPassword: string;

    @IsNotEmpty({message: 'No puede estar vacío'})
    @IsNumber({
        allowInfinity: false,
        allowNaN: false,
    }, {message: 'Debe ser un número'})
    @ApiProperty({description:'Debe ser un número', example: '1234567890'})
    phone: number;

    
    @IsString({message: 'Debe ser un string'})
    @MinLength(5 , {message: 'Minimo de 5 caracteres'})
    @MaxLength(20, {message: 'Maximo de 20 caracteres'})
    @ApiProperty({description:'Debe ser un string', example: 'Example Street'})
    address: string;
   
    @IsString({message: 'Debe ser un string'})
    @MinLength(5 , {message: 'Minimo de 5 caracteres'})
    @MaxLength(20, {message: 'Maximo de 20 caracteres'})
    @ApiProperty({description:'Debe ser un string', example: 'Example Country'})
    country: string ;

    
    @IsString({message: 'Debe ser un string'})
    @MinLength(5 , {message: 'Minimo de 5 caracteres'})
    @MaxLength(20, {message: 'Maximo de 20 caracteres'})
    @ApiProperty({description:'Debe ser un string', example: 'Example City'})
    city: string;

    @ApiHideProperty()
    @IsEmpty()
    isAdmin: boolean;

    @ApiHideProperty()
    @IsEmpty()
    isActive: boolean;
}


export class userUpdateDTO{
    @IsNotEmpty({message: 'No puede estar vacío'})
    @IsString({message: 'Debe ser un string'})
    @MinLength(3 , {message: 'Minimo de 3 caracteres'})
    @MaxLength(80, {message: 'Maximo de 80 caracteres'})
    @ApiProperty({description:'Debe ser un string de entre 3 y 80 caracteres', example: 'TestUser01'})
    name: string;

    @IsNotEmpty({message: 'No puede estar vacío'})
    @IsEmail({}, {message: 'Debe tener formato de email'})
    @ApiProperty({description:'Debe ser un email válido', example: 'TestUser01@mail.com'})
    email: string;

    @IsOptional()
    @IsString({message: 'Debe ser un string'})
    @MinLength(8 , {message: 'Minimo de 8 caracteres'})
    @MaxLength(80, {message: 'Maximo de 80 caracteres'})
    @IsStrongPassword({
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1,    
    }, {message: 'Debe tener mínimo una mayúscula, un número, un símbolo y una minúscula'})
    @ApiProperty({description:'Debe tener mínimo una mayúscula, un número, un símbolo y una minúscula', example: 'Testpassword01!'})
    password: string;

    @IsOptional()
    @IsNumber({
        allowInfinity: false,
        allowNaN: false,
    }, {message: 'Debe ser un número'})
    @ApiProperty({description:'Debe ser un número', example: '1234567890'})
    phone: number;

    @IsOptional()     
    @IsString({message: 'Debe ser un string'})
    @MinLength(5 , {message: 'Minimo de 5 caracteres'})
    @MaxLength(20, {message: 'Maximo de 20 caracteres'})
    @ApiProperty({description:'Debe ser un string', example: 'Example Street'})
    address: string;
    
    @IsOptional()
    @IsString({message: 'Debe ser un string'})
    @MinLength(5 , {message: 'Minimo de 5 caracteres'})
    @MaxLength(20, {message: 'Maximo de 20 caracteres'})
    @ApiProperty({description:'Debe ser un string', example: 'Example Country'})
    country: string ;

    @IsOptional()
    @IsString({message: 'Debe ser un string'})
    @MinLength(5 , {message: 'Minimo de 5 caracteres'})
    @MaxLength(20, {message: 'Maximo de 20 caracteres'})
    @ApiProperty({description:'Debe ser un string', example: 'Example City'})
    city: string ;

    @ApiHideProperty()
    @IsEmpty()
    isAdmin: boolean;

    @ApiHideProperty()
    @IsEmpty()
    isActive: boolean;
}

export class userLoginDTO extends PickType(registerUserDTO, 
    ['email', 'password']
){}
  
