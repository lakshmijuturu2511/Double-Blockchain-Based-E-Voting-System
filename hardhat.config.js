require('@nomiclabs/hardhat-ethers');
require('dotenv');

module.exports = {
  solidity: "0.8.18",  // Specify your Solidity version

  networks: {
    hardhatPrivate: {
      url: "http://127.0.0.1:8545",  // Port for Hardhat network
      chainId: 31337,  // Chain id for private network
      accounts: [
        "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e"  // Private key as a string
      ]
    },

    ganache: {
      url: "http://127.0.0.1:8546",  // Port for Ganache
      chainId: 1337,  // Chain id for Ganache
      accounts: [
        "0x2b3bf057ac75a3a0783f5c9309da882855ad6c866ed711fd4ec9dbbc99ed76b0"  // Private key as a string
      ]
    }
  }
};
