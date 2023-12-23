const express = require('express'); //Строка 1
const app = express(); //Строка 2
const port = process.env.PORT || 5000; //Строка 3

//repl.repl.ignoreUndefined=true

const {InfluxDB, Point} = require('@influxdata/influxdb-client');
const { json } = require('react-router-dom');
const token =''// process.env.INFLUXDB_TOKEN
const url = 'http://localhost:8086'

const client = new InfluxDB({url, token})

// Сообщение о том, что сервер запущен и прослушивает указанный порт 
app.listen(port, () => console.log(`Listening on port ${port}`)); //Строка 6

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Создание GET маршрута
app.get('/express_backend', (req, res) => { //Строка 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Строка 10
});

let org = `Students`
let bucket = `climate`

let writeClient = client.getWriteApi(org, bucket, 'ns')

let queryClient = client.getQueryApi(org)
let fluxQuery = `from(bucket: "climate")
|> range(start: 0)
|> filter(fn: (r) => r["_measurement"] == "Room_5")
|> filter(fn: (r) => r["_field"] == "temperature")
|> max()`

queryClient.queryRows(fluxQuery, {
  next: (row, tableMeta,) => {
    const tableObject = tableMeta.toObject(row)
    const result = tableMeta.get()
    console.log(tableObject)
  },
  error: (error) => {
    console.error('\nError', error)
  },
  complete: () => {
    app.get('/express_influx', (req, res) => { //Строка 9
      res.send({ express: JSON(tableObject.res)}); 
    });
    console.log('\nSuccess')
  },
})


// app.get('/express_influx', (req, res) => { //Строка 9
//   res.send({ express: 'valid'}); 
// });
