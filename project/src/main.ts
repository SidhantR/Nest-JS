import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //apply validation or transformation logic to all incoming requests
  app.useGlobalPipes(
    new ValidationPipe({
        whitelist: true, // remove properties that dont have decorator. Keep only properties defined in your DTO
        forbidNonWhitelisted: true, //throw an error if the incoming request contains any extra (non-whitelisted) properties.
        transform: true ,// Converts query/params/body to correct types automatically
        disableErrorMessages: false
    })
  )
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
