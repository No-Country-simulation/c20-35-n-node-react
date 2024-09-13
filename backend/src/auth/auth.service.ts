import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { RegisterDto } from './dto/register.dto'

import { JwtService } from '@nestjs/jwt'
import * as bcryptjs from 'bcryptjs'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { name, email, password, height, weight, age, activityLevel, goal } = registerDto
    const user = await this.usersService.findOneByEmail(email)
    if (user) {
      throw new BadRequestException('User already exists')
    }
    await this.usersService.create({
      name,
      email,
      password: await bcryptjs.hash(password, 10),
      height,
      weight,
      age,
      activityLevel,
      goal,
    })
    return {
      name,
      email,
    }
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findByEmailWithPassword(email)
    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials')
    }
    const payload = { email: user.email, role: user.role }
    const token = await this.jwtService.signAsync(payload)
    return {
      token,
      email,
    }
  }

  async profile({ email, role }: { email: string; role: string }) {
    return await this.usersService.findOneByEmail(email)
  }
}
