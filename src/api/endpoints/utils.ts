import { ENDPOINTSVAR, RequestElements } from "./types"
import {Headers} from "node-fetch"
/**
 * Utility types for BindToParams function
 */
type TypeFromArray<array extends readonly string[]> = array[number]
type MapFromArray<type extends readonly string[]> = { [key in TypeFromArray<type>] : string }
/**
 * BindToParams : This function return method and path
 * @param endpoint => the endpoint to use
 * @param path_params => path params to bind
 * @param query_params => query params to bind
 */
export function BindToParams<Endpoint extends ENDPOINTSVAR>(base : string, endpoint: ENDPOINTSVAR, path_params: MapFromArray<Endpoint["2"]> ,header_params: MapFromArray<Endpoint["3"]>,  query_params: MapFromArray<Endpoint["4"]>) : RequestElements{
  let endpoint_path = endpoint[1] // select the endpoint path
  for (const [path_param, value]  of Object.entries<string>(path_params)) {
    endpoint_path = endpoint_path.replace(`{${path_param}}`, value)
  }
  let url = new URL(endpoint_path, base)
  for (const [query_param, value]  of Object.entries<string>(query_params)) {
    url.searchParams.append(query_param, value)
  }
  let endpoint_header = new Headers()
  for (const [header_param, value]  of Object.entries<string>(header_params)) {
    endpoint_header.append(header_param, value)
  }
  return  {
    method : endpoint[0],
    headers : endpoint_header,
    url : url
  }
}


