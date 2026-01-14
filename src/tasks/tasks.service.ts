import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        ...createTaskDto,
        ownerId: userId,
      },
    });
  }

  async findAll(
    userId: string, 
    filters?: { 
      projectId?: string; 
      status?: TaskStatus;
      search?: string;
      from?: string;
      to?: string;
    }
  ) {
    const { projectId, status, search, from, to } = filters ?? {};

    const dateFilter = (from || to) ? {
      createdAt: {
        ...(from && { gte: new Date(from) }), 
        ...(to && { lte: new Date(to) }), 
      }
    } : {};

    return this.prisma.task.findMany({
      where: {
        ownerId: userId,
        
        ...(projectId && { projectId }),
        ...(status && { status }),
        ...(search && {
          title: { contains: search, mode: 'insensitive' },
        }),

        ...dateFilter,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        project: true,
      },
    });
  }

  async findOne(userId: string, taskId: string) {
    const task = await this.checkTaskExists(taskId);
    this.checkTaskOwnership(userId, task.ownerId);

    return task;
  }

  async update(userId: string, taskId: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.checkTaskExists(taskId);
    this.checkTaskOwnership(userId, task.ownerId);

    return this.prisma.task.update({
      where: { id: taskId },
      data: updateTaskDto,
    });
  }

  async remove(userId: string, taskId: string) {
    const task = await this.checkTaskExists(taskId);
    this.checkTaskOwnership(userId, task.ownerId);

    return this.prisma.task.delete({
      where: { id: taskId },
    });
  }



  async checkTaskExists(taskId: string) {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
      include: { project: true },
    });

    if (!task) throw new NotFoundException('Task not found');

    return task;
  }

  checkTaskOwnership(userId: string, tasksOwnerId: string ) {
    if (userId !== tasksOwnerId) {
      throw new NotFoundException('Task not found');
    }
  }
}