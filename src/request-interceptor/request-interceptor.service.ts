import { CallHandler, ContextType, ExecutionContext, Injectable, NestInterceptor, Scope } from '@nestjs/common';
import { Observable } from 'rxjs';

let constructorCount = 0

@Injectable()
export class RequestInterceptor implements NestInterceptor {

  private instanceId: number
  constructor() {
    constructorCount++
    this.instanceId = constructorCount
    console.log(`Instance ${this.instanceId} of RequestInterceptor created`)
  }

  getInstanceId(): number {
    return this.instanceId
  }

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

    switch (context.getType()) {
      case <ContextType>'http':
        const httpRequest: Request = context.switchToHttp().getRequest()
        break
      case <ContextType>'rpc':
        const grpcContext = context.switchToRpc().getContext()
        break
    }

    return next.handle()
  }

  public getRequestHeaders():any {
    return ''
  }
}
