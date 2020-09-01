const Person = require("./models/Persons")
require('dotenv').config()

const express = require('express')
const { request, response } = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Persons = require("./models/Persons")

const app = express()

app.use(express.static('./build'));
app.use(cors())
app.use(express.json())


morgan.token('body', function (req, res) { 
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(requestLogger)

let persons = [
  {
      name: "Arto Hellas",
      number: "040-123456",
      id: 1
  },
  {
      name: "Ada Lovelace",
      number: "39-44-5323523",
      id: 2
  },
  {
      name: "Dan Abramov",
      number: "12-43-234345",
      id: 3
  },
  {
      name: "Mary Poppendieck",
      number: "040-123456",
      id: 4
  }
]

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  response.send(
    `<h3> PhoneBook has info for ${persons.length} people </h3>
    ${new Date()}`
  )
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  const person = new Person ({
    name: body.name,
    number: body.number,
  })

  if (!body.number || !body.name) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})


app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
})
