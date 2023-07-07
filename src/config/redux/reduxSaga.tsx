import { all } from "redux-saga/effects";
import LoadSagas from "./saga";

export default function* reduxSaga() {
    yield all(LoadSagas);
}
