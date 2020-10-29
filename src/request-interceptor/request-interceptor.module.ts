import { Global, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RequestInterceptor } from './request-interceptor.service';

@Global()
@Module({
  providers: [
    RequestInterceptor,
    {
      provide: APP_INTERCEPTOR,
      useExisting: RequestInterceptor,
    },
  ],
  exports: [RequestInterceptor],
})
export class RequestInterceptorModule {}
