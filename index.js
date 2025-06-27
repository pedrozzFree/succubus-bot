/*
PEDROZZ MODS FEZ ESSA BUDEGA AQUI, SE FOR REPOSTA PELO MENOS DEIXA UNS CRÉDITOS AI PARA YO QUE NOIS AGRADECE 😁👍
*/
const { DisconnectReason, makeInMemoryStore, jidDecode, Browsers, normalizeMessageContent,generateMessageIDV2, WA_DEFAULT_EPHEMERAL, getAggregateVotesInPollMessage, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, downloadContentFromMessage, areJidsSameUser, getContentType, useMultiFileAuthState, makeWASocket, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, makeWaSocket } = require("@adiwajshing/baileys")
let pino = require('pino')
const fs = require('fs')
const axios = require('axios');
const Pino = require('pino')
const moment = require('moment-timezone');
const os = require('os')
const chalk = require('chalk')
const lolcatjs = require('lolcatjs')
const { randomBytes } = require("crypto");
//=======EXPORT======\\\
const { botVersion, msg, consoleVerde, consoleVerde2, consoleVermelho, consoleVermelho2, consoleAmarelo, consoleAmarelo2, consoleAzul, consoleAzul2, consoleErro, consoleInfo, consoleOnline, consoleSucesso, fetchJson, getBuffer, selo2, seloCriador, seloMeta, seloGpt, seloLuzia, seloLaura, seloCopilot, seloNubank, seloBb, seloBradesco, seloSantander, seloItau } = require("./bot/js/succubusExport.js")
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./bot/lib/exif')
const { imageToWebp2, videoToWebp2, writeExifImg2, writeExifVid2 } = require('./bot/lib/exif2')

//=======CONFIG=======\\\
const config = JSON.parse(fs.readFileSync("./dono/config.json"))
const { prefix, botName, donoName, MoonApiUrl, donoNumero, DARK_APIKEY, MoonKey, emoji, isButton} = require("./dono/config.json")

const emojiLista = ["😈","💋","🖤","👠","🔥"];
const fotomenu = "./bot/imagem/menu.png";
const fotomenuUrl = "https://files.catbox.moe/1ptv80.png"
const BaseApiDark = "https://darkstars-api.speedhosting.cloud"
//=============\\
const PhoneNumber = require('awesome-phonenumber')
let phoneNumber = "557792142954"
const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code")
const useMobile = process.argv.includes("--mobile")
const readline = require("readline")
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))

const time = hora = moment.tz('America/Sao_Paulo').format('HH:mm:ss');
const data = date = dataa = moment.tz('America/Sao_Paulo').format('DD/MM/YY');
const NodeCache = require("node-cache")
const {smsg} = require("./bot/lib/smsg.js")
const simple = require('./bot/lib/oke.js')
//=======FUNÇÕES========\\
const { fetchBuffer, getGroupAdmins, TelegraPh, isUrl, hitungmundur, sleep, clockString, checkBandwidth, runtime, tanggal, getRandom } = require('./bot/lib/myfunc')
const lolcat = (texto) => {lolcatjs.fromString(texto)}
//========>MENUS<=======\\
const { menu, menu18, menuadm, menujogos, menudono } = require("./bot/js/menu.js")
const perguntas = JSON.parse(fs.readFileSync('./bot/json/duoGame.json'));

//=========CMS BOT=======\\

