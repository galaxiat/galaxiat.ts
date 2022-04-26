import { RequestElements } from "../endpoints/types";
import {Response} from "node-fetch"
import fetch from "node-fetch"
export async function CallAPI(req: RequestElements): Promise<APIResponse> {
  const res = await fetch(req.url.toString(), {
    method: req.method,
    headers: req.headers,
  })
  // console.log(req.headers.get("authorization"))
  // console.log(res)
  const response = await res.json()
  return (response as APIResponse)
}
export type APIResponseType = "ok" | "error"
export type APIResponse = {
  type: APIResponseType
  message: string
  data: unknown
}