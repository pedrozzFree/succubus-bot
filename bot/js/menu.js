/*
PEDROZZ MODS FEZ ESSA BUDEGA AQUI, SE FOR REPOSTA PELO MENOS DEIXA UNS CRÉDITOS AI PARA YO QUE NOIS AGRADECE 😁👍
*/
const fs = require('fs');

//=======NORMAL=======\\
const menu = ( prefix, botName, donoName, Cargo, time, data, dispositivo, sender, pushname, from, isBotoff, emoji ) => { 
return `╭━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╮
┝⊰ ➪ 𝐒𝐔𝐂𝐂𝐔𝐁𝐔𝐒 𝐈𝐍𝐅𝐎𝐑𝐌𝐀ÇÕ𝐄𝐒
╰━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╯
┃┝.ᨘ۫.ꪶ${emoji} ۪→ Seja bem-vindo ${pushname}
┃┝.ᨘ۫.ꪶ${emoji} ۪→ Status: ${!isBotoff ? 'Online 🟢' : 'Offline 🔴'}
┃┝.ᨘ۫.ꪶ${emoji} ۪→ Cargo: ${Cargo}
┃┝.ᨘ۫.ꪶ${emoji} ۪→ Dono: ${donoName}
┃┝.ᨘ۫.ꪶ${emoji} ۪→ Hora: ${time}
┃┝.ᨘ۫.ꪶ${emoji} ۪→ Data: ${data}
┃╰━━━─────━━━╯
╰━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╯
╭━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╮
┝⊰ ➪ 𝐒𝐔𝐂𝐂𝐔𝐁𝐔𝐒 𝐌𝐄𝐍𝐔𝐒
╰━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╯
┃┝.ᨘ۫.ꪶ${emoji} ۪→ criador『 Info Criador 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ menu『 Menu de comandos 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ menuadm『 Menu adm 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ menujogos『 Menu de jogos 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ menu18『 Menu adulto 』
┃╰━━━─────━━━╯
╰━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╯
╭━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╮
┝⊰ ➪ 𝐒𝐔𝐂𝐂𝐔𝐁𝐔𝐒 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃
╰━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╯
┃┝.ᨘ۫.ꪶ${emoji} ۪→ play『 Nome 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ playaudio『 Url 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ playvideo『 Nome 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ playadd『 Link/Nome 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ tocar_playlist『 Id 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ ver_playlist
┃┝.ᨘ۫.ꪶ${emoji} ۪→ pinterest『 Nome 』
┃╰━━━─────━━━╯
╰━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╯
╭━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╮
┝⊰ ➪ 𝐒𝐔𝐂𝐂𝐔𝐁𝐔𝐒 𝐈𝐀
╰━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╯
┃┝.ᨘ۫.ꪶ${emoji} ۪→ dalle『 Prompt 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ dallev2『 Prompt 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ imagine-ia『 Prompt 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ imagine『 Prompt 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ imagine2『 Prompt 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ gpt『 Prompt 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ gpt2『 Prompt 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ gemini『 Prompt 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ llama『 Prompt 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ llama2『 Prompt 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ sqlcode『 Prompt 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ mistral『 Prompt 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ deepseek『 Prompt 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ deepseek-code『 Prompt 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ voz『 Prompt 』
┃╰━━━─────━━━╯
╰━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╯
╭━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╮
┝⊰ ➪ 𝐒𝐔𝐂𝐂𝐔𝐁𝐔𝐒 𝐂𝐎𝐍𝐒𝐔𝐋𝐓𝐀𝐒
╰━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╯
┃┝.ᨘ۫.ꪶ${emoji} ۪→ nome『 Dado 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ nome2『 Dado 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ cpf『 Dado 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ titulo_eleitor『 Dado 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ nome_mae『 Dado 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ telefone『 Dado 』
┃╰━━━─────━━━╯
╰━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╯`
}
exports.menu = menu

