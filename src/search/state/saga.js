import {all, put, takeEvery, call} from "@redux-saga/core/effects";
import {Types, actions} from "./index";
import {callApi} from "../../common/util/api";

function* fetchAutoComplete({keyword}) {
    const {isSuccess, data} = yield call(callApi, {
        url: '/user/search',
        params: {keyword},
    });

    if (isSuccess && data) {
        yield put(actions.setValue('autoCompletes', data))
    }
}

export default function* () {
    yield all([
        takeEvery(Types.FetchAutoComplete, fetchAutoComplete),
    ])
}