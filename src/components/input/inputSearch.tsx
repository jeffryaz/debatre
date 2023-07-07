import { faCircleNotch, faMicrophoneLines } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
    cancelAnimation,
    Easing,
} from 'react-native-reanimated';

interface IInputSearch {
    getValue: (data: any) => any;
    value?: string
}

const InputSearch = (props: IInputSearch): JSX.Element => {
    const { getValue, value = '' } = props;
    const spinValue = useSharedValue<number>(0);
    const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false);
    const timeoutRef = useRef<any>(null);
    const [searchText, setSearchText] = useState<string>(value);

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

    const getValueWithDebounce = useCallback(() => {
        if (value !== searchText) {
            getValue(searchText);
        }
    }, [searchText, getValue]);

    useEffect(() => {
        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
        }

        if (searchText !== '') {
            setIsLoadingSearch(true);
            timeoutRef.current = setTimeout(() => {
                getValueWithDebounce();
            }, 1500);
        } else {
            setIsLoadingSearch(false);
            getValueWithDebounce();
        }
    }, [searchText, getValueWithDebounce]);

    // useEffect(() => {
    //     if (isLoading && !isLoading) {
    //         console.log('masuk1');

    //         setIsLoadingSearch(false);
    //     }
    //     console.log('masuk-2', isLoading);

    // }, [isLoading])

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotateZ: `${spinValue.value}deg`,
                },
            ],
        };
    }, [spinValue.value]);

    const onChangeValue = (text: string): void => {
        setSearchText(text);
    }

    return (
        <View>
            <View style={styles.containerHeader}>
                <FontAwesomeIcon icon={faMicrophoneLines} color={'#60777f'} size={24} style={styles.iconInputSearch} />
                <TextInput
                    inlineImagePadding={100}
                    style={styles.inputSearch}
                    autoFocus={true}
                    onChangeText={onChangeValue}
                    value={searchText}
                />
                <Animated.View style={[styles.iconLoadingSearch, animatedStyles, { opacity: isLoadingSearch ? 1 : 0 }]}>
                    <FontAwesomeIcon icon={faCircleNotch} color={'#60777f'} size={24} />
                </Animated.View>
            </View>
        </View>
    )
}

export default InputSearch;


const styles = StyleSheet.create({
    containerHeader: {
        height: 50,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15
    },
    iconInputSearch: {
        position: 'absolute',
        marginTop: 13,
        marginLeft: 8,
        zIndex: 1
    },
    iconLoadingSearch: {
        position: 'absolute',
        right: 0,
        marginTop: 13,
        marginRight: 8,
        zIndex: 1
    },
    inputSearch: {
        borderColor: 'white',
        borderRadius: 5,
        paddingLeft: 35,
        paddingRight: 35,
        backgroundColor: 'white',
        color: 'black',
        fontFamily: 'Sriracha'
    },
});