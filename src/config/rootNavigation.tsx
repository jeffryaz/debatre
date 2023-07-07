import { createNavigationContainerRef } from '@react-navigation/native';

type RootStackParamList = {
    Profile: undefined;
    Home: undefined;
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>()

export function navigate(name: any, params: any): void {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
}