import { GalaxiatClient, Versions } from "../../../class/client";
import { APIAuthRequired, APIVersionMissmatch } from "../../../errors/api";
import { UsersEndpointsMap } from "../../endpoints/users";
import { BindToParams } from "../../endpoints/utils";
import { APIAction } from "../types";
import { RequestElements } from "../../endpoints/types"
import { CallAPI } from "../call";
import { User } from "../../../class/users"
export interface APIUserGet extends APIAction {
  "v0": APIUserGetV0
}
export interface APIUserGetRes extends APIAction {
  "v0": APIUserGetV0Res
}
interface APIUserGetV0 {
  userid : string
}
interface APIUserGetV0Res {
  id : number,
  username: string,
  username_at: string,
  coins: bigint,
  xp: bigint,
  email_verified: boolean,
  email: string,
  admin: boolean
}
export async function APIUserGetCall<V extends Versions>(client: GalaxiatClient, data: APIUserGet[V]): Promise<APIUserGetRes[V] | Error> {
  if (!data) {
    return new Error(APIVersionMissmatch)
  }
  const base_url = client.getBaseUrl("api")
  const action_endpoint = UsersEndpointsMap.get
  let req_elem: undefined | RequestElements
  let user: User
  switch (client.dataVersion) {
    case "v0": {
      const endpoint = action_endpoint.v0
      req_elem = BindToParams<typeof endpoint>(base_url, endpoint, {
        userid : data.userid
      }, {}, {})
      let res = await CallAPI(req_elem)
      if (res.type == "error") {
        return new Error(res.message)
      }
      return res.data as APIUserGetV0Res
    }
    default: {
      return new Error(APIVersionMissmatch)
    }
  }
}