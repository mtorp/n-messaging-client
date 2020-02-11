require('sucrase/register')

const app = require('./app')

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Listening on http://local.ft.com:${PORT}`) // eslint-disable-line no-console
})
