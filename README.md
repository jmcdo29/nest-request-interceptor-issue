## Description

A simple [Nest](https://github.com/nestjs/nest) app to reproduce issues retrieving request scoped instances of interceptors. In certain cases `moduleRef.resolve()` does not retrieve the existing instance for a given context ID and instead creates a new instance.

Issue detected on NestJs 7.4.4

## Reproducing the issue

Install and start the app using the usual commands and send a request to https://localhost:3000/

Calling the root endpoint calls http://localhost:3000/cats via http/Axios which which calls http://localhost:3000/dogs.

`src/http-client-proxy/http-client-proxy.service.ts` implements the http proxy that tries to retrieve the request-scoped instance of `src/request-interceptor/request-interceptor.service.ts`. 

The constructors of the relevant classes are instrumented and you should see a log similar to this in the console:

```console
Instance 1 of HttpClientProxy created
Instance 1 of RequestInterceptor created
Instance 2 of RequestInterceptor created
Instance 2 of RequestInterceptor retrieved
```

Instance 1 of the RequestInterceptor is created before the http endpoint is called. Instance 2 is created when trying to retrieve instance 1 via `moduleRef.resolve()` using a valid context ID in `src/http-client-proxy/http-client-proxy.service.ts`.

Debugging into the @nestjs/core module [InstanceLinksHost](https://github.com/nestjs/nest/blob/master/packages/core/injector/instance-links-host.ts) reveals that it simply takes the last module in the list of modules using the RequestInterceptor which is not necessarily the one referencing the real instance:
```typescript
    const instanceLink = moduleId
      ? modulesMap.find(item => item.moduleId === moduleId)
      : modulesMap[modulesMap.length - 1];
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Support

No support for this project at all

## License

  [MIT licensed](LICENSE)
