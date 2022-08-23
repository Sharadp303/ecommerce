async function checkNameForCategory(req,res,next){
    categoryData=req.body;
    if(!categoryData.name){
        res.status(400).send("Name is mandatory")
    return }

    next()

}
module.exports={checkNameForCategory}