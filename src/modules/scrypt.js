const perf = require('execution-time')();
const crypto = require('crypto');

async function hashScrypt(password, options) {
  return new Promise((resolve, reject) => {
    // generate random 16 bytes long salt
    const salt = crypto.randomBytes(16).toString("hex")

    crypto.scrypt(password, salt, 64, options, (err, derivedKey) => {
      if (err) reject(err);
      resolve(options.cost + ':' + salt + ":" + derivedKey.toString('hex'))
    });
  });
}

async function verifyScrypt(hash, password) {
  return new Promise((resolve, reject) => {
    const [cost, salt, key] = hash.split(":")
    crypto.scrypt(password, salt, 64, {cost: parseInt(cost, 10)}, (err, derivedKey) => {
      if (err) reject(err);
      resolve(key == derivedKey.toString('hex'))
    });
  })
}

exports.hash = async function(password, options) {
	perf.start(__filename+'_hash');
	const hash = await hashScrypt(password, options);
	const execTime = perf.stop(__filename+'_hash');
	return {
		hash,
		execTime
	};
}

exports.verify = async function(hash, password, options) {
	perf.start(__filename+'_verify');
	const match = await verifyScrypt(hash, password);
	const execTime = perf.stop(__filename+'_verify');
	return {
		match,
		execTime
	};
}
