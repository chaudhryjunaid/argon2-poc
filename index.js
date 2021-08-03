const Promise = require('bluebird');
const argv = require('minimist')(process.argv.slice(2));
const argon2 = require('./src/modules/argon2.js');
const scrypt = require('./src/modules/scrypt.js');
const bcrypt = require('./src/modules/bcrypt.js');
const bcryptjs = require('./src/modules/bcryptjs.js');

const algorithms = {
	argon2,
	scrypt,
	bcrypt,
	bcryptjs
};

const {
	t = 100,
	m = 4096,
	h = 1,
	c = 16384,
	r = 10,
	hash = '',//"$2a$10$TQaUbeuNIa/5QV3Tpkvjyug1ObfCBotubsAFqgA6P5HMufQwxm012",
	passwd = '123456',
	algo = 'bcryptjs'
} = argv;

const options= {
	parallelism: parseInt(h, 10),
	timeCost: parseInt(t, 10),
	memoryCost: parseInt(m, 10),
	cost: parseInt(c, 10),
	saltRounds: parseInt(r, 10)
};

async function benchmark() {
	const selectedAlgo = algorithms[algo];
	console.log('===================================================');
	if (hash) {
		const {match, execTime: vExecTime} = await selectedAlgo.verify(hash, passwd);
		return console.log({match, vExecTime}, 'matching result!');
	}
	const {hash: _hash, execTime} = await selectedAlgo.hash(passwd, options);
	console.log({_hash, execTime}, 'hashing result!');
	const {match, execTime: vExecTime} = await selectedAlgo.verify(_hash, passwd);
	console.log({match, vExecTime}, 'matching result!');
	console.log('===================================================\n\n');
}

benchmark();
