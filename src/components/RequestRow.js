import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Table, Button} from 'semantic-ui-react';
import {connect} from 'react-redux';
import web3 from '../ethereum/web3';

import {approveRequest,finalizeRequest} from '../actions';

class RequestRow extends Component {
  state = {
    approveLoading: false,
    finalizeLoading: false
  };
  onApprove = async () => {
    this.setState({
      approveLoading: true
    });
    this.props.onApproveRequest(this.props.match.params.address,this.props.id,() => {
      this.setState({
        approveLoading: false
      });
    });
  };
  onFinalize = async () => {
    this.setState({
      finalizeLoading: true
    });
    this.props.onFinalizeRequest(this.props.match.params.address,this.props.id,() => {
      this.setState({
        finalizeLoading: false
      });
    });
  }
  ;
  render() {
    const {Row,Cell} = Table;
    const {id,request: {description,value,recipient,approvalCount, complete},approversCount} = this.props;
    return (
      <Row disabled={complete} positive={approvalCount > (approversCount / 2)}>
        <Cell>
          {id}
        </Cell>
        <Cell>{description}</Cell>
        <Cell>{web3.utils.fromWei(value,'ether')}</Cell>
        <Cell>{recipient}</Cell>
        <Cell>{approvalCount}/{approversCount}</Cell>
        <Cell>
          {!complete && <Button loading={this.state.approveLoading} onClick={this.onApprove} basic color="green">
            Approve
          </Button>}
        </Cell>
        <Cell>
          {!complete && <Button basic color="blue" onClick={this.onFinalize}>
            Finalize
          </Button>}
        </Cell>
      </Row>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onApproveRequest: (address,id,cb) => dispatch(approveRequest(address,id,cb)),
  onFinalizeRequest: (address,id,cb) => dispatch(finalizeRequest(address,id,cb))
});

export default withRouter(connect(null,mapDispatchToProps)(RequestRow));