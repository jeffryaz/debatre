import { Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { connect } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEarListen, faHashtag } from "@fortawesome/free-solid-svg-icons";
import { CardBorderItemDebatre } from "../../components/card";
import { useTranslation } from "react-i18next";
import * as RootNavigation from "../../config/rootNavigation";

interface RootState {
    layout: any
}

const sampleAturan = [
    "harus berdasarkan argumen yg alasannya logis.",
    "tidak boleh memojokkan/ menjatuhkan lawan bicara.",
    "berbicara jika sudah dipersilakkan.",
    "menyanggah dengan baik dan sopan.",
    "selengkapnya bisa di lihat pada https://s.umj.ac.id/hallo dan https://shorturl.at/msGIU tolong di klik"
]

const sampleJuri = [
    "Jeffry - Ketua A",
    "Azhari - Ketua B",
    "Rosman - Ketua C",
]

const samplepeserta = [
    {
        groupName: 'Group A',
        participan: ["Jeffry", "Azhari"]
    },
    {
        groupName: 'Group B',
        participan: ["Jeffry 1", "Azhari 1"]
    }
]

const sampleSponsors = [
    {
        name: 'BRI',
        image: 'https://awsimages.detik.net.id/community/media/visual/2016/02/16/d4691dfc-d74a-4dc9-8e50-3892f3218009_11.jpg?w=700&q=90',
        link: 'https://bri.co.id/'
    },
    {
        name: 'Gramedia',
        image: 'https://cdnwpedutorenews.gramedia.net/wp-content/uploads/2022/02/02083934/Gramedia-World-Karawang.png',
        link: 'https://www.gramedia.com/?utm_source=InvolveAsia&session_id=838eea00fe224ca9874e380070f74a28'
    },
    {
        name: 'BCA',
        image: 'https://www.bca.co.id/-/media/Feature/Default-BCA/Default-og-11.jpg',
        link: 'https://www.bca.co.id/'
    },
    {
        name: 'Bank Jago',
        image: 'https://www.jago.com/favicon/og-image.png'
    },
]

const DebatreContent = (props: any): JSX.Element => {
    const { t } = useTranslation();
    const [refreshing, setRefreshing] = useState<boolean>(false);
    useEffect(() => {
    }, [])

    const go = () => {
        console.log('masuk');
        RootNavigation.navigate('RoomDebatre', { id: 1 });
    }
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    return (
        <ScrollView style={styles.containerContent} showsVerticalScrollIndicator={false} refreshControl={
            <RefreshControl colors={['#384d54']} progressBackgroundColor={'white'} refreshing={refreshing} onRefresh={onRefresh} />
        }>
            <View style={{ marginBottom: 30 }}>
                <View style={styles.wrappedHeader}>
                    <Image style={styles.imageContent} source={require('../../assets/sample/kotak1.png')} />
                    <View style={styles.wrappedTitle}>
                        <Text style={styles.titleContent}>Your Style Enjoy Style Your Photo</Text>
                        <View style={styles.wrappedToolHeader}>
                            <View style={[styles.ImageBackgroundContainerContent, styles.backgroundHear]}>
                                <Text style={styles.ImageBackgroundContainerText}>10</Text>
                                <FontAwesomeIcon icon={faEarListen} size={12} style={styles.ImageBackgroundContainerIcon} />
                            </View>

                            <View style={[styles.ImageBackgroundContainerContent, styles.backgroundRanking]}>
                                <Text style={styles.ImageBackgroundContainerText}>1</Text>
                                <FontAwesomeIcon icon={faHashtag} size={12} style={styles.ImageBackgroundContainerIcon} />
                            </View>
                        </View>
                    </View>
                </View>
                <CardBorderItemDebatre title={t('THEMA')} desc="Membangun Kebersamaan dalam Bingkai Kebhinekaan" descType="text" />
                <CardBorderItemDebatre title={t('SCHEDULE')} desc={`Senin, 17 Agustus 1945.\n10:00 WIB - 12:00 WIB`} descType="text" />
                <CardBorderItemDebatre title={t('RULE')} desc={sampleAturan} descType="list" />
                <CardBorderItemDebatre title={t('MODERATORS')} desc={`Jeffry Azhari Rosman`} descType="text" />
                <CardBorderItemDebatre title={t('JURY')} desc={sampleJuri} descType="list" />
                <CardBorderItemDebatre title={t('PARTICIPANT')} desc={samplepeserta} descType="group-list" />
                <CardBorderItemDebatre title={t('SPONSORS')} desc={sampleSponsors} descType="sponsors" />
                <TouchableHighlight underlayColor="#384d54" onPress={go} style={styles.buttonWatch}>
                    <Text style={styles.buttonWatchText}>{t('WATCH')}</Text>
                </TouchableHighlight>
            </View>
        </ScrollView>
    )
}

const mapStateToProps = (state: RootState): any => ({
    initLocale: state.layout.locale,
});
const mapDispatchToProps = (dispatch: any): any => ({
    // onSetLocale: (value: any) => dispatch(layout.actions.setLocale(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DebatreContent);



const styles = StyleSheet.create({
    containerContent: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
    },
    imageContent: {
        width: 175,
        height: 175,
        borderRadius: 10
    },
    wrappedHeader: {
        flexDirection: 'row',
        gap: 15,
    },
    wrappedTitle: {
        justifyContent: "center",
        flexGrow: 1,
        flex: 1,
    },
    titleContent: {
        color: 'white',
        fontSize: 24,
        fontFamily: 'Sriracha',
        flexShrink: 1
    },
    wrappedToolHeader: {
        flexDirection: 'row'
    },
    ImageBackgroundContainerContent: {
        paddingRight: 3,
        paddingLeft: 3,
        marginTop: 5,
        marginRight: 5,
        borderRadius: 5,
        minWidth: 40,
        flexDirection: 'row',
        justifyContent: 'center',

    },
    backgroundHear: {
        backgroundColor: 'red',
    },
    backgroundRanking: {
        backgroundColor: 'blue',
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
    buttonWatch: {
        borderRadius: 10,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 20,
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: '#60777f',
    },
    buttonWatchText: {
        color: 'white',
        fontFamily: 'Sriracha',
        fontSize: 18,
        textAlign: 'center'
    }
});