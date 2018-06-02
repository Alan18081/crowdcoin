import React, {Component} from 'react';
import {Button, Table,Loader} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import RequestRow from './RequestRow';

import {fetchRequests} from '../actions';

class Requests extends Component {
  componentDidMount() {
    this.props.onFetchRequests(this.props.match.params.address);
  }
  renderRows() {
    return this.props.requests.map((request,index) => (
      <RequestRow
        key={index}
        id={index}
        request={request}
        address={this.props.match.params.address}
        approversCount={this.props.approversCount}
      />
    ));
  }
  render() {
    const { Header, Row, HeaderCell, Body} = Table;
    let content = <Loader/>;
    if(this.props.requests) {
      content = (
        <div>
          <Table>
            <Header>
              <Row>
                <HeaderCell>ID</HeaderCell>
                <HeaderCell>Description</HeaderCell>
                <HeaderCell>Amount (ether)</HeaderCell>
                <HeaderCell>Recipient</HeaderCell>
                <HeaderCell>Approval Count</HeaderCell>
                <HeaderCell>Approve</HeaderCell>
                <HeaderCell>Finalize</HeaderCell>
              </Row>
            </Header>
            <Body>
            {this.renderRows()}
            </Body>
          </Table>
          <div>Found {this.props.requests.size} {this.props.requests.size > 1 ? 'requests' : 'request'}</div>
        </div>
      )
    }
    return (
      <div>
        <h3>Pending requests</h3>
        <Link to={`/campaigns/${this.props.match.params.address}/requests/new`}>
          <Button primary>Add request</Button>
        </Link>
        {content}
      </div>
    );
  }
}

const mapStateToProps = ({requests}) => ({
  requests: requests.get('list'),
  approversCount: requests.get('approversCount')
});

const mapDispatchToProps = dispatch => ({
  onFetchRequests: (address) => dispatch(fetchRequests(address))
});

export default connect(mapStateToProps,mapDispatchToProps)(Requests);