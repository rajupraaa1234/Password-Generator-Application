import React, { useContext } from "react";
import { storeContext } from "../contexts";

export const useStore = useContext(storeContext);