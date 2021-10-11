import { Injectable, NotFoundException } from '@nestjs/common'
import { v4 as uuid } from 'uuid'

import { PrismaService } from '../prisma/prisma.service'
import { CreateFileDto } from './dto/create-file.dto'

@Injectable()
export class FileService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, { filename }: CreateFileDto) {
    const file = await this.prisma.file.create({
      data: {
        filename: uuid() + filename,
        filenameUrl: filename,
        size: 2 * 1024 * 1024, // fake size 2MB
        type: 'jpeg', // fake type
        author: {
          connect: {
            id: userId
          }
        }
      },
      include: {
        author: {
          include: { avatar: true }
        }
      }
    })

    return {
      id: file.id,
      filename: file.filename,
      filenameUrl: file.filenameUrl,
      type: file.type,
      size: file.size,
      createdAt: file.createdAt,
      author: {
        id: file.author.id,
        name: file.author.name,
        email: file.author.email,
        avatar: file.author.avatar?.filenameUrl ?? null
      }
    }
  }

  async findAll() {
    const files = await this.prisma.file.findMany({
      include: {
        author: {
          include: { avatar: true }
        }
      }
    })

    return files.map(file => ({
      id: file.id,
      filename: file.filename,
      filenameUrl: file.filenameUrl,
      type: file.type,
      size: file.size,
      createdAt: file.createdAt,
      author: {
        id: file.author.id,
        name: file.author.name,
        email: file.author.email,
        avatar: file.author.avatar?.filenameUrl ?? null
      }
    }))
  }

  async findOne(id: string) {
    const file = await this.prisma.file.findUnique({
      where: { id },
      include: {
        author: {
          include: { avatar: true }
        }
      }
    })

    if (!file) {
      throw new NotFoundException()
    }

    return {
      id: file.id,
      filename: file.filename,
      filenameUrl: file.filenameUrl,
      type: file.type,
      size: file.size,
      createdAt: file.createdAt,
      author: {
        id: file.author.id,
        name: file.author.name,
        email: file.author.email,
        avatar: file.author.avatar?.filenameUrl ?? null
      }
    }
  }

  async remove(id: string) {
    await this.findOne(id)
    await this.prisma.file.delete({
      where: { id }
    })
  }
}