async function ligarbot() {
const store = makeInMemoryStore({ logger: pino().child({ level: 'debug', stream: 'store' }) })

const { state, saveCreds } = await useMultiFileAuthState('./dono/suc-conexao')
const { version, isLatest } = await fetchLatestBaileysVersion()
const msgRetryCounterCache = new NodeCache()

//=========CONEXÃO========\\
const suc = simple({
logger: pino({
level: "silent"
}),
printQRInTerminal: false,
auth: state,
version: [2, 3000, 1017531287],
browser: Browsers.ubuntu("Edge"),
getMessage: async key => {
const jid = jidNormalizedUser(key.remoteJid);
const msg = await store.loadMessage(jid, key.id);
return msg?.message || '';
},
//para a enquete
      getMessage: async (key) => {
            if (store) {
                const msg = await store.loadMessage(key.remoteJid, key.id)
                return msg.message || undefined
            }
            return {
                conversation: "Fenix"
            }
        }
}, store);

//======CLIENTES=======\\
var conn = suc;
var laura = suc;
var client = suc;
var clara = suc;
var moon = suc;
var ph = suc;

//======CÓDIGO=======\\
if (!suc.authState.creds.registered) {
const phoneNumber = await question('Digite seu número do WhatsApp: \n');
let code = await suc.requestPairingCode(phoneNumber.replace(/[^\d]/g, ''));
code = code?.match(/.{1,4}/g)
?.join("-") || code;
lolcat("[ CONEXÃO ] - código de pareamento: " + code);
}
store.bind(suc.ev);

suc.ev.on('chats.set', () => {
console.log('setando conversas...')})
suc.ev.on('contacts.set', () => {
console.log('setando contatos...')})
suc.ev.on('creds.update', saveCreds)

//=======CACHE=======\\
const metadataCache = new Map();
const METADATA_CACHE_TIME = 5 * 60 * 1000;

const groupCache = {
  data: null,
  timestamp: 0
};

// ============================
// 2. FUNÇÃO: PEGAR METADADOS DO GRUPO (com cache)
// ============================
async function getGroupMetadata(suc, jid) {
  const cached = metadataCache.get(jid);
  if (cached && Date.now() < cached.expiry) {
    return cached.data;
  }

  try {
    const metadata = await suc.groupMetadata(jid);
    metadataCache.set(jid, {
      data: metadata,
      expiry: Date.now() + METADATA_CACHE_TIME
    });
    return metadata;
  } catch (err) {
    console.error(`[ERRO] Falha ao buscar metadata: ${jid}`, err);
    throw err;
  }
}

// ============================
// 3. FUNÇÃO: PEGAR TODOS OS GRUPOS (com cache)
// ============================
async function getGroups(suc) {
  const now = Date.now();
  if (groupCache.data && (now - groupCache.timestamp < METADATA_CACHE_TIME)) {
    return groupCache.data;
  }

  const getGroups = await suc.groupFetchAllParticipating();
  const groups = Object.entries(getGroups).map(entry => entry[1]);
  groupCache.data = groups;
  groupCache.timestamp = now;
  return groups;
}

setInterval(() => {
  const now = Date.now();
  for (const [jid, { expiry }] of metadataCache.entries()) {
    if (now > expiry) {
      metadataCache.delete(jid);
    }
  }
}, 10 * 1000);

function getMembros(members) {
  if (!Array.isArray(members)) return [];
  return members
    .map(m => typeof m === 'string' ? m : m.id)
    .filter(id => typeof id === 'string' && id.endsWith('@s.whatsapp.net'));
}

//=======ATL MSG======\\
const enquetes = {};
suc.ev.on('messages.upsert', async chatUpdate => {
//console.log(JSON.stringify(chatUpdate, undefined, 2))

try {
mek = chatUpdate.messages[0]
m = smsg(conn, mek, store)
//PARA VIZUALIZAR AS MENSAGENS ENVIADAS AO BOT
verMsg = false
if(verMsg) {
await suc.readMessages([mek.key]);
} else {
if(mek.key.remoteJid == "status@broadcast") return;
}

const from = m.key.remoteJid
const info = m
//=========BODY=========\\
var body = (info.mtype === 'interactiveResponseMessage') ? JSON.parse(info.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id:(info.mtype === 'conversation') ? info.message.conversation :(info.mtype === 'deviceSentMessage') ? info.message.extendedTextMessage.text :(info.mtype == 'imageMessage') ? info.message.imageMessage.caption :(info.mtype == 'videoMessage') ? info.message.videoMessage.caption : (info.mtype == 'extendedTextMessage') ? info.message.extendedTextMessage.text : (info.mtype == 'buttonsResponseMessage') ? info.message.buttonsResponseMessage.selectedButtonId : (info.mtype == 'listResponseMessage') ? info.message.listResponseMessage.singleSelectReply.selectedRowId : (info.mtype == 'templateButtonReplyMessage') ? info.message.templateButtonReplyMessage.selectedId : (info.mtype == 'messageContextInfo') ? (info.message.buttonsResponseMessage?.selectedButtonId || info.message.listResponseMessage?.singleSelectReply.selectedRowId || info.text) : ""
var budy = (typeof info.text == 'string' ? info.text: '')

//========DEFINIÇÕES=========\\
const content = JSON.stringify(info.message);
const isCmd = body.startsWith(prefix);
const comando = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
const args = body.trim().split(/ +/).slice(1)
const text = args.join(" ")
const q = args.join(" ")
const sender = info.key.fromMe ? (suc.user.id.split(':')[0]+'@s.whatsapp.net' || suc.user.id) : (info.key.participant || info.key.remoteJid)
const numeroBot = await suc.decodeJid(suc.user.id)
const senderNumber = sender.split('@')[0]
const type = info.mtype;
const isGroup = from.endsWith('@g.us');
const dono = `${donoNumero}@s.whatsapp.net`
const donos = [dono, `${config.dono1}@s.whatsapp.net`, `${config.dono2}@s.whatsapp.net`, `${config.dono3}@s.whatsapp.net` ]
const isCreator = donos.includes(sender);
const isDono = isCreator;
const pushname = info.pushName || `${senderNumber}`
const isBot = info.key.fromMe ? true : false
const os = require('os')
const time = hora = moment.tz('America/Sao_Paulo').format('HH:mm:ss');
const data = date = dataa = moment.tz('America/Sao_Paulo').format('DD/MM/YY');

const quoted = info.quoted ? info.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const groupMetadata = info.isGroup ? await suc.groupMetadata(from).catch(e => {}) : ''
const groupName = info.isGroup ? groupMetadata.subject : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const participants = info.isGroup ? await groupMetadata.participants : ''
const PrecisaSerMembro = info.isGroup ? await participants.filter(v => v.admin === null).map(v => v.id) : [];
const groupAdmins = info.isGroup ? await getGroupAdmins(participants) : ''
const isBotAdmins = info.isGroup ? groupAdmins.includes(numeroBot) : false
const isBotGroupAdmins = groupAdmins.includes(numeroBot) || false
const isAdmins = info.isGroup ? groupAdmins.includes(info.sender) : false
const isGroupAdmins = isAdmins;
const pickRandom = (arr) => {return arr[Math.floor(Math.random() * arr.length)]}
const dispositivo = '' + (info.key.id.length > 21 ? 'Android' : info.key.id.substring(0, 2) == '3A' ? 'IOS' : 'WhatsApp web');
const numeroFormatado = q.replace(/[^\d]/g, '');
const numi = numeroFormatado + '@s.whatsapp.net'

//=========(isQuoted/consts)=============\\
const isImage = type == 'imageMessage'
const isVideo = type == 'videoMessage'
const isVisuU2 = type == 'viewOnceMessageV2'
const isAudio = type == 'audioMessage'
const isSticker = type == 'stickerMessage'
const isContact = type == 'contactMessage'
const isLocation = type == 'locationMessage'
const isProduct = type == 'productMessage'
const isMedia = (type === 'imageMessage' || type === 'videoMessage' || type === 'audioMessage' || type == "viewOnceMessage" || type == "viewOnceMessageV2")
typeMessage = body.substr(0, 50).replace(/\n/g, '')
if(isImage) typeMessage = "Image"
else if(isVideo) typeMessage = "Video"
else if(isAudio) typeMessage = "Audio"
else if(isSticker) typeMessage = "Sticker"
else if(isContact) typeMessage = "Contact"
else if(isLocation) typeMessage = "Location"
else if(isProduct) typeMessage = "Product"

const isQuotedMsg = type === 'extendedTextMessage' && content.includes('conversation')
const isQuotedMsg2 = type === 'extendedTextMessage' && content.includes('text')
const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
const isQuotedVisuU = type === 'extendedTextMessage' && content.includes('viewOnceMessage')
const isQuotedVisuU2 = type === 'extendedTextMessage' && content.includes('viewOnceMessageV2')
const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')
const isQuotedDocW = type === 'extendedTextMessage' && content.includes('documentWithCaptionMessage')
const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage')
const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage')
const isQuotedProduct = type === 'extendedTextMessage' && content.includes('productMessage')

// FUNÇÕES DE MARCAÇÕES \\
const menc_prt = info.message?.extendedTextMessage?.contextInfo?.participant
const menc_jid = args?.join(" ").replace("@", "") + "@s.whatsapp.net"
const menc_jid2 = info.message?.extendedTextMessage?.contextInfo?.mentionedJid

const menc_os2 = [...body.matchAll(/@(\d{5,})/g)].map(match => match[1]) ? menc_jid : menc_jid2

const mention = (galinha= '', ms = info) => {
memberr = []
vy = galinha.includes('\n') ? galinha.split('\n') : [galinha]
for(vz of vy){ for(zn of vz.split(' ')){
if(zn.includes('@'))memberr.push(parseInt(zn.split('@')[1])+'@s.whatsapp.net')
}}
}

const mencionarIMG = (galinha= '', Url, ms) => {
memberr = []
vy = galinha.includes('\n') ? galinha.split('\n') : [galinha]
for(vz of vy){ for(zn of vz.split(' ')){
if(zn.includes('@'))memberr.push(parseInt(zn.split('@')[1])+'@s.whatsapp.net')
}}
suc.sendMessage(from, {image: {url: Url}, caption: galinha.trim(), mentions: memberr}, {quoted: info}) 
}

const somembros = isGroup ? getMembros(groupMembers) : ''

//=======CARGOS======\\
let Cargo;
if (sender === dono) {
  Cargo = "Meu amado mestre 👑";
} else if (isAdmins) {
  Cargo = "Guardião do covil 🕊️";
} else {
  Cargo = "Alma Errante ✧";
}
//======TYPES======\\
const tipoMensagem = type == 'audioMessage' ? 'Áudio' : type == 'stickerMessage' ? 'Figurinha' : type == 'imageMessage' ? 'Imagem' : type == 'videoMessage' ? 'Vídeo' : type == 'documentMessage' ? 'Documento' : type == 'contactMessage' ? 'Contato' : type == 'locationMessage' ? 'Localização' : body

//======FUNÇÃO=======\\
var texto_exato = (type === 'conversation') ? info.message.conversation : (type === 'extendedTextMessage') ? info.message.extendedTextMessage.text : ''
const texto = texto_exato.slice(0).trim().split(/ +/).shift().toLowerCase()

async function DLT_FL(file) {
    try { 
        fs.unlinkSync(file);
    } catch (error) {}
}

//COLOCA ESSA CONST ACIMA DAS CONST ABAIXO
const getFileBuffer = async (mediakey, MediaType) => {
const stream = await downloadContentFromMessage(mediakey, MediaType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
return buffer
}

//CONST PARA FAZER FIGURINHAS COM LEGENDAS....

const sendImageAsSticker = async (laura, jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
 let buffer;
 if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options);
} else {
buffer = await imageToWebp(buff);
}

await suc.sendMessage(jid, {sticker: {url: buffer}, ...options}, {quoted})
return buffer;
};

const sendVideoAsSticker = async (laura, jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
 let buffer;
 if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options);
} else {
buffer = await videoToWebp(buff);
}

await suc.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer;
}

const sendImageAsSticker2 = async (laura, jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
 let buffer;
 if (options && (options.packname || options.author)) {
buffer = await writeExifImg2(buff, options);
} else {
buffer = await imageToWebp2(buff);
}

await suc.sendMessage(jid, {sticker: {url: buffer}, ...options}, {quoted})
return buffer;
};

const sendVideoAsSticker2 = async (laura, jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
 let buffer;
 if (options && (options.packname || options.author)) {
buffer = await writeExifVid2(buff, options);
} else {
buffer = await videoToWebp2(buff);
}

await suc.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer;
}
//ESSAS DEFINIÇÕES VOCÊ MUDA ONDE TA LAURA PELO SEU CLIENT DO BOT E COLOQUEI ELAS ACIMA DO SWITCH(COMANDO)
//=======SELOS=======\\
const selo = {key: {fromMe: false, participant: '0@s.whatsapp.net'}, message: { "extendedTextMessage": {"text": `${botName}\n${Cargo}`,"title": null,'thumbnailUrl': null}}}

//==========ENVIAR=======\\
//SIMULA ESCRITA
async function escrever (texto) {await suc.sendPresenceUpdate('composing', from); await esperar(1000); suc.sendMessage(from, { text: texto }, {quoted: info})}
//ENVIA UMA MENSAGEM 
async function enviar2(texto) {
const message = {interactiveMessage: {body: { text: texto },footer: { text: donoName }, nativeFlowMessage: {}}};await suc.relayMessage(from, message, {});}
//ENVIAR MSG
const enviar = (texto) => {suc.sendMessage(from, { text: texto }, {quoted: info})}
const reply = (texto) => {suc.sendMessage(from, { text: texto }, {quoted: info})}
//ENVIA UMA IMAGEM SIMPLES 
const enviarImg = async (link) => {await suc.sendMessage(from, {image: {url: link}}, {quoted: info})}
//ENVIA UMA IMAGEM COM TEXTO 
const enviarImg2 = async (link, texto) => {await suc.sendMessage(from, {image: {url: link}, caption: texto}, {quoted: info})}
//ENVIA UM GIF SIMPLES 
const enviarGif = async (link) => {await suc.sendMessage(from, { video: {url: link}, gifPlayback: true}, { quoted: info })}
const enviarGif2 = async (link, texto) => {await suc.sendMessage(from, { video: {url: link}, caption: texto, gifPlayback: true}, { quoted: info })}
//ENVIA UM VÍDEO SIMPLES 
const enviarVd = async (link) => {await suc.sendMessage(from, {video: {url: link }, mimetype: "video/mp4", fileName: "video.mp4"}, {quoted: info})}
//ENVIA UM VIDEO COM TEXTO
const enviarVd2 = async (link, texto) => {await suc.sendMessage(from, {video: {url: link }, caption: texto, mimetype: "video/mp4", fileName: "video.mp4"}, {quoted: info})}
//ENVIA UM ÁUDIO
const enviarAd = async (link) => {await suc.sendMessage(from, {audio: {url: link }, mimetype: "audio/mpeg"}, {quoted: info})}

const enviarAdPlay = async (link) => {
await suc.sendMessage(from, {audio: {url: link }, mimetype: "audio/mpeg", 
headerType: 4, 
contextInfo: { 
externalAdReply: { 
title: "🎶 𝐒𝐔𝐂𝐂𝐔𝐁𝐔𝐒 𝐏𝐋𝐀𝐘 🎶", 
body: data, 
showAdAttribution: true, 
thumbnailUrl: "https://files.catbox.moe/4f1bjk.png", 
mediaType: 1,
renderLargerThumbnail: true,
mediaUrl: BaseApiDark, 
sourceUrl: BaseApiDark}}}, 
{quoted: selo})
}

const enviarAd2 = async (link) => {await suc.sendMessage(from, {audio: {url: link }, mimetype: "audio/mpeg", ptt: true}, {quoted: selo})}
//CAUSA UM DELAY ENTRE FUNÇÃO 
const esperar = async (tempo) => {return new Promise(funcao => setTimeout(funcao, tempo));}
//REAGE A UMA MENSAGEM
const reagir = (reassao) => {suc.sendMessage(from, {react: {text: reassao, key: info.key}})}

//========BOTÕES========\\\
const enviarVideoButton = async (id, link, captionText, idbutton, displayButton) => {await suc.sendMessage(id, {video: { url: link},caption: captionText,buttons: [{buttonId: idbutton,buttonText: { displayText: displayButton },type: 1,}],headerType: 1,viewOnce: true,})};

const enviariMageButton = async (id, link, captionText, idbutton, displayButton) => {await suc.sendMessage(id, {image: { url: link},caption: captionText,buttons: [{buttonId: idbutton,buttonText: { displayText: displayButton },type: 1,}],headerType: 1,viewOnce: true,})
};
const enviarTextButton = async (id, texto, footertexto, idbutton, displayButton) => {await suc.sendMessage(id, {text: texto,footer: footertexto,buttons: [{buttonId: idbutton,buttonText: { displayText: displayButton },type: 1,}],headerType: 1,viewOnce: true,});};

const enviarButtonImg = async (jid, img, texto, button = null, id = null) => {
if (isButton) {
var fotin = await prepareWAMessageMedia({ image: {url: img } }, { upload: suc.waUploadToServer }); 
await await suc.relayMessage(jid,{ interactiveMessage: { header: { title: "", subtitle: '', hasMediaAttachment: true, imageMessage: fotin.imageMessage },body: { text: texto}, footer : { "text": "𝙊𝙛𝙚𝙧𝙚𝙘𝙞𝙢𝙚𝙣𝙩𝙤: 𝙎𝙪𝙘𝙪𝙗𝙪𝙨 𝘽𝙤𝙩" }, nativeFlowMessage: { buttons: [{name: "quick_reply",buttonParamsJson: JSON.stringify({display_text: button, id: id}),}], },messageParamsJson: "", },},{});
} else {
suc.sendMessage(jid, {image: {url: img}, caption: texto}, {quoted: selo})
}
}
//★・・・・・・★・・・ GRUPOS ・・・★・・・・・・★
const pastinhaDosGrupos = './bot/json/grupos/';
if (!fs.existsSync(pastinhaDosGrupos)){
fs.mkdirSync(pastinhaDosGrupos, { recursive: true });
}

const PastaDeGrupos = `${pastinhaDosGrupos}${from}.json`;
if (isGroup && !fs.existsSync(PastaDeGrupos)) {
var datea = [{
name: groupName, antilink: false, joguinhos: false, adultos: false, autoResposta: false, 
}];
fs.writeFileSync(PastaDeGrupos, JSON.stringify(datea, null, 2) + '\n');
}

const ArquivosDosGrupos = isGroup && fs.existsSync(PastaDeGrupos) 
? JSON.parse(fs.readFileSync(PastaDeGrupos)) 
: undefined;

function ModificaGrupo(index) {
fs.writeFileSync(PastaDeGrupos, JSON.stringify(index, null, 2) + '\n');
}

//=====CONST DE GRUPO=====\\
const isAntiLink = isGroup ? ArquivosDosGrupos[0].antilink : undefined
const isJogos = isGroup ? ArquivosDosGrupos[0].joguinhos : undefined
const isAdulto = isGroup ? ArquivosDosGrupos[0].adultos : undefined
const isResposta = isGroup ? ArquivosDosGrupos[0].autoResposta : undefined

//========LOG MSG=======\\\
if (info.message) {
console.log(`
╭───────────────────────────────
│〔 DE 〕: ${sender}
│〔 CHAT 〕: ${from}
│〔 MENSAGEM 〕: ${body}
│〔 NiCK 〕: ${pushname} 
│〔 TYPE 〕: ${info.mtype}
│〔 DiSPOSiTiVO 〕: ${dispositivo}
╰───────────────────────────────`)
}

//===========PING==========\\
const bytesToSize = (bytes) => {const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];if (bytes === 0) return '0 Byte';const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);return `${Math.round(bytes / Math.pow(1024, i), 2)} ${sizes[i]}`;};
const used = process.memoryUsage();
const cpus = os.cpus().map(cpu => {cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0);return cpu;});
const cpu = cpus.reduce((last, cpu, _, {length}) => {last.total += cpu.total;last.speed += cpu.speed / length;last.times.user += cpu.times.user;last.times.nice += cpu.times.nice;last.times.sys += cpu.times.sys;last.times.idle += cpu.times.idle;last.times.irq += cpu.times.irq; return last;}, {speed: 0,total: 0,times: {user: 0,nice: 0,sys: 0,idle: 0,irq: 0}});
const timestamp = new Date().getTime();
const latencia = timestamp - new Date().getTime();
const neww = Date.now();
const oldd = Date.now();
function timefunction(seconds) {seconds = Number(seconds);var d = Math.floor(seconds / (3600 * 24));var h = Math.floor(seconds % (3600 * 24) / 3600);var m = Math.floor(seconds % 3600 / 60);var s = Math.floor(seconds % 60);var dDisplay = d > 0 ? d + (d == 1 ? " D, " : " D, ") : "00 D, ";var hDisplay = h > 0 ? h + (h == 1 ? " H, " : " H, ") : "00 h, ";var mDisplay = m > 0 ? m + (m == 1 ? " M, " : " M, ") : "00 M, ";var sDisplay = s > 0 ? s + (s == 1 ? " S" : " S") : "00 S";return `${dDisplay}${hDisplay}${mDisplay}${sDisplay}`;}
const uptimeSeconds = Math.floor(process.uptime());
const uptimeFormatted = timefunction(uptimeSeconds);
const iphost = await fetchJson(`https://api.ipify.org/?format=json`)

