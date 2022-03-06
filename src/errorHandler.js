export const errorHandler = (err, req, res, next) => {
    if(err) {
        if(!req.headerSent){

            res.status(err.status || 500).send( {message: err.message || "something went wrong!"})
}
}
next()
}