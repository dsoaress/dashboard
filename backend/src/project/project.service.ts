import { Injectable, NotFoundException } from '@nestjs/common'

import { PrismaService } from '../prisma/prisma.service'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update-project.dto'

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, { title, description, status }: CreateProjectDto) {
    const project = await this.prisma.project.create({
      data: {
        title,
        description,
        status,
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
      id: project.id,
      title: project.title,
      description: project.description,
      status: project.status,
      createdAt: project.createdAt,
      author: {
        id: project.author.id,
        name: project.author.name,
        email: project.author.email,
        avatar: project.author.avatar?.filenameUrl ?? null
      }
    }
  }

  async findAll(page = 1) {
    const projects = await this.prisma.project.findMany({
      take: 10,
      skip: 10 * (page - 1),
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          include: { avatar: true }
        }
      }
    })

    return {
      page: Number(page),
      hasMore: projects.length >= 10,
      data: projects.map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        status: project.status,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
        author: {
          id: project.author.id,
          name: project.author.name,
          email: project.author.email,
          avatar: project.author.avatar?.filenameUrl ?? null,
          role: project.author.role
        }
      }))
    }
  }

  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        author: {
          include: { avatar: true }
        }
      }
    })

    if (!project) {
      throw new NotFoundException()
    }

    return {
      id: project.id,
      title: project.title,
      description: project.description,
      status: project.status,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      author: {
        id: project.author.id,
        name: project.author.name,
        email: project.author.email,
        avatar: project.author.avatar?.filenameUrl ?? null
      }
    }
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    await this.findOne(id)

    const project = await this.prisma.project.update({
      where: { id },
      data: { ...updateProjectDto },
      include: {
        author: {
          include: { avatar: true }
        }
      }
    })

    return {
      id: project.id,
      title: project.title,
      description: project.description,
      status: project.status,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      author: {
        id: project.author.id,
        name: project.author.name,
        email: project.author.email,
        avatar: project.author.avatar?.filenameUrl ?? null
      }
    }
  }

  async remove(id: string) {
    await this.findOne(id)
    await this.prisma.project.delete({
      where: { id }
    })
  }
}
