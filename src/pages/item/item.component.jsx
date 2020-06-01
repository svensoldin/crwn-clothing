import React from 'react';
import { connect } from 'react-redux';
import { addItem } from '../../redux/cart/cart.actions';

import CustomButton from '../../components/custom-button/custom-button.component';
import './item.styles.scss';

const ItemPage = ({ match, collection, addItem }) => {
	const item = collection.items[match.params.itemId];
	const { imageUrl, name, price } = item;
	return (
		<div className="item-page">
			<div className='image'>
				<img src={`${imageUrl}`} alt={`${name}`}/>
			</div>
			<div className='info-button'>
				<div className="info">
					<h1>{name}</h1>
					<h2>${price}</h2>
				</div>
				<div className='button'>
					<CustomButton
						className="custom-button"
						onClick={() => addItem(item)}
						inverted
					>
						Add to cart
					</CustomButton>
				</div>
			</div>
		</div>
	);
};

const mapDispatchToProps = dispatch => ({
	addItem: (item) => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps)(ItemPage);
