const express = require("express")
const server = express()
const { Client } = require("@notionhq/client")

// Initializing a client
const notion = new Client({auth: "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"})


server.use(express.static("public"))

server.get("/timer", async function(req, res) {
    let data = await notion.databases.query({database_id: "14bdc6210b8c80ebba69c0855f948b6a"})
    //遍历返回数据中results中的properties
    // data = data.results.map(i=>i.properties)
    data=data.results.map(function(i){
        return i.properties
    })
    data = data.map(i=>{
        return {
            h: i.ColorH.number,
            id: i.ID.title[0].plain_text,
            l: i.ColorL.number,
            s: i.ColorS.number,
            seconds: i.Seconds.number,
        }
    })
    res.json(data)  
})

server.listen(8080, () => {
    console.log("Server is running on port 8080")
})