//=========ADM======\\\
const menudono = ( prefix, botName, donoName, Cargo, time, data, dispositivo, sender, pushname, from, isBotoff, emoji ) => { 
return `╭━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╮
┝⊰ ➪ 𝐒𝐔𝐂𝐂𝐔𝐁𝐔𝐒 𝐈𝐍𝐅𝐎𝐑𝐌𝐀ÇÕ𝐄𝐒
╰━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╯
┃┝.ᨘ۫.ꪶ${emoji} ۪→ Seja bem-vindo ${pushname}
┃┝.ᨘ۫.ꪶ${emoji} ۪→ Status: ${!isBotoff ? 'Online 🟢' : 'Offline 🔴'}
┃┝.ᨘ۫.ꪶ${emoji} ۪→ Cargo: ${Cargo}
┃┝.ᨘ۫.ꪶ${emoji} ۪→ Dono: ${donoName}
┃┝.ᨘ۫.ꪶ${emoji} ۪→ Hora: ${time}
┃┝.ᨘ۫.ꪶ${emoji} ۪→ Data: ${data}
┃╰━━━─────━━━╯
╰━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╯
╭━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╮
┝⊰ ➪ 𝐒𝐔𝐂𝐂𝐔𝐁𝐔𝐒 𝐃𝐎𝐍𝐎
╰━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╯
┃┝.ᨘ۫.ꪶ${emoji} ۪→ fotomenu『 Imagem 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ modobutton『 Ativo/Desativado 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ newprefixo『 Prefixo 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ newnamebot『 Nome 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ newemoji『 Emoji 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ newapikey_moon『 Apikey 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ newdononumero『 Número 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ ping『 INFO 』
┃╰━━━─────━━━╯
╰━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╯`
}
exports.menudono = menudono

