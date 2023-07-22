import React, { useEffect, Fragment } from "react";
import { getAsValue } from '@utils';
import { useStore } from '@mobx/hooks';


const StartupScreen = () => {
    const { appStore } = useStore();
    useEffect(() => {
        (async () => {
            const skipped = await getAsValue('skip');
            const loggined = await getAsValue('currentUser');
            if (loggined) {
                appStore.setCurrentUser(loggined);
            } else if (skipped === '1') {
                appStore.setSkipped(true);
            }
        })();
    })
    return (
        <Fragment />
    )

}

export default StartupScreen;