import { faEarListen, faMinus, faO } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { ImageBackground, StyleSheet, Text, TouchableHighlight, View, Pressable, Linking } from "react-native";
import * as RootNavigation from "../../config/rootNavigation";
import { useTranslation } from "react-i18next";
import FastImage from "react-native-fast-image";


const styles = StyleSheet.create({
    containerCard: {
        borderRadius: 10,
        backgroundColor: '#76959F',
        width: 175,
        height: 245,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 3,
        marginRight: 3
    },
    ImageBackgroundStyle: {
        width: 175,
        height: 175
    },
    ImageBackgroundImageStyle: {
        flex: 1,
        resizeMode: 'cover',
        borderRadius: 10
    },
    ImageBackgroundContainer: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',

    },
    ImageBackgroundContainerContent: {
        backgroundColor: 'red',
        position: 'absolute',
        bottom: 0,
        paddingRight: 3,
        paddingLeft: 3,
        margin: 5,
        borderRadius: 5,
        minWidth: 40,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    ImageBackgroundContainerText: {
        color: 'white',
        fontSize: 12,
        fontFamily: 'Sriracha',
    },
    ImageBackgroundContainerIcon: {
        color: 'white',
        marginTop: 3,
        marginLeft: 2
    },
    cardContentText: {
        padding: 5
    },
    cardHeader: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Sriracha',
        lineHeight: 28
    },
    cardBody: {
        color: '#E9E9E9',
        fontSize: 10,
        fontFamily: 'Sriracha',
        lineHeight: 14
    },
    cardMoreContentText: {
        padding: 5,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    cardMoreBody: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Sriracha',
        textAlign: 'center',
        textAlignVertical: "center",
    },
    containerCardBorderItemDebatre: {
        borderRadius: 10,
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 20,
        borderWidth: 2,
        borderColor: 'white'
    },
    textCardBorderItemDebatre: {
        color: 'white',
        fontFamily: 'Sriracha'
    },
    listCardBorderItemDebatre: {
        flexDirection: 'row',
        // alignItems: "stretch",
        gap: 5
    },
    listImageCardBorderItemDebatre: {
        height: 35,
        width: 35,
        borderRadius: 5,
        alignSelf: 'center'
    }
})

const regexUrl: RegExp = /(https?:\/\/[^\s]+)|(www\.[^\s]+)/g;

interface ICard {
    route: string
}

export const Card = (props: ICard): JSX.Element => {
    const go = (): void => {
        RootNavigation.navigate(props.route, {});
    }
    return (
        <TouchableHighlight underlayColor="transparent" onPress={go}>
            <View style={styles.containerCard}>
                <ImageBackground source={require('../../assets/sample/kotak1.png')} style={styles.ImageBackgroundStyle} imageStyle={styles.ImageBackgroundImageStyle}>
                    <View style={styles.ImageBackgroundContainer}>
                        <View style={styles.ImageBackgroundContainerContent}>
                            <Text style={styles.ImageBackgroundContainerText}>10</Text>
                            <FontAwesomeIcon icon={faEarListen} size={12} style={styles.ImageBackgroundContainerIcon} />
                        </View>
                    </View>
                </ImageBackground>
                <View style={styles.cardContentText}>
                    <Text style={styles.cardHeader} numberOfLines={1} ellipsizeMode='tail'>Your Style Enjoy Style Your Photo</Text>
                    <Text style={styles.cardBody} numberOfLines={2} ellipsizeMode='tail'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}

interface ICardMore {
    routeMore: string
}

export const CardMore = (props: ICardMore): JSX.Element => {
    const { t } = useTranslation();
    const go = (): void => {
        RootNavigation.navigate(props.routeMore, {});
    }
    return (
        <TouchableHighlight underlayColor="transparent" onPress={go}>
            <View style={styles.containerCard}>
                <View style={styles.cardMoreContentText}>
                    <Text style={styles.cardMoreBody}>{t('READ_MORE')}</Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}

interface ICardBorderItemDebatre {
    title: string;
    desc: string | Array<any>;
    descType: string;
}

export const CardBorderItemDebatre = (props: ICardBorderItemDebatre): JSX.Element => {
    const { title, desc, descType } = props;

    const goUrl = async (url: string | undefined): Promise<void> => {
        if (url) await Linking.openURL(url);
    }

    return (
        <View style={styles.containerCardBorderItemDebatre}>
            <Text style={[styles.textCardBorderItemDebatre, { fontSize: 20 }]}>{title}:</Text>
            {
                descType === 'text' && typeof desc === 'string' && <ComponentTextHyperlink text={desc} />
            }
            {
                descType === 'list' && typeof desc === 'object' && <View>
                    {
                        desc.map((item: string, index: number) => <View key={index.toString()} style={styles.listCardBorderItemDebatre}>
                            <FontAwesomeIcon icon={faO} color="white" size={10} style={{ marginTop: 8 }} />
                            <ComponentTextHyperlink key={index.toString()} text={item} />
                        </View>)
                    }
                </View>
            }
            {
                descType === 'group-list' && typeof desc === 'object' && <View>
                    {
                        desc.map((item: any, index: number) => <View key={index.toString()}>
                            <View style={styles.listCardBorderItemDebatre}>
                                <FontAwesomeIcon icon={faO} color="white" size={10} />
                                <Text style={[styles.textCardBorderItemDebatre, { fontSize: 16 }]}>{`${item.groupName}`}</Text>
                            </View>
                            <View style={{ marginLeft: 15 }}>
                                {
                                    item.participan.map((a: string, i: number) => <View key={a + i} style={styles.listCardBorderItemDebatre}>
                                        <FontAwesomeIcon icon={faMinus} color="white" size={10} />
                                        <Text style={[styles.textCardBorderItemDebatre, { fontSize: 16 }]}>{`${a}`}</Text>
                                    </View>)
                                }
                            </View>
                        </View>)
                    }
                </View>
            }
            {
                descType === 'sponsors' && typeof desc === 'object' && <View style={[styles.listCardBorderItemDebatre, { marginBottom: 10 }]}>
                    {
                        desc.map((item: any, index: number) => <Pressable onPress={() => goUrl(item.link)} key={index.toString()}>
                            <FastImage
                                source={{
                                    uri: item.image,
                                    priority: FastImage.priority.high,
                                }}
                                style={styles.listImageCardBorderItemDebatre}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                        </Pressable>)
                    }
                </View>
            }
        </View>
    )
}

const ComponentTextHyperlink = (props: { text: string } = { text: '' }) => {
    const splitText = props.text.split(regexUrl);
    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {splitText.map((text, index) => {
                if (regexUrl.test(text)) {
                    return (
                        <Text key={index} style={[styles.textCardBorderItemDebatre, { fontSize: 16, color: 'blue' }]} onPress={() => {
                            if (!text.startsWith('http') && !text.startsWith('https')) {
                                text = `http://${text}`;
                            }
                            Linking.openURL(text)
                        }}>
                            {text}
                        </Text>
                    );
                }
                return <Text key={index} style={[styles.textCardBorderItemDebatre, { fontSize: 16 }]}>{text}</Text>;
            })}
        </View>
    );
};