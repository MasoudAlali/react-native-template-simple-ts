type Nullable<T> = T | null | undefined;

interface UrlParts {
  host: Nullable<string>;
  hostname: Nullable<string>;
  path: Nullable<string>;
  pathParts: string[];
  url: string;
  queries: Record<string, any>;
}
