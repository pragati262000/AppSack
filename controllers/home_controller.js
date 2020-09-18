module.exports.home = function (req,res){
    console.log(req.cookies);
    //to change value of cookie
    res.cookie('user-id',25);
    return res.render('home',{
        title: "Home"
    });
};