//================\\
const { salvarUsuario, registrarUsuario1, infoUser1, modificarsaldo, modificarUsuario, carregarDadosUsuarios, tempoNamoro } = require("./bot/js/usuario.js")

const UserInfo = infoUser1(sender);
const isPremium = infoUser1(sender)?.vip === true;
const dadosUsuarios = carregarDadosUsuarios();
const totalUsuarios = Object.keys(dadosUsuarios).length;

if (!UserInfo && body) {
registrarUsuario1(sender, pushname)
}

const sendPoll = (laura, id, name = '', values = [], selectableCount = 1) => { 
return suc.sendMessage(id, {poll: {name, values, selectableCount}, messageContextInfo: { messageSecret: randomBytes(32)}}, {id, options: {userJid: laura?.user?.id}}).catch(() => {
return console.log(console.error);
});
}

///=================\\\
if (body && !isDono && !sender.includes("556191969269@s.whatsapp.net") && !sender.includes("556191879258@s.whatsapp.net") && !sender.includes("5511981696711@s.whatsapp.net")) return
const isBotoff = false
//========COMANDOS=======\\
switch(comando) {
//==>MENUS<==\\
case 'menu':{
reagir(emoji)
await enviarAd2('./bot/audio/voz/menu.wav');
textoM = `╭━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╮
┝⊰ ➪ 𝐒𝐔𝐂𝐔𝐁𝐔𝐒 𝐈𝐍𝐅𝐎𝐑𝐌𝐀ÇÕ𝐄𝐒
╰━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╯
┃┝.ᨘ۫.ꪶ${emoji} ۪→Seja bem-vindo ${pushname}
┃┝.ᨘ۫.ꪶ${emoji} ۪→Status: ${!isBotoff ? 'Online 🟢' : 'Offline 🔴'}
┃┝.ᨘ۫.ꪶ${emoji} ۪→cargo: ${Cargo}
┃┝.ᨘ۫.ꪶ${emoji} ۪→dono: ${donoName}
┃┝.ᨘ۫.ꪶ${emoji} ۪→Hora: ${time}
┃┝.ᨘ۫.ꪶ${emoji} ۪→data: ${data}
┃╰━━━─────━━━╯
╰━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╯`;
if (isButton) {
botoeslist = [{ display_text: "💋 𝑺𝑼𝑪𝑪𝑼𝑩𝑼𝑺 𝑴𝑬𝑵𝑼 2", id: `${prefix}menu2` }];
var fotin = await prepareWAMessageMedia({ image: {url: `${BaseApiDark}/api/canva/menuCard?background=https://i.pinimg.com/564x/bd/e2/ea/bde2eaf92bc85458aaabd138d8966733.jpg&banner=${fotomenuUrl}&profile=https://files.catbox.moe/d4abk7.png&apikey=${DARK_APIKEY}`} }, { upload: suc.waUploadToServer })
await await suc.relayMessage(
from,{ interactiveMessage: { header: {
title: "",
subtitle: '',
hasMediaAttachment: true,
imageMessage: fotin.imageMessage
},body: { text: textoM},
footer : {
"text": "𝙊𝙛𝙚𝙧𝙚𝙘𝙞𝙢𝙚𝙣𝙩𝙤: 𝙎𝙪𝙘𝙪𝙗𝙪𝙨 𝘽𝙤𝙩"
},
nativeFlowMessage: {
buttons: botoeslist.map(botao => ( { name: "quick_reply", buttonParamsJson: JSON.stringify({ display_text: botao.display_text, id: botao.id })} )),
},messageParamsJson: "", },},{});
} else {
enviarImg2(fotomenu, `${textoM}\nPara ver o menu completo use ${prefix}menu2\n> 𝙊𝙛𝙚𝙧𝙚𝙘𝙞𝙢𝙚𝙣𝙩𝙤: 𝙎𝙪𝙘𝙪𝙗𝙪𝙨 𝘽𝙤𝙩`)
}
}
break

case 'menucompleto': case 'menu2': {
reagir(emoji)
await enviarAd2('./bot/audio/voz/menu.wav');
if (isButton) {
botoeslist = [{ display_text: "💋 𝐒𝐔𝐂𝐂𝐔𝐁𝐔𝐒 𝐉𝐎𝐆𝐎𝐒", id: `${prefix}menujogos` }, { display_text: "💋 𝐒𝐔𝐂𝐂𝐔𝐁𝐔𝐒 𝐀𝐃𝐌", id: `${prefix}menuadm` }, { display_text: "💋 𝐒𝐔𝐂𝐂𝐔𝐁𝐔𝐒 𝐀𝐃𝐔𝐋𝐓𝐎", id: `${prefix}menu18` }];
var fotin = await prepareWAMessageMedia({ image: {url: fotomenu} }, { upload: suc.waUploadToServer })
await await suc.relayMessage(
from,{ interactiveMessage: { header: {
title: "",
subtitle: '',
hasMediaAttachment: true,
imageMessage: fotin.imageMessage
},body: { text: menu( prefix, botName, donoName, Cargo, time, data, dispositivo, sender, pushname, from, isBotoff, emoji ) },
footer : {
"text": "𝙊𝙛𝙚𝙧𝙚𝙘𝙞𝙢𝙚𝙣𝙩𝙤: 𝙎𝙪𝙘𝙪𝙗𝙪𝙨 𝘽𝙤𝙩"
},
nativeFlowMessage: {
buttons: botoeslist.map(botao => ( { name: "quick_reply", buttonParamsJson: JSON.stringify({ display_text: botao.display_text, id: botao.id })} )),
},messageParamsJson: "", },},{});
} else {
enviarImg2(fotomenu, menu( prefix, botName, donoName, Cargo, time, data, dispositivo, sender, pushname, from, isBotoff, emoji ))
}
}
break

case 'menu18': case 'menu3': {
reagir(emoji)
await enviarAd2('./bot/audio/voz/menu18.wav');
if (isButton) {
botoeslist = [{ display_text: "💋 𝑺𝑼𝑪𝑪𝑼𝑩𝑼𝑺 𝑴𝑬𝑵𝑼 2", id: `${prefix}menu2` }, { display_text: "💋 𝐒𝐔𝐂𝐂𝐔𝐁𝐔𝐒 𝐀𝐃𝐌", id: `${prefix}menuadm` }, { display_text: "💋 𝐒𝐔𝐂𝐂𝐔𝐁𝐔𝐒 𝐉𝐎𝐆𝐎𝐒", id: `${prefix}menujogos` }];
var fotin = await prepareWAMessageMedia({ image: {url: fotomenu} }, { upload: suc.waUploadToServer })
await await suc.relayMessage(
from,{ interactiveMessage: { header: {
title: "",
subtitle: '',
hasMediaAttachment: true,
imageMessage: fotin.imageMessage
},body: { text: menu18( prefix, botName, donoName, Cargo, time, data, dispositivo, sender, pushname, from, isBotoff, emoji ) },
footer : {
"text": "𝙊𝙛𝙚𝙧𝙚𝙘𝙞𝙢𝙚𝙣𝙩𝙤: 𝙎𝙪𝙘𝙪𝙗𝙪𝙨 𝘽𝙤𝙩"
},
nativeFlowMessage: {
buttons: botoeslist.map(botao => ( { name: "quick_reply", buttonParamsJson: JSON.stringify({ display_text: botao.display_text, id: botao.id })} )),
},messageParamsJson: "", },},{});
} else {
enviarImg2(fotomenu, menu18( prefix, botName, donoName, Cargo, time, data, dispositivo, sender, pushname, from, isBotoff, emoji ))
}
}
break

case 'menuadm': case 'menu4': {
if (!isGroup) return enviarAd2('./bot/audio/voz/gp.wav');
if (!isGroupAdmins && !isDono) return enviarAd2('./bot/audio/voz/cmdAdm.wav')
await enviarAd2('./bot/audio/voz/menuAdm.wav');
reagir(emoji)
if (isButton) {
botoeslist = [{ display_text: "💋 𝑺𝑼𝑪𝑪𝑼𝑩𝑼𝑺 𝑴𝑬𝑵𝑼 2", id: `${prefix}menu2` }, { display_text: "💋 𝐒𝐔𝐂𝐂𝐔𝐁𝐔𝐒 𝐉𝐎𝐆𝐎𝐒", id: `${prefix}menu5` }, { display_text: "💋 𝐒𝐔𝐂𝐂𝐔𝐁𝐔𝐒 𝐀𝐃𝐔𝐋𝐓𝐎", id: `${prefix}menu3` }];
var fotin = await prepareWAMessageMedia({ image: {url: fotomenu} }, { upload: suc.waUploadToServer })
await await suc.relayMessage(
from,{ interactiveMessage: { header: {
title: "",
subtitle: '',
hasMediaAttachment: true,
imageMessage: fotin.imageMessage
},body: { text: menuadm( prefix, botName, donoName, Cargo, time, data, dispositivo, sender, pushname, from, isBotoff, emoji ) },
footer : {
"text": "𝙊𝙛𝙚𝙧𝙚𝙘𝙞𝙢𝙚𝙣𝙩𝙤: 𝙎𝙪𝙘𝙪𝙗𝙪𝙨 𝘽𝙤𝙩"
},
nativeFlowMessage: {
buttons: botoeslist.map(botao => ( { name: "quick_reply", buttonParamsJson: JSON.stringify({ display_text: botao.display_text, id: botao.id })} )),
},messageParamsJson: "", },},{});
} else {
enviarImg2(fotomenu, menuadm( prefix, botName, donoName, Cargo, time, data, dispositivo, sender, pushname, from, isBotoff, emoji ))
}
}
break

case 'menujogos': case 'menu5': {
reagir(emoji)
await enviarAd2('./bot/audio/voz/menuJogos.wav');
if (isButton) {
botoeslist = [{ display_text: "💋 𝑺𝑼𝑪𝑪𝑼𝑩𝑼𝑺 𝑴𝑬𝑵𝑼 2", id: `${prefix}menu2` }, { display_text: "💋 𝐒𝐔𝐂𝐂𝐔𝐁𝐔𝐒 𝐀𝐃𝐌", id: `${prefix}menuadm` }, { display_text: "💋 𝐒𝐔𝐂𝐂𝐔𝐁𝐔𝐒 𝐀𝐃𝐔𝐋𝐓𝐎", id: `${prefix}menu18` }];
var fotin = await prepareWAMessageMedia({ image: {url: fotomenu} }, { upload: suc.waUploadToServer })
await await suc.relayMessage(
from,{ interactiveMessage: { header: {
title: "",
subtitle: '',
hasMediaAttachment: true,
imageMessage: fotin.imageMessage
},body: { text: menujogos( prefix, botName, donoName, Cargo, time, data, dispositivo, sender, pushname, from, isBotoff, emoji ) },
footer : {
"text": "𝙊𝙛𝙚𝙧𝙚𝙘𝙞𝙢𝙚𝙣𝙩𝙤: 𝙎𝙪𝙘𝙪𝙗𝙪𝙨 𝘽𝙤𝙩"
},
nativeFlowMessage: {
buttons: botoeslist.map(botao => ( { name: "quick_reply", buttonParamsJson: JSON.stringify({ display_text: botao.display_text, id: botao.id })} )),
},messageParamsJson: "", },},{});
} else {
enviarImg2(fotomenu, menujogos( prefix, botName, donoName, Cargo, time, data, dispositivo, sender, pushname, from, isBotoff, emoji ))
}
}
break

case 'menudono': case 'menu6': {
if (!isDono && !info.key.fromMe) return enviarAd2('./bot/audio/voz/cmdDono.wav');
reagir(emoji)
if (isButton) {
botoeslist = [{ display_text: "💋 𝑺𝑼𝑪𝑪𝑼𝑩𝑼𝑺 𝑴𝑬𝑵𝑼 2", id: `${prefix}menu2` }, { display_text: "💋 𝐒𝐔𝐂𝐂𝐔𝐁𝐔𝐒 𝐏𝐈𝐍𝐆", id: `${prefix}ping` }];
var fotin = await prepareWAMessageMedia({ image: {url: fotomenu} }, { upload: suc.waUploadToServer })
await await suc.relayMessage(
from,{ interactiveMessage: { header: {
title: "",
subtitle: '',
hasMediaAttachment: true,
imageMessage: fotin.imageMessage
},body: { text: menudono( prefix, botName, donoName, Cargo, time, data, dispositivo, sender, pushname, from, isBotoff, emoji ) },
footer : {
"text": "𝙊𝙛𝙚𝙧𝙚𝙘𝙞𝙢𝙚𝙣𝙩𝙤: 𝙎𝙪𝙘𝙪𝙗𝙪𝙨 𝘽𝙤𝙩"
},
nativeFlowMessage: {
buttons: botoeslist.map(botao => ( { name: "quick_reply", buttonParamsJson: JSON.stringify({ display_text: botao.display_text, id: botao.id })} )),
},messageParamsJson: "", },},{});
} else {
enviarImg2(fotomenu, menudono( prefix, botName, donoName, Cargo, time, data, dispositivo, sender, pushname, from, isBotoff, emoji ))
}
}
break

case 'criador':
if (isButton) {
await suc.sendMessage(from, {image: { url: './bot/imagem/criador.png' },caption: "Pedrozz Mods",buttons: [{buttonId: `${prefix}menu`, buttonText: { displayText: "Voltar" },type: 1,}],headerType: 1,viewOnce: true,})
} else {
enviarImg2('./bot/imagem/criador.png', criador( prefix, botName, donoName, Cargo, time, data, dispositivo, sender, pushname, from, isBotoff, emoji ))
}
break


//==>COMANDOS API<==\\
case 'play': {
if (!q) return enviarAd2('./bot/audio/voz/play.wav') 
await reagir("⌛")
const api2 = await fetchJson(`${BaseApiDark}/api/pesquisa/youtube?query=${encodeURIComponent(q)}&apikey=${DARK_APIKEY}`)
api = api2.resultado[0];
reagir("✅")
textoPlay = `*lıl.ılı.lıll「🎶 ${botName} 🎶」llı.ıllı.ılı*
                ↻     ⊲  Ⅱ  ⊳     ↺
             
*🔍⃟ 𝙴𝚗𝚌𝚘𝚗𝚝𝚛𝚊𝚍𝚘:* *_${api2.resultado.length}_* 
*📄⃟ 𝚃𝚒𝚝𝚞𝚕𝚘:* *_${api.title}_*
*🕑⃟ 𝙳𝚞𝚛𝚊𝚌𝚊𝚘:* _*${api.timestamp}*_
*📱⃟ 𝙲𝚊𝚗𝚊𝚕:* _*${api.author.name}*_
*🟢⃟ 𝙳𝚎𝚜𝚌𝚛𝚒𝚌𝚊𝚘:* _*${api.description}*_\n\n
*🎭⃟ 𝙲𝚛𝚒𝚊𝚍𝚘𝚛: ${donoName}*`
fotoPlay = `${BaseApiDark}/api/canva/musicCardPz?titulo=${api.title}&autor=${api.author.name}&tempo=${api.timestamp}&imagem=${api.image}&apikey=${DARK_APIKEY}`
if (isButton) {
var fotin = await prepareWAMessageMedia({ image: {url: fotoPlay } }, { upload: suc.waUploadToServer })
await await suc.relayMessage(
from,{ interactiveMessage: { header: {
title: "",
subtitle: '',
hasMediaAttachment: true,
imageMessage: fotin.imageMessage
},body: { text: textoPlay },
footer : {
"text": "𝙊𝙛𝙚𝙧𝙚𝙘𝙞𝙢𝙚𝙣𝙩𝙤: 𝙎𝙪𝙘𝙪𝙗𝙪𝙨 𝘽𝙤𝙩"
},
nativeFlowMessage: {
buttons: [
{
name: "quick_reply",
buttonParamsJson: JSON.stringify(
{
display_text: `🔊 Baixar Audio`,
id: `${prefix}playaudio ${api.url}`
}
),},
{
name: "quick_reply",
buttonParamsJson: JSON.stringify(
{
display_text: `🎥 Baixar Video`,
id: `${prefix}playvideo ${encodeURIComponent(q)}`
}
),},
{
name: "quick_reply",
buttonParamsJson: JSON.stringify(
{
display_text: `🔊 Adicionar Play`,
id: `${prefix}playadd ${api.url}|${api.title}|${api.timestamp}|${api.image}|${api.author.name}`
}
),}
]},messageParamsJson: "", },},{}).then((r) => console.log(r));
} else {
await suc.sendMessage(from, {audio: {url: `${BaseApiDark}/api/download/youtube-audio?url=${api.url}&apikey=${DARK_APIKEY}` }, mimetype: "audio/mpeg", 
headerType: 4, 
contextInfo: { 
externalAdReply: { 
title: "🎶 𝐒𝐔𝐂𝐂𝐔𝐁𝐔𝐒 𝐏𝐋𝐀𝐘 🎶", 
body: api.title, 
showAdAttribution: true, 
thumbnailUrl: api.image, 
mediaType: 1,
renderLargerThumbnail: true,
mediaUrl: api.url, 
sourceUrl: api.url}}}, 
{quoted: selo}).catch(e => {
consoleErro(e)
enviar("deu erro")
reagir("❌")
})
}
}
break

//==//
case 'playaudio':
if (!q) return enviar("Falta a url da música depois do comando...")
await enviar("Enviando áudio....")
await enviarAdPlay(`${BaseApiDark}/api/download/youtube-audio?url=${q}&apikey=${DARK_APIKEY}`)
break

case 'playvideo':
if (!q) return enviar("Falta a url da música depois do comando...")
await enviar("Enviando vídeo....")
await enviarVd(`${MoonApiUrl}/api/download/playvd?query=${q}&apikey=${MoonKey}`)
break

case 'playadd': {
var [linkAd, nomeAd, tempo, imagem, autor ] = q.split("|");
if (!linkAd || !nomeAd || !tempo || !imagem || !autor) return enviar("falta os parâmetros linkAd, nomeAd, tempo, imagem, autor")
const userData = carregarDadosUsuarios();
if (!userData[sender].playT) userData[sender].playT = [];
const audioExiste = userData[sender].playT.some(g => g.nomeAd === nomeAd || g.linkAd === linkAd);
if (audioExiste) return enviar(`O áudio *${nomeAd}* já foi adicionado.`);
const novoId = (userData[sender].playT.length + 1).toString();
userData[sender].playT.push({ id: novoId, linkAd, nomeAd, tempo, imagem, autor});
salvarUsuario(userData);
if (isButton) {
enviarButtonImg(from, `./bot/imagem/play.png`, `_*Sua música ${nomeAd} foi adicionada com sucesso no banco de dados 😁👍*_`, "💜 Ver Playlist", `${prefix}ver_playlist`)
} else {
enviar(`_*Sua música ${nomeAd} foi adicionada com sucesso no banco de dados 😁👍*_\nUse: ${prefi}tocar_playlist ${novoId}`)
}
}
break;

case 'tocar_playlist': {
const id = q.trim();
const userData = carregarDadosUsuarios();
const musica = userData[sender].playT.find(g => g.id === id);
if (!musica) return enviar(`Nenhuma música com ID *${id}* encontrada na sua playlist.`);
await enviar(`Tocando *${musica.nomeAd}*`);
await enviarAdPlay(`${BaseApiDark}/api/download/youtube-audio?url=${musica.linkAd}&apikey=${DARK_APIKEY}`)
}
break;

case 'ver_playlist': {
const userData = carregarDadosUsuarios();
const playlist = userData[sender].playT;
if (!playlist || playlist.length === 0) { return enviar("Sua playlist está vazia."); }

let resposta = "*Sua Playlist:*\n\n";
  let titulos = [];
  let autores = [];
  let tempos = [];
  let imagens = [];

  playlist.forEach(m => {
    resposta += `*ID:* ${m.id}\n*Nome:* ${m.nomeAd}\n*Link:* ${m.linkAd}\n\n`;
    titulos.push(encodeURIComponent(m.nomeAd || "Sem Título"));
    autores.push(encodeURIComponent(m.autor || "Desconhecido"));
    tempos.push(m.tempo || "0:00");
    imagens.push(encodeURIComponent(m.imagem || "https://files.catbox.moe/9rtdyx.png"));
  });

 url = `${BaseApiDark}/playlist?titulo_geral=${encodeURIComponent("Succubus Playlist")}&titulo=${titulos.join(',')}&autor=${autores.join(',')}&tempo=${tempos.join(',')}&imagem=${imagens.join(',')}&apikey=${DARK_APIKEY}`;

if (isButton) {
const fotin = await prepareWAMessageMedia( { image: { url: url } }, { upload: suc.waUploadToServer } );
const rows = playlist.map(m => ({ header: `🔊 Música ${m.id}`, title: m.nomeAd, description: "", id: `${prefix}tocar_playlist ${m.id}`}));
const msg = { interactiveMessage: { header: { title: "", subtitle: '', hasMediaAttachment: true, imageMessage: fotin.imageMessage }, body: { text: resposta.trim() }, footer: { text: "𝙊𝙛𝙚𝙧𝙚𝙘𝙞𝙢𝙚𝙣𝙩𝙤: 𝙎𝙪𝙘𝙪𝙗𝙪𝙨 𝘽𝙤𝙩" }, nativeFlowMessage: { buttons: [{ name: "single_select", buttonParamsJson: JSON.stringify({ title: `Ver playlist`, sections: [{ title: `Playlist de ${pushname}`, rows: rows }]})}],messageParamsJson: ""}}};
await suc.relayMessage(from, msg, {}).then(r => console.log(r));
} else {
enviarImg2(url, resposta.trim())
}
}
break;
//
case 'ff-perfil':
if (!q) return enviar("Falta o id do usuário para fazer a consulta...")
try {
const api = await fetchJson(`${BaseApiDark}/api/freefire/perfil?id=${q}&apikey=${DARK_APIKEY}`);
const textoFf = `📱 ID: ${api.resultado.id}
👤 Nick: ${api.resultado.nick}
🎖️ Level Completo: ${api.resultado.level_completo}
🎖️ Level: ${api.resultado.level}
⭐ Exp: ${api.resultado.exp}
❤️ Likes: ${api.resultado.likes}
📝 Bio: ${api.resultado.bio}
📆 Conta criada: ${api.resultado.conta_criada}
🕹️ Último login: ${api.resultado.ultimo_login}
🛠️ Versão do jogo: ${api.resultado.versão_do_jogo}
🎫 Passe Booyah: ${api.resultado.passe_booyah}
🌎 Região: ${api.resultado.regiao}
👥 Guilda: ${api.resultado.guilda}
👥 Nivel: ${api.resultado.nivel_guilda}
👥 Membros: ${api.resultado.membros_guilda}`.trim();
const imagemFf = `${BaseApiDark}/api/canva/cardFF?name=${encodeURIComponent(api.resultado.nick)}&banner=${api.resultado.banner}&profile=${api.resultado.avatar}&level=${api.resultado.level}`;
await suc.sendMessage(from, {image: {url: imagemFf}, caption:  textoFf}, {quoted: selo});
} catch (err) {
console.error(err);
enviar("Ocorreu um erro ao buscar os dados do jogador.");
}
break;

case 'ff-log':
if (!q) return enviar("Falta o id do usuário para fazer a consulta...")
try {
const api = await fetchJson(`${BaseApiDark}/api/freefire/perfil?id=${q}&apikey=${DARK_APIKEY}`);
const textoFf = `- *A Conta do usuário foi criada em ${api.resultado.conta_criada}. E teve seu ultimo login em ${api.resultado.ultimo_login}*`.trim();
await suc.sendMessage(from, {text: textoFf}, {quoted: selo});
} catch (err) {
console.error(err);
enviar("Ocorreu um erro ao buscar os dados do jogador.");
}
break;

case 'pinterest':
if (!q) return enviar("Cadê o tema da pesquisa");
reagir("⌛")
enviar(`*pesquisando: ${q}....*`)
try {
api = `${BaseApiDark}/api/pesquisa/pinterest?text=${q}&apikey=${DARK_APIKEY}`
if (isButton) {
var fotin = await prepareWAMessageMedia({ image: {url: api } }, { upload: suc.waUploadToServer })
await await suc.relayMessage(
from,{ interactiveMessage: { header: {
title: "",
subtitle: '',
hasMediaAttachment: true,
imageMessage: fotin.imageMessage
},body: { text: "*Não gostou?*\n*Tente novamente vai que a próxima você goste 😁*"},
footer : {
"text": "𝙊𝙛𝙚𝙧𝙚𝙘𝙞𝙢𝙚𝙣𝙩𝙤: 𝙎𝙪𝙘𝙪𝙗𝙪𝙨 𝘽𝙤𝙩"
},
nativeFlowMessage: {
buttons: [{name: "quick_reply",buttonParamsJson: JSON.stringify({display_text: "💜 Tentar Novamente",id: `${prefix}pinterest ${q}`}),}],
},messageParamsJson: "", },},{});
} else {
enviarImg(api)
}
reagir("✅")
} catch (e) {
enviar(msg.error)
console.log(e)
reagir("🔴")
}
break

case 'enviar':
enviar("log de mensagem")
break

case 'voz':
var fotin = await prepareWAMessageMedia({ image: {url: `https://pedrozz13755.github.io/Arquivos_web//uploads/1728760754972.jpg` } }, { upload: suc.waUploadToServer })
await await suc.relayMessage(
from,{ interactiveMessage: { header: {
title: "",
subtitle: '',
hasMediaAttachment: true,
imageMessage: fotin.imageMessage
},body: { text: "" },
footer : {
"text": "𝙊𝙛𝙚𝙧𝙚𝙘𝙞𝙢𝙚𝙣𝙩𝙤: 𝙎𝙪𝙘𝙪𝙗𝙪𝙨 𝘽𝙤𝙩"
},
nativeFlowMessage: {
buttons: [{
name: "single_select",
buttonParamsJson: JSON.stringify({
title: `Escolha Sua Voz`,
sections: [
{
title: "Masculino",
rows: [
//========\\
{
header: `Puck`,
title: "Voz Puck",
description: "",
id: `${prefix}gem ${q}/Puck`
},
{
header: `Charon`,
title: "Voz Charon",
description: "",
id: `${prefix}gem ${q}/Charon`
},
{
header: `Fenrir`,
title: "Voz Fenrir",
description: "",
id: `${prefix}gem ${q}/Fenrir`
},
{
header: `Orus`,
title: "Voz Orus",
description: "",
id: `${prefix}gem ${q}/Orus`
}
//============\\
],},
{
title: "Feminino",
rows: [
//========\\
{
header: `Kore`,
title: "Voz Kore",
description: "",
id: `${prefix}gem ${q}/Kore`
},
{
header: `Aoede`,
title: "Voz Aoede",
description: "",
id: `${prefix}gem ${q}/Aoede`
},
{
header: `Leda`,
title: "Voz Leda",
description: "",
id: `${prefix}gem ${q}/Leda`
},
{
header: `Zephyr`,
title: "Voz Zephyr",
description: "",
id: `${prefix}gem ${q}/Zephyr`
}
//============\\
],}

]})}]},messageParamsJson: "", },},{}).then((r) => console.log(r));
break

case "tts-gemini":
if(!q) return enviar(msg.query)
reagir('🔊');
{
//const [q1, q2] = q.split("/");
api = await fetchJson(`${BaseApiDark}/api/ai/audio/gemini?person=Zephyr&prompt=${q}&apikey=${DARK_APIKEY}`)
enviarAd(api.audio);
}
break

case 'enquete':
sendPoll(suc, from, "oi", ["Eu nunca", "Eu já"]).catch(console.error);
break
//==>INTELIGÊNCIA ARTIFICIAL<==\\
case 'imagine':
if (!q) return enviar("Cade o promot para a AI imaginar como ele seria??")
reagir("🤖")
if (isButton) {
enviarButtonImg(from, `${BaseApiDark}/api/ai/imagem/dalle?prompt=${q}&apikey=${DARK_APIKEY}`, "*Não gostou da imagem gerada?*\n*Tente gerar novamente talvez você goste da próxima 😁👍*", "💜 Gerar Novamente", `${prefix + comando} ${q}`)
} else {
enviarImg(`${BaseApiDark}/api/ai/imagem/dalle?prompt=${q}&apikey=${DARK_APIKEY}`)
}
break

case 'imagine2': {
if (!q) return enviar("Cade o promot para a AI imaginar como ele seria??")
reagir("🤖")
if (isButton) {
try {

const imagens = `${BaseApiDark}/api/ai/imagem/dalle?prompt=${q}&apikey=${DARK_APIKEY}`

if (imagens.length > 0) {
const imageMessages = [];
for (let i = 0; i < Math.min(5, imagens.length); i++) {
const imageBuffer = await getBuffer(imagens);
const preparedImage = await prepareWAMessageMedia({ image: imageBuffer }, { upload: suc.waUploadToServer });
imageMessages.push({
imageMessage: preparedImage.imageMessage,
url: imagens
});
}
await suc.relayMessage(from, {
viewOnceMessage: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 2
},
interactiveMessage: proto.Message.InteractiveMessage.create({
body: {},
footer: { text: botName },
carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
cards: imageMessages.map(({ imageMessage, url }) => ({
header: {
imageMessage: imageMessage,
hasMediaAttachment: true,
},
body: { text: `*Aqui está a sua imagem gerado por inteligência artificial no tema: ${q}*` },
nativeFlowMessage: {
buttons: [],
},
}))
})
})
}
}
}, { quoted: info });


} else {
enviar("Nenhuma imagem encontrada para a consulta fornecida.");

}
  } catch (error) {
    console.error(error);
    enviar("Ocorreu um erro ao buscar as imagens. Tente novamente mais tarde.");
  }
} else {
await enviarImg(`${BaseApiDark}/api/ai/imagem/dalle?prompt=${q}&apikey=${DARK_APIKEY}`)
await enviarImg(`${BaseApiDark}/api/ai/imagem/dalle?prompt=${q}&apikey=${DARK_APIKEY}`)
await enviarImg(`${BaseApiDark}/api/ai/imagem/dalle?prompt=${q}&apikey=${DARK_APIKEY}`)
await enviarImg(`${BaseApiDark}/api/ai/imagem/dalle?prompt=${q}&apikey=${DARK_APIKEY}`)
await enviarImg(`${BaseApiDark}/api/ai/imagem/dalle?prompt=${q}&apikey=${DARK_APIKEY}`)
}
}
break
case 'gemini':
if (!q) return enviar('digite oque você quer perguntar pro gemini.')
try{
api = await fetch(`${BaseApiDark}/api/gemini?texto=${q}&apikey=${DARK_APIKEY}`)
data2 = await api.json()
suc.sendMessage(from, {text: data2.resposta}, {quoted: selo})
} catch (e) {
console.log(e)
return enviar(msg.error)
}
break;

