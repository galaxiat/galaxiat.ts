import { GalaxiatClient, Versions } from "../../class/client";
import { APIVersionMissmatch } from "../../errors/api";
import { UsersEndpointsMap } from "../endpoints/users";
import { BindToParams } from "../endpoints/utils";
import { APIAction } from "./types";
import { RequestElements } from "../endpoints/types"
import { CallAPI } from "./call";
import {User} from "../../class/users"
export interface APIUserCreate extends APIAction {
  "v0"?: APIUserCreateV0
}
interface APIUserCreateV0 {
  username: string,
  username_at: string,
  email: string,
  password: string
}
export async function APIUserCreateCall<V extends Versions>(client: GalaxiatClient, data: APIUserCreate[V]): Promise<boolean | Error> {
  if (!data) {
    return new Error(APIVersionMissmatch)
  }
  const base_url = client.getBaseUrl("api")
  const action_endpoint = UsersEndpointsMap.create
  let req_elem: undefined | RequestElements
  let user : User
  switch (client.dataVersion) {
    case "v0": {
      const endpoint = action_endpoint.v0
      req_elem = BindToParams<typeof endpoint>(base_url, endpoint, {}, {}, {
        email : data.email,
        password : data.password,
        username : data.username,
        username_at : data.username_at
      })
      let res = await CallAPI(req_elem)
      return res.type == "ok"
      break
    }
    default: {
      return new Error(APIVersionMissmatch)
    }
  }
}