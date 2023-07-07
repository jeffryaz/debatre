import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import SystemNavigationBar from 'react-native-system-navigation-bar';
import Video from 'react-native-video';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleNotch, faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import Animated, { Easing, cancelAnimation, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { cloneDeep } from "lodash";


interface RootState {
    layout: any
}
const resolutionVideoTop: any = {
    type: 'resolution',
    value: 320
}
// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

const array = [
    {
        url: 'https://download.pexels.com/vimeo/464508537/pexels-mehmet-ali-turan-5512609.mp4?fps=25.0&width=240',
        waitingLoad: false,
        firstName: 'Jeffry'
    },
    {
        url: 'https://download.pexels.com/vimeo/464508537/pexels-mehmet-ali-turan-5512609.mp4?fps=25.0&width=240',
        waitingLoad: false,
        firstName: 'Jeffry'
    },
    {
        url: 'https://download.pexels.com/vimeo/464508537/pexels-mehmet-ali-turan-5512609.mp4?fps=25.0&width=240',
        waitingLoad: false,
        firstName: 'Jeffry'
    },
    {
        url: 'https://download.pexels.com/vimeo/464508537/pexels-mehmet-ali-turan-5512609.mp4?fps=25.0&width=240',
        waitingLoad: false,
        firstName: 'Jeffry'
    },
    {
        url: 'https://download.pexels.com/vimeo/464508537/pexels-mehmet-ali-turan-5512609.mp4?fps=25.0&width=240',
        waitingLoad: false,
        firstName: 'Jeffry'
    },
]

const RoomDebatre = (props: any): JSX.Element => {
    const { t } = useTranslation();
    const [windowWidth, setWindowWidth]: any = useState(480 / 8)
    const [windowHeight, setWindowHeight]: any = useState(854 / 8)
    const spinValue = useSharedValue<number>(0);
    const [dataVideo, setDataVideo] = useState<any>([]);
    const [timer, setTimer] = useState(3600);


    useEffect(() => {
        SystemNavigationBar.stickyImmersive(true);
        SystemNavigationBar.fullScreen(true);
        return () => {
            SystemNavigationBar.stickyImmersive(false);
            SystemNavigationBar.fullScreen(false);
        }
    }, [])

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setWindowWidth(Dimensions.get('window').width);
            setWindowHeight(Dimensions.get('window').height);
        }, 500);
        setDataVideo(array)
    }, [])

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1); // Mengurangi timer setiap detik
        }, 1000);

        // Membersihkan interval saat komponen di-unmount
        return () => {
            clearInterval(countdown);
        };
    }, []);

    const videoError = (error: any): void => {
        console.log('error load', error);
    }

    const videoEnd = (): void => {
        console.log('selesai load');

    }

    const videoLoad = (id: number): void => {
        console.log('sedang di load - ' + 'atas-' + (id + 1));
        const data = cloneDeep(dataVideo);
        data[id].waitingLoad = false;
        setDataVideo(data);
    }

    const onPress = (id: any): void => {
        console.log('kepencet', id + 1);

    }

    const onLoadStart = (id: number) => {
        const data = cloneDeep(dataVideo);
        data[id].waitingLoad = true;
        setDataVideo(data);

    }


    useEffect(() => {
        spinValue.value = withRepeat(
            withTiming(360, {
                duration: 1000,
                easing: Easing.linear,
            }),
            -1
        );
        return () => cancelAnimation(spinValue);
    }, []);


    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotateZ: `${spinValue.value}deg`,
                },
            ],
        };
    }, [spinValue.value]);

    const formatTime = (time: number) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };


    return (
        <>

            <View style={styles.containerTimer}>
                <View style={styles.containerLabelTimer}>
                    <Text style={styles.textTimer}>{formatTime(timer)} <FontAwesomeIcon icon={faClockRotateLeft} color={'white'} size={16} /></Text>

                </View>
            </View>
            <View style={[styles.containerParticipan, { position: 'absolute', top: 0, left: 0 }]}>
                {
                    dataVideo.length > 0 ? dataVideo.map((v: { url: string, waitingLoad: boolean, firstName: string }, i: number) => {
                        return (
                            <View key={i.toString()} style={[{ borderRadius: 5 }]}>
                                <Pressable
                                    onPress={() => onPress(i)}
                                    android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
                                    style={({ pressed }) => [
                                        styles.coverVideoParticipan, { width: windowWidth / 13.9, height: windowHeight / 3.9 },
                                        { borderColor: pressed ? 'lightblue' : 'white', shadowColor: pressed ? 'blue' : 'transparent' },
                                    ]}
                                >
                                    <Video
                                        source={{ uri: v.url }}
                                        controls={false}
                                        onError={videoError}
                                        onEnd={videoEnd}
                                        style={[[{ width: windowWidth / 14.4, height: windowHeight / 3.99, borderRadius: 5, }]]}
                                        resizeMode="stretch"
                                        repeat={true}
                                        selectedVideoTrack={resolutionVideoTop}
                                        onLoad={() => videoLoad(i)}
                                        muted={true}
                                        onLoadStart={() => onLoadStart(i)}
                                    >
                                    </Video>
                                    <View style={styles.labelNameItemVideoParticipan}>
                                        <Text style={styles.textNameItemVideoParticipan}>{v.firstName}</Text>
                                    </View>
                                </Pressable>
                                <Animated.View style={[styles.iconLoadingLoadVideo, animatedStyles, { opacity: dataVideo[i].waitingLoad ? 1 : 0, zIndex: dataVideo[i].waitingLoad ? 3 : 1 }]}>
                                    <FontAwesomeIcon icon={faCircleNotch} color={'white'} size={24} />
                                </Animated.View>
                            </View>
                        )
                    }) : null
                }
            </View>

            <View style={[styles.containerParticipan, { position: 'absolute', bottom: 0, right: 0 }]}>
                {
                    dataVideo.length > 0 ? dataVideo.map((v: { url: string, waitingLoad: boolean, firstName: string }, i: number) => {
                        return (
                            <View key={i.toString()} style={[{ borderRadius: 5 }]}>
                                <Pressable
                                    onPress={() => onPress(i)}
                                    android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
                                    style={({ pressed }) => [
                                        styles.coverVideoParticipan, { width: windowWidth / 13.9, height: windowHeight / 3.9 },
                                        { borderColor: pressed ? 'lightblue' : 'white', shadowColor: pressed ? 'blue' : 'transparent' },
                                    ]}
                                >
                                    <Video
                                        source={{ uri: v.url }}
                                        controls={false}
                                        onError={videoError}
                                        onEnd={videoEnd}
                                        style={[[{ width: windowWidth / 14.4, height: windowHeight / 3.99, borderRadius: 5, }]]}
                                        resizeMode="stretch"
                                        repeat={true}
                                        selectedVideoTrack={resolutionVideoTop}
                                        onLoad={() => videoLoad(i)}
                                        muted={true}
                                        onLoadStart={() => onLoadStart(i)}
                                    >
                                    </Video>
                                    <View style={styles.labelNameItemVideoParticipan}>
                                        <Text style={styles.textNameItemVideoParticipan}>{v.firstName}</Text>
                                    </View>
                                </Pressable>
                                <Animated.View style={[styles.iconLoadingLoadVideo, animatedStyles, { opacity: dataVideo[i].waitingLoad ? 1 : 0, zIndex: dataVideo[i].waitingLoad ? 3 : 1 }]}>
                                    <FontAwesomeIcon icon={faCircleNotch} color={'white'} size={24} />
                                </Animated.View>
                            </View>
                        )
                    }) : null
                }
            </View>
        </>
    )
}
const mapStateToProps = (state: RootState): any => ({
    initLocale: state.layout.locale,
});
const mapDispatchToProps = (dispatch: any): any => ({
    // onSetLocale: (value: any) => dispatch(layout.actions.setLocale(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomDebatre);

const styles = StyleSheet.create({
    containerParticipan: {
        flexDirection: 'row',
        margin: 10
    },
    coverVideoParticipan: {
        borderRadius: 5,
        // width: windowWidth / 14,
        // width: 480 / 8,
        // height: windowHeight / 4,
        // height: 854 / 8,
        margin: 2.5,
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: '#60777f',
        zIndex: 2,
        shadowOffset: {
            width: 6,
            height: 10,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 4,
    },
    labelNameItemVideoParticipan: {

    },
    textNameItemVideoParticipan: {
        textAlign: 'center',
        fontSize: 12
    },
    iconLoadingLoadVideo: {
        position: 'absolute',
        right: 18,
        top: 40,
        zIndex: 1
    },
    containerTimer: {
        alignItems: 'center',
        marginTop: 15
    },
    containerLabelTimer: {
        paddingRight: 8,
        paddingLeft: 8,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 5
    },
    textTimer: {
        fontSize: 20,
        fontFamily: 'Sriracha',
        color: 'white'
    }
})