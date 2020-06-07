import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem } from '../../redux/cart/cart.actions';
import CustomButton from '../custom-button/custom-button.component';
import './collection-item.styles.scss';

const CollectionItem = ({ item, addItem, linkUrl, i }) => {
	const { name, price, imageUrl } = item;
	return (
		<div className='collection-item-container'>
			<Link to={`${linkUrl}`} className="collection-item">
				<div
					className="image"
					style={{
						backgroundImage: `url(${imageUrl})`,
					}}
				/>
				<div className="collection-footer">
					<span className="name">{name}</span>
					<span className="price">
						<b>{price}</b>
					</span>
				</div>
			</Link>						
				<CustomButton
					className="custom-button"
					onClick={() => addItem(item)}
					inverted
				>
					Add to cart
				</CustomButton>	
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
