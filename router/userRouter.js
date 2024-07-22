const express=require('express');
const router=express.Router();
const user=require('./../models/user');
const{jwtauthMW,generateToken}=require('./../jwt');

router.post('/signup',async(req,res)=>{
    try {
        const data=req.body

        //-create a new menu doc using mongoose model
        const newuser=new user(data)

        //save the new person to database
        const respone=await newuser.save();
        console.log('data has saved successfully')
        constbpayload={
          id:respone.id,
          // username:respone.username
        }
        console.log(JSON.stringify(payload));
        const token=generateToken(payload)
        console.log("token is:",token);
        res.status(200).json({respone:respone,token:token});

    } catch (err) {
        console.log('error saving user data0',err);
        response.status(500).json({error:'internal server error'});
    }
})


// Login Route
router.post('/login', async(req, res) => {
  try{
      // Extract username and password from request body
      const {adharCardNumber, password} = req.body;

      // Find the user by username
      const user = await person.findOne({adharCardNumber: adharCardNumber});

      // If user does not exist or password does not match, return error
      if( !user || !(await user.comparePassword(password))){
          return res.status(401).json({error: 'Invalid username or password'});
      }

      // generate Token 
      const payload = {
          id: user.id
      }
      const token = generateToken(payload);

      // resturn token as response
      res.json({token})
  }catch(err){
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/profile', jwtauthMW, async (req, res) => {
  try{
      const userData = req.user;
      console.log("User Data: ", userData);

      const userId = userData.id;
      const user = await person.findById(userId);

      res.status(200).json({user});
  }catch(err){
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
})
router.get('/',async(req,res)=>{
  try {
    const data=await user.find();
    console.log('data fetch successfully');
    res.status(200).json(data)
  } catch (error) {
    console.log('error fetching data');
    res.status(500).json({error:'internal server error'});
  }
})

module.exports=router;