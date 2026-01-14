import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwtToken: string;
  let taskId: string;
  let projectId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
    
    prisma = app.get(PrismaService);
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await app.close();
  });

  it('/auth/register (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'jest@test.com', password: '123456' })
      .expect(201) 
      .expect((res) => {
        expect(res.body.email).toEqual('jest@test.com');
        expect(res.body.id).toBeDefined();
      });
  });

  it('/auth/login (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'jest@test.com', password: '123456' })
      .expect(201);

    jwtToken = res.body.access_token;
    expect(jwtToken).toBeDefined(); 
  });

  it('/tasks (GET) - Fail without token', () => {
    return request(app.getHttpServer())
      .get('/tasks')
      .expect(401);
  });

  it('/tasks (POST) - Create task', async () => {
    const task = await request(app.getHttpServer())
      .post('/tasks')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Jest Task' })
      .expect(201)
      .expect((res) => {
        expect(res.body.title).toEqual('Jest Task');
      });
    taskId = task.body.id;
    expect(taskId).toBeDefined();
  });

  it ('/tasks (GET) - Get tasks', async () => {
    const res = await request(app.getHttpServer())
      .get('/tasks')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
    
    expect(res.body.length).toBe(1);
  });

  it ('/tasks/:id (PATCH) - Update task', async () => {
    await request(app.getHttpServer())
      .patch(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ projectId: 'non-valid-project-id' })
      .expect(400)
  });

  it('/projects (POST) - Create project', async () => {
    const project = await request(app.getHttpServer())
      .post('/projects')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Jest Project' })
      .expect(201)
      .expect((res) => {
        expect(res.body.title).toEqual('Jest Project');
      });
    
    projectId = project.body.id;
  });

  it ('/tasks/:id (PATCH) - Update task with valid projectId', async () => {
    await request(app.getHttpServer())
      .patch(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ projectId: projectId })
      .expect(200)
      .expect((res) => {
        expect(res.body.projectId).toEqual(projectId);
      });
  });
});