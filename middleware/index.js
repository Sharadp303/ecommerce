const {checkNameForCategory}=require('./category')
const{validateProductdata}=require('./product')
const {checkDuplicateUsernameAndEmail,checkRoles}=require('./user')
const {verifyToken,isAdmin}=require('./authJwt')

module.exports={checkNameForCategory,
    validateProductdata,
    checkRoles,
    checkDuplicateUsernameAndEmail,
    verifyToken,
    isAdmin
}