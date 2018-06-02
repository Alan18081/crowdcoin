import React, {Component} from 'react';
import {Message,Button} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {reduxForm,SubmissionError,Field} from 'redux-form';
import web3 from '../ethereum/web3';

import {contribute} from '../actions';
import {validateContribute} from '../utils/validate';
import Input from './Input';

class ContributeForm extends Component {
  onSubmit = async ({value}) => {
    if(web3.utils.toWei(value,'ether') < this.props.min) {
      throw new SubmissionError();
    }
    else {
      this.props.onContribute(this.props.address,value);
    }
  };
  render() {
    const {error,loading,handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field name="value" component={Input}/>
        {error && <Message error header="Oops!" content={error}/>}
        <Button loading={loading} primary>Contribute</Button>
      </form>
    )
  }
}

const mapStateToProps = ({campaigns}) => ({
  loading: campaigns.get('contributeLoading'),
  error: campaigns.get('contributeError')
});

const mapDispatchToProps = dispatch => ({
  onContribute: (address,value) => dispatch(contribute(address,value))
});

export default connect(mapStateToProps,mapDispatchToProps)(
  reduxForm({
    form: 'contribute',
    validate: validateContribute
  })(ContributeForm)
);