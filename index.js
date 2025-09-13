process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1'
import './config.js'
import { fork } from 'cluster'
import { watchFile, unwatchFile } from 'fs'
import cfonts from 'cfonts'
import { createRequire } from 'module'
import { fileURLToPath, pathToFileURL } from 'url'
import { platform } from 'process'
import * as ws from 'ws'
import fs, { readdirSync, statSync, unlinkSync, existsSync, mkdirSync, readFileSync, rmSync, watch } from 'fs'
import yargs from 'yargs'
import { spawn } from 'child_process'
import lodash from 'lodash'
import { blackJadiBot } from './plugins/jadibot-serbot.js'
import chalk from 'chalk'
import syntaxerror from 'syntax-error'
import { tmpdir } from 'os'
import { format } from 'util'
import Pino from 'pino'
import path, { join } from 'path'
import { Boom } from '@hapi/boom'
import { makeWASocket, protoType, serialize } from './lib/simple.js'
import { Low, JSONFile } from 'lowdb'
import { mongoDB, mongoDBV2 } from './lib/mongoDB.js'
import store from './lib/store.js'
const { proto } = (await import('@whiskeysockets/baileys')).default
import pkg from 'google-libphonenumber'
const { PhoneNumberUtil } = pkg
const phoneUtil = PhoneNumberUtil.getInstance()
const { DisconnectReason, useMultiFileAuthState, MessageRetryMap, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, jidNormalizedUser } = await import('@whiskeysockets/baileys')
import readline from 'readline'
import NodeCache from 'node-cache'

const { CONNECTING } = ws
const { chain } = lodash
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000

// ====================== VARIABLES GLOBALES ======================
global.sessions = 'sessions' // Carpeta donde se guardan las sesiones
global.jadi = 'jadibot'      // Carpeta para subbots
global.nameqr = 'YoichiBot'  // Nombre que aparece en el navegador del QR
global.botNumber = ''        // Aquí puedes poner el número del bot si usas vinculación por código
global.APIs = {}             // APIs globales (por si las usas)
global.APIKeys = {}          // Keys de las APIs
// ===============================================================

console.log(chalk.bold.redBright(`\nYoichi Bot\n`))

cfonts.say('🩵 Yoichi Bot 🩵', {
  font: 'block',
  align: 'center',
  colors: ['redBright']
})

cfonts.say(`Made with Duarte`, {
  font: 'console',
  align: 'center',
  colors: ['blueBright']
})

protoType()
serialize()

// ================== FUNCIONES GLOBALES ==================
global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') {
  return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString()
}
global.__dirname = function dirname(pathURL) {
  return path.dirname(global.__filename(pathURL, true))
}
global.__require = function require(dir = import.meta.url) {
  return createRequire(dir)
}

global.API = (name, path = '/', query = {}, apikeyqueryname) => 
  (name in global.APIs ? global.APIs[name] : name) + 
  path + 
  (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({
    ...query, 
    ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {})
  })) : '')

global.timestamp = { start: new Date }
// ========================================================

// Base de datos
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.prefix = new RegExp('^[#/!.]')

global.db = new Low(
  /https?:\/\//.test(global.opts['db'] || '') 
    ? new cloudDBAdapter(global.opts['db']) 
    : new JSONFile('./database.json')
)

global.DATABASE = global.db
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) {
    return new Promise((resolve) => setInterval(async function() {
      if (!global.db.READ) {
        clearInterval(this)
        resolve(global.db.data == null ? global.loadDatabase() : global.db.data)
      }
    }, 1000))
  }
  if (global.db.data !== null) return
  global.db.READ = true
  await global.db.read().catch(console.error)
  global.db.READ = null
  global.db.data = {
    users: {},
    chats: {},
    stats: {},
    msgs: {},
    sticker: {},
    settings: {},
    ...(global.db.data || {}),
  }
  global.db.chain = chain(global.db.data)
}
await global.loadDatabase()

// ====================== RESTO DEL CÓDIGO ======================
// No lo cambié, solo agregué las globales de arriba
// para que ya no te marque error cuando intente usar sessions/jadi/nameqr.