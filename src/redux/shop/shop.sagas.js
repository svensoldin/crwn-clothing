import { takeLatest, call, put, all } from 'redux-saga/effects';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';

import ShopActionTypes from './shop.types';

export function* fetchCollectionsStart() {
	yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync)
};

export function* fetchCollectionsAsync() {
	try {
	//Get the collection from the firestore
	const collectionRef = firestore.collection('collections');

	//Get the snapshot from the collection
	const snapshot = yield collectionRef.get();

	//Convert the snapshot into collectionMap
	const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);

	//"Dispatch" the success action with collectionsMap as payload, using 'put', an effect mimicking dispatch.
	yield put(fetchCollectionsSuccess(collectionsMap));
	} catch(error) {
		yield put(fetchCollectionsFailure(error));
	}
};

export function* shopSagas() {
	yield all([call(fetchCollectionsStart)])
};