const express=require("express")
const app=express()
const path=require("path")
require('dotenv').config()
const port=process.env.PORT || 3000;

//middleware
    //.urlencoded string y array
    //.json() json
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())

    //para que express acceda al index ?????
    app.use(require("./routes/index"))

    //static=para usar carpetas publicas
    app.use(express.static(path.join(__dirname, 'public')))

    app.listen(port, ()=>{
        console.log("server en puerto ", port)
})

