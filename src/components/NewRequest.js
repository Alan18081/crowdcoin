import React, {Component} from 'react';
import {Button,Message} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {reduxForm,SubmissionError,Field} from 'redux-form';

import {createRequest,fetchActiveCampaign} from '../actions';
import {validateRequest} from '../utils/validate';

import Input from './Input';

class NewRequest extends Component {
  componentDidMount() {
    this.props.onFetchActiveCampaign(this.props.match.params.address);
  }
  onSubmit = async (values) => {
    if(this.props.campaign.get('balance')) {
      throw new SubmissionError('You don\'t have any money in campaign');
    }
    else if(values.value < this.props.campaign.get('balance')) {
      throw new SubmissionError(`Please, provide less than ${this.props.campaign.get('balance')}`);
    }
    else {
      this.props.onCreateRequest(this.props.match.params.address,values,() => {
        this.props.history.push(`/campaigns/${this.props.match.params.address}/requests`);
      });
    }
  };
  render() {
    const {error,loading,handleSubmit} = this.props;
    return (
      <div>
        <Link to={`/campaigns/${this.props.match.params.address}/requests`}>
          <Button basic color="teal">Back</Button>
        </Link>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <h2>Create new request</h2>
          <Field name="description" component={Input}/>
          <Field name="value" component={Input} caption="ether" captionPosition="right"/>
          <Field name="recipient" component={Input}/>
          {error && <Message error header="Oops!" content={error}/>}
          <Button primary loading={loading}>Create</Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({requests,campaigns}) => ({
  loading: requests.get('loading'),
  error: requests.get('error'),
  campaign: campaigns.get('activeCampaign')
});

const mapDispatchToProps = dispatch => ({
  onFetchActiveCampaign: (address) => dispatch(fetchActiveCampaign(address)),
  onCreateRequest: (address,info,cb) => dispatch(createRequest(address,info,cb))
});

export default connect(mapStateToProps,mapDispatchToProps)(
  reduxForm({
    from: 'newRequest',
    validate: validateRequest
  })(NewRequest)
);