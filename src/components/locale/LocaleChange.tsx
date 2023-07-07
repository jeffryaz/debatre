import React, { useEffect, useState } from 'react';
import { Text } from "@react-native-material/core";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";
import { En, Id } from "../icon";
import { ModalSelectLanguage } from "../modal";
import { resources } from '../../i18n/index';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import * as layout from '../layout/actionLayout';


interface RootState {
    layout: any
}

const LocaleChange = (props: any): JSX.Element => {
    const { t, i18n } = useTranslation();
    const { onSetLocale, initLocale, marginRight } = props;
    const [modalSelectLanguage, setModalSelectLanguage] = useState<boolean>(false);
    const [listLanguage, setListLanguage] = useState<any[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState<string>('');

    const changeLocaleModal = (): void => {
        setSelectedLanguage(i18n.language);
        setModalSelectLanguage(true);
    }
    useEffect(() => {
        const list = [];
        for (let key in resources) {
            list.push(key);
        }
        setListLanguage(list);
    }, [])

    const LabelLanguage = (props: { language: string }): any => {
        switch (props.language) {
            case 'id':
                return (<Id
                    width={20}
                    height={20}
                />)
            case 'en':
                return (<En
                    width={20}
                    height={20}
                />)

            default:
                break;
        }
    }

    const changeLocale = (item: string) => {
        setSelectedLanguage(item);
    }

    const ContentModalSelectLanguage = (): JSX.Element => {
        return (<View>
            {
                listLanguage.map((item: string, index: number) => <Pressable key={index.toString()} onPress={() => changeLocale(item)} style={styles.containerListLanguage}>
                    <View style={styles.containerList}>
                        <View style={styles.iconLanguage}><LabelLanguage language={item} /></View>
                        <Text style={styles.textListLanguage}>{t(item.toUpperCase())}</Text>
                    </View>
                    {
                        selectedLanguage === item && <FontAwesomeIcon icon={faCheck} color='#60777f' size={18} />
                    }
                </Pressable>)
            }
        </View>)
    }

    const onPressYesModal = () => {
        i18n.changeLanguage(selectedLanguage);
        onSetLocale(selectedLanguage);
        setModalSelectLanguage(false)
    }

    return (
        <View>
            <View style={styles.containerLanguage}>
                <Pressable onPress={changeLocaleModal} style={styles.pressable}>
                    <View style={styles.iconLanguage}>
                        <LabelLanguage language={i18n.language} />
                    </View>
                    <Text style={styles.textLanguage}>{t('LANGUAGE')}</Text>
                </Pressable>
            </View>
            <ModalSelectLanguage visible={modalSelectLanguage} title={t('SELECT_A_LANGUAGE')} content={<ContentModalSelectLanguage />} onPressYes={onPressYesModal} />
        </View>
    );
};

const mapStateToProps = (state: RootState): any => ({
    initLocale: state.layout.locale,
});
const mapDispatchToProps = (dispatch: any): any => ({
    onSetLocale: (value: any) => dispatch(layout.actions.setLocale(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LocaleChange);


const styles = StyleSheet.create({
    containerLanguage: {
        backgroundColor: '#60777f',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 3,
        marginRight: 25,
        marginLeft: 25,
    },
    pressable: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 15,
        paddingLeft: 15,
    },
    iconLanguage: {
        marginRight: 5
    },
    textLanguage: {
        fontFamily: 'Sriracha',
        fontSize: 18,
        color: 'white',
    },
    containerListLanguage: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10
    },
    containerList: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textListLanguage: {
        fontFamily: 'Sriracha',
        fontSize: 18,
        color: 'black',
    }
})