//==========ADULTO======\\
const menu18 = ( prefix, botName, donoName, Cargo, time, data, dispositivo, sender, pushname, from, isBotoff, emoji ) => { 
return `╭━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╮
┝⊰ ➪ 𝐒𝐔𝐂𝐂𝐔𝐁𝐔𝐒 𝐈𝐍𝐅𝐎𝐑𝐌𝐀ÇÕ𝐄𝐒
╰━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╯
┃┝.ᨘ۫.ꪶ${emoji} ۪→ Seja bem-vindo ${pushname}
┃┝.ᨘ۫.ꪶ${emoji} ۪→ Status: ${!isBotoff ? 'Online 🟢' : 'Offline 🔴'}
┃┝.ᨘ۫.ꪶ${emoji} ۪→ Cargo: ${Cargo}
┃┝.ᨘ۫.ꪶ${emoji} ۪→ Dono: ${donoName}
┃┝.ᨘ۫.ꪶ${emoji} ۪→ Hora: ${time}
┃┝.ᨘ۫.ꪶ${emoji} ۪→ Data: ${data}
┃╰━━━─────━━━╯
╰━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╯
╭━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╮
┝⊰ ➪ 𝐒𝐔𝐂𝐂𝐔𝐁𝐔𝐒 😈
╰━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╯
┃┝.ᨘ۫.ꪶ${emoji} ۪→ onlyimg
┃┝.ᨘ۫.ꪶ${emoji} ۪→ foto18
┃┝.ᨘ۫.ꪶ${emoji} ۪→ video18
┃┝.ᨘ۫.ꪶ${emoji} ۪→ hentai
┃┝.ᨘ۫.ꪶ${emoji} ۪→ trap 
┃┝.ᨘ۫.ꪶ${emoji} ۪→ wifu 
┃┝.ᨘ۫.ꪶ${emoji} ۪→ blowjob 
┃┝.ᨘ۫.ꪶ${emoji} ۪→ neko
┃┝.ᨘ۫.ꪶ${emoji} ۪→ hanal 
┃┝.ᨘ۫.ꪶ${emoji} ۪→ anal 
┃┝.ᨘ۫.ꪶ${emoji} ۪→ pussy 
┃┝.ᨘ۫.ꪶ${emoji} ۪→ hentai
┃┝.ᨘ۫.ꪶ${emoji} ۪→ thigh 
┃┝.ᨘ۫.ꪶ${emoji} ۪→ boobs 
┃┝.ᨘ۫.ꪶ${emoji} ۪→ ass 
┃┝.ᨘ۫.ꪶ${emoji} ۪→ kanna 
┃┝.ᨘ۫.ꪶ${emoji} ۪→ 4k 
┃┝.ᨘ۫.ꪶ${emoji} ۪→ hthigh 
┃┝.ᨘ۫.ꪶ${emoji} ۪→ tentacle 
┃┝.ᨘ۫.ꪶ${emoji} ۪→ hboobs
┃┝.ᨘ۫.ꪶ${emoji} ۪→ holo 
┃┝.ᨘ۫.ꪶ${emoji} ۪→ hass 
┃┝.ᨘ۫.ꪶ${emoji} ۪→ pgif 
┃┝.ᨘ۫.ꪶ${emoji} ۪→ yaoi
┃┝.ᨘ۫.ꪶ${emoji} ۪→ hneko 
┃┝.ᨘ۫.ꪶ${emoji} ۪→ hkitsune 
┃┝.ᨘ۫.ꪶ${emoji} ۪→ kemonomimi
┃┝.ᨘ۫.ꪶ${emoji} ۪→ hanalvizu 
┃┝.ᨘ۫.ꪶ${emoji} ۪→ analvizu 
┃┝.ᨘ۫.ꪶ${emoji} ۪→ pussyvizu 
┃┝.ᨘ۫.ꪶ${emoji} ۪→ hentaivizu
┃┝.ᨘ۫.ꪶ${emoji} ۪→ thighvizu 
┃┝.ᨘ۫.ꪶ${emoji} ۪→ boobsvizu 
┃┝.ᨘ۫.ꪶ${emoji} ۪→ assvizu 
┃┝.ᨘ۫.ꪶ${emoji} ۪→ kannavizu 
┃┝.ᨘ۫.ꪶ${emoji} ۪→ 4kvizu 
┃┝.ᨘ۫.ꪶ${emoji} ۪→ hthighvizu 
┃┝.ᨘ۫.ꪶ${emoji} ۪→ tentaclevizu 
┃┝.ᨘ۫.ꪶ${emoji} ۪→ hboobsvizu
┃┝.ᨘ۫.ꪶ${emoji} ۪→ holovizu 
┃┝.ᨘ۫.ꪶ${emoji} ۪→ hassvizu 
┃┝.ᨘ۫.ꪶ${emoji} ۪→ pgifvizu 
┃┝.ᨘ۫.ꪶ${emoji} ۪→ yaoivizu
┃┝.ᨘ۫.ꪶ${emoji} ۪→ hnekovizu 
┃┝.ᨘ۫.ꪶ${emoji} ۪→ hkitsunevizu 
┃┝.ᨘ۫.ꪶ${emoji} ۪→ kemonomimivizu
┃┝.ᨘ۫.ꪶ${emoji} ۪→ plaquinha
┃┝.ᨘ۫.ꪶ${emoji} ۪→ plaquinha2
┃┝.ᨘ۫.ꪶ${emoji} ۪→ plaquinha3
┃┝.ᨘ۫.ꪶ${emoji} ۪→ plaquinha4
┃┝.ᨘ۫.ꪶ${emoji} ۪→ plaquinha5
┃┝.ᨘ۫.ꪶ${emoji} ۪→ plaquinha6
┃┝.ᨘ۫.ꪶ${emoji} ۪→ plaquinha7
┃┝.ᨘ۫.ꪶ${emoji} ۪→ plaquinha8
┃┝.ᨘ۫.ꪶ${emoji} ۪→ plaquinha9
┃┝.ᨘ۫.ꪶ${emoji} ۪→ plaquinha10
┃┝.ᨘ۫.ꪶ${emoji} ۪→ plaquinha11
┃┝.ᨘ۫.ꪶ${emoji} ۪→ plaquinha12
┃┝.ᨘ۫.ꪶ${emoji} ۪→ plaquinha12
┃┝.ᨘ۫.ꪶ${emoji} ۪→ plaquinha14
┃┝.ᨘ۫.ꪶ${emoji} ۪→ plaquinha15
┃┝.ᨘ۫.ꪶ${emoji} ۪→ plaquinha16
┃╰━━━─────━━━╯
╰━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╯`
}
exports.menu18 = menu18

