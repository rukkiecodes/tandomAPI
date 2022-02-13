const express = require("express")
const router = express.Router()
const nodemailer = require("nodemailer")
const { google } = require("googleapis")

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const REDIRECT_URL = process.env.GMAIL_REDIRECT_URL
const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN

router.post("/sendTemplate", (req, res) => {
  const { name, email, to, subject, html } = req.body

  const oAuthClient = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
  )

  oAuthClient.setCredentials({ refresh_token: REFRESH_TOKEN })

  const send_mail = async () => {
    try {
      const access_token = await oAuthClient.getAccessToken()

      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "rukkiecodes@gmail.com",
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: access_token,
        },
      })

      const mail_options = {
        from: `${name} <${email}>`,
        to,
        subject,
        html,
      }

      const result = await transport.sendMail(mail_options)
      return result
    } catch (error) {
      return error
    }
  }

  send_mail()
    .then((result) => {
      console.log("Email sent...", result)
      res.status(200).json({
        success: true,
        email: result,
        message: "Email sent successfully",
      })
    })
    .catch((error) => {
      console.log(error.message)
      res.status(500).json({
        error: error.message,
      })
    })
})

module.exports = router
