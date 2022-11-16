import Url from 'url';

class DeeplinkService {
  getRouteInfoFromUrl(url: string): UrlParts {
    const _url = Url.parse(url);

    return {
      host: _url.hostname,
      hostname: _url.hostname,
      url,
      path: _url.pathname,
      pathParts: _url.pathname?.trim().replace(/^\//, '').split('/') || [],
      queries:
        _url.query?.split('&').reduce(
          (acc, i) => ({
            ...acc,
            [i.split('=')[0]]: i.split('=')[1],
          }),
          {},
        ) || {},
    };
  }
}

export default new DeeplinkService();
