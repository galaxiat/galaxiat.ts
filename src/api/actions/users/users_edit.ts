import { GalaxiatClient, Versions } from "../../../class/client";
import { APIAuthRequired, APIVersionMissmatch } from "../../../errors/api";
import { UsersEndpointsMap } from "../../endpoints/users";
import { BindToParams } from "../../endpoints/utils";
import { APIAction } from "../types";
import { RequestElements } from "../../endpoints/types"
import { CallAPI } from "../call";
import { User } from "../../../class/users"
export interface APIUserEdit extends APIAction {
  "v0": APIUserEditV0
}
export interface APIUserEditRes extends APIAction {
  "v0": APIUserEditV0Res
}
interface APIUserEditV0 {
  username: string,
  username_at: string,
  email: string,
  password: string
}
interface APIUserEditV0Res {
  id : string,
  username: string,
  username_at: string,
  coins: bigint,
  xp: bigint,
  email_verified: boolean,
  email: string,
  admin: boolean
}
export async function APIUserEditCall<V extends Versions>(client: GalaxiatClient, data: APIUserEdit[V]): Promise<APIUserEditRes[V] | Error> {
  if (!data) {
    return new Error(APIVersionMissmatch)
  }
  if (!client.dataToken) {
    return new Error(APIAuthRequired)
  }
  const base_url = client.getBaseUrl("api")
  const action_endpoint = UsersEndpointsMap.edit
  let req_elem: undefined | RequestElements
  let user: User
  switch (client.dataVersion) {
    case "v0": {
      const endpoint = action_endpoint.v0
      req_elem = BindToParams<typeof endpoint>(base_url, endpoint, {}, {
        "authorization": client.dataToken
      }, {
        email: data.email,
        password: data.password,
        username: data.username,
        username_at: data.username_at
      })
      let res = await CallAPI(req_elem)
      if (res.type == "error") {
        return new Error(res.message)
      }
      return res.data as APIUserEditV0Res
    }
    default: {
      return new Error(APIVersionMissmatch)
    }
  }
}