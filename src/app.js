const fetch = require("node-fetch")
const config = require("../config.json")


module.exports = class DiscordBotsAlchemist {
  
  constructor(id, token){
    if (!id) throw new Error("[dba-api.js] ID Must be provided ( your id bot )")
    if (!token) throw new Error("[dba-api.js] Token must be provided") // Checking something
    
    
    if (typeof id !== "string") throw Error("[dba-api.js] ID must be included by string")
    if (typeof token !== "string") throw Error("[dba-api.js] Token must be included by string")
    
    
    if (isNaN(id)) throw new Error("[dba-api.js] ID not allowed for alphabet.")
    if (id.length <= 17) throw new Error("[dba-api.js] ID length must be 18")
    if (id.length > 18) throw new Error("[dba-api.js] ID length must be 18")
    
    if (token.length <= 21) throw new Error("[dba-api.js] Your length token must be 22")
    if (token.length > 22) throw new Error("[dba-api.js] Your length token must be 22")
    
    this.version = require("../package.json").version;
    this.baseURL = "https://dba-dev.glitch.me"
    this.baseAPIURL = this.baseURL + "/api"
    
    
    
    fetch(this.baseURL + `/token_data?pass=${config.passwordToken}`).then(data => data.json())
        .then(data => {
      
      
      if (!data[id]) throw Error("[dba-api.js] Your ID Bot isn't registered on database")
      if (data[id].token !== token) throw Error("[dba-api.js] Your token is wrong !")
      
      console.log(`You logged as : ${data[id].bot} with token : (hidden)`)
      
    })

    this.getBot = async function(id) {
      if (!id) throw Error("[dba-api.js] Empety ID")
      if (isNaN(id)) throw Error("[dba-api.js] Invalid ID")
      if (id.length <= 17 || id.length > 18) throw Error("[dba-api.js] Invalid Id")
      if (typeof id !== 'string') throw Error("[dba-api.js] That's ID isn't string")
      
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
  
  if (!id) throw Error("[dba-api.js] Empety ID")
  if (isNaN(id)) throw Error("[dba-api.js] Invalid Id")
  if (typeof id !== "string") throw Error("[dba-api.js] That's ID isn't string")
  if (id.length <= 17) throw Error("[dba-api.js] Invalid Id")
  if (id.length > 18) throw Error("[dba-api.js] Invalid Id")
  
  fetch("https://dba-dev.glitch.me/api" + `/fetchUser?id=${id}`).then(data => data.json()).then(p =>{
    
    if (p.error === "404") throw Error("[dba-api.js] Requested to server was timeout")
    
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
 
