import { Injectable } from '@nestjs/common';
import { HttpClientProxy } from 'src/http-client-proxy/http-client-proxy.service';

@Injectable()
export class CatsService {

  constructor(
    private readonly httpClient: HttpClientProxy
  ) { }

  async getCats(): Promise<string> {
    const response = await this.httpClient.get('http://localhost:3000/dogs').toPromise()
    return response.data.toString()
  }
}
