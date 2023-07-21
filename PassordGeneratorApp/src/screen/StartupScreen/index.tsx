import React, { useEffect, Fragment } from "react";
import { getAsValue } from '@utils';
import { useStore } from '@mobx/hooks';


const StartupScreen = () => {
    const { appStore } = useStore();

    useEffect(() => {
        (async () => {
            const skipped = await getAsValue('skip');
            if (skipped === '1') {
                appStore.setSkipped(true);
            }
        })();
    })
    return (
        <Fragment />
    )

}

export default StartupScreen;