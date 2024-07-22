const mongoose=require('mongoose')
const candidateSchema=new mongoose.Schema({
leaderName:{
    type:String
},
party:{
    type:String
},
age:{
    type:Number,
    require:true
},
votes:[
    {
         user:{
            type:mongoose.Schema.Types.Objects,
            ref:'user',
            required:true
         },
         votedAt:{
            type:Date,
            default:Date.now()
         }
    }
],
votecount:{
    type:Number,
    default:0
}
});

const candidate=mongoose.model('user',candidateSchemaSchema);
module.exports=candidate;