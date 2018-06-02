import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card,Grid,Button,Loader} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import web3 from '../ethereum/web3';

import ContributeForm from './ContributeForm';

import {fetchActiveCampaign} from '../actions';

class Campaign extends Component {
  componentDidMount() {
    this.props.onFetchActiveCampaign(this.props.match.params.address);
  }
  renderCards() {
    const {campaign} = this.props;
    const items = [
      {
        header: campaign.get('manager'),
        meta: 'Manager',
        description: 'The manager created this campaign and can create requests to withdraw money',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: campaign.get('minimumContribution'),
        meta: 'Minimum contribution',
        description: 'You must contribute at least this much wei to become an approver',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: campaign.get('requestsCount'),
        meta: 'Quantity of requests',
        description: 'A request tries to withdraw money from the contracts. Request must be approved by approvers',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: campaign.get('approversCount'),
        meta: 'Approvers',
        description: 'Number of approvers who donated to this campaign',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: web3.utils.fromWei(campaign.get('balance'),'ether'),
        meta: 'Money',
        description: 'Amount of donated money (ether)',
        style: { overflowWrap: 'break-word' }
      }
     ];
    return <Card.Group items={items}/>;
  }
  render() {
    let content = <Loader/>;
    const {campaign,match: {params: {address}}} = this.props;
    if(campaign) {
      content = (
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              {this.renderCards()}
            </Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm min={campaign.get('minimumContribution')} address={address}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link to={`/campaigns/${address}/requests`}>
                <Button primary>View requests</Button>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    }
    return (
      <div>
        <h1>Campaign #{address}</h1>
        {content}
      </div>
    )
  }
}

const mapStateToProps = ({campaigns}) => ({
  campaign: campaigns.get('activeCampaign')
});

const mapDispatchToProps = dispatch => ({
  onFetchActiveCampaign: (address) => dispatch(fetchActiveCampaign(address))
});

export default connect(mapStateToProps,mapDispatchToProps)(Campaign);