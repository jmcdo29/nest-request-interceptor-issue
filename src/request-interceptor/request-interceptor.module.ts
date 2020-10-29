import { Global, Module } from '@nestjs/common';
import { RequestInterceptor } from './request-interceptor.service';

@Global()
@Module({
  providers: [RequestInterceptor],
  exports: [RequestInterceptor]
})
export class RequestInterceptorModule {}
