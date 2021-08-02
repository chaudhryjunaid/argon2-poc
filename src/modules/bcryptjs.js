const bcrypt = require('bcryptjs');
const perf = require('execution-time')();

async function hashBcryptjs(password, options) {
  return new Promise((resolve, reject) => {
  	bcrypt.hash(password, options.saltRounds, function(err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });
}

async function verifyBcryptjs(hash, password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, function(err, result) {
      if (err) reject(err);
      resolve(result);
    });
  });
}

exports.hash = async function(password, options) {
	perf.start(__filename+'_hash');
	const hash = await hashBcryptjs(password, options);
	const execTime = perf.stop(__filename+'_hash');
	return {
		hash,
		execTime
	};
}

exports.verify = async function(hash, password) {
	perf.start(__filename+'_verify');
	const match = await verifyBcryptjs(hash, password);
	const execTime = perf.stop(__filename+'_verify');
	return {
		match,
		execTime
	};
}
