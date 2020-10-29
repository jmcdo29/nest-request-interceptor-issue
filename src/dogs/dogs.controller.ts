import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { RequestInterceptor } from 'src/request-interceptor/request-interceptor.service';
import { DogsService } from './dogs.service';

@Controller('dogs')
export class DogsController {

  constructor(private readonly dogsService: DogsService) { }

  @UseInterceptors(RequestInterceptor)
  @Get()
  getHello(): string {
    return this.dogsService.getDogs();
  }

}
