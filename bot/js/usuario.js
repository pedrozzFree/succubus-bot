/*
PEDROZZ MODS FEZ ESSA BUDEGA AQUI, SE FOR REPOSTA PELO MENOS DEIXA UNS CRÉDITOS AI PARA YO QUE NOIS AGRADECE 😁👍
*/

const fs = require('fs');
const path = require('path');

const UserFile = path.resolve("./bot/json/usuarios.json");

function carregarDadosUsuario() {
if (!fs.existsSync(UserFile)) return {};
try {
const data = fs.readFileSync(UserFile, 'utf8');
return JSON.parse(data);
} catch (err) {
console.error('Erro ao carregar os dados dos usuários:', err);
return {};
}
}

function salvarUsuario(data) {
try {
fs.writeFileSync(UserFile, JSON.stringify(data, null, 2));
} catch (err) {
console.error('Erro ao salvar os dados dos usuários:', err);
}
}

function registrarUsuario1(sender, nome) {
const userData = carregarDadosUsuario();
userData[sender] = {
nome,
numero: sender,
bancoA: false,
banco: [],
playT: []
};
salvarUsuario(userData);
}

function infoUser1(sender) {
const userData = carregarDadosUsuario();
return userData[sender] || null;
}

function modificarUsuario(sender, valor, tipo) {
const userData = carregarDadosUsuario();
if (!userData[sender]) return;

if (tipo === 'saldo') {
userData[sender].saldo = ((parseInt(userData[sender].saldo) || 0) + parseInt(valor)).toString();
} else {
userData[sender][tipo] = valor;
}
salvarUsuario(userData);
}

function carregarDadosUsuarios() {
return carregarDadosUsuario();
}

module.exports = {
salvarUsuario,
registrarUsuario1,
infoUser1,
modificarUsuario,
carregarDadosUsuarios,
};

// ATUALIZAÇÕES AUTOMÁTICAS
const file = require.resolve(__filename);
fs.watchFile(file, () => {
fs.unwatchFile(file);
console.log(`Eii você já tá mexendo? 😑\nAs alterações foram salvas - '${__filename}'`);
delete require.cache[file];
require(file);
});

/*
PEDROZZ MODS FEZ ESSA BUDEGA AQUI, SE FOR REPOSTA PELO MENOS DEIXA UNS CRÉDITOS AI PARA YO QUE NOIS AGRADECE 😁👍
*/