import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, StyleSheet, View } from "react-native"

interface ITextStagger {
    textStyle: object;
    content: string;
    duration: number;
}

const animatedValues: any[] = [];

const TextStagger = (props: ITextStagger): JSX.Element => {
    const [textArr, setTextArr] = useState<any[]>(props.content.trim().split(' '));
    const { i18n } = useTranslation();

    useEffect(() => {
        setTextArr(props.content.trim().split(' '));
        textArr.forEach((_: string, i: number) => {
            animatedValues[i] = new Animated.Value(0);
        });
        animated();
    }, [i18n.language])

    const animated = (toValue: number = 1): void => {
        const animations: any = textArr.map((_: string, i: number) => {
            return Animated.timing(animatedValues[i], {
                toValue,
                duration: props.duration,
                useNativeDriver: true
            });
        });

        Animated.stagger(props.duration / 5, animations).start();
    }

    return (
        <View style={[styles.textWrapper]}>
            {
                textArr.map((word: string, index: number) => {
                    return (
                        <Animated.Text key={`${word}-${index}`} style={[
                            props.textStyle,
                            {
                                opacity: animatedValues[index]
                            }
                        ]}>
                            {word}
                            {`${index < textArr.length ? ' ' : ''}`}
                        </Animated.Text>
                    )
                })
            }
        </View>
    )
}

export default TextStagger;


const styles = StyleSheet.create({
    textWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
})