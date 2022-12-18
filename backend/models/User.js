const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    firstName: {
        required: [true, 'First name is required'],
        type: String
    },
    lastName: {
        required: [true, 'First name is required'],
        type: String
    },
    email: {
        required: [true, 'Email is required'],
        type: String
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],

},
    {
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        },
        timestamps: true
    })

userSchema.virtual("insights", {
    ref: "Insight",
    foreignField: "user",
    localField: "_id",
});

userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    var salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.methods.newAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user.id.toString() }, process.env.SECRET, { expiresIn: "7 days" })
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.methods.isPasswordMatched = async function (enteredPassowrd) {
    return await bcrypt.compare(enteredPassowrd, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User
