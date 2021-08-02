const argon2 = require('argon2');
const perf = require('execution-time')();

exports.hash = async function(password, options) {
	perf.start(__filename+'_hash');
	const hash = await argon2.hash(password);
	const execTime = perf.stop(__filename+'_hash');
	return {
		hash,
		execTime
	};
}

exports.verify = async function(hash, password, options) {
	perf.start(__filename+'_verify');
	const match = await argon2.verify(hash, password);
	const execTime = perf.stop(__filename+'_verify');
	return {
		match,
		execTime
	};
}
