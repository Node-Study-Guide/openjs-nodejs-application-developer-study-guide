
const Emailer = require('./emailer')
const { EventEmitter } = require('events')

const emailer = new Emailer()

const userEvents = new EventEmitter()

const sendWelcomeEmail = function sendWelcomeEmail(emailAddress) {
    emailer.send(emailAddress, `Welcome to our app!`)
}

userEvents.on('newUser', sendWelcomeEmail)

userEvents.emit('newUser', 'example@example.com')
