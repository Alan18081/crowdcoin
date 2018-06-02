import React from 'react';
import { Menu } from 'semantic-ui-react';
import {Link} from 'react-router-dom';

export default () => (
  <Menu>
    <Menu.Item>
      <Link to="/">
        CrowdCoin
      </Link>
    </Menu.Item>
  </Menu>
);