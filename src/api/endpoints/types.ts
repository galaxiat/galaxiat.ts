import { Versions } from "../../class/client"
import {Headers } from "node-fetch"
/**
 * Request Action
 * - POST
 * - GET 
 * - PUT
 */
type api_act = "POST" | "GET" | "PUT" | "DELETE"

/**
 * Endpoints var type
 * - path : String (path excluding the hostname) use `{arg_number}` for path params
 * - path_params : list of var name to bind to path params
 * - header_params : list of var name to bind to header params
 * - query_params : list of var name to bind to query params  [api_act, string] | [api_act, string, string[]] | 
 */
export type ENDPOINTSVAR = readonly[api_act, string,readonly string[], readonly string[], readonly string[]]

/**
 * Endpoints type
 * - key : Versions (v0|v1|v2 etc...) => See `src/class/client.ts/Versions`
 * - var : ENDPOINTSVAR 
 */
type ENDPOINTS = {
  [key in Versions]: ENDPOINTSVAR
}

/**
 * Action type
 * - key : actions
 * - value : Endpoints
 */
export type ActionsEndpoints<Actions extends string> = {
  [key in Actions]: ENDPOINTS
}

/**
 * Request params
 * - path => URL for the request
 * - Headers => keyvalue (string => string)
 */
export type RequestElements = {
  method : string,
  url : URL,
  headers : Headers
}