import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthJwtGuard } from '../auth/decorators/auth.decorator';
import { UserData } from '../auth/decorators/user-data.decorator';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { TaskStatus } from '@prisma/client';
import { TaskFilterDto } from './dto/task-filter.dto';

@ApiTags('Tasks')
@AuthJwtGuard()
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  create(
    @UserData('id') userId: string, 
    @Body() createTaskDto: CreateTaskDto
  ) {
    return this.tasksService.create(userId, createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of tasks with filtering' })
  @ApiQuery({ name: 'projectId', required: false })
  @ApiQuery({ name: 'status', enum: TaskStatus, required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'from', required: false, description: 'Start date (YYYY-MM-DD)' })
  @ApiQuery({ name: 'to', required: false, description: 'End date (YYYY-MM-DD)' })
  @Get()
  findAll(
    @UserData('id') userId: string,
    @Query() filters: TaskFilterDto
  ) {
    return this.tasksService.findAll(userId, filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single task' })
  findOne(
    @UserData('id') userId: string, 
    @Param('id') id: string
  ) {
    return this.tasksService.findOne(userId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task' })
  update(
    @UserData('id') userId: string,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(userId, id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  remove(
    @UserData('id') userId: string, 
    @Param('id') id: string
  ) {
    return this.tasksService.remove(userId, id);
  }
}