import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { RequestInterceptor } from 'src/request-interceptor/request-interceptor.service';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {

  constructor(private readonly catsService: CatsService) { }

  // @UseInterceptors(RequestInterceptor)
  @Get()
  async getHello(): Promise<string> {
    return this.catsService.getCats();
  }

}
