import { Body, Controller, Get, Headers, Patch, Post, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { ActiveUser } from '@/common/decorators/active-user.decorator'
import { UserActiveInterface } from '@/common/interfaces/user-active.interface'
import { Role } from '@/common/enums/rol.enum'
import { AuthService } from './auth.service'
import { Auth } from './decorators/auth.decorator'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { UpdateUserDto } from '@/users/dto/update-user.dto'

interface RequestWithUser extends Request {
  user: {
    email: string
    role: string
  }
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body()
    registerDto: RegisterDto,
  ) {
    return this.authService.register(registerDto)
  }

  @Post('login')
  login(
    @Body()
    loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto)
  }

  @Get('verify-token')
  verifyToken(@Headers('Authorization') authorization: string) {
    const token = authorization.split(' ')[1]
    return this.authService.verifyToken(token)
  }

  @Get('profile')
  @Auth(Role.USER)
  profile(@ActiveUser() user: UserActiveInterface) {
    console.log(user)
    return this.authService.profile(user)
  }

  @Patch('profile')
  @Auth(Role.USER)
  updateProfile(@ActiveUser() user: UserActiveInterface, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.updateProfile(user, updateUserDto)
  }
}
