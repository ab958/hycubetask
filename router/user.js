const express = require("express");
const router = express.Router();
const User = require("../model/user");
const Product = require("../model/product");
const Order = require("../model/order");
const jwt = require("jsonwebtoken");
// const asyncHandler = require("express-async-handler");
// const Product = require("../models/productmodel");

// const myorder = async(req,res,next) =>{
//   const wahab = req.header('token');
  
// }

const admin = async(req,res,next) =>{
 const wahab = req.header('token');
 if(!wahab){
  return res.send("Access Deniad")
 }
 const vei = jwt.verify(wahab,"wahab")
 const ad = vei.user_id
 const checkad = await User.find({_id:ad })
 console.log(checkad[0].isAdmin)
 if(checkad[0].isAdmin ){
  next()
 }
 else{
   res.send("You are not admin")
 }

 
}

const wahab = (req, res, next) => {
  const token = req.header('token');
  if(!token){
    return res.send("Access Deniad")
  }
  try{
    const vei = jwt.verify(token,"wahab")
    // console.log(vei._id,"vei")
    // req.token = vei
    req.user =  vei.user_id;
    next()
  }catch(e){
    return res.send("invalid Token")
  }
};


router.post("/login", async (req, res) => {
  const user = await User.find({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    console.log(user[0]._id);
    const token = jwt.sign({ user_id: user[0]._id }, "wahab", {
      expiresIn: "2h",
    });
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(token);
    // res.send(user);
  }
});

router.get("/menu", wahab, async (req, res) => {
 let menu =  await Product.find();
 
 if(menu){
   menu = menu.map(product => {
     return {
       name : product.name,
       brand: product.brand,
       category: product.category,
       price: product.price,
     }
   }  )
  res.send(menu);
 }
  
 
});

router.post("/order",wahab, async (req, res) => {
 console.log(req.body)
 const wahab = req.body
 let abc = wahab.orderItems
 let totalamount = 0
 for(let i =0;i<abc.length;i++){
  totalamount = totalamount + abc[i].price 
 }
//  console.log(totalamount)
 const data = await new Order({
  "user" : req.user,
  "orderItems" : wahab.orderItems,
  "totalPrice" : totalamount
 })
 await data.save() 
 return res.send(data)
//  console.log(data)
});

router.get("/allorder",admin,async(req,res)=>{
    res.send("hello world")
})
router.get("/acceptorder",admin,async(req,res)=>{
    const order = await Order.findById(req.body._id);
   console.log(order)
   if(order){
    if(order.isDelivered === false){
      // console.log(order)
      // const up ={
      //   isDelivered = true
      // }
      // order[0].isDelivered =true
      const whab = await Order.findByIdAndUpdate(order._id,{$set:  {isDelivered : true}})
      console.log(whab)
      console.log("whab")
      // await whab.save()
      // return res.send(whab)
    }else{
      return res.send("Order is allready delerverd")
    }
    console.log("helooo")
   }else{
    res.send("order doesnot exisit")
   }
})
router.get("/myorder",wahab,async(req,res)=>{
  const token = req.header('token');
  // res.send("my order")
  const vei = jwt.verify(token,"wahab")
  const ad = vei.user_id
  const myorder = await Order.find({user:ad })
  res.send(myorder)

} )
module.exports = router;
