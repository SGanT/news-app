import { environment } from "src/environments/environment";

export class BaseApiService {
  public api = environment.baseApiUrl;

  constructor() { }

  public route(path: any[]): string {
    const pathString = path.join('/');
    console.log(pathString, `${this.api}/${pathString}`)
    return `${this.api}/${pathString}`;
  }
}
