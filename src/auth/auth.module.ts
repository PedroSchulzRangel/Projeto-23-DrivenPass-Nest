import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthService } from './auth.service';

@Global()
@Module({
    imports: [JwtModule.register({
        secret: process.env.JWT_SECRET
    }), PrismaModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