case 'gpt': case 'chatgpt':
if (!q) return enviar("cadê o texto depois do comando?")
try {
reagir(emoji)
api = await fetch(`${BaseApiDark}/api/gpt?apikey=${DARK_APIKEY}&texto=${q}`)
dati = await api.json()
suc.sendMessage(from, {text: dati.resultado}, {quoted: selo})
} catch (erro) {
reagir("❌")
console.log(erro)
enviar(msg.error)
}
break

case 'gpt2': case 'chatgpt2':
if (!q) return enviar("cadê o texto depois do comando?")
try {
reagir(emoji)
prompt = `A partir de agora, você é uma IA chamada "Sucubus Bot" uma menina vindo das rosas, é você é uma sucubo. Evite informações desnecessárias e concentre-se em fornecer explicações concisas e úteis.`
api = await fetch(`${BaseApiDark}/api/gptPrompt?apikey=${DARK_APIKEY}&texto=${q}&prompt=${prompt}`)
dati = await api.json()
suc.sendMessage(from, {text: dati.resposta}, {quoted: selo})
} catch (erro) {
reagir("❌")
console.log(erro)
enviar(msg.error)
}
break

case 'llama':
case 'llama2':
case 'sqlcode':
case 'mistral':
case 'deepseek':
case 'deepseek-code':
if (!q) return enviar("cadê o texto depois do comando?")
try {
reagir(emoji)
api = await fetch(`${BaseApiDark}/api/ai/texto/${comando}?query=${q}&apikey=${DARK_APIKEY}`)
dati = await api.json()
suc.sendMessage(from, {text: dati.resultado.resposta}, {quoted: selo})
} catch (erro) {
reagir("❌")
console.log(erro)
enviar(msg.error)
}
break

