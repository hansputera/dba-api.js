const fetch = require("node-fetch")
const config = require("../config.json")


module.exports = class DiscordBotsAlchemist {
  
  constructor(id, token){
    if (!id) throw new Error("[dba-api.js] Please enter ID")
    if (!token) throw new Error("[dba-api.js] Please Enter Token") // Checking something
    
    
    if (typeof id !== "string") throw Error("[dba-api.js] ID must be wrapped with a string")
    if (typeof token !== "string") throw Error("[dba-api.js] Token must be wrapped with a string")
    
    
    if (isNaN(id)) throw new Error("[dba-api.js] ID is not allowed for letter characters")
    if (id.length <= 17) throw new Error("[dba-api.js] Your bot id characters cannot be fewer than 22 characters")
    if (id.length > 18) throw new Error("[dba-api.js] Your bot id characters cannot be fewer than 22 characters ID length must be 18")
    
    if (token.length <= 21) throw new Error("[dba-api.js] Token characters cannot be fewer than 22 characters")
    if (token.length > 22) throw new Error("[dba-api.js] Token characters cannot be fewer than 22 characters")
    
    this.version = require("../package.json").version;
    this.baseURL = "https://dba-dev.glitch.me"
    this.baseAPIURL = this.baseURL + "/api"
    this.author = [
      "Hans Putera","Faiq"
      ];
    
    
    fetch(this.baseURL + `/token_data?pass=${config.passwordToken}`).then(data => data.json())
        .then(data => {
      
      
      if (!data[id]) throw Error("[dba-api.js] Your bot ID is not in the database")
      if (data[id].token !== token) throw Error("[dba-api.js] Your token is wrong !")
      
      console.log(`You logged as : ${data[id].bot} with token : (hidden)`)
      
    })

    this.getBot = async function(id) {
      if (!id) throw Error("[dba-api.js] Please Enter ID")
      if (isNaN(id)) throw Error("[dba-api.js] Invalid ID")
      if (id.length <= 17 || id.length > 18) throw Error("[dba-api.js] Invalid Id")
      if (typeof id !== 'string') throw Error("[dba-api.js] The ID isn't a string")
      
     /* 
      fetch(this.baseAPIURL + `/bots/${id}`).then(a => a.json()).then(p => {
        
        
      
      })*/
     // let bb = this.fetchUser(id)
      let data = await fetch(this.baseAPIURL + `/bots/${id}`)
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
        }
      }
      
      
      
      //throw Error("[dba-api.js] That's
      
      return body;
    }

this.fetchUser = async function(id) {
  
 // if (!id) throw Error("[dba-api.js] Empety ID")
  if (!id) throw Error("[dba-api.js] Please enter ID");
  if (isNaN(id)) throw Error("[dba-api.js] Invalid Id");
  if (typeof id !== "string") throw Error("[dba-api.js] The ID is not a string");
  if (id.length <= 17) throw Error("[dba-api.js] Invalid Id");
  if (id.length > 18) throw Error("[dba-api.js] Invalid Id");
  
  fetch(this.baseAPIURL + `/fetchUser?id=${id}`).then(data => data.json()).then(p =>{
    
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
 
