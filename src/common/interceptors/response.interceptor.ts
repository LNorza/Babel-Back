import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';
import { Stream } from 'stream';

export interface StandardResponse<T> {
  data: T;
  statusCode: number;
  message: string | null;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, StandardResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();

    return next.handle().pipe(
      map((data) => {
        // ⚠️ Si se usa @Res() manual o ya se enviaron los headers, no hagas nada
        if (response.headersSent) return data;

        // ⚠️ Si es un stream (como PDF), no lo transformes
        if (data instanceof Stream || data instanceof Buffer) return data;

        // ⚠️ Si es null o undefined, devuélvelo tal cual
        if (data === undefined || data === null) return data;

        // ✅ Formatea respuesta si es un objeto regular
        const { message, ...info } = data;
        return {
          data: info,
          statusCode: response.statusCode,
          message: message || null,
        };
      }),
    );
  }
}
