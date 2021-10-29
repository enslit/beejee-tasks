type SearchQuery = Record<string, string | number | boolean>;

type FetchOptions<Body = undefined> = {
  bodyType?: 'formData' | 'raw';
  body?: Body;
  headers?: HeadersInit;
  queryParams?: SearchQuery;
};

type FetchMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export class BaseApi {
  private readonly baseUrl: string;
  private searchQuery: SearchQuery;
  private headers: HeadersInit;

  constructor(
    url: string,
    options?: { headers?: HeadersInit; searchQuery?: SearchQuery }
  ) {
    this.baseUrl = url;
    this.headers = options?.headers || {};
    this.searchQuery = options?.searchQuery || {};
  }

  protected setHeaders(headers: HeadersInit) {
    this.headers = { ...this.headers, ...headers };
  }

  protected setSearchQueries(query: SearchQuery) {
    this.searchQuery = { ...this.searchQuery, ...query };
  }

  private createHeaders(headers: HeadersInit = {}): HeadersInit {
    return { ...this.headers, ...headers };
  }

  private createBody<Body>(body: Body, type: 'raw' | 'formData' = 'formData') {
    if (type === 'raw') {
      return JSON.stringify(body);
    } else {
      const formData = new FormData();

      Object.entries(body).forEach(([key, value]) => {
        formData.append(key, value);
      });

      return formData;
    }
  }

  private createRequestInit<Body>(
    method: FetchMethod,
    options?: FetchOptions<Body>
  ): RequestInit {
    const requestInit: RequestInit = { method };

    if (options) {
      if (options.headers) {
        requestInit.headers = this.createHeaders(options?.headers);
      }

      if (options.body) {
        requestInit.body = this.createBody<Body>(
          options.body,
          options?.bodyType
        );
      }
    }

    return requestInit;
  }

  private setQueryParamsToUrl(url: URL, params: SearchQuery) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value.toString());
    });
  }

  private createUrl(url: string, query?: SearchQuery): URL {
    const reqUrl = new URL(this.baseUrl + url);

    if (this.searchQuery) {
      this.setQueryParamsToUrl(reqUrl, this.searchQuery);
    }

    if (query) {
      this.setQueryParamsToUrl(reqUrl, query);
    }

    return reqUrl;
  }

  protected async fetch<Res, Req = undefined>(
    url: string,
    method: FetchMethod = 'GET',
    options?: FetchOptions<Req>
  ): Promise<Res> {
    const requestUrl = this.createUrl(url, options?.queryParams);
    const requestInit = this.createRequestInit<Req>(method, options);

    const response = await fetch(requestUrl.href, requestInit);

    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response.json();
  }
}
