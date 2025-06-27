/*
PEDROZZ MODS FEZ ESSA BUDEGA AQUI, SE FOR REPOSTA PELO MENOS DEIXA UNS CRÉDITOS AI PARA YO QUE NOIS AGRADECE 😁👍
*/
//============( CONSTS NESCESSÁRIAS )===========\\
const fs = require('fs')
const chalk = require('chalk')
const moment = require('moment-timezone');
const axios = require('axios');
const fetch = require('node-fetch');
const os = require('os');
const lolcatjs = require('lolcatjs')
const { exec, spawn, execSync } = require('child_process');
const botVersion = "1.0.0"

//============( MENSAGENS RAPIDAS )===========\\
const msg = {
  espere: "*Hmm... espere só um pouquinho, doce mortal... Estou preparando o que você pediu.*",
  dono: "*Ah, ah... esse feitiço só pode ser invocado pelo meu mestre... não se atreva!*",
  grupo: "*Esse encantamento só funciona quando há mais almas reunidas... Use em um grupo, querido.*",
  vip: "*Apenas os escolhidos com o toque especial do prazer Premium podem desfrutar disso...*",
  query: "*Você esqueceu de algo, docinho... tente com mais vontade.*",
  privado: "*Shh... esse sussurro é só entre nós, no privado... vem mais perto.*",
  adm: "*Somente os dominantes deste reino — os administradores — podem conjurar esse poder.*",
  error: "*Oh, algo saiu errado... meus feitiços às vezes têm vontade própria. Tente outra vez, meu bem.*",
  botadm: "*Preciso de mais poder... torne-me administradora e sinta minha verdadeira força.*",
  adultos: "*Tsc tsc... esses desejos proibidos não podem ser saciados aqui. Seja paciente, ou procure outro covil.*",
  jogos: "*Os jogos do prazer estão adormecidos... fale com um guardião para despertá-los.*"
}

//============( MENSAGENS DA API )===========\\
const msgApi = {
erro: "Desculpe, ocorreu um erro ao processar sua solicitação.",
paraQ: "Parece que falta um parâmetro obrigatório na sua solicitação.",
esperar: "Aguarde um momento enquanto processamos sua solicitação..."
}

//============( DATA E HORA )===========\\
const data = moment.tz('America/Sao_Paulo').format('DD/MM/YYYY');
const hora = moment.tz('America/Sao_Paulo').format('HH:mm:ss');

//============( MENSAGEM DE HORA )===========\\
if(hora > "00:00:00"){
var timed = 'Boa Madrugada 🌆' 
} 
if(hora > "05:30:00"){
var timed = 'Bom Dia 🏙️' 
}
if(hora > "12:00:00"){
var timed = 'Boa Tarde 🌇' 
}
if(hora > "19:00:00"){
var timed = 'Boa Noite 🌃' 
}           

//============( CONSOLES )===========\\
//VERDE
const consoleVerde = (texto) => {console.log(chalk.green(texto))}
const consoleVerde2 = (texto, texto2) => {console.log(chalk.black(chalk.bgGreen(texto)), chalk.black(chalk.white(texto2)))}
//VERMELHO
const consoleVermelho = (texto) => {console.log(chalk.red(texto))}
const consoleVermelho2 = (texto, texto2) => {console.log(chalk.black(chalk.bgRed(texto)), chalk.black(chalk.white(texto2)))}
//AMARELO
const consoleAmarelo = (texto) => {console.log(chalk.yellow(texto))}
const consoleAmarelo2 = (texto, texto2) => {console.log(chalk.black(chalk.bgYellow(texto)), chalk.black(chalk.white(texto2)))}
//AZUL
const consoleAzul = (texto) => {console.log(chalk.blue(texto))}
const consoleAzul2 = (texto, texto2) => {console.log(chalk.black(chalk.bgBlue(texto)), chalk.black(chalk.white(texto2)))}
//CONSOLE DE ERRO
const consoleErro = (texto) => {console.log(chalk.black(chalk.bgRed(`[ ERRO ]`)), chalk.black(chalk.white(`Erro: ${texto}`)))}
//CONSOLE DE AVISO
//CONSOLE DE ERRO
const consoleInfo = (texto) => {console.log(chalk.black(chalk.bgBlue(`[ INFO ]`)), chalk.black(chalk.white(texto)))}
//CONSOLE DE AVISO
const consoleAviso = (texto) => {console.log(chalk.black(chalk.bgYellow(`[ AVISO ]`)), chalk.black(chalk.white(texto)))}
//CONSOLE DE SUCESSO
const consoleSucesso = (texto) => {console.log(chalk.black(chalk.bgGreen(`[ SUCESSO ]`)), chalk.black(chalk.white(texto)))}
//CONSOLE DE ONLINE 
const consoleOnline = (texto) => {console.log(chalk.black(chalk.bgGreen(`[ ONLINE ]`)), chalk.black(chalk.white(texto)))}

//============( GETBUFFER )===========\\
const getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (err) {
		return err
	}
}

//============( FETCHJSON )===========\\
async function fetchJson (url, options) {
    try {
        options ? options : {}
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        })
        return res.data
    } catch (err) {
        return err
    }
}

//============( SELOS )===========\\

