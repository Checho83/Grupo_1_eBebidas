
function adminMiddleware(req, res, next){

    if (!(req.session.userLogged)){
        res.redirect('../')
    } else {
        if (req.session.userLogged.email != 'admin@admin.com'){
            res.redirect('../')
        }
    }
    next();
}

module.exports = adminMiddleware;

