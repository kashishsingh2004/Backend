const express = require("express");
const app = express();
const connectDb = require("./config/db");
const userModel = require("./model/userSchema");

connectDb();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("HEllO");
});
app.post("/register", async (req, res) => {
  try{
    const { email, password, name } = req.body;
  const userExist = await userModel.findOne({ email });
  if (userExist) {
   return  res.send({ message: "User Exist" });
  }
  const newUser = new userModel({ name, email, password });
  await newUser.save();
  return res.send({ message: "User Created Successfully" });
  }
  catch (err){
  return res.send(err)
  }
});
app.delete('/delete/:id',async(req,res)=>{
  const id=req.params.id;
  console.log("ehello")
  const userDelete=await userModel.findOneAndDelete(id)
  if(userDelete){
    res.send({massege:"user deleted successfully"})     
  }
  else{
    res.send({massege:"user not exist"})
  }
})
app.listen(4000, () => {
  console.log("Server is running... ");
});
