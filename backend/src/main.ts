
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Évite de répéter api devant chaque route//
  app.setGlobalPrefix('api');

  //Vérification globale du format des données//
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Évite l'injection de propriétés//
    }),
  );

  //Gestion CORS//
  app.enableCors({
    origin: 'http://localhost:5173',
  });

  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();