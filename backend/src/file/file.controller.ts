import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'

import { ParametersPipe } from '../common/pipes/parameters.pipe'
import { CreateFileDto } from './dto/create-file.dto'
import { FileService } from './file.service'

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createFileDto: CreateFileDto) {
    return this.fileService.create(createFileDto)
  }

  @Get()
  findAll() {
    return this.fileService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParametersPipe) id: string) {
    return this.fileService.findOne(id)
  }

  @Delete(':id')
  remove(@Param('id', ParametersPipe) id: string) {
    return this.fileService.remove(id)
  }
}
