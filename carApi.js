var express = require("express");
var app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
    res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );
  next();
});
const port = process.env.PORT||2410;
let carMaster = [
   {model: "Swift Dzire VXi", make: "Maruti", fuel: "Diesel", 
    colors: ["White", "Silver Grey", "Metallic Blue", "Red"], type: "Sedan", transmission: "Manual"},
   {model: "Etios SMi", make: "Toyota", fuel: "Diesel",
    colors: ["White", "Steel Grey", "Black"], type: "Hatchback", transmission: "Manual"},
   {model: "City AXi", make: "Honda", fuel: "Petrol",
    colors: ["Silver Grey", "Metallic Blue", "Black"], type: "Sedan", transmission: "Automatic"},
   {model: "Swift DXi", make: "Maruti", fuel: "Diesel",
    colors: ["White", "Red", "Black"], type: "Hatchback", transmission: "Manual"},
   {model: "Etios VXi", make: "Toyota", fuel: "Diesel",
    colors: ["White", "Silver Grey", "Black"], type: "Sedan", transmission: "Manual"},
   {model: "City ZXi", make: "Honda", fuel: "Petrol",
    colors: ["Silver Grey", "Metallic Blue", "Red"], type: "Sedan", transmission: "Manual"}
  ];
  
  let cars = [
   {id: "ABR12", price: 400000, year: 2015, kms: 25000, model: "Swift Dzire VXi", color: "White"},
   {id: "CBN88", price: 480000, year: 2012, kms: 75000, model: "Etios SMi", color: "Steel Grey"},
   {id: "XER34", price: 300000, year: 2013, kms: 55000, model: "City AXi", color: "Metallic Blue"},
   {id: "MPQ29", price: 400000, year: 2015, kms: 25000, model: "Swift DXi", color: "Black"},
   {id: "PYQ88", price: 480000, year: 2012, kms: 75000, model: "Etios VXi", color: "White"},
   {id: "DFI61", price: 300000, year: 2013, kms: 55000, model: "City ZXi", color: "Red"},
   {id: "JUW88", price: 400000, year: 2015, kms: 25000, model: "Swift Dzire VXi", color: "White"},
   {id: "KPW09", price: 285000, year: 2012, kms: 76321, model: "Swift Dzire VXi", color: "White"},
   {id: "NHH09", price: 725000, year: 2018, kms: 15000, model: "City ZXi", color: "Silver Grey"},
   {id: "CTT26", price: 815000, year: 2016, kms: 42500, model: "City AXi", color: "Metallic Blue"},
   {id: "VAU55", price: 345000, year: 2014, kms: 81559, model: "Swift DXi", color: "Red"},
   {id: "BTR31", price: 184000, year: 2011, kms: 120833, model: "Etios VXi", color: "Silver Grey"}
  ];

  app.get("/cars", function(req,res){
    let fuel=req.query.fuel;
    let type=req.query.type;
    let sort=req.query.sort;
    let maxprice=req.query.maxprice
    let minprice=req.query.minprice
    let arr1=carMaster
    let arr2=cars
    if(fuel){
     arr1=arr1.filter((c1)=>c1.fuel===fuel)
     arr2=arr2.filter((c1)=>
        arr1.find((a1)=>a1.model===c1.model))
    }
    if(type){
      arr1=arr1.filter((c1)=>c1.type===type)
      arr2=arr2.filter((c1)=>
         arr1.find((a1)=>a1.model===c1.model))
    }
    if(minprice){
      arr2=arr2.filter((c1)=>c1.price>minprice)
    }
    if(maxprice){
      arr2=arr2.filter((c1)=>c1.price<maxprice)
    }
    if(sort==='kms'){
      arr2.sort((st1,st2)=>(+st1.kms)-(+st2.kms))
    }
    if(sort==='price'){
      arr2.sort((st1,st2)=>(+st1.price)-(+st2.price))

    }
    if(sort==='year'){
      arr2.sort((st1,st2)=>(+st1.year)-(+st2.year))
    }

   res.send(arr2)
  })

  app.get("/cars/carMaster", function(req,res){
    res.send(carMaster)
   })
 
  app.post("/cars",function(req,res){
   let car=req.body
   console.log(car)
   cars.push(car)
   res.send(cars)
  })

  app.get("/cars/:id",function(req,res){
   let id=req.params.id;
   let car=cars.find((c1)=>c1.id===id)
   car?res.send(car):res.send('not found').status(404)
  })

  app.put("/cars/:id",function(req,res){
   let id=req.params.id;
   const car=req.body;
   let newCar={id:id,...car}
   let index=cars.findIndex((c1)=>c1.id===id)
   if(index>=0){
   cars[index]=newCar
   res.send(cars)
   }
   res.status(404).send("not found")
  })

  app.delete("/cars/:id",function(req,res){
   let id=req.params.id;
   let index=cars.findIndex(c1=>c1.id===id)
   if(index>=0){
      cars.splice(index,1)
      res.send(cars)
   }
   else{
     res.status(404).send("not found")

   }
  })

app.listen(port, () => console.log(`Node app listening on port ${port}!`));


