const Post = require('../models/post');
const User = require('../models/user');
// module.exports.home = function (req,res){
//     // console.log(req.cookies);
//     // //to change value of cookie
//     // res.cookie('user-id',25);
//     return res.render('home',{
//         title: "Home"
//     });
// };
module.exports.home = async function(req,res){
    try{
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path:'comments',
            populate:{
               path:'user'
            } 
        });
     
        let users = await  User.find({});
        return res.render('home',{
            title:"Codeial | Home",
            posts:posts,
            all_users:users
        });
    }catch(err){
        console.log('Error', err);
        return;
    }
}