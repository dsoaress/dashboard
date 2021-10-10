import { Injectable, NotFoundException } from '@nestjs/common'
import { v4 as uuid } from 'uuid'

import { PrismaService } from '../prisma/prisma.service'
import { CreateFileDto } from './dto/create-file.dto'

@Injectable()
export class FileService {
  constructor(private prisma: PrismaService) {}

  async create({ filename }: CreateFileDto) {
    const file = await this.prisma.file.create({
      data: {
        filename: uuid() + filename,
        filenameUrl: filename,
        size: 0,
        type: '',
        author: {
          connect: {
            id: '97a25bd1-f35c-40cf-b9e9-2369bfccb875'
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
