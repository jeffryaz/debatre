import { Text } from "@react-native-material/core";
import { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, TouchableHighlight, View } from "react-native";
import Slick from "react-native-slick";
import FastImage from 'react-native-fast-image'

interface IpropsSlideShowImage {
    data: [];

}

const styles = StyleSheet.create({
    containerSlideShowImage: {
        marginBottom: 25
    },
    wrapperSlideShowImage: {
        height: 150,
    },
    slideImageSlideShowImage: {
        flex: 1,
    },
    activeDotStyle: {
        width: 9,
        height: 9,
        bottom: -45
    },
    dotStyle: {
        borderColor: 'white',
        borderWidth: .5,
        width: 9,
        height: 9,
        bottom: -45
    },
    imageSlideShowImage: {
        height: 150,
        width: "100%",
        borderRadius: 10,
        flex: 1,
    }
});

export const SlideShowImage = (props: IpropsSlideShowImage): JSX.Element => {
    const { data = [] } = props;
    const [dataSet, setDataSet]: any[] = useState<any[]>([]);

    useEffect(() => {
        const items: any[] = []
        data.forEach((element: any) => {
            const item: any = {
                uri: element.uri,
                priority: FastImage.priority.high,
                cache: FastImage.cacheControl.cacheOnly
            }
            items.push(item);
        });

        setDataSet(items);
    }, [data])
    return (
        <View style={styles.containerSlideShowImage}>
            <Slick style={styles.wrapperSlideShowImage} autoplay={true} dotColor={'#60777F'} dotStyle={styles.dotStyle} activeDotColor={'white'} activeDotStyle={styles.activeDotStyle}>
                <View style={styles.slideImageSlideShowImage}>
                    <FastImage
                        style={{ ...styles.imageSlideShowImage }}
                        source={require('../../assets/sample/banner2.png')}
                        onError={() => {
                            // const dataSource = cloneDeep(data);
                            // dataSource[index].source = require('../../assets/png/banner-not-found-min.png');
                            // setDataCarause(dataSource);
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </View>
                <View style={styles.slideImageSlideShowImage}>
                    <FastImage
                        style={{ ...styles.imageSlideShowImage }}
                        source={require('../../assets/sample/banner3.png')}
                        onError={() => {
                            // const dataSource = cloneDeep(data);
                            // dataSource[index].source = require('../../assets/png/banner-not-found-min.png');
                            // setDataCarause(dataSource);
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </View>
                <View style={styles.slideImageSlideShowImage}>
                    <FastImage
                        style={{ ...styles.imageSlideShowImage }}
                        source={require('../../assets/sample/banner1.png')}
                        onError={() => {
                            // const dataSource = cloneDeep(data);
                            // dataSource[index].source = require('../../assets/png/banner-not-found-min.png');
                            // setDataCarause(dataSource);
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </View>
            </Slick>
        </View>
    );
};