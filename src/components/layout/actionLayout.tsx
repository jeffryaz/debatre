import { actionTypes } from "./configLayout";

export const actions = {
    setLocale: (locale: any) => ({ type: actionTypes.Locale, payload: { locale } }),
    setDevicesUniqueId: (devicesUniqueId: any) => ({ type: actionTypes.DevicesUniqueId, payload: { devicesUniqueId } }),
};
