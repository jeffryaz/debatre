import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { SlideShowImage } from "../../components/slick";
import { useEffect } from "react";
import { Card } from "../../components/card";
import { ListCardHome } from "../../components/list";
import { useTranslation } from "react-i18next";

interface RootState {
    layout: any
}

const sampleData = [
    {
        id: 1
    },
    {
        id: 2
    },
    {
        id: 3
    },
    {
        id: 4
    },
    {
        id: 5
    }]

const Home = (props: any): JSX.Element => {
    const { t, i18n } = useTranslation();
    useEffect(() => {
    }, [])

    return (
        <ScrollView style={styles.contentStyle} showsVerticalScrollIndicator={false}>
            <View style={styles.containerSlideShowImage}>
                <SlideShowImage data={[]} />
            </View>
            <View>
                <Text style={{ color: 'white', fontSize: 24, fontFamily: 'Sriracha' }}>{t('CHOICE_DISCUSSION')}</Text>
            </View>
            <ListCardHome data={sampleData} route="ItemDiscussion" routeMore="ItemDiscussion" />
            <View>
                <Text style={{ color: 'white', fontSize: 24, fontFamily: 'Sriracha' }}>{t('CHOICE_DEBATE')}</Text>
            </View>
            <Card route="ItemDebatre" />
        </ScrollView>
    )
}

const mapStateToProps = (state: RootState): any => ({
    initLocale: state.layout.locale,
});
const mapDispatchToProps = (dispatch: any): any => ({
    // onSetLocale: (value: any) => dispatch(layout.actions.setLocale(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);



const styles = StyleSheet.create({
    contentStyle: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
    },
    containerSlideShowImage: {
        marginBottom: 25
    },
});