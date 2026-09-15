
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Évite de répéter api devant chaque route//
  app.setGlobalPrefix('api');

  //Vérification globale du format des données//
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Évite l'injection de propriétés//
      transform: true  //Transforme les valeurs reçues dans les bons types//
    }),
  );

  //Gestion CORS//
  app.enableCors({
    origin: 'http://localhost:5173',
  });

  //Création du doc Swagger//
  const config = new DocumentBuilder()
  .setTitle('Chatop API')
  .setDescription('API backend de Chatop')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();