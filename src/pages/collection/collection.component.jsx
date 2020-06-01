import React from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { selectCollection } from '../../redux/shop/shop.selectors';

import CollectionItem from '../../components/collection-item/collection-item.component';
import ItemPage from '../item/item.component';
import GoBack from '../../components/go-back/go-back.component';
import './collection.styles.scss';

const CollectionPage = ({ collection, match }) => {
	const { title, items } = collection;
	return (
		<div className="collection-page">
			<Route exact path={`${match.path}`}>
				<header className='collection-header'>
					<GoBack />
					<h2 className="title">{title}</h2>
				</header>
				<div className="items">
					{items.map((item, i) => (
						<Link to={`${match.url}/${i}`} key={item.id}>
							<CollectionItem item={item} collectionName={`${match.url}`} index={i} />
						</Link>	
					))}
				</div>
			</Route>
			<Route
				exact
				path={`${match.path}/:itemId`}
				render={(obj) => (
					<ItemPage
						collection={collection}
						match={obj.match}
						history={obj.history}
					/>
				)}
			/>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => ({
	collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);
