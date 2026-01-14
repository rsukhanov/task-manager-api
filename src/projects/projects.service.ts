import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createProjectDto: CreateProjectDto) {
    return this.prisma.project.create({
      data: {
        ...createProjectDto,
        ownerId: userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.project.findMany({
      where: {
        ownerId: userId,
      },
      orderBy: {
        updatedAt: 'desc', 
      },
      include: {
        _count: {
          select: { tasks: true },
        },
      },
    });
  }

  async findOne(userId: string, projectId: string) {
    const project = await this.prisma.project.findFirst({
      where: {
        id: projectId,
        ownerId: userId,
      },
      include: {
        tasks: {
          orderBy: { createdAt: 'desc' }
        },
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async update(userId: string, projectId: string, updateProjectDto: UpdateProjectDto) {
    await this.findOne(userId, projectId);


    return this.prisma.project.update({
      where: { id: projectId },
      data: updateProjectDto,
    });
  }

  async remove(userId: string, projectId: string) {
    await this.findOne(userId, projectId);

    return this.prisma.project.delete({
      where: { id: projectId },
    });
  }
}