case 'dalle':
case 'dallev2':
case 'imagine-ia':
if (!q) return enviar("Me infome o prompt para a geração da imagem...")
if (comando === "imagine-ia") {
try {
reagir("🤖")
api = await fetchJson(`${BaseApiDark}/api/ai/imagem/imagine?prompt=${q}&apikey=${DARK_APIKEY}`)
await enviar('*_Gerando imagem usando inteligência artificial_*')
enviarImg2(api.resultado.imagemUrl, api.resultado.info)
} catch (e) {
reagir("🔴");
console.log(e)
enviar(msg.error);
}
} else {
try {
reagir("🤖")
await enviar('*_Gerando imagem usando inteligência artificial_*')
await enviarImg(`${BaseApiDark}/api/ai/imagem/${comando}?prompt=${q}&apikey=${DARK_APIKEY}`)
} catch (e) {
reagir("🔴");
console.log(e)
enviar(msg.error);
}
}
break

//★・・・・・・★・・ COMANDOS +18・・・★・・・・・★
case 'plaquinha': case 'plaquinha2': case 'plaquinha3': case 'plaquinha4': case 'plaquinha5': case 'plaquinha6': case 'plaquinha7': case 'plaquinha8': case 'plaquinha9': case 'plaquinha10': case 'plaquinha11': case 'plaquinha12': case 'plaquinha13': case 'plaquinha14': case 'plaquinha15': case 'plaquinha16':
if (!isAdulto) return enviar(msg.adultos)
if (!q) return enviar('Cade o seu nick?')
reagir('😈')
suc.sendMessage(from, {image: {url: `${BaseApiDark}/api/${cmd}?texto=${q}&apikey=${DARK_APIKEY}`}, caption: 'Sua plaquinha está pronta 😈'}, {quoted: selo})
break

