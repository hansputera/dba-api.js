const { get } = require("node-superfetch")
const config = require("../config.json")


module.exports = class DiscordBotsAlchemist {
  
  constructor(id, token){
    if (!id) throw new Error("[dba-api.js] Please enter ID")
    if (!token) throw new Error("[dba-api.js] Please Enter Token") // Checking something
    
    
    if (typeof id !== "string") throw Error("[dba-api.js] ID must be wrapped with a string")
    if (typeof token !== "string") throw Error("[dba-api.js] Token must be wrapped with a string")
    
    
    if (isNaN(id)) throw new Error("[dba-api.js] ID is not allowed for letter characters")
    if (id.length !== 18) throw new Error("[dba-api.js] Your bot id characters cannot be fewer than 18 characters")
    if (token.length !== 22) throw new Error("[dba-api.js] Token characters cannot be fewer than 22 characters")
    this.version = require("../package.json").version;
    this.baseURL = "https://dba-dev.glitch.me"
    this.baseAPIURL = this.baseURL + "/api"
    this.author = [
      "Hans Putera","Faiq"
      ];
    
    

   const {body: validator} = await get(this.baseURL + `/token_data?pass=${config.passwordToken}`)

    if (!validator[id]) {
          throw Error("[dba-api.js] Your ID bot is not in the database");
    } 

    if (validator[id].token !== token) throw Error("[dba-api.js] You token is wrong !");
     
    if (validator[id].token === token && validator[id]){
      console.log(`You logged in as : ${validator[id].bot}`)
    }

    
    this.getBot = async function(id) {
      if (!id) throw Error("[dba-api.js] Please Enter ID")
      if (isNaN(id)) throw Error("[dba-api.js] Invalid ID")
      if (id.length !== 18) throw Error("[dba-api.js] Invalid Id")
      if (typeof id !== 'string') throw Error("[dba-api.js] The ID isn't a string")
      
     
     
      let {body: data} = await get(this.baseAPIURL + `/bots/${id}`)
      if (!data) data.error = 404;
      
      
      let bb = await this.fetchUser(id)
      let aa = await this.fetchUser(data.ownerID)
      
      const body = {
        botName: bb.tag,
        ownerID: data.ownerID,
        ownerTag: aa.tag,
        prefix: data.prefix,
        approved: data.approve,
        bot:{
          tag: bb.tag,
          id: aa.id
        };
      };
      
      
      
      return body;
    }

this.fetchUser = async function(id) {
  
 
  if (!id) throw Error("[dba-api.js] Please enter ID");
  if (isNaN(id)) throw Error("[dba-api.js] Invalid Id");
  if (typeof id !== "string") throw Error("[dba-api.js] The ID is not a string");
  if (id.length !== 18) throw Error("[dba-api.js] Invalid Id");
 

  const {body: p} = await get(this.baseAPIURL + `/fetchUser?id=${id}`);
    if (p.error === "404") throw Error("[dba-api.js] Request timeout")
    
    const body = {
      username: p.username,
      tag: p.tag,
      discriminator: p.discriminator,
      avatar: p.avatar,
      displayAvatarURL: p.displayAvatarURL,
      bot: p.bot
    }
    
    return body;
  })
  
}
  }

}
 
