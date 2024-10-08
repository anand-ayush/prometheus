import express from "express";
import client, {Gauge} from "prom-client";
import { Counter } from "prom-client";

const app = express();

const activeUserGauge = new Gauge({
    name:"active-users",
    help:"Number of active users",
})

// const requestCounter = new client.Counter({
//   name: "http_requests_total",
//   help: "Total number of HTTP requests",
//   labelNames: ["method", "route", "status_code"],
// });

// let counter = new Counter({
//   name: "http_requests_total",
//   help: "Total number of HTTP requests",
//   labelNames: ["method", "route", "status_code"],
// });

// @ts-ignore
// function requestCountMiddleware(req,res,next){
//     res.on('finish',()=>{
//         // Increment request counter
//         counter.inc({ 
//             method:req.method,
//             route: req.path,
//             status_code:res.statusCode
//         });
//     });
//     next();
// }

// @ts-ignore
function requestCountActiveGauge(req,res,next){
    activeUserGauge.inc();
    res.on('finish',()=>{
        activeUserGauge.dec();
    })
    next();
}
// app.use(express.json());
// app.use(requestCountMiddleware);
app.use(requestCountActiveGauge);

// app.get("/user", (req, res) => {
//     // requestCounter.inc();
//     // counter.inc({
//     //     route:"/user"
//     // });
//     res.status(511).send({
//             name: "Ayush Anand",
//             age: 20,
//   });
// });

// app.get("/todos", (req,res)=>{
//     // counter.inc({
//     //     route:"/todos"
//     // });
//     res.send({
//         name:"Todos App",
//         created_at : 7,
//     })
// })

// // app.post("/user", (req, res) => {

// //   const user = req.body;
// //   res.send({
// //     ...user,
// //     id: 1,
// //   });
// // });

// app.get("/metrics", async (req, res) => {
//     const metrics = await client.register.metrics();
//     res.set('Content-Type', client.register.contentType);
//     res.end(metrics);
// })


app.get("/user", (req,res)=>{
    activeUserGauge.inc();

    //  database call , redis call

    res.status(511).send({
        name: "Ayush Anand",
        age: 20,
    });
    activeUserGauge.dec();
});

app.listen(3000);
