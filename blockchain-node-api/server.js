const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const Web3 = require('web3');
const artifacts = require('./build/contracts/Contacts.json');
const config = require('./config');

// Use address from latest Truffle migration if available, else config
function getContractAddress() {
	const nets = artifacts.networks || {};
	const id = Object.keys(nets)[0];
	if (id && nets[id] && nets[id].address) return nets[id].address;
	return config.CONTACT_ADDRESS;
}
const CONTACT_ABI = config.CONTACT_ABI;
const CONTACT_ADDRESS = getContractAddress();

app.use(cors());
app.use(express.json());

if (typeof web3 !== 'undefined') {
	var web3 = new Web3(web3.currentProvider);
} else {
	// Truffle develop default port (use 9545); for Ganache use 7545
	var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));
}

async function start() {
	const accounts = await web3.eth.getAccounts();
	const contactList = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);
	routes(app, accounts, contactList);
	app.listen(process.env.PORT || 3001, () => {
		console.log('listening on port ' + (process.env.PORT || 3001));
	});
}

start().catch((err) => {
	console.error('Failed to start server:', err);
	process.exit(1);
});