//=========ADM======\\\
const menuadm = ( prefix, botName, donoName, Cargo, time, data, dispositivo, sender, pushname, from, isBotoff, emoji ) => { 
return `╭━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╮
┝⊰ ➪ 𝐒𝐔𝐂𝐂𝐔𝐁𝐔𝐒 𝐈𝐍𝐅𝐎𝐑𝐌𝐀ÇÕ𝐄𝐒
╰━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╯
┃┝.ᨘ۫.ꪶ${emoji} ۪→ Seja bem-vindo ${pushname}
┃┝.ᨘ۫.ꪶ${emoji} ۪→ Status: ${!isBotoff ? 'Online 🟢' : 'Offline 🔴'}
┃┝.ᨘ۫.ꪶ${emoji} ۪→ Cargo: ${Cargo}
┃┝.ᨘ۫.ꪶ${emoji} ۪→ Dono: ${donoName}
┃┝.ᨘ۫.ꪶ${emoji} ۪→ Hora: ${time}
┃┝.ᨘ۫.ꪶ${emoji} ۪→ Data: ${data}
┃╰━━━─────━━━╯
╰━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╯
╭━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╮
┝⊰ ➪ 𝐒𝐔𝐂𝐂𝐔𝐁𝐔𝐒 𝐀𝐃𝐌𝐈𝐍
╰━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╯
┃┝.ᨘ۫.ꪶ${emoji} ۪→ ban/kick『 @ 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ grupo『 A/F 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ resetlink
┃┝.ᨘ۫.ꪶ${emoji} ۪→ nomegp『 Nome 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ deletar『 Mensagem 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ antilink『 1/0 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ modoadulto『 1/0 』
┃┝.ᨘ۫.ꪶ${emoji} ۪→ modojogos『 1/0 』
┃╰━━━─────━━━╯
╰━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╯`
}
exports.menuadm = menuadm
//======JOGOS=====\\
const menujogos = ( prefix, botName, donoName, Cargo, time, data, dispositivo, sender, pushname, from, isBotoff, emoji ) => { 
return `╭━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╮
┝⊰ ➪ 𝐒𝐔𝐂𝐂𝐔𝐁𝐔𝐒 𝐈𝐍𝐅𝐎𝐑𝐌𝐀ÇÕ𝐄𝐒
╰━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╯
┃┝.ᨘ۫.ꪶ${emoji} ۪→ Seja bem-vindo ${pushname}
┃┝.ᨘ۫.ꪶ${emoji} ۪→ Status: ${!isBotoff ? 'Online 🟢' : 'Offline 🔴'}
┃┝.ᨘ۫.ꪶ${emoji} ۪→ Cargo: ${Cargo}
┃┝.ᨘ۫.ꪶ${emoji} ۪→ Dono: ${donoName}
┃┝.ᨘ۫.ꪶ${emoji} ۪→ Hora: ${time}
┃┝.ᨘ۫.ꪶ${emoji} ۪→ Data: ${data}
┃╰━━━─────━━━╯
╰━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╯
╭━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╮
┝⊰ ➪ 𝐒𝐔𝐂𝐂𝐔𝐁𝐔𝐒 𝐁𝐑𝐈𝐍𝐂𝐀𝐃𝐄𝐈𝐑𝐀𝐒
╰━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╯
┃┝.ᨘ۫.ꪶ${emoji} ۪→ gay (Random/@)
┃┝.ᨘ۫.ꪶ${emoji} ۪→ lindo (Random/@)
┃┝.ᨘ۫.ꪶ${emoji} ۪→ feio (Random/@)
┃┝.ᨘ۫.ꪶ${emoji} ۪→ lesbico (Random/@)
┃┝.ᨘ۫.ꪶ${emoji} ۪→ lesbica (Random/@)
┃┝.ᨘ۫.ꪶ${emoji} ۪→ gostosa (Random/@)
┃┝.ᨘ۫.ꪶ${emoji} ۪→ gostoso (Random/@)
┃┝.ᨘ۫.ꪶ${emoji} ۪→ podre (Random/@)
┃┝.ᨘ۫.ꪶ${emoji} ۪→ atraente (Random/@)
┃┝.ᨘ۫.ꪶ${emoji} ۪→ fiel (Random/@)
┃┝.ᨘ۫.ꪶ${emoji} ۪→ gado (Random/@)
┃╰━━━─────━━━╯
╰━･｡💜｡･ﾟ♡ﾟ･｡❤️｡･ﾟ♡ﾟ･｡💜｡･━╯`
}
exports.menujogos = menujogos

// ATUALIZAÇÕES AUTOMÁTICAS
const file = require.resolve(__filename);
fs.watchFile(file, () => {
fs.unwatchFile(file);
console.log(`Atualizando os menus....`);
delete require.cache[file];
require(file);
});

/*
PEDROZZ MODS FEZ ESSA BUDEGA AQUI, SE FOR REPOSTA PELO MENOS DEIXA UNS CRÉDITOS AI PARA YO QUE NOIS AGRADECE 😁👍
*/