import { GalaxiatClient, Versions } from "../../../class/client";
import { APIAuthRequired, APIVersionMissmatch } from "../../../errors/api";
import { UsersEndpointsMap } from "../../endpoints/users";
import { BindToParams } from "../../endpoints/utils";
import { APIAction } from "../types";
import { RequestElements } from "../../endpoints/types"
import { CallAPI } from "../call";
import { User } from "../../../class/users"
export interface APIUserLogin extends APIAction {
  "v0": APIUserLoginV0
}
export interface APIUserLoginRes extends APIAction {
  "v0": APIUserLoginV0Res
}
interface APIUserLoginV0 {
  email: string,
  password: string
}
interface APIUserLoginV0Res {
  token : string
} 
export async function APIUserLoginCall<V extends Versions>(client: GalaxiatClient, data: APIUserLogin[V]): Promise<APIUserLoginRes[V] | Error> {
  if (!data) {
    return new Error(APIVersionMissmatch)
  }
  const base_url = client.getBaseUrl("api")
  const action_endpoint = UsersEndpointsMap.login
  let req_elem: undefined | RequestElements
  let user: User
  switch (client.dataVersion) {
    case "v0": {
      const endpoint = action_endpoint.v0
      req_elem = BindToParams<typeof endpoint>(base_url, endpoint, {
      }, {}, {
        email: data.email,
        password: data.password,
      })
      let res = await CallAPI(req_elem)
      if (res.type == "error") {
        return new Error(res.message)
      }
      let api_res : APIUserLoginV0Res = {
        token : res.data as string
      }
      return api_res
    }
    default: {
      return new Error(APIVersionMissmatch)
    }
  }
}