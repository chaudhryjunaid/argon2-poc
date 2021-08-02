const Promise = require('bluebird');
const argv = require('minimist')(process.argv.slice(2));
const argon2 = require('./src/modules/argon2.js');

const passwords = [
	'123',
	'mv894invkjniuhw#$*(&nk'
];
const algorithms = [
	argon2
];

async function benchmark() {	
	await Promise.each(algorithms, async function benchmarkAlgo(algo) {
		console.log('===================================================');
		await Promise.each(passwords, async function benchmarkPassword(passwd) {
			const {hash, execTime} = await algo.hash(passwd);
			console.log({hash, execTime}, 'hashing result!');
			const {match, execTime: vExecTime} = await algo.verify(hash, passwd);
			console.log({hash, vExecTime}, 'hashing result!');
			console.log('---------------------------------------------------');
		});
		console.log('===================================================\n\n');
	});
}

benchmark();
