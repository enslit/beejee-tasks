export class BaseApi {
  private readonly baseUrl: RequestInfo;
  private headers: HeadersInit = {};

  constructor(url: RequestInfo) {
    this.baseUrl = url;
  }

  protected fetch<Res, Req = undefined>(
    url: string,
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET',
    options?: {
      bodyType?: 'formData' | 'raw';
      body?: Req;
      headers?: HeadersInit;
      queryParams?: Record<string, string | number | boolean>;
    }
  ): Promise<Res> {
    let urlWithParams: RequestInfo = this.baseUrl + url;

    const reqOptions: RequestInit = {
      method,
      headers: this.headers,
    };

    if (options && options.body) {
      if (options?.bodyType === 'raw') {
        reqOptions.body = JSON.stringify(options.body);
      } else {
        const formData = new FormData();
        Object.entries(options.body).forEach(([key, value]) => {
          formData.append(key, value);
        });
        reqOptions.body = formData;
      }
    }

    if (options && options.queryParams) {
      urlWithParams += '?';
      Object.entries(options.queryParams).forEach(([key, value], i) => {
        urlWithParams += `${i > 0 ? '&' : ''}${key}=${value}`;
      });
    }

    return fetch(urlWithParams, reqOptions).then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      return response.json();
    });
  }
}
