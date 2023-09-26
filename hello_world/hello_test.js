var fs = require("fs");
const {InfluxDB, Point} = require('@influxdata/influxdb-client')

var text = fs.readFileSync("env.txt").toString('utf-8');

const token = 'LxCaA1ngWQJax1YjpqgpDoz-rlTCpCirzn7UjTdugHFV1042urTJ4aUHXC42xyE5bi7F4TuKO5X3jjAwDI7MzA=='
const url = 'http://localhost:8086'

const client = new InfluxDB({url, token})

let org = `Students`
let bucket = `hello_world`

let writeClient = client.getWriteApi(org, bucket, 'ns')

for (let i = 0; i < 5; i++) {// запись в бд данных
  let point = new Point('measurement1')
    .tag('tagname1', 'tagvalue1')
    .intField('field1', i)

  void setTimeout(() => {
    writeClient.writePoint(point)
  }, i * 1000) // separate points by 1 second

  void setTimeout(() => {
    writeClient.flush()
  }, 5000)
}

let queryClient = client.getQueryApi(org)
let fluxQuery = `from(bucket: "hello_world")
 |> range(start: -10m)
 |> filter(fn: (r) => r._measurement == "measurement1")`

queryClient.queryRows(fluxQuery, {
  next: (row, tableMeta) => {
    const tableObject = tableMeta.toObject(row)
    console.log(tableObject)
  },
  error: (error) => {
    console.error('\nError', error)
  },
  complete: () => {
    console.log('\nSuccess')
  },
})