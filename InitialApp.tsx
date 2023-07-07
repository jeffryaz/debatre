import { connect } from "react-redux";
import React, { useEffect, useState } from 'react';
import { AppState, BackHandler, Image, Linking, PermissionsAndroid, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Routes } from "./src/config/routes";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import * as RootNavigation from "./src/config/rootNavigation";
import KeepAwake from "react-native-keep-awake";
import { ModalConfirm } from "./src/components/modal";
import { useTranslation } from "react-i18next";
import { requestLocationPermission } from "./src/intl/permissions";
import RNExitApp from 'react-native-exit-app';
import DeviceInfo from "react-native-device-info";
import * as layout from './src/components/layout/actionLayout';


interface RootState {
    layout: any
}

interface IRoutes {
    path: string;
    name: string;
    component: any;
    options: any;
}
const Stack = createNativeStackNavigator();

const HeaderRight = (props: any): JSX.Element => {
    const goProfile = (): void => {
        RootNavigation.navigate('Profile', {});
    }
    const goSearch = (): void => {
        RootNavigation.navigate('Search', {});
    }

    return (
        <View style={styles.HeaderRight}>
            <View>
                <TouchableHighlight underlayColor="transparent" onPress={goSearch}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} color={'white'} size={24} />
                </TouchableHighlight>
            </View>
            <View>
                <TouchableHighlight underlayColor="transparent" onPress={goProfile}>
                    <FontAwesomeIcon icon={faCircleUser} color={'white'} size={24} />
                </TouchableHighlight>
            </View>
        </View>
    )
}

const HeaderLogo = (props: any): JSX.Element => {
    const goAbout = (): void => {
        RootNavigation.navigate('About', {});
    }

    return (
        <View>
            <TouchableHighlight underlayColor="transparent" onPress={goAbout}>
                <Image
                    style={styles.debatre}
                    source={require('./src/assets/png/debatre-name.png')}
                />
            </TouchableHighlight>
        </View>
    )
}

interface IInitialApp {
    initDevicesUniqueId: string;
    initLocale: string;
    onSetDevicesUniqueId: any;
    rootTag: number;
    setBackground: any;
    onSetLocale: any
}

const InitialApp = (props: IInitialApp): JSX.Element => {
    const { setBackground, initLocale, initDevicesUniqueId, onSetDevicesUniqueId, onSetLocale } = props;
    const { t, i18n } = useTranslation();
    const [modalExitApp, setModalExitApp] = useState<boolean>(false);
    const [modalLocationPermission, setModalLocationPermission] = useState<boolean>(false);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backPressed);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', backPressed);
        }
    }, []);

    useEffect(() => {
        if (initLocale) {
            i18n.changeLanguage(initLocale);
        } else {
            i18n.changeLanguage('id');
            onSetLocale('id');
        }
        DeviceInfo.getUniqueId().then((uniqueId) => {
            const devicesUniqueId: string = uniqueId;
            if (!initDevicesUniqueId) {
                onSetDevicesUniqueId(devicesUniqueId);
            }
        });
    }, []);

    const handleLocationPermission = async () => {
        const result = await requestLocationPermission(t('LOCATION_ACCESS'), t('MESSAGE_LOCATION_ACCESS'), t('YES'));
        if (typeof result === 'string' && result === PermissionsAndroid.RESULTS.DENIED) {
            setModalLocationPermission(true);
        } else if (typeof result === 'string' && result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            setModalLocationPermission(true);
        } else {
            console.info('handleLocationPermission-', result)
        }
    }

    useEffect(() => {
        const subscription = AppState.addEventListener('focus', () => {
            handleLocationPermission();
        });

        return () => subscription.remove();
    }, []);

    const onReadyNavigation = (): void => {
        SplashScreen.hide();
        KeepAwake.activate();
    }

    const backPressed = (): any => {
        const rootState = RootNavigation.navigationRef.getRootState();
        const currentState: any = RootNavigation.navigationRef.getCurrentRoute();
        if (rootState.routeNames[0] === 'Home' && currentState.name === 'Home') {
            setModalExitApp(true);
            return true;
        }
    }

    const ContentModalConfirm = (): JSX.Element => {
        return (<View>
            <Text style={{ color: 'black', fontFamily: 'Sriracha', fontSize: 14 }}>{t('EXIT_APP_MESSAGE')}</Text>
        </View>)
    }

    const ContentModalLocationPermission = (): JSX.Element => {
        return (<View>
            <Text style={{ color: 'black', fontFamily: 'Sriracha', fontSize: 14 }}>{t('MESSAGE_LOCATION_ACCESS')}</Text>
        </View>)
    }

    const onPressNoModalConfirm = (): void => {
        setModalExitApp(false);
    }

    const onPressNoModalLocationPermission = (): void => {
        setModalLocationPermission(false);
        RNExitApp.exitApp();
    }

    const onPressYesModalConfirm = (): void => {
        setModalExitApp(false);
        RNExitApp.exitApp();
    }

    const onPressYesModalLocationPermission = (): void => {
        setModalLocationPermission(false);
        Linking.openSettings();
        RNExitApp.exitApp();
    }

    return (
        <NavigationContainer ref={RootNavigation.navigationRef} onReady={onReadyNavigation}>
            <Stack.Navigator
                initialRouteName='Home'
                screenOptions={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: 'transparent'
                    },
                    headerShadowVisible: false,
                    headerTintColor: '#FFFFFF',
                    headerTitleAlign: 'center',
                    headerTitle: '',
                    contentStyle: styles.contentStyle,
                    headerRight: () => (<HeaderRight {...props} />),
                    headerLeft: () => (<HeaderLogo {...props} />)

                }}
            >
                {
                    Routes.map((item: IRoutes, index: number) => <Stack.Screen key={index.toString()} name={item.path} component={item.component} options={{
                        ...item.options
                    }} />)
                }
            </Stack.Navigator>
            <ModalConfirm visible={modalExitApp} title={t('EXIT_APP')} content={<ContentModalConfirm />} onPressNo={onPressNoModalConfirm} onPressYes={onPressYesModalConfirm} />
            <ModalConfirm visible={modalLocationPermission} title={t('LOCATION_ACCESS')} labelCancel={t('EXIT_APP')} labelOk={t('OPEN_SETTINGS')} content={<ContentModalLocationPermission />} onPressNo={onPressNoModalLocationPermission} onPressYes={onPressYesModalLocationPermission} />
        </NavigationContainer>
    )
}

const mapStateToProps = (state: RootState): any => ({
    initLocale: state.layout.locale,
    initDevicesUniqueId: state.layout.devicesUniqueId,
});
const mapDispatchToProps = (dispatch: any): any => ({
    onSetDevicesUniqueId: (value: any) => dispatch(layout.actions.setDevicesUniqueId(value)),
    onSetLocale: (value: any) => dispatch(layout.actions.setLocale(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InitialApp);

const styles = StyleSheet.create({
    debatre: {
        width: 80,
        height: 50,
        resizeMode: 'contain'
    },
    contentStyle: {
        backgroundColor: 'transparent',
    },
    HeaderRight: {
        flexDirection: 'row',
        gap: 20
    },

});