import {all, put, takeEvery, call} from "@redux-saga/core/effects";
import {Types} from "./index";
import {callApi} from "../../common/util/api";
import {actions} from "../../search/state";

function* fetchUser({ name }) {
    const { isSuccess, data } = yield call(callApi, {
        url: '/user/search',
        params: { keyword: name }
    })
    if (isSuccess && data) {
        const user = data.find(item => item.name === name);
        if (user) {
            yield put(actions.setValue('user', user));
        }
    }
}

export default function* () {
    yield all([takeEvery(Types.FetchUser, fetchUser)]);
}