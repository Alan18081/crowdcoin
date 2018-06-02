export const validateContribute = ({value}) => {
  const errors = {};
  if(!value) {
    errors.value = 'Please, put some ether';
  }
  return errors;
};

export const validateRequest = ({value,description,recipient}) => {
  const errors = {};
  if(!value) {
    errors.value = 'You need to provide amount of ether';
  }
  if(!description) {
    errors.description = 'You need to provide description of request';
  }
  if(!recipient) {
    errors.recipient = 'You need to provide address of recipient';
  }
  return errors;
};

export const validateCampaign = ({minimumContribution}) => {
  const errors = {};
  if(!minimumContribution) {
    errors.minimumContribution = 'You don\'t provide minimum contribution';
  }
  return errors;
};