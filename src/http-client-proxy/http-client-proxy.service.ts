import { HttpService, Inject, Injectable, Scope } from '@nestjs/common';
import { ContextIdFactory, ModuleRef, REQUEST } from '@nestjs/core';
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Observable } from 'rxjs';
import { RequestInterceptor } from 'src/request-interceptor/request-interceptor.service';

let constructorCount = 0

@Injectable({ scope: Scope.REQUEST })
export class HttpClientProxy extends HttpService {

  private instanceId: number

  constructor(
    @Inject(REQUEST) private readonly inboundRequest: Record<string, unknown>,
    private readonly moduleRef: ModuleRef
  ) {
    super()
    constructorCount++
    this.instanceId = constructorCount
    console.log(`Instance ${this.instanceId} of HttpClientProxy created`)
  }

  get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Observable<AxiosResponse<T>> {
    return this.delegateRequest(this, 'get', url, config)
  }

  private _get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Observable<AxiosResponse<T>> {
    return super.get(url, config)
  }

  private delegateRequest<T = any>(
    callback: any,
    method: string,
    ...args: any[]
  ): Observable<AxiosResponse<T>> {
    return new Observable<AxiosResponse>(observer => {
      
      const contextId = ContextIdFactory.getByRequest(this.inboundRequest)

      this.moduleRef.resolve(RequestInterceptor, contextId, { strict: false }).then(async (requestInterceptor) => {

        console.log(`Instance ${requestInterceptor.getInstanceId()} of RequestInterceptor retrieved`)
        
        const headers = requestInterceptor.getRequestHeaders()
        // ... do something with the headers, e.g mix them into the config 

        const response = await callback['_' + method](...args).toPromise()
        
        observer.next(response)
        observer.complete()
      })

    })
  }
}
