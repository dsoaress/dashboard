import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { User } from '@prisma/client'

import { ParametersPipe } from '../common/pipes/parameters.pipe'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update-project.dto'
import { ProjectService } from './project.service'

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Req() { user }: { user: User }, @Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(user.id, createProjectDto)
  }

  @Get()
  findAll(@Query('page') page: number) {
    return this.projectService.findAll(page)
  }

  @Get(':id')
  findOne(@Param('id', ParametersPipe) id: string) {
    return this.projectService.findOne(id)
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id', ParametersPipe) id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto)
  }

  @Delete(':id')
  remove(@Param('id', ParametersPipe) id: string) {
    return this.projectService.remove(id)
  }
}
