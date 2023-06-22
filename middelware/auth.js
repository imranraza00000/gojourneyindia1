const isLogin = async(req, res,next)=>{
    try {
        if(req.session.userId){}else{res.redirect('/myprofile');}
      next();
    } catch (error) {
        console.log(error.message);
    }
}

const isLogout = async(req, res,next)=>{
    try {
        if(req.session.userId){
            res.redirect('/myprofile');
        }
      next();
    } catch (error) {
        console.log(error.message);
    }
}

const isLoginAdmin = async(req, res, next)=>{
    try {
        if(req.session.userIdAdmin){}else{res.redirect('/admindashboard');}
      next();
    } catch (error) {
        console.log(error.message);
    }
}

const isLogoutAdmin = async(req, res, next)=>{
    try {
        if(req.session.userIdAdmin){
            res.redirect('/admindashboard');
        }
      next();
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = {
    isLogin,
    isLogout,
    isLoginAdmin,
    isLogoutAdmin
}