const selo2 = (texto) => {
return {key: {fromMe: false,participant: '0@s.whatsapp.net'},message: {
extendedTextMessage: {text: `${texto}`,title: null,thumbnailUrl: null}}};};
//pedrozz Mods
const seloCriador = {"key": {"participant": "556199317165@s.whatsapp.net","remoteJid": "status@broadcast", "fromMe": false,},"message": {
"contactMessage": {
"displayName": "Pedrozz Mods", "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:;Chat GPT;;;\nFN:Pedrozz Mods\nitem1.TEL;waid=556199317165:556199317165\nitem1.X-ABLabel:Celular\nEND:VCARD`, "contextInfo": {"forwardingScore": 1,"isForwarded": true}}}};
//ais
const seloGpt = {"key": {"participant": "18002428478@s.whatsapp.net","remoteJid": "status@broadcast", "fromMe": false,},"message": {
"contactMessage": {
"displayName": "Chat GPT", "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:;Chat GPT;;;\nFN:Chat GPT\nitem1.TEL;waid=18002428478:18002428478\nitem1.X-ABLabel:Celular\nEND:VCARD`, "contextInfo": {"forwardingScore": 1,"isForwarded": true}}}};

//Pedrozz mods
const seloMeta = {"key": {"participant": "13135550002@s.whatsapp.net","remoteJid": "status@broadcast", "fromMe": false,},"message": {
"contactMessage": {
"displayName": "Meta IA", "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:;Chat GPT;;;\nFN:Meta IA\nitem1.TEL;waid=13135550002:13135550002\nitem1.X-ABLabel:Celular\nEND:VCARD`, "contextInfo": {"forwardingScore": 1,"isForwarded": true}}}};

//Pedrozz mods
const seloLuzia = {"key": {"participant": "5511972553036@s.whatsapp.net","remoteJid": "status@broadcast", "fromMe": false,},"message": {
"contactMessage": {
"displayName": "LuzIA", "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:;Chat GPT;;;\nFN:LuzIA\nitem1.TEL;waid=5511972553036:5511972553036\nitem1.X-ABLabel:Celular\nEND:VCARD`, "contextInfo": {"forwardingScore": 1,"isForwarded": true}}}};

//Pedrozz mods
const seloLaura = {"key": {"participant": "556191969269@s.whatsapp.net","remoteJid": "status@broadcast", "fromMe": false,},"message": {
"contactMessage": {
"displayName": "Laura AI", "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:;Laura AI;;;\nFN:Laura AI\nitem1.TEL;waid=556191969269:556191969269\nitem1.X-ABLabel:Celular\nEND:VCARD`, "contextInfo": {"forwardingScore": 1,"isForwarded": true}}}};

//Pedrozz Mods 
const seloCopilot = {"key": {"participant": "18772241042@s.whatsapp.net","remoteJid": "status@broadcast", "fromMe": false,},"message": {
"contactMessage": {
"displayName": "Microsoft Copilot", "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:;Microsoft Copilot;;;\nFN:Microsoft Copilot\nitem1.TEL;waid=18772241042:18772241042\nitem1.X-ABLabel:Celular\nEND:VCARD`, "contextInfo": {"forwardingScore": 1,"isForwarded": true}}}};
//bancos
const seloNubank = {"key": {"participant": "551150390444@s.whatsapp.net","remoteJid": "status@broadcast", "fromMe": false,},"message": {
"contactMessage": {
"displayName": "Nubank", "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:;Nubank;;;\nFN:Nubank\nitem1.TEL;waid=551150390444:551150390444\nitem1.X-ABLabel:Celular\nEND:VCARD`, "contextInfo": {"forwardingScore": 1,"isForwarded": true}}}};
const seloBb = {"key": {"participant": "556140040001@s.whatsapp.net","remoteJid": "status@broadcast", "fromMe": false,},"message": {
"contactMessage": {
"displayName": "Banco do Brasil", "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:;Banco Do Brasil;;;\nFN:Banco do Brasil\nitem1.TEL;waid=556140040001:556140040001\nitem1.X-ABLabel:Celular\nEND:VCARD`, "contextInfo": {"forwardingScore": 1,"isForwarded": true}}}};
const seloBradesco = {"key": {"participant": "551133350237@s.whatsapp.net","remoteJid": "status@broadcast", "fromMe": false,},"message": {
"contactMessage": {
"displayName": "Bradesco", "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:;Bradesco;;;\nFN:Bradesco\nitem1.TEL;waid=551133350237:551133350237\nitem1.X-ABLabel:Celular\nEND:VCARD`, "contextInfo": {"forwardingScore": 1,"isForwarded": true}}}};
const seloSantander = {"key": {"participant": "551140043535@s.whatsapp.net","remoteJid": "status@broadcast", "fromMe": false,},"message": {
"contactMessage": {
"displayName": "Santander", "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:;Santander;;;\nFN:Santander\nitem1.TEL;waid=551140043535:551140043535\nitem1.X-ABLabel:Celular\nEND:VCARD`, "contextInfo": {"forwardingScore": 1,"isForwarded": true}}}};
const seloItau = {"key": {"participant": "551140044828@s.whatsapp.net","remoteJid": "status@broadcast", "fromMe": false,},"message": {
"contactMessage": {
"displayName": "Itaú", "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:;Itaú;;;\nFN:Itaú\nitem1.TEL;waid=551140044828:551140044828\nitem1.X-ABLabel:Celular\nEND:VCARD`, "contextInfo": {"forwardingScore": 1,"isForwarded": true}}}};

module.exports = { botVersion, msg, consoleVerde, consoleVerde2, consoleVermelho, consoleVermelho2, consoleAmarelo, consoleAmarelo2, consoleAzul, consoleAzul2, consoleErro, consoleAviso, consoleInfo, consoleOnline, consoleSucesso, fetchJson, getBuffer, selo2, seloCriador, seloMeta, seloGpt, seloLuzia, seloLaura, seloCopilot, seloNubank, seloBb, seloBradesco, seloSantander, seloItau, moment }
/*
PEDROZZ MODS FEZ ESSA BUDEGA AQUI, SE FOR REPOSTA PELO MENOS DEIXA UNS CRÉDITOS AI PARA YO QUE NOIS AGRADECE 😁👍
*/