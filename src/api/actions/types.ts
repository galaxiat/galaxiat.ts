import { Versions } from "../../class/client"

export type APIAction = {
  [key in Versions]? : any
}