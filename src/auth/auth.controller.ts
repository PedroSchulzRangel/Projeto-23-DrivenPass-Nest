import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('users')
@Controller('users')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('sign-up')
    @ApiOperation({summary: 'Creates a new user from SignUpDto data'})
    @ApiResponse({status: HttpStatus.CREATED, description: "user created successfully"})
    @HttpCode(HttpStatus.CREATED)
    signUp(@Body() signUpDto: SignUpDto){
        return this.authService.signUp(signUpDto);
    }

    @Post('sign-in')
    @ApiOperation({summary: 'Checks if user body matches with database'})
    @ApiResponse({status: HttpStatus.OK, description: "user sign-in successfully"})
    @HttpCode(HttpStatus.OK)
    signIn(@Body() signInDto: SignInDto){
        return this.authService.signIn(signInDto);
    }
}
