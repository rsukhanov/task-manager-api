import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthJwtGuard } from '../auth/decorators/auth.decorator';
import { UserData } from '../auth/decorators/user-data.decorator';

@ApiTags('Projects')
@AuthJwtGuard()
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  create(
    @UserData('id') userId: string, 
    @Body() createProjectDto: CreateProjectDto
  ) {
    return this.projectsService.create(userId, createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all my projects' })
  findAll(
    @UserData('id') userId: string
  ) {
    return this.projectsService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a project and its tasks' })
  findOne(
    @UserData('id') userId: string, 
    @Param('id') id: string
  ) {
    return this.projectsService.findOne(userId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a project' })
  update(
    @UserData('id') userId: string,
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(userId, id, updateProjectDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a project' })
  remove(
    @UserData('id') userId: string,
    @Param('id') id: string
  ) {
    return this.projectsService.remove(userId, id);
  }
}