import { Injectable } from '@nestjs/common';
import { HttpClientProxy } from './http-client-proxy/http-client-proxy.service';

@Injectable()
export class AppService {

  constructor(
    private readonly httpClient: HttpClientProxy
  ) { }

  async getHello(): Promise<string> {
    const response = await this.httpClient.get('http://localhost:3000/cats').toPromise()
    return response.data.toString()
  }
}
