import React from 'react';
import {Form,Input,Label} from 'semantic-ui-react';

const input = ({meta: {touched,error},input,label,caption,captionPosition}) => (
  <Form.Field>
    <label>{label}</label>
    <Input
      style={{display: 'block'}}
      label={caption}
      labelPosition={captionPosition}
      {...input}
    />
    {touched && error && <Label basic color="red" pointing>{error}</Label>}
  </Form.Field>
);

export default input;