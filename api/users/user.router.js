
const {createUser,getUsers,getUsersById,updateUsers,deleteUsers,login}=require("./user.controller")

const router=require("express").Router();
    
const {checkToken}=require("../../auth/token_validation")


router.post("/",checkToken,createUser)
router.get("/",checkToken,getUsers)
router.get("/:id",checkToken, getUsersById)
router.patch("/",checkToken,updateUsers)
router.delete("/",checkToken,deleteUsers)
router.post("/login",login)

module.exports=router;