function isAdmin(request, response, next) {

      
    if(!request.session || !request.session.user){
        response.status(401).send("You are not logged-in"); 
        return;
    }

    if(request.session?.user?.isAdmin){
        next()
    }

    else{
     response.status(403).send("You are not Admin"); 
    }
}


module.exports = isAdmin;