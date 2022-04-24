import { APIUserCreate, APIUserCreateCall } from "../api/actions/users"
import { APIVersionMissmatch } from "../errors/api"
import { GalaxiatClient, Versions } from "./client"

export class User {
  id? : number
  username? : string
  username_at? : string
  email? : string
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

  static async Create<V extends Versions>(client : GalaxiatClient, data : APIUserCreate[V]) : Promise<boolean | Error>{
    if (!data) {
      return new Error(APIVersionMissmatch)
    } else {
      return await APIUserCreateCall<V>(client, data)
    }
  }
}

