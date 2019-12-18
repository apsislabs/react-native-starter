import { configureStore } from "@reduxjs/toolkit";

import reducer from '../reducers/root';

export const initializeStore = () => {
    const store = configureStore({ reducer: reducer });

    return store;
}