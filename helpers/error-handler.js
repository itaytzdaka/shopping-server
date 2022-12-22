function getError(err){
    if(config.isProduction){
        return "some error ocurred, please try again later"
    }

    return err.message;
}

module.exports={
    getError
}