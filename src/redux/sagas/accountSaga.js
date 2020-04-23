import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* deleteAccountFavorite(action) {
    try{
        console.log('in sagas deleteAccountFavorite', action.payload);
        let objectToSend = action.payload.id;
        yield axios.delete(`/api/account/interest/${objectToSend}`)
        yield put({
            type: 'FETCH_ACCOUNT',
            payload: action.payload.user_id
        })
    } catch (error) {
        console.log("error deletingFavorite", error);
    }
}
function* updateAccountListing(action) {
    try{
        console.log('in sagas updateAccountProperty', action.payload);
        let objectToSend = action.payload.id;
        yield axios.put(`/api/account/property/${objectToSend}`)
        yield put({
            type: 'FETCH_ACCOUNT',
            payload: action.payload.user_id
        })
    } catch (error) {
        console.log("error updateAccountListing", error);
    }
}
function* fetchAccountListing(action) {
    try {
        console.log('from sagas fetchAccountListing');
        let objectToSend = action.payload;
        console.log('checking objectToSend', objectToSend);
        const accountResponse = yield axios.get(`/api/account/property`)
        console.log('in the GET fetchAccountListing', accountResponse)
        yield put({
            type: 'SET_ACCOUNT_LISTING',
            payload: accountResponse.data
        })
    } catch (error) {
        console.log("error in fetchAccountListing Sagas", error);
    }
}
function* fetchAccountFavorite(action) {
    try {
        console.log('from sagas fetchAccountFavorite');
        let objectToSend = action.payload;
        console.log('checking objectToSend', objectToSend);
        const accountResponse = yield axios.get(`/api/account/favorite`)
        console.log('in the GET fetchAccountFavorite', accountResponse)
        yield put({
            type: 'SET_ACCOUNT_FAVORITE',
            payload: accountResponse.data
        })
    } catch (error) {
        console.log("error in fetchAccountFavorite Sagas", error);
    }
}

function* fetchAccountInterest(action) {
    try {
        console.log('from sagas fetchAccountFavorite');
        let objectToSend = action.payload;
        console.log('checking objectToSend', objectToSend);
        const accountResponse = yield axios.get(`/api/account/interest`)
        console.log('in the GET fetchAccountFavorite', accountResponse)
        yield put({
            type: 'SET_INTERESTS',
            payload: accountResponse.data
        })
    } catch (error) {
        console.log("error in fetchAccountFavorite Sagas", error);
    }
}
function* accountSaga() {
    yield takeEvery('FETCH_ACCOUNT', fetchAccountListing);
    yield takeEvery('FETCH_ACCOUNT', fetchAccountFavorite);
    yield takeEvery('FETCH_ACCOUNT', fetchAccountInterest);
    yield takeEvery('DELETE_FAVORITE', deleteAccountFavorite);
}
export default accountSaga;