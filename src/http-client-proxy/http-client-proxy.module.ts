import { Global, Module } from '@nestjs/common';
import { HttpClientProxy } from './http-client-proxy.service';

@Global()
@Module({
  providers: [HttpClientProxy],
  exports: [HttpClientProxy]
})
export class HttpClientProxyModule {}
