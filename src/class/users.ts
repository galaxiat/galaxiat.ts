import { APIUserCreate, APIUserCreateCall } from "../api/actions/users/users_create"
import { APIUserEdit, APIUserEditCall } from "../api/actions/users/users_edit"
import { APIUserLogin, APIUserLoginCall } from "../api/actions/users/users_login"
import { APIVersionMissmatch } from "../errors/api"
import { GalaxiatClient, Versions } from "./client"

export class User {
  id?: number
  username?: string
  username_at?: string
  email?: string
  password?: string
  key?: string
  email_verified?: boolean
  enabled?: boolean
  admin?: boolean
  banned?: boolean
  banned_reason?: string
  created_at?: bigint
  last_login?: bigint
  coins_public?: boolean
  coins?: bigint
  xp?: bigint

  static async Create<V extends Versions>(client: GalaxiatClient, data: APIUserCreate[V]): Promise<boolean | Error> {
    if (!data) {
      return new Error(APIVersionMissmatch)
    } else {
      type version = typeof client.dataVersion
      return await APIUserCreateCall<version>(client, data)
    }
  }
  public async Edit<V extends Versions>(client: GalaxiatClient, data: APIUserEdit[V]): Promise<boolean | Error> {
    if (!data) {
      return new Error(APIVersionMissmatch)
    } else {
      type version = typeof client.dataVersion
      let resp = await APIUserEditCall<version>(client, data)
      if (resp instanceof Error) {
        return resp
      }
      console.log(resp)
      this.Fill(resp)
      return true
    }
  }
  static async Login<V extends Versions>(client: GalaxiatClient, data: APIUserLogin[V]): Promise<string | Error> {
    if (!data) {
      return new Error(APIVersionMissmatch)
    } else {
      type version = typeof client.dataVersion
      let resp = await APIUserLoginCall<version>(client, data)
      if (resp instanceof Error) {
        return resp
      }
      return resp.token
    }
  }
  public Fill(userobj: Partial<User>) {
    Object.assign(this, userobj);
  }
}

