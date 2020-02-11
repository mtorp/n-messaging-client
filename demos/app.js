import express from 'express'
import cookieParser from 'cookie-parser'
import {PageKitHandlebars, helpers} from '@financial-times/dotcom-server-handlebars'

import nMessagingPresenter from '../src/handlebars-helpers/nMessagingPresenter'
import proxy from './proxy-controller'

const app = express()
app.use(cookieParser())
app.use('/public', express.static(__dirname + '/public'))
app.set('views', __dirname + '/templates')
app.set('view engine', 'html')
const partialPaths = {}
partialPaths[__dirname + '/templates/partials'] = '**/*.html'
partialPaths[__dirname + '/../..'] = 'n-messaging-client/templates/**/*.html'
helpers['nMessagingPresenter'] = nMessagingPresenter
const renderer = new PageKitHandlebars({ helpers, partialPaths })
app.engine('html', renderer.engine)

app.all('/__message/:id?', proxy(process.env.GURU_HOST || 'https://www.ft.com'));
app.post('/email-app-links', (req, res) => {res.sendStatus(200);});

function getFlagsFromCookie(cookie) {
  const pairs = cookie.split(',').map((pair) => pair.trim().split(':'))
  return Object.fromEntries(pairs)
}

app.get('/', (req, res) => {
	if (process.env.GURU_HOST) {
          res.locals.guruEndpoint = process.env.GURU_HOST
        }
        if (req.cookies['next-flags']) {
          app.locals.flags = getFlagsFromCookie(req.cookies['next-flags'])
        }
	res.render('index',{ layout: 'custom-vanilla', title: 'Demo' });
});

module.exports = app
