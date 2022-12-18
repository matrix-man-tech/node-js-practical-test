const expressAsyncHandler = require('express-async-handler')
const User = require('../models/User')
const validateMongodbId = require('../utils/validateMongodbId')
const axios = require('axios')
const { response } = require('express')
const Insight = require('../models/Insights')

const userRegisterCtrl = expressAsyncHandler(async (req, res) => {
    const { firstName,lastName, email, password } = req.body
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    try {
        const user = await User.create({
            firstName: req?.body?.firstName,
            lastName: req?.body?.lastName,
            email: req?.body?.email,
            password: req?.body?.password,
        })
        res.json(user)
    } catch (error) {
        res.json(error)
    }
})

const loginUserCtrl = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body
    const userFound = await User.findOne({ email })
    if (userFound && (await userFound.isPasswordMatched(password))) {
        const token = await userFound.newAuthToken()
        res.send({ userFound, token })
        res.redirect('/index');
    }
    else {
        res.status(401)
        throw new Error("Invalid credentials")
    }
})

const fetchUserDetailsCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.user
    validateMongodbId(id)
    try {
        const user = await User.findById(id)
        res.json(user)
    } catch (error) {
        res.json(error)
    }
})

const cleanString = string => {
    const alphabet = string
        .replace(/\n/ig, '')
        .replace(/<style[^>]*>[\s\S]*?<\/style[^>]*>/ig, '')
        .replace(/<head[^>]*>[\s\S]*?<\/head[^>]*>/ig, '')
        .replace(/<script[^>]*>[\s\S]*?<\/script[^>]*>/ig, '')
        .replace(/<\/\s*(?:p|div)>/ig, '')
        .replace(/<br[^>]*\/?>/ig, '')
        .replace(/<[^>]*>/ig, '')
        .replace('&nbsp;', ' ')
        .replace(/[^\S\r\n][^\S\r\n]+/ig, ' ')
        .trim()
    const lowerCase = alphabet.toLowerCase()
    return lowerCase
}

const count = string => {
    const words = string.split(" ").filter(word => word !== "")
    const count = words.length
    return count
}

const getLinksFromWeb = (htmlString) => {

    LINK_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    matches = htmlString.match(LINK_REGEX);
    return matches;
}

const getData = (url) => {
    return axios.get(url)
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })

}

const createInsightsCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.user
    const url = req.body.url
    validateMongodbId(id)
    const content = await getData(url)
    const cleanedContent = cleanString(content)
    const result = count(cleanedContent)
    const src = getLinksFromWeb(content)
    if (cleanedContent) {
        try {
            const insight = await Insight.create({
                domainName: url,
                wordCount: result,
                webLinks: src,
                user: id,
            })
            res.json(insight)

        } catch (error) {
            res.json(error)
        }
    }

})

const fetchAllInsightsCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.user
    validateMongodbId(id)
    try {
        const myProfile = await User.findById(id)
            .populate('insights')
        res.json(myProfile)
    } catch (error) {
        res.json(error)
    }
})

const deleteInsightsCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongodbId(id)
    try {
        const insight = await Insight.findByIdAndDelete(id)
        res.json(insight)
    } catch (error) {
        res.json(error)
    }
})

const addToFavInsight = expressAsyncHandler(async (req, res) => {
    const { insightId } = req.body
    try {
        const insight = await Insight.findByIdAndUpdate(insightId, {
            isFavourite: true
        })
        res.json(insight)
    } catch (error) {

    }
})

const removeFromFavInsight = expressAsyncHandler(async (req, res) => {
    const { insightId } = req.body
    try {
        const insight = await Insight.findByIdAndUpdate(insightId, {
            isFavourite: false
        })
        res.json(insight)
    } catch (error) {

    }
})

const logout = expressAsyncHandler(async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = { loginUserCtrl, userRegisterCtrl, fetchUserDetailsCtrl, getData, cleanString, count, getLinksFromWeb, createInsightsCtrl, fetchAllInsightsCtrl, deleteInsightsCtrl, addToFavInsight, removeFromFavInsight, logout }
