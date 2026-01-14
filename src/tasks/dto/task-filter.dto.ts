import { IsOptional, IsEnum, IsString, IsMongoId } from 'class-validator';
import { TaskStatus } from '@prisma/client';

export class TaskFilterDto {
  @IsOptional()
  @IsMongoId({ message: 'ProjectId must be a valid Id' })
  projectId?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
  
  @IsOptional()
  @IsString()
  from?: string;

  @IsOptional()
  @IsString()
  to?: string;
}