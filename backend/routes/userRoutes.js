const express = require('express')
const { userRegisterCtrl,loginUserCtrl, fetchUserDetailsCtrl,logout, createInsightsCtrl, addToFavInsight, deleteInsightsCtrl, removeFromFavInsight, fetchAllInsightsCtrl } = require('../controllers/userControllers')
const {authMiddleware} = require('../middlewares/authMiddleware')

const userRoutes = express.Router()

userRoutes.post('/signup',userRegisterCtrl)
userRoutes.post('/login',loginUserCtrl)
userRoutes.get('/profile',authMiddleware,fetchUserDetailsCtrl)
userRoutes.get('/user-history',authMiddleware,fetchAllInsightsCtrl)
userRoutes.post('/get-insights',authMiddleware,createInsightsCtrl)
userRoutes.put('/add-to-fav-insight',authMiddleware,addToFavInsight)
userRoutes.put('/remove-from-fav-insight',authMiddleware,removeFromFavInsight)
userRoutes.delete('/:id',authMiddleware, deleteInsightsCtrl)
userRoutes.post('/logout',authMiddleware,logout)


module.exports = userRoutes