import React, { useEffect, Fragment , useContext } from "react";
import { getAsValue , setAsValue , isExpire} from '@utils';
import { useStore } from '@mobx/hooks';
import { AuthContext } from '@context/auth-context';


const StartupScreen = () => {
    const { appStore } = useStore();
    const auth = useContext(AuthContext);
    useEffect(() => {
        (async () => {
            checkForTrusted();
            checkSession();
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
        if (trusted && trusted == "1") {
            appStore.setTrustedDevice(true);
        } else {
            appStore.setTrustedDevice(false);
        }
    }

    const logout = async () => {
        appStore.setCurrentUser(null);
        await setAsValue("currentUser", '');
        await setAsValue('LastUpdatedTime', '');
        await setAsValue('isTrusted', "0");
        await setAsValue("isTrusted", "false");
        appStore.setTrustedDevice(false);
        auth.logout();
      }
    
      const checkSession = async () => {
        if (!appStore.isTrustedDevice) {
          const isTimeOut = await isExpire();
          if (isTimeOut) {
            logout();
          }
        }
      }

    return (
        <Fragment />
    )
}

export default StartupScreen;