const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const mnemonic = 'then special best wine deliver laugh enough sing source satoshi metal cabin';

const provider = new HDWalletProvider(
  mnemonic,
  'https://rinkeby.infura.io/1w7mYHGsbz3Xu5FxdZEj'
);

const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
      .deploy({data: `0x${compiledFactory.bytecode}`,arguments: []})
      .send({gas: '3000000', from: accounts[0]});
    console.log(`Contract successfully deployed to ${result.options.address}`);
  }
  catch(error) {
    console.log(error);
  }
};
deploy();