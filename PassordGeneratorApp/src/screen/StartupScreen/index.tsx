import React, { useEffect, Fragment } from "react";
import { getAsValue } from '@utils';
import { useStore } from '@mobx/hooks';


const StartupScreen = () => {
    const { appStore } = useStore();
    useEffect(() => {
        (async () => {
            checkForTrusted();
            const skipped = await getAsValue('skip');
            const loggined = await getAsValue('currentUser');
            if (loggined) {
                appStore.setCurrentUser(loggined);
            } else if (skipped === '1') {
                appStore.setSkipped(true);
            }
        })();
    })
    const checkForTrusted = async () => {
        const trusted = await getAsValue("isTrusted");
        if (trusted == "1") {
            appStore.setTrustedDevice(true);
        } else {
            appStore.setTrustedDevice(false);
        }
    }
    return (
        <Fragment />
    )
}

export default StartupScreen;