const { optionsqlite } = require('../options/SQLite3')
const knex = require('knex')(optionsqlite.sqlite)

const messages = [
    {
        "user": "peter@gmail.com",
        "date": "29/9/2022, 09:04:59",
        "message": "Te fuiste a la B?",
        "id_message": 1
      },
      {
        "user": "peterKantropus@gmail.com",
        "date": "29/9/2022, 09:05:59",
        "message": "Me parece que no esta funcionando esto",
        "id_message": 2
      },
      {
        "user": "manolo@hotmail.com",
        "date": "29/9/2022, 09:06:59",
        "message": "Noooooo, no de nuevo decía",
        "id_message": 3
      },
      {
        "user": "german@gmail.com",
        "message": "Creo que lo logre!!!!!",
        "date": "04/10/2022, 16:18:10",
        "id_message": 4
      },
      {
        "user": "g-remal@gmail.com",
        "message": "siiiiiiii te fuiste a la B",
        "date": "04/10/2022, 17:08:27",
        "id_message": 5
      },
      {
        "user": "ejemplo@mail.com",
        "message": "Funciona!!! jajaja o jijiji",
        "date": "05/10/2022, 10:43:30",
        "id_message": 6
      },
      {
        "user": "ejemplo@mail.com",
        "message": "Funciona!!! Que grnade que soyyyyy",
        "date": "05/10/2022, 10:56:30",
        "id_message": 7
      },
      {
        "user": "towers@boolean.com",
        "message": "Something nice...jejejeje",
        "date": "05/10/2022, 14:36:52",
        "id_message": 8
      }
  ]

knex('messages').insert(messages)
    .then(() => console.log('Messages inserted on Table!'))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy()
    })