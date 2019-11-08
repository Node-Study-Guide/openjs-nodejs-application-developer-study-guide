module.exports = class Emailer {

    send (to, body) {
        console.log(`Sending email to ${to} with body '${body}'`)
    }

}