/**
 * Type of url object 
 * - CDN : Image delivery network
 * - API : Main api of Galaxiat
 */
type UrlsValues = {
  cdn : string
  api : string
}

/**
 * Type of env that exists
 * - local : only for Galaxiat team
 * - dev : version hosted at `https://dev.galaxiatapp.com`
 * - prod : production version hosted at `https://galaxiatapp.com`
 */
type EnvType = "local" | "dev" | "prod"

/**
 * Type of urls that exists (key-value)
 * - Key : see EnvType
 * - Value : urls values
 */
type Urls = {
  [n in EnvType] : UrlsValues
}

/**
 * Url config that library use (when env are specified)
 * - See Urls type 
 */
const urls : Urls = {
  "local" : {
    cdn : "http://localhost:8082",
    api : "http://localhost:8080"
  },
  "dev" : {
    cdn : "https://cdn-dev.galaxiatapp.com",
    api : "https://api-dev.galaxiatapp.com",
  },
  "prod" : {
    cdn : "https://cdn.galaxiatapp.com",
    api : "https://api.galaxiatapp.com",
  },
}

/**
 * Type Version
 * - Contain all api version that client will use
 */
export type Versions = "v0" 

/**
 * Client Class
 * - Use it to call api
 * ---------------------
 * - env : EnvType => Chose what endpoint are targeted
 * - data : (client infos) => use `setDataXXX` method to set the infos
 *    - token : (token for the client) => Not required for all ops
 *    - version : version that client will use
 */
export class GalaxiatClient {
  private env : EnvType
  private data : {
    token? : string
    version : Versions
  }
  constructor(env : EnvType, version : Versions) {
    this.env = env
    this.data = {
      version : version
    }
  }
  public get dataVersion() {
    return this.data.version
  }
  public get dataToken() {
    return this.data.token
  }
  public setDataToken(token : string) {
    this.data.token = token
  }
  public setDataVersion(version : Versions) {
    this.data.version = version
  }
  public getBaseUrl(type : keyof UrlsValues) : string {
    return urls[this.env][type]
  }
}
