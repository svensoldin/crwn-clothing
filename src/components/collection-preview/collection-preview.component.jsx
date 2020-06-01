import React from 'react';
import { Link } from 'react-router-dom';
import './collection-preview.styles.scss';
import CollectionItem from '../collection-item/collection-item.component.jsx';

const CollectionPreview = ({ title, items }) => {
	return (
		<div className="collection-preview">
			<Link className="title" to={`/shop/${title.toLowerCase()}`}>{title.toUpperCase()}</Link>
			<div className="preview">
				{items
					.filter((item, idx) => idx < 4)
					.map((item, i) => (
						<Link to={`/shop/${title.toLowerCase()}/${i}`} key={item.id}><CollectionItem item={item} /></Link>
					))}
			</div>
		</div>
	);
};

export default CollectionPreview;
