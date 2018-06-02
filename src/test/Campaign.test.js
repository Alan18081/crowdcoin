const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts, factory, campaignAddress, campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({data: compiledFactory.bytecode})
    .send({gas: '1000000', from: accounts[0]});

  await factory.methods.createCampaign(100).send({
    from: accounts[0],
    gas: '1000000'
  });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = await new web3.eth.Contract(JSON.parse(compiledCampaign.interface),campaignAddress);
});

describe('Campaigns', () => {
  it('deploys a factory and a campaign', () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it('marks caller as the campaign manager', async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(manager,accounts[0]);
  });

  it('allows people to contribute money and marks them as approvers', async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: 500
    });
    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    assert(isContributor);
  });

  it('requires minimum contribution', async () => {
    try {
      await campaign.methods.contribute().send({
        from: accounts[2],
        value: 0
      });
      assert(false);
    }
    catch(error) {
      assert(error);
    }
  });

  it('allows an manager to make a payment request', async () => {
    await campaign.methods.createRequest('I need to buy new memory',300,accounts[1]).send({
      from: accounts[0],
      gas: '1000000'
    });

    const request = await campaign.methods.request(0).call();
    assert.equal('I need to buy new memory',request.description);
  });

  it('processes request', async () => {
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei('10','ether')
    });

    await campaign.methods
      .createRequest('A',web3.utils.toWei('3','ether'),accounts[1])
      .send({
        from: accounts[0],
        gas: '1000000'
      });

    await campaign.approveRequest(0).send({
      from: accounts[1],
      gas: '1000000'
    });

    await campaign.finalizeRequest(0).send({
      from: accounts[0],
      gas: '1000000'
    });

    let balance = await web3.eth.getBalance(accounts[1]);
    balance = web3.utils.fromWei(balance,'ether');
    balance = parseFloat(balance);
    assert(balance > 104);
  });
});