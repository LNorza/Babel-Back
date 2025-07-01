import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const msg = exception instanceof HttpException ? exception.getResponse() : exception;
    const requestPath = request.url;
    const stackTrace = exception.stack;
    // Extraer la línea del error desde el stack trace
    const errorLine = stackTrace?.split('\n')[1].trim();
    this.logger.error(`Source error:  ${request.method} ${requestPath}`);
    this.logger.error(`Error line: ${errorLine}`);
    // this.logger.error(`Stack Trace: ${stackTrace}`);
    this.logger.error(msg);

    response.status(status).json({
      time: new Date().toISOString(),
      path: request.url,
      error: msg,
    });
  }
}
