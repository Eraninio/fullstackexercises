const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


const phoneScheme = new mongoose.Schema({
    name:String,
    number:String
})


phoneScheme.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Person', phoneScheme)

// const personSchema = new mongoose.Schema({
//   name: String,
//   number: String
// })

// const Person = mongoose.model('person', personSchema)

// if (process.argv.length === 5){
//     const person = new Person({
//         name: process.argv[3],
//         number: process.argv[4]
//     })
    
    
//     person.save().then(result => {
//       console.log(`added ${person.name} number ${person.number} to phonebook`)
//       mongoose.connection.close()
//     })
// } else if (process.argv.length === 3){
//     Person.find({}).then(result => {
//         console.log('phonebook:')
//         result.forEach(person => {
//           console.log(person.name + " "  + person.number)
//         })
//         mongoose.connection.close()
//       })
// }
