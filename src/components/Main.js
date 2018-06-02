import React, {Component} from 'react';
import {Card,Button,Loader} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {fetchCampaigns} from '../actions';

class Main extends Component {
  async componentDidMount() {
    this.props.onFetchCampaigns();
  }
  renderCampaigns() {
    const items = this.props.campaigns.toJS().map(address => ({
      header: address,
      description: (
        <Link to={`/campaigns/${address}`}>
          View campaign
        </Link>
      ),
      fluid: true
    }));
    return <Card.Group items={items}/>;
  }
  render() {
    let content = <Loader/>;
    if(this.props.campaigns) {
      content = (
        <div>
          <Link to="/campaigns/new">
            <Button
              floated="right"
              content="Create Campaign"
              icon="add circle"
              primary
            />
          </Link>
          {this.renderCampaigns()}
        </div>
      );
    }
    return content;
  }
}

const mapStateToProps = ({campaigns}) => ({
  campaigns: campaigns.get('list')
});

const mapDispatchToProps = dispatch => ({
  onFetchCampaigns: () => dispatch(fetchCampaigns())
});

export default connect(mapStateToProps,mapDispatchToProps)(Main);
