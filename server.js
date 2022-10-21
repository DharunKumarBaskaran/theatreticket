var express = require('express');
const app = express();
var mongoose = require('mongoose')
var bodyParser = require('body-parser');
var helmet = require('helmet');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
mongoose.connect('mongodb://localhost:27017/theatreticket');
const movie = mongoose.model('movie',
                                        new mongoose.Schema({
                                          movie_id: Number,
                                          name: String,
                                          date: Date,
                                          genre: String,
                                          Rated: String,
                                          duration: Number,
                                          screen_no: Number,
                                          no_of_seats_booked: Number
                                        })
)
// const Theatre = mongoose.model('Theatre',
//                                         new mongoose.Schema({
//                                           screen_no: Number,
//                                           theatre_id: Number,
//                                           reservation_type: String
//                                         })
// )
// const seat_reserved = mongoose.model('seat_reserved',
//                                         new mongoose.Schema({
//                                           seat_id: Number,
//                                           row: String,
//                                           reservation_id: String,
//                                           seat_type: String
//                                         })
// )
// const booking_details = mongoose.model('booking_details',
//                                         new mongoose.Schema({
//                                           mode: String,
//                                           no_of_seats: Number,
//                                           date: Date,
//                                           time: Number,
//                                           movie_id: Number,
//                                           movie_name: String,
//                                           payment_id: String,
//                                           amount: Number
//                                         })
// )
app.listen(5500, () => {
  console.log("Application started and Listening on port 5000");
});


app.get("/", (req, res) => {
    res.sendFile(__dirname+'/home.html')
});
app.get("/movie.html",(req, res)=> {
  res.sendFile(__dirname+'/movie.html')
});
// app.get("/movie",(req, res)=> {
//   res.sendFile(__dirname+'/movie.html')
// });
// app.get("/create",(req,res)=>{
//   res.sendFile(__dirname+'/create.html')
// })
// app.post('/theatre', async(req, res) => {
//   res.sendFile(__dirname+'/theatre_insert.html')
  
// })
app.post('/movie_insert',async(req,res)=>{
      if( movie.insertMany({
        movie_id: req.body.movie_id,
        name: req.body.name,
        date: req.body.date,
         genre: req.body.genre,
         Rated: req.body.Rated,
         duration: req.body.duration,
         screen_no: req.body.screen_no,
         no_of_seats_booked: req.body.no_of_seats_booked
       })){
        return res.send('User ' + req.body.name + ' Added successfully')
       }
  
    })
    // app.post('/theatre_insert',async(req,res)=>{
    //   if( Theatre.insertMany({
    //     screen_no: req.body.noscreens,
    //     theatre_id: req.body.ids,
    //     reservation_type: req.body.rtype
    //    })){
    //     return res.send('Screen_no ' + req.body.screen_no + ' Added successfully')
    //    }
  
    // })
    // app.post('/seat_r',async(req,res)=>{
    //   if( seat_reserved.insertMany({
    //     seat_id: req.body.seat_id,
    //     row: req.body.row,
    //     reservation_id: req.body.reservation_id,
    //     seat_type: req.body.seat_type
    //    })){
    //     return res.send('Seat' + req.body.seat_id + ' Added successfully')
    //    }
  
    // })
    // app.post('/booking details',async(req,res)=>{
    //   if( booking_details.insertMany({
    //     mode: req.body.mode,
    //     no_of_seats: req.body.no_of_seats,
    //     date: req.body.date,
    //     movie_id: req.body.movie_id,
    //     name: req.body.name,
    //     payment_id: req.body.payment_id,
    //     amount: req.body.amount
    //    })){
    //     return res.send('Movie' + req.body.name + ' Added successfully')
    //    }
  
    // })
app.get('/seat_reserved',async(req,res)=>{
  res.sendFile(__dirname+'/seat_reserved.html')
})
app.get('/theatre',async(req,res)=>{
  res.sendFile(__dirname+'/theater_insert.html')
})
    //})
// if (await movie.findOne({ _id:req.body.id })) {   
//     return res.send(req.body)
//   }
//   movie.insertMany({
//     movie_id: req.body.movie_id,
//     name: req.body.name,
//     date: req.body.date,
//     time: req.body.time,
//     genre: req.body.genre,
//     Rated: req.body.Rated,
//     duration: req.body.duration,
//     screen_no: req.body.screen_no,
//     no_of_seats_booked: req.body.no_of_seats_booked
//   })
//   return res.send('User ' + req.body.name + ' Added successfully')
// })



app.post('/searchById', async (req, res) => {
  var r = await student_details.find({_id:req.body.id})
  return res.send(r)
})


app.post('/searchByName', async (req, res) => {
  return res.send(await student_details.find({name:req.body.name}))
})


app.post('/searchByGender', async (req, res) => {
  return res.send(await student_details.find({gender:req.body.gender}))
})


app.post('/searchByHobbies', async (req, res) => {
  var result = []
  for (const key of req.body.hobbies) {
    result.push(await student_details.find({hobbies:{$in:[key]}}))
  }
  return res.send(result)
})


app.post('/searchByHonours', async (req, res) => {
  return res.send(await student_details.find({honours:req.body.honours}))
})


app.post('/searchByCGPA', async (req, res) => {
  return res.send(await student_details.find({$and:[{$gt:req.body.cgpag},{$lt:req.body.cgpal}]}))
})