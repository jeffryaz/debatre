import { useTranslation } from "react-i18next";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native"

interface IModalConfirm {
    title: string;
    content: JSX.Element;
    labelCancel?: string | null;
    labelOk?: string | null;
    onPressNo: (data: any) => any;
    onPressYes: (data: any) => any;
    visible: boolean;
}
interface IModalSelectLanguage {
    title: string;
    content: JSX.Element;
    labelCancel?: string;
    labelOk?: string;
    onPressYes: (data: any) => any;
    visible: boolean;
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBackground: {
        backgroundColor: "#000000c0",
        width: '100%',
        height: '100%',
        opacity: .5,
        position: "absolute",
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        minWidth: 250,
        minHeight: 150,
    },
    headerModal: {
        fontFamily: 'Sriracha',
        color: 'black',
        fontSize: 18,
        textAlign: 'center',
        height: 40
    },
    bodyModal: {
        fontFamily: 'Sriracha',
        color: 'black',
        fontSize: 14,
        textAlign: 'left',
        minHeight: 50
    },
    footerModal: {
        flexDirection: 'row',
        borderTopColor: '#e0e0e0',
        borderTopWidth: 1,
        marginRight: -10,
        marginLeft: -10,
        marginBottom: -6,
        height: 60,
        alignItems: 'center'
    },
    footerButton: {
        flex: 1,
        alignItems: 'center',
    },
    footerButtonNo: {
        fontSize: 14,
        fontFamily: 'Sriracha',
        color: 'black'
    },
    footerButtonYes: {
        fontSize: 14,
        fontFamily: 'Sriracha',
        color: 'black'

    }
});

export const ModalConfirm = (props: IModalConfirm): JSX.Element => {
    const { t, i18n } = useTranslation();
    const {
        title = t('HEADER'),
        content = <></>,
        labelCancel = t('NO'),
        labelOk = t('YES'),
        onPressNo,
        onPressYes,
        visible = false
    } = props;
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                // Alert.alert('Modal has been closed.');
                // setModalVisible(!modalVisible);
            }}>
            <View style={styles.modalBackground}>
            </View>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.headerModal}>{title}</Text>
                    <View style={styles.bodyModal}>{content}</View>
                    <View style={styles.footerModal}>
                        <Pressable style={styles.footerButton} onPress={onPressNo}>
                            <Text style={styles.footerButtonNo}>{labelCancel}</Text>
                        </Pressable>
                        <Pressable style={styles.footerButton} onPress={onPressYes}>
                            <Text style={styles.footerButtonYes}>{labelOk}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export const ModalSelectLanguage = (props: IModalSelectLanguage): JSX.Element => {
    const { t, i18n } = useTranslation();
    const {
        title = t('HEADER'),
        content = <></>,
        labelCancel = t('NO'),
        labelOk = t('YES'),
        onPressYes,
        visible = false
    } = props;
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                // Alert.alert('Modal has been closed.');
                // setModalVisible(!modalVisible);
            }}>
            <View style={styles.modalBackground}>
            </View>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.headerModal}>{title}</Text>
                    <View style={styles.bodyModal}>{content}</View>
                    <View style={styles.footerModal}>
                        <Pressable style={styles.footerButton} onPress={onPressYes}>
                            <Text style={styles.footerButtonYes}>{labelOk}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}