import web3 from './web3';
import campaignFactory from './build/CampaignFactory.json';
import address from '../address';

const instance = new web3.eth.Contract(JSON.parse(campaignFactory.interface),address);

export default instance;