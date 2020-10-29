import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { RequestInterceptor } from './request-interceptor/request-interceptor.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  // @UseInterceptors(RequestInterceptor)
  @Get()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }

}
