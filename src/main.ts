import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor, TimeOutInterceptor } from './common/interceptors';
import { initSwagger } from './app.swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false, // N elimina propiedades no definidas en el DTO.
      transform: true, // Convierte automáticamente tipos (ej. string a number).
      validateCustomDecorators: true, // Valida decoradores personalizados.
      forbidNonWhitelisted: true, //  Lanza error si llegan propiedades no definidas en el DTO.
    }),
  );

  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new TimeOutInterceptor());
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.setGlobalPrefix('api/v1', { exclude: [{ path: 'docs', method: RequestMethod.GET }] });
  app.enableCors();
  initSwagger(app);

  await app.listen(process.env.API_PORT ?? 4000);
  const logger = new Logger();
  logger.log(`Server is running in ${await app.getUrl()}`);
}
bootstrap();
