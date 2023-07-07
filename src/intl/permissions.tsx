import { PermissionsAndroid } from "react-native";

export const requestLocationPermission = async (title: string, message: string, buttonPositive: string): Promise<any> => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title,
                message,
                buttonPositive
            }
        )
        return granted;
    } catch (err) {
        return err;
    }
}