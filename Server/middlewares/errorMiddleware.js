const errorHandler=(err,req,res,next)=>{
    res.status(500).send({"error":err});
}
export default errorHandler;