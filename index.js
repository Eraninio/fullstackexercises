const express = require('express')
const { request, response } = require('express')
const cors = require('cors')
const morgan = require('morgan')

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
    response.json(persons)
})

app.get('/info', (request, response) => {
  response.send(
    `<h3> PhoneBook has info for ${persons.length} people </h3>
    ${new Date()}`
  )
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

  const generateId = () => {
    return Math.floor((1 + Math.random()) * 0x10000);
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body

    const person = {
      name: body.name,
      number: body.number,
      id: generateId()
    }
  
    if (!body.number || !body.name) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }

    const newName = persons.find(person => person.name == body.name);
    if (newName) {
      return response.status(400).json({ 
        error: 'name must be unique' 
      })
    }

    persons = persons.concat(person)
  
    response.json(person)
  })

  app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
})