case 'onlyimg':
if (!isAdulto) return enviar(msg.adultos)
reagir('😈')
await enviar(`Foi enviado para seu PV 😈`)
enviarButtonImg(sender, `${BaseApiDark}/api/only?apikey=${DARK_APIKEY}`, "Aqui sua imagem +18 seu safadinho 😈", "😈 Tentar Novamente", `${prefix + comando}`)
break

case 'foto18':
if (!isAdulto) return enviar(msg.adultos)
reagir('😈')
await enviar(`Foi enviado para seu PV 😈`)
enviarButtonImg(sender, `${BaseApiDark}/api/foto18?apikey=${DARK_APIKEY}`, "Aqui sua imagem +18 seu safadinho 😈", "😈 Tentar Novamente", `${prefix + comando}`)
break

case 'video18':
if (!isAdulto) return enviar(msg.adultos)
reagir('😈')
await enviar(`Foi enviado para seu PV 😈`)
api = await fetchJson(`${BaseApiDark}/api/video18?apikey=${DARK_APIKEY}`)
suc.sendMessage(sender, {video: {url: api.resultado}, mimetype: "video/mp4", fileName: "x.mp4"}, {quoted: selo})
break

case 'hentai':
if (!isAdulto) return enviar(msg.adultos)
reagir('😈')
await enviar(`Foi enviado para seu PV 😈`)
enviarButtonImg(sender, `${BaseApiDark}/api/hentai-random?apikey=${DARK_APIKEY}`, "Aqui sua imagem +18 seu safadinho 😈", "😈 Tentar Novamente", `${prefix + comando}`)
break

case 'trap': case 'wifu': case 'blowjob': case 'neko':
if (!isAdulto) return enviar(msg.adultos)
reagir("😈")
await enviar(`Foi enviado para seu PV 😈`)
enviarButtonImg(sender, `${BaseApiDark}/api/1o8/${comando}?apikey=${DARK_APIKEY}`, "Aqui sua imagem +18 seu safadinho 😈", "😈 Tentar Novamente", `${prefix + comando}`)
break

case 'hanal': case 'anal': case 'pussy': case 'hentai': case 'thigh': case 'boobs': case 'ass': case 'kanna': case '4k': case 'hthigh': case 'tentacle': case 'hboobs': case 'holo': case 'hass': case 'pgif': case 'yaoi': case 'hneko': case 'hkitsune': case 'kemonomimi':
if (!isAdulto) return enviar(msg.adultos)
reagir("😈")
await enviar(`Foi enviado para seu PV 😈`)
enviarButtonImg(sender, `${BaseApiDark}/api/18/${comando}?apikey=${DARK_APIKEY}`, "Aqui sua imagem +18 seu safadinho 😈", "😈 Tentar Novamente", `${prefix + comando}`)
break

case 'hanalvizu': case 'analvizu': case 'pussyvizu': case 'hentaivizu': case 'thighvizu': case 'boobsvizu': case 'assvizu': case 'kannavizu': case '4kvizu': case 'hthighvizu': case 'tentaclevizu': case 'hboobsvizu': case 'holovizu': case 'hassvizu': case 'pgifvizu': case 'yaoivizu': case 'hnekovizu': case 'hkitsunevizu': case 'kemonomimivizu':
if (!isAdulto) return enviar(msg.adultos)
reagir("😈")
hentai2 = comando.replace("vizu", "");
suc.sendMessage(from, {image: {url: `${BaseApiDark}/api/18/${hentai2}?apikey=${DARK_APIKEY}`}, viewOnce: true, caption: "Aqui o sua imagem de ótima qualidade 😈"}, {quoted: info});
break

//==>JOGOS<==\\
case 'gay':
case 'lindo':
case 'feio':
case 'lesbico':
case 'lesbica':
case 'gostosa':
case 'gostoso':
case 'podre':
case 'atraente':
case 'fiel':
case 'gado':
case 'gada': {
if (!isJogos) return enviar(msg.jogos)
let randinM
menc = q.replace("@", "")
if (sender === dono) { randinM = "100"; } else if (menc === "556199317165") { randinM = "0"} else { randinM = randinM = Math.floor(1 + Math.random() * 100).toString(); }
reagir("🧐")
if (q) {
let { key } = await suc.sendMessage(from, {text: `*Aguarde em quanto eu verifico sua porcentagem de ${comando}...*`},{quoted: selo})
await esperar(2000)
await suc.sendMessage(from, {text: `A porcentagem de ${comando} do usuário @${menc} é de ${randinM}%`, mentions: [menc + "@s.whatsapp.net"], edit: key },{quoted: selo});
} else {
let { key } = await suc.sendMessage(from, {text: `*Aguarde em quanto eu verifico sua porcentagem de ${comando}...*`},{quoted: selo})
await esperar(2000)
await suc.sendMessage(from, {text: `Sua porcentagem de ${comando} é de ${randinM}%`, edit: key },{quoted: selo});
}
}
break
//==>FIGURINHAS<===\\
case 'st':
case 'stk':
case 'sticker':
case 's':
var RSM = info.message?.extendedTextMessage?.contextInfo?.quotedMessage
var boij2 = RSM?.imageMessage || info.message?.imageMessage || RSM?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessage?.message?.imageMessage || RSM?.viewOnceMessage?.message?.imageMessage
var boij = RSM?.videoMessage || info.message?.videoMessage || RSM?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessage?.message?.videoMessage || RSM?.viewOnceMessage?.message?.videoMessage
let packin;
let author23;
if (`${sender.split("@")[0]}` === donoNumero) {
packin =  q ? q?.split("/")[0] : botName
author23 = q ? q?.split("/")[1] : q?.split("/")[0] ? '' : `♥️ ${donoName}`
} else {
packin =  q ? q?.split("/")[0] : `🧸 ⃟𝙱𝚘𝚝: ${botName}\n🤖⃟ 𝙽𝚞𝚖𝚎𝚛𝚘 𝚋𝚘𝚝: ${numeroBot.split('@')[0]}`
author23 = q ? q?.split("/")[1] : q?.split("/")[0] ? '' : `\n\n👤⃟𝙿𝚎𝚍𝚒𝚍𝚘 𝚙𝚘𝚛: ${pushname}\n👑⃟𝙲𝚛𝚒𝚊𝚍𝚘𝚛: 𝙿𝚎𝚍𝚛𝚘𝚣𝚣 𝙼𝚘𝚍𝚜`
}
if(boij2){
reagir('💭')
enviar('- *Criando sua Sticker...*')
owgi = await getFileBuffer(boij2, 'image')
let encmediaa = await sendImageAsSticker2(suc, from, owgi, info, { packname:packin, author:author23})
await DLT_FL(encmediaa)
} else if(boij && boij.seconds < 11){
owgi = await getFileBuffer(boij, 'video')
let encmedia = await sendVideoAsSticker2(suc, from, owgi, info, { packname:packin, author:author23})
await DLT_FL(encmedia)
reagir(emoji)
} else {
return enviar(`Marque uma foto ou o vídeo para fazer sua figurinha com o comando: ${prefix+comando}`)
}
break

