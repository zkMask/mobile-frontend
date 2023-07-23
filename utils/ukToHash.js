const circomlibjs = require("circomlibjs");

const generatePoseidonHash = async (key) => {
  const poseidon = await circomlibjs.buildPoseidon();
  const hash = poseidon.F.toString(poseidon([10]));
  return hash;
};

module.exports = generatePoseidonHash;
