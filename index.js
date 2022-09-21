const express = require("express")
const Joi = require("joi")

const app = express()

app.use(express.json())

const genre = [
    {id: 1, name: 'Action'},
    {id: 2, name: 'Tragedy'},
    {id: 3, name: 'Comedy'},
    {id: 4, name: 'Thriller'},
    {id: 5, name: 'Horror'}
]
  

app.get("/",(req,res)=>{
    res.send(console.log('Hello world'))
})

app.get("/api/genre", (req,res)=>{
    res.status(200).send(genre)
})

app.get("/api/genre/:id", (req,res)=>{
    const genres = genre.find(gen => gen.id === parseInt(req.params.id))
    
    if(!genres) return res.status(404).send("The Genre with the given ID not found");
    
    
    
    res.status(200).send(genres)
})

app.post("/api/genre", (req,res)=>{
   // const result = validateGenre(req.body)
   const {error} = validateGenre(req.body) // result.error
   if(error) return res.status(400).send(result.error.details[0].message);
       
   
    
    const genres = {
        id: genre.length + 1,
        name: req.body.name
    }

    genre.push(genres)
    res.status(200).send(genre)
})

app.put("/api/genre/:id",(req,res)=>{
    const genres = genre.find(gen => gen.id === parseInt(req.params.id))
    if(!genres) return res.status(404).send("The Genre with the given ID not found");

    // const result = validateGenre(req.body)
    const {error} = validateGenre(req.body) // result.error
    if(error) return res.status(400).send(result.error.details[0].message);
    

    genres.name = req.body.name
    res.status(200).send(genres)

})

app.delete("/api/genre/:id",(req,res)=>{
    const genres = genre.find(gen => gen.id === parseInt(req.params.id))
    if(!genres) return res.status(404).send("The Genre with the given ID not found");

    const index = genre.indexOf(genres)
    genre.splice(index,1)
    res.send(genre)
})

const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`THis server is running on port ${port}`)

})


function validateGenre(name){
    
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    return schema.validate(name)
    
}