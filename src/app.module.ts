import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpClientProxyModule } from './http-client-proxy/http-client-proxy.module';
import { RequestInterceptorModule } from './request-interceptor/request-interceptor.module';
import { CatsModule } from './cats/cats.module';
import { DogsModule } from './dogs/dogs.module';

@Module({
  imports: [
    HttpClientProxyModule,
    RequestInterceptorModule,
    CatsModule,
    DogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