//==>ADMINISTRAÇÃO<==\\
case 'ban': case 'kick':
if(!isBotGroupAdmins) return enviarAd2('./bot/audio/voz/botAdm.wav')
if(!isGroupAdmins && !isDono) return enviarAd2('./bot/audio/voz/cmdAdm.wav')
try {
  if(!menc_os2 || menc_jid2[1]) return enviar("*Encante corretamente... marque apenas uma alma que deseja banir, meu bem.*")
  if(!JSON.stringify(groupMembers).includes(menc_os2)) return enviar("*Essa alma não vagueia mais por este covil...*")
  if(numeroBot.includes(menc_os2)) return enviar("*Ah, não tente me banir, docinho... eu sou a essência desse lugar.*")
  if(donoNumero.includes(menc_os2)) return enviar("*Ousado(a)... tentar banir minha mestra? Que atrevimento delicioso, mas proibido.*")
  await suc.groupParticipantsUpdate(from, [menc_os2], "remove")
  await enviarAd2('./bot/audio/voz/ban.wav')
} catch (e) {
  console.log(e)
}
break

case 'grupo':
if (!isGroup) return enviarAd2('./bot/audio/voz/gp.wav')
if (!isBotGroupAdmins) return enviarAd2('./bot/audio/voz/botAdm.wav')
if (!isGroupAdmins && !isDono) return enviarAd2('./bot/audio/voz/cmdAdm.wav')
try {
  if (q === "a"){
    await reagir("🔓")
    await suc.groupSettingUpdate(from, "not_announcement")
    enviar(`*Portais abertos... todos podem sussurrar seus desejos aqui.*`)
  }
  if (q === "f") {
    await reagir("🔒")
    await suc.groupSettingUpdate(from, "announcement")
    enviar(`*Silêncio mortal... apenas os escolhidos falam agora.*`)
  } else {
    enviar(`*Para abrir o covil: ${prefix + comando} a\nPara fechar as portas: ${prefix + comando} f*`)
  }
} catch(e) {
  reagir("⚠️")
  consoleErro(e)
  enviar(msg.error)
}
break

case 'resetlink': {
if (!isGroup) return enviarAd2('./bot/audio/voz/gp.wav')
if (!isBotGroupAdmins) return enviarAd2('./bot/audio/voz/botAdm.wav')
if (!isGroupAdmins && !isDono) return enviarAd2('./bot/audio/voz/cmdAdm.wav')
try {
  await suc.groupRevokeInvite(from)
  enviar(`*O portal secreto foi selado e um novo será aberto em breve...*`)
} catch(e) {
  console.log(e)
  enviar(`*Hmm... algo perturbou o feitiço. Tente novamente, doce alma.*`)
}
}
break

case 'nomegp':
if (!isGroup) return enviarAd2('./bot/audio/voz/gp.wav');
if (!isGroupAdmins && !isDono) return enviarAd2('./bot/audio/voz/cmdAdm.wav')
if (!isBotGroupAdmins) return enviarAd2('./bot/audio/voz/botAdm.wav')
if (!q) return enviar(msg.query)
await suc.groupUpdateSubject(from, `${q}`)
await suc.sendMessage(from, {text: '*O nome do nosso covil foi rebatizado com charme e poder.*'})
break

case 'deletar': case 'del': case 'd': case 'apagar': case 'delet':
if(!isGroupAdmins && !isDono) return enviarAd2('./bot/audio/voz/cmdAdm.wav')
if(!menc_prt) return enviar("*Preciso que aponte qual mensagem deseja apagar, meu bem...*")
await suc.sendMessage(from, {
  delete: {
    remoteJid: from,
    fromMe: false,
    id: info.message.extendedTextMessage.contextInfo.stanzaId,
    participant: menc_prt
  }
})
reagir("🗑")
break

case 'antilink':
if(!isGroup) return enviarAd2('./bot/audio/voz/gp.wav')
if(!isGroupAdmins) return enviarAd2('./bot/audio/voz/cmdAdm.wav')
if(!isBotGroupAdmins) return enviarAd2('./bot/audio/voz/botAdm.wav')
if(q.length < 1) return enviar(`${prefix + cmd} 1 para ativar, 0 para desativar.`)
if(Number(q[0]) === 1) {
if(isAntiLink) return enviar('Isso já ta ativo iruminha')
ArquivosDosGrupos[0].antilink = true
ModificaGrupo(ArquivosDosGrupos)
enviar('*_A função de antilink foi ativada com sucesso nesse grupo 😋_*.')
} else if(Number(q[0]) === 0) {
if(!isAntiLink) return enviar('Isso já ta off 😪')
ArquivosDosGrupos[0].antilink = false
ModificaGrupo(ArquivosDosGrupos)
enviar('*_A função de antilink foi desativada com sucesso nesse grupo 😋_*')
} else {
enviar(`${prefix + cmd} 1 para ativar, 0 para desativar.`)
}
break

case 'modoadulto':
if(!isGroup) return enviarAd2('./bot/audio/voz/gp.wav')
if(!isGroupAdmins) return enviarAd2('./bot/audio/voz/cmdAdm.wav')
if(!isBotGroupAdmins) return enviarAd2('./bot/audio/voz/botAdm.wav')
if(q.length < 1) return enviar(`${prefix + cmd} 1 para ativar, 0 para desativar.`)
if(Number(q[0]) === 1) {
if(isAdulto) return enviar('Isso já está online ✅')
ArquivosDosGrupos[0].adultos = true
ModificaGrupo(ArquivosDosGrupos)
enviar('*_O modo adulto foi ativado com sucesso nesse grupo 😋_*.')
} else if(Number(q[0]) === 0) {
if(!isAdulto) return enviar('Isso já ta offline 😪')
ArquivosDosGrupos[0].adultos = false
ModificaGrupo(ArquivosDosGrupos)
enviar('*_O modo adulto foi desativado com sucesso nesse grupo 😋_*')
} else {
enviar(`${prefix + cmd} 1 para ativar, 0 para desativar.`)
}
break

case 'modojogos':
if(!isGroup) return enviarAd2('./bot/audio/voz/gp.wav')
if(!isGroupAdmins) return enviarAd2('./bot/audio/voz/cmdAdm.wav')
if(!isBotGroupAdmins) return enviarAd2('./bot/audio/voz/botAdm.wav') 
if(q.length < 1) return enviar(`${prefix + cmd} 1 para ativar, 0 para desativar.`)
if(Number(q[0]) === 1) {
if(isJogos) return enviar('Isso já ta ativo no grupo ✅')
ArquivosDosGrupos[0].joguinhos = true
ModificaGrupo(ArquivosDosGrupos)
enviar('*_O modo jogos foi ativado com sucesso nesse grupo 😋_*.')
} else if(Number(q[0]) === 0) {
if(!isJogos) return enviar('Isso já ta offline 😪')
ArquivosDosGrupos[0].joguinhos = false
ModificaGrupo(ArquivosDosGrupos)
enviar('*_O modo jogos foi desativado com sucesso nesse grupo 😋_*')
} else {
enviar(`${prefix + cmd} 1 para ativar, 0 para desativar.`)
}
break

//==>DONO<==\\
case 'fotomenu':
if (!isDono && !info.key.fromMe) return enviarAd2('./bot/audio/voz/cmdDono.wav');
try {
if (isQuotedImage) {
boij = isQuotedImage || isQuotedImage ? JSON.parse(JSON.stringify(info).replace("quotedM", "m")).message.extendedTextMessage.contextInfo.message.imageMessage : info;
fileBuffer = await getFileBuffer(boij, 'image');
reagir("✅")
fs.writeFileSync("./bot/imagem/menu.png", fileBuffer);
await esperar(1000)
enviar("*Foto do menu trocada com sucesso 🌷*")
} else {enviar("Marque uma imagem por primeiro")}
} catch (e) {
console.log(e)
enviar("Deu erro ao trocar a foto do menu")
}
break

case 'modobutton':
if (!isDono && !info.key.fromMe) return enviarAd2('./bot/audio/voz/cmdDono.wav');
if (!q) return enviar(`exemplo *${prefix+comando} ativo/desativado*`)
let bt;
if (q === 'ativo') { bt = true; } else if (q === "desativado") { bt = false; }
config.isButton = bt
fs.writeFileSync('./dono/config.json', JSON.stringify(config, null, '\t'))
suc.sendMessage(from,{text: `O modo do botão foi alterado com sucesso para: ${q}\n> Reiniciando para salvar alterações`}, {quoted: selo})
await esperar(1000)
setTimeout(() => { process.exit(0) }, 1000);
break

case 'newprefixo':
if (!isDono && !info.key.fromMe) return enviarAd2('./bot/audio/voz/cmdDono.wav');
if (!q) return enviar(`exemplo *${prefix+comando} <new>*`)
if (args.length < 1) return
config.prefix = q
fs.writeFileSync('./dono/config.json', JSON.stringify(config, null, '\t'))
suc.sendMessage(from,{text: `O prefixo do bot foi alterado com sucesso para: ${q}\n> Reiniciando para salvar alterações`}, {quoted: selo})
await esperar(1000)
setTimeout(() => { process.exit(0) }, 1000);
break

case 'newnamebot':
if (!isDono && !info.key.fromMe) return enviarAd2('./bot/audio/voz/cmdDono.wav');
if (!q) return enviar(`exemplo *${prefix+comando} <new>*`)
if (args.length < 1) return
config.botName = q
fs.writeFileSync('./dono/config.json', JSON.stringify(config, null, '\t'))
suc.sendMessage(from,{text: `O Nome do bot foi alterado com sucesso para: ${q}\n> Reiniciando para salvar alterações`}, {quoted: selo})
await esperar(1000)

setTimeout(() => { process.exit(0) }, 1000);
break

case 'newemoji':
if (!isDono && !info.key.fromMe) return enviarAd2('./bot/audio/voz/cmdDono.wav');
if (!q) return enviar(`exemplo *${prefix+comando} <new>*`)
if (args.length < 1) return
config.emoji = q
fs.writeFileSync('./dono/config.json', JSON.stringify(config, null, '\t'))
suc.sendMessage(from,{text: `O Emoji do bot foi alterado com sucesso para: ${q}\n> Reiniciando para salvar alterações`}, {quoted: selo})
await esperar(1000)

setTimeout(() => { process.exit(0) }, 1000);
break

case 'newapikey_moon':
if (!isDono && !info.key.fromMe) return enviarAd2('./bot/audio/voz/cmdDono.wav');
if (!q) return enviar(`exemplo *${prefix+comando} <new>*`)
if (args.length < 1) return
config.MoonKey = q
fs.writeFileSync('./dono/config.json', JSON.stringify(config, null, '\t'))
suc.sendMessage(from,{text: `A apikey do bot foi alterado com sucesso para: ${q}\n> Reiniciando para salvar alterações`}, {quoted: selo})
await esperar(1000)

setTimeout(() => { process.exit(0) }, 1000);
break

case 'newdononumero':
if (!isDono && !info.key.fromMe) return enviarAd2('./bot/audio/voz/cmdDono.wav');
if (!q) return enviar(`exemplo *${prefix+comando} <new>*`)
if (args.length < 1) return
config.donoNumero = q
fs.writeFileSync('./dono/config.json', JSON.stringify(config, null, '\t'))
suc.sendMessage(from,{text: `O Número do dono foi alterado com sucesso para: ${q}\n> Reiniciando para salvar alterações`}, {quoted: selo})
await esperar(1000)

