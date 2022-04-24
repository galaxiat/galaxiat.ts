<div align="center">
  <br />
  <p>
    <a href="https://galaxiatapp.com"><img src="https://galaxiatapp.com/logo_texte_appli_avec_arrondie_et_ombre.png" width="546" alt="galaxiat.ts" /></a>
  </p>
  <br />
  <p>
    <a href="https://discord.galaxiat.fr"><img src="https://img.shields.io/discord/804787354703364116?color=5865F2&logo=discord&logoColor=white" alt="Discord server" /></a>
    <a href="https://www.npmjs.com/package/galaxiat.ts"><img src="https://img.shields.io/npm/v/galaxiat.ts.svg?maxAge=3600" alt="npm version" /></a>
    <a href="https://www.npmjs.com/package/galaxiat.ts"><img src="https://img.shields.io/npm/dt/galaxiat.ts?maxAge=3600" alt="npm downloads" /></a>
    <a href="https://github.com/galaxiat/galaxiat.ts/actions"><img src="https://github.com/galaxiat/galaxiat.ts/actions/workflows/build.yaml/badge.svg" alt="Build status" /></a>
  </p>
</div>

## About

galaxiat.ts [Node.js](https://nodejs.org) package allows you to easily interact with the [Galaxiat API](https://galaxiatapp.com)

## Installation

**Node.js 16.9.0 or newer is required.**

```sh-session
npm install galaxiat.ts
```

## Example 
### Create Galaxiat User
```ts
import { GalaxiatClient, User } from "galaxiat.ts"

const Client = new GalaxiatClient("dev", "v0");
(async () => {
  const version = Client.dataVersion
  console.log(await User.Create<typeof version>(Client, {
    email : "blue@galaxiatapp.com",
    password : "DEMOBlueIsBlueDEMO",
    username : "blue",
    username_at : "blue"
  }))
})()
```

## Links

- [Galaxiat](https://galaxiatapp.com/)

## Contributing

Before creating an issue, please ensure that it hasn't already been reported/suggested.  

## License 
MIT 