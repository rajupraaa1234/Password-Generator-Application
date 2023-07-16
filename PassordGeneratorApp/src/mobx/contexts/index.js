import React, { createContext } from "react";

import { AppStore } from '../stores/AppStore';

export const storeContext = createContext({
    appStore: new AppStore(),
})