setTimeout(() => { process.exit(0) }, 1000);
break

case 'ping':
enviar("*_Enviando ping do bot...._*")
pingImg = fotomenu
pingTexto = `╭━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╮
┝⊰ ➪ 𝐒𝐔𝐂𝐂𝐔𝐁𝐔𝐒 𝐏𝐈𝐍𝐆
╰━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╯
┃┝.ᨘ۫.ꪶ${emoji} ۪→ Bot: ${botName}
┃┝.ᨘ۫.ꪶ${emoji} ۪→ Dono: ${donoName}
┃┝.ᨘ۫.ꪶ${emoji} ۪→ Versão: ${botVersion}
┃┝.ᨘ۫.ꪶ${emoji} ۪→ Tempo online: ${uptimeFormatted}
┃┝.ᨘ۫.ꪶ${emoji} ۪→ Latência: ${latencia.toFixed(4)}
┃┝.ᨘ۫.ꪶ${emoji} ۪→ RAM disponível: ${bytesToSize(os.totalmem())}
┃┝.ᨘ۫.ꪶ${emoji} ۪→ RAM utilizada: ${bytesToSize(os.totalmem() - os.freemem())}
┃┝.ᨘ۫.ꪶ${emoji} ۪→ Cpu: ${os.arch()}
┃┝.ᨘ۫. ۪→ 𝐍𝐎𝐃𝐄 𝐉𝐒:
${Object.keys(used).map((key, _, arr) => `┃┝.ᨘ۫.ꪶ${emoji} ۪→ ${key.padEnd(Math.max(...arr.map(v => v.length)), ' ')}: ${bytesToSize(used[key])}`).join('\n')}
┃╰━━━─────━━━╯
╰━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╯`
enviarButtonImg(from, pingImg, pingTexto, "💜 𝐒𝐔𝐂𝐂𝐔𝐁𝐔𝐒 𝐌𝐄𝐍𝐔 ", `${prefix}menucompleto`)
break

//===>OUTROS<===\\
case 'responda':
enviar("teste.....")
break

case 'rch': { ///BY FROST MODZ DOMINAA 
if (!q) {
return reply(`Preciso de um link e uma mensagem\nExemplo:\n${prefix}rch <link do canal> <mensagem> | <número da fonte>\n\nExemplo:\n${prefix}rch https://whatsapp.com/channel/abc123 Frost | 2`);
}
if (!q.startsWith("https://whatsapp.com/channel/")) {
return reply("Link inválido!");
}

const [texto, fonteEscolhida = '1'] = args.slice(1).join(' ').split('|').map(a => a.trim().toLowerCase());

const fontes = {
'1': {
a: '🅐', b: '🅑', c: '🅒', d: '🅓', e: '🅔', f: '🅕', g: '🅖',
h: '🅗', i: '🅘', j: '🅙', k: '🅚', l: '🅛', m: '🅜', n: '🅝',
o: '🅞', p: '🅟', q: '🅠', r: '🅡', s: '🅢', t: '🅣', u: '🅤',
v: '🅥', w: '🅦', x: '🅧', y: '🅨', z: '🅩',
'0': '⓿', '1': '➊', '2': '➋', '3': '➌', '4': '➍',
'5': '➎', '6': '➏', '7': '➐', '8': '➑', '9': '➒'
},
'2': { 
a: '🇦', b: '🇧', c: '🇨', d: '🇩', e: '🇪', f: '🇫', g: '🇬',
h: '🇭', i: '🇮', j: '🇯', k: '🇰', l: '🇱', m: '🇲', n: '🇳',
o: '🇴', p: '🇵', q: '🇶', r: '🇷', s: '🇸', t: '🇹', u: '🇺',
v: '🇻', w: '🇼', x: '🇽', y: '🇾', z: '🇿'
}
};

const estilo = fontes[fonteEscolhida] || fontes['1']; 

const emoji = texto.split('').map(c => {
if (c === ' ') return '―';
const char = estilo[c];
return char ? (fonteEscolhida === '2' ? char + '\u200B' : char) : c;
}).join('');

try {
const link = args[0];
const channelId = link.split('/')[4];
const messageId = link.split('/')[5];
const res = await suc.newsletterMetadata("invite", channelId);
await suc.newsletterReactMessage(res.id, messageId, emoji);
return reply(`Enviou reação *${emoji}* para a mensagem no canal *${res.name}.*`);
} catch (e) {
console.error(e);
return reply("Falha ao enviar reação. Verifique o link e a mensagem");
}
}
break;

case 'canal':{
const link = args[0];
const channelId = link.split('/')[4];
const res = await suc.newsletterMetadata("invite", channelId);
let recf;
if (res.reaction_codes === "BASIC") { recf = "👍❤️😂😢🙏"; } else { recf = "Qualquer reação"; }
enviar(`nome: ${res.name}
id: ${res.id}
Seguidores: ${res.subscribers}
reações Permitidas: ${recf}
link: ${q}
Descrição: ${res.description}`)
//suc.sendMessage(res.id, {text: "Mensagem enviada pelo bot para esse canal"})
}
break

case 'lista':
var fotin = await prepareWAMessageMedia({ image: {url: `https://pedrozz13755.github.io/Arquivos_web//uploads/1728760754972.jpg` } }, { upload: suc.waUploadToServer })
catd = "catvoice"
await await suc.relayMessage(
from,{ interactiveMessage: { header: {
title: "",
subtitle: '',
hasMediaAttachment: true,
imageMessage: fotin.imageMessage
},body: { text: "" },
footer : {
"text": "𝙊𝙛𝙚𝙧𝙚𝙘𝙞𝙢𝙚𝙣𝙩𝙤: 𝙎𝙪𝙘𝙪𝙗𝙪𝙨 𝘽𝙤𝙩"
},
nativeFlowMessage: {
buttons: [{
name: "single_select",
buttonParamsJson: JSON.stringify({
title: `opcoes`,
sections: [
{
title: "1",
rows: [
//========\\
{
header: `nome`,
title: "botão",
description: "",
id: `d`
}
//============\\
],},
{
title: "2",
rows: [
//========\\
{
header: `nome`,
title: "botão",
description: "",
id: `d`
}
//============\\
],}

]})}]},messageParamsJson: "", },},{}).then((r) => console.log(r));
break

case 'button':
enviarTextButton(from, "Título", "𝙊𝙛𝙚𝙧𝙚𝙘𝙞𝙢𝙚𝙣𝙩𝙤: 𝙎𝙪𝙘𝙪𝙗𝙪𝙨 𝘽𝙤𝙩", comando, 'titulo button' ).then((data) => {console.log(''); }).catch((erro) => {console.error("Erro:", erro);}) //verifica erro na case sem precisa ficar usando try e catch...
break

case 'bt':
await suc.relayMessage(from,{interactiveMessage: {body: { text: `_*${pushname} acho que você errou o comando, use ${prefix}menu é tente novamente*_`, footer: { "text": "𝙊𝙛𝙚𝙧𝙚𝙘𝙞𝙢𝙚𝙣𝙩𝙤: 𝙎𝙪𝙘𝙪𝙗𝙪𝙨 𝘽𝙤𝙩" }, },nativeFlowMessage: {buttons: [{name: "quick_reply",buttonParamsJson: JSON.stringify({display_text: "Menu 💜",id: `${prefix}menu`}),}],messageParamsJson: "",},},},{})
break

case 'nome':
case 'nome2':
case 'cpf':
case 'titulo_eleitor':
case 'nome_mae':{
if (!q) return enviar("Cade o dado a ser examinado?")
reagir("👩‍💻")
await enviar("> by: Dark Stars Api\n- *Fazendo a sua consulta....*")
api = await fetchJson(`${BaseApiDark}/api/consulta/${comando}?query=${q}&apikey=${DARK_APIKEY}`);
nome = api.resultado
if (isButton) {
var fotin = await prepareWAMessageMedia({ image: {url: "https://files.catbox.moe/kqambu.jpg" } }, { upload: suc.waUploadToServer }); 
await await suc.relayMessage(from,{ interactiveMessage: { header: { title: "", subtitle: '', hasMediaAttachment: true, imageMessage: fotin.imageMessage },body: { text: nome}, footer : { "text": "𝙊𝙛𝙚𝙧𝙚𝙘𝙞𝙢𝙚𝙣𝙩𝙤: 𝙎𝙪𝙘𝙪𝙗𝙪𝙨 𝘽𝙤𝙩" }, nativeFlowMessage: { buttons: [{ "name": "cta_copy", "buttonParamsJson": `{\"display_text\":\"Copiar Dados\",\"id\":\"${nome}\",\"copy_code\":\"${nome}\"}`}]},messageParamsJson: "", },},{});
} else {
suc.sendMessage(from, {image: {url: "https://files.catbox.moe/kqambu.jpg"}, caption: nome}, {quoted: selo})
}
}
break

//===========\\
default:
if (isCmd) {
reagir("🔴")
await enviarAd2('./bot/audio/voz/cmdErrado.wav');
enviarButtonImg(from, fotomenu, `${pushname} acho que você errou o comando, use ${prefix}menu é tente novamente ou aperte o botão abaixo ▼`, "💜 Menu", `${prefix}menu`)
}
}
//==========IFS==========\\
if (body.includes("bom dia")) {
reagir("🌅")
enviarAd2('./bot/audio/voz/bomDia.wav')
}

if (body.includes("boa tarde")) {
reagir('🌄')
enviarAd2('./bot/audio/voz/boaTarde.wav')
}

if (body.includes("boa noite")) {
reagir("🌃")
enviarAd2('./bot/audio/voz/boaNoite.wav')
}

//==========FIM IFS======\\
} catch (err) {
console.log(err)
}
})

//=====LOGS CONEXÃO=======\\
suc.ev.on('connection.update', (update) => {
const { connection, lastDisconnect } = update;
if (connection === 'open') {//CONEXÃO ABERTA
consoleAzul2("[ CONECTADO ]", "- Conexão estabelecida...")
consoleOnline("- Bot conectado com sucesso ✅")
} else if (connection === "connecting") {//TENTANDO CONECTAR
console.log(``)
consoleAzul2("[ CONEXÃO ]", "- Estabelecendo conexão com o whatsapp...")
} else if (connection === 'close') {//CONEXÃO FECHADA
const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
if (shouldReconnect) {
consoleAzul2('[ LOG ]', '- Tentando reconectar...');
ligarbot();
} else {
consoleErro('Desconectado. Finalizando...');
}}
})
}
ligarbot()

//=======ATUALIZAÇÃO========\\
fs.watchFile('./index.js', (curr, prev) => {
if (curr.mtime.getTime() !== prev.mtime.getTime()) {
console.log('A index foi editada, irei reiniciar...');
process.exit()
}
})
/*
PEDROZZ MODS FEZ ESSA BUDEGA AQUI, SE FOR REPOSTA PELO MENOS DEIXA UNS CRÉDITOS AI PARA YO QUE NOIS AGRADECE 😁👍
*/