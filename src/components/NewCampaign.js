import React, { Component } from 'react';
import {Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {reduxForm,Field} from 'redux-form';

import {createCampaign} from '../actions';
import {validateCampaign} from '../utils/validate';

import Input from './Input';

class NewCampaign extends Component {
  onSubmit = ({minimumContribution}) => {
    this.props.onCreateCampaign(minimumContribution,() => {
      this.props.history.push('/');
    });
  };
  render() {
    const {error,loading,handleSubmit} = this.props;
    return (
      <div>
        <Link to="/">
          <Button basic color="teal">Campaigns</Button>
        </Link>
        <h3>Create a campaign</h3>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            name="minimumContribution"
            component={Input}
            caption="wei"
            captionPosition="right"
          />
          <Button loading={loading} primary>Create campaign</Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({campaigns}) => ({
  loading: campaigns.get('createCampaignLoading'),
  error: campaigns.get('createCampaignError')
});

const mapDispatchToProps = dispatch => ({
  onCreateCampaign: (minimumContribution,cb) => dispatch(createCampaign(minimumContribution,cb))
});

export default connect(mapStateToProps,mapDispatchToProps)(
  reduxForm({
    form: 'createCampaign',
    validate: validateCampaign
  })(NewCampaign)
);