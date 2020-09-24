const Post = require('../models/post');
// module.exports.home = function (req,res){
//     // console.log(req.cookies);
//     // //to change value of cookie
//     // res.cookie('user-id',25);
//     return res.render('home',{
//         title: "Home"
//     });
// };
module.exports.home = function(req,res){
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err,posts){
        return res.render('home',{
            title:"Codeial | Home",
            posts:posts
        });
    });

}