import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { Role } from '@prisma/client'
import { hashSync } from 'bcryptjs'
import { v4 as uuid } from 'uuid'

import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto, userRole?: Role) {
    const emailExists = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email
      }
    })

    if (emailExists) {
      throw new BadRequestException('email already used')
    }

    if (createUserDto.role === 'ADMIN' && userRole !== 'ADMIN') {
      delete createUserDto.role
    }

    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashSync(createUserDto.password, 8),
        avatar: {
          create: createUserDto.avatar
            ? {
                filename: uuid() + createUserDto.avatar,
                filenameUrl: createUserDto.avatar,
                size: 2 * 1024 * 1024, // fake size 2MB
                type: 'jpeg' // fake type
              }
            : undefined
        }
      },
      include: {
        avatar: true
      }
    })

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar?.filenameUrl ?? null,
      role: user.role,
      createdAt: user.createdAt
    }
  }

  async findAll(page = 1) {
    const users = await this.prisma.user.findMany({
      take: 10,
      skip: 10 * (page - 1),
      orderBy: { name: 'asc' },
      include: {
        avatar: true,
        projects: true
      }
    })

    return {
      page: Number(page),
      hasMore: users.length >= 10,
      data: users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar?.filenameUrl ?? null,
        role: user.role,
        projects: user.projects.map(project => ({
          id: project.id,
          title: project.title,
          description: project.description,
          status: project.status,
          createdAt: project.createdAt,
          updatedAt: project.updatedAt
        })),
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }))
    }
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { avatar: true }
    })

    if (!user) {
      throw new NotFoundException()
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar?.filenameUrl ?? null,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        email: true,
        avatar: {
          select: { id: true }
        }
      }
    })

    if (!user) {
      throw new NotFoundException()
    }

    if (updateUserDto.email) {
      const emailExists = await this.prisma.user.findUnique({
        where: {
          email: updateUserDto.email
        }
      })

      if (emailExists && updateUserDto.email !== user.email) {
        throw new BadRequestException('email already used')
      }
    }

    if (updateUserDto.password) {
      updateUserDto.password = hashSync(updateUserDto.password, 8)
    }

    if (updateUserDto.avatar) {
      delete updateUserDto.avatar
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto,
        avatar: {}
      },
      include: {
        avatar: true
      }
    })

    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      avatar: updatedUser.avatar?.filenameUrl ?? null,
      role: updatedUser.role,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt
    }
  }

  async remove(id: string) {
    const { avatarId } = await this.prisma.user.findUnique({
      where: { id },
      select: { avatarId: true }
    })

    if (avatarId) {
      await this.prisma.file.delete({
        where: { id: avatarId }
      })
    }

    await this.prisma.user.delete({
      where: { id }
    })
  }
}
