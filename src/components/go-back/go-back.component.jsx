import React from 'react';
import { withRouter } from 'react-router-dom';
import { ReactComponent as BackArrow} from '../../assets/back.svg';

import './go-back.styles.scss';

const GoBack = ({ history }) => (
	<BackArrow className='back-arrow' onClick={() => history.goBack()} name='Go Back' />
);

export default withRouter(GoBack);