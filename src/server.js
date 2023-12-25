const express = require('express'); //Строка 1
const app = express(); //Строка 2
const port = 5000; //Строка 3

const {InfluxDB, Point} = require('@influxdata/influxdb-client');
const { json } = require('react-router-dom');
const token ='Wv1JZPC34hPmTHo78awWEjCKgpS-AtZLK4f0umqREBVOFTCi4U3Xey7DzqedHio6QjcSw2_VyRN1imcb3vK2YQ=='// process.env.INFLUXDB_TOKEN
const url = 'http://localhost:8086'

const client = new InfluxDB({url, token})

app.listen(port, () => console.log(`Listening on port ${port}`)); //Строка 6

// Создание GET маршрута
app.get('/express_backend', (req, res) => { //Строка 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Строка 10
});

let org = `Students`
let bucket = `clim`

let writeClient = client.getWriteApi(org, bucket, 'ns')

let queryClient = client.getQueryApi(org)

const rooms_array =[]
let fluxQueryRooms = `rooms_array = from(bucket: "clim")
|> range(start:-2d)
|> group()
|> filter(fn: (r) => r._field =~ /Room_[1-5]$/)
|> group(columns: ["host", "_field"], mode:"by")
|> yield(name:"rooms_array")`
queryClient.queryRows(fluxQueryRooms, {
      next: (row, tableMeta,) => {
        const tableObject = tableMeta.toObject(row)
        let t ={
          room_name: tableObject["_field"],
          time: tableObject["_time"],
          value: tableObject["_value"],
          device_name: tableObject["device_name"],
          measurement: tableObject["_measurement"]
        }
        rooms_array.push(t)
      },
      error: (error) => {
        console.error('\nError', error)
      },
      complete: () => {
        console.log('\nSuccessful')
      },
  })


let Room_query=`unique_array = from(bucket: "clim")
|> range(start: 0)
|> group()
|> unique(column: "_field")
|> yield(name:"unique_array")`

const unique_room =[]
queryClient.queryRows(Room_query, {
  next: (row, tableMeta,) => {
    const tableObject = tableMeta.toObject(row)
    unique_room.push(tableObject["_field"])
  },
  error: (error) => {
    console.error('\nError', error)
  },
  complete: () => {
    console.log('\nSuccessful rooms')
  },
})

app.get('/rooms', (req, res) => { //Строка 9
  res.json({data: unique_room})
});

const device_list =[]
let fluxQueryDevices = `device_array = from(bucket: "clim")
|> range(start: 0)
|> group()
|> unique(column: "device_name")
|> yield(name:"device_array")`
queryClient.queryRows(fluxQueryDevices, {
      next: (row, tableMeta,) => {
        const tableObject = tableMeta.toObject(row)
        device_list.push((tableObject["device_name"]))
      },
      error: (error) => {
        console.error('\nError', error)
      },
      complete: () => {
        console.log('\nSuccess')
        console.log(device_list)
      },
  })

app.get('/devices', (req, res) => { //Строка 9
  res.json({data: device_list})
});


const graphics_room = []
let fluxQueryGraphics = `from(bucket: "clim")
|> range(start: -4w)
|> group(columns:["device_name"])
|> filter(fn: (r) => r["_field"] == "Room_1" and r["_measurement"]=="co")
|> limit(n:15)`

queryClient.queryRows(fluxQueryGraphics, {
      next: (row, tableMeta,) => {
        const tableObject = tableMeta.toObject(row)
        let room_data = {
          time: tableObject["_time"],
          value: tableObject["_value"],
          device: tableObject["device_name"]
        }
        graphics_room.push(room_data)
      },
      error: (error) => {
        console.error('\nError', error)
      },
      complete: () => {
        console.log('\nSuccess co')
      },
  })
  
app.get('/rooms/getdata',(req, res)=>{
  res.json({data: graphics_room})
})

let HumidityGraphQuery = `from(bucket: "clim")
|> range(start: -4w)
|> group(columns:["device_name"])
|> filter(fn: (r) => r["_field"] == "Room_1" and r["_measurement"]=="humidity")
|> limit(n:15)`
let  graphics_hum=[]
queryClient.queryRows(HumidityGraphQuery, {
  next: (row, tableMeta,) => {
    const tableObject = tableMeta.toObject(row)
    let room_data = {
      time: tableObject["_time"],
      value: tableObject["_value"],
      device: tableObject["device_name"],
    }
    graphics_hum.push(room_data)
  },
  error: (error) => {
    console.error('\nError', error)
  },
  complete: () => {
    console.log('\nSuccess hum')
  },
})

app.get('/rooms/gethum',(req, res)=>{
res.json({data: graphics_hum})
})

let fluxQueryTLM0101 = `from(bucket: "clim")
  |> range(start:-4d)
  |>unique(column: "_field")
  |> filter(fn: (r) => r["device_name"] == "TLM0101" and  r["_measurement"]=="temperature")
  |> filter(fn: (r) => r["_field"] == "Room_1" or r["_field"] == "Room_2" or r["_field"] == "Room_3" or r["_field"] == "Room_4" or r["_field"] == "Room_5")
  |> yield(name: "mean")`

let  device_temp_101=[]
  queryClient.queryRows(fluxQueryTLM0101, {
    next: (row, tableMeta,) => {
      const tableObject = tableMeta.toObject(row)
      let room_data = {
        time: tableObject["_time"],
        value: tableObject["_value"],
        room: tableObject["_field"]
      }
      device_temp_101.push(room_data)
    },
    error: (error) => {
      console.error('\nError', error)
    },
    complete: () => {
      console.log('\nSuccess tlmo101')
    },
  })
  
  app.get('/devices/data',(req, res)=>{
  res.json(device_temp_101)
  })

let room1_devices_for_table = `from(bucket: "clim")
  |> range(start:-4d)
  |> filter(fn: (r) => r["_field"] == "Room_1")
  |> unique(column: "device_name")
  |> yield(name: "mean")`

let  room1_tbl=[]
queryClient.queryRows(room1_devices_for_table, {
    next: (row, tableMeta,) => {
      const tableObject = tableMeta.toObject(row)
      let room_data = {
        time: tableObject["_time"],
        value: tableObject["_value"],
        device: tableObject["device_name"],
        type: tableObject["_measurement"]
      }
      room1_tbl.push(room_data)
    },
    error: (error) => {
      console.error('\nError', error)
    },
    complete: () => {
      console.log('\nSuccess tlmo101')
    },
  })
  
app.get('/devtable',(req, res)=>{
  res.json(room1_tbl)
  })


const notifications = {
  water: Math.floor(Math.random()*100),
  oil: Math.floor(Math.random()*100),
  electricity: Math.random()>0.5,
  light:Math.random()>0.5,
  filter:Math.random()>0.5,
  active_detectors: Math.floor(Math.random()*40)
}

app.get('/notifications',(req,res)=>{
  res.json(notifications)
})
