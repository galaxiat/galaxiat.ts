import { ActionsEndpoints } from "./types"

/**
 * type UserActions => All user action avaliable (all versions)
 */
type UserActions = "create" | "edit" | "login" | "get" | "send_check_mail" | "passwd_reset" | "send_check_mail_validate" | "passwd_reset_validate"

// Define user action type
type UserActionsEndpoints = ActionsEndpoints<UserActions>


/**
 * Endpoints var type
 * - path : String (path excluding the hostname) use `{arg_number}` for path params
 * - path_params : list of var name to bind to path params
 * - header_params : list of var name to bind to header params
 * - query_params : list of var name to bind to query params  [api_act, string] | [api_act, string, string[]] | 
 */
export const UsersEndpointsMap = {
  "create": {
    "v0": ["POST", "/users/", [], [], ["username", "username_at", "password", "email"]]
  },
  "edit": {
    "v0": ["PUT", "/users/@me", [], ["authorization"], ["email", "username", "username_at", "password"]]
  },
  "get": {
    "v0": ["GET", "/users/{username}",["username"], [] , []]
  },
  "login": {
    "v0": ["GET", "/users/", [], [], ["email", "password"]]
  },
  "send_check_mail": {
    "v0": ["POST", "/users/@me/send_check_mail", [], [], []]
  },
  "send_check_mail_validate": {
    "v0": ["POST", "/users/@me/send_check_mail_validate", [], [], []]
  },
  "passwd_reset": {
    "v0": ["POST", "/users/@me/passwd_reset", [], [], []]
  },
  "passwd_reset_validate": {
    "v0": ["POST", "/users/@me/passwd_reset_validate", [], [], []]
  },
} as const

// This line is to prevent type missmatch DO NOT REMOVE IT !
const UsersEndpointsMapVal : UserActionsEndpoints = UsersEndpointsMap