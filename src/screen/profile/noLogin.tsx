import { useTranslation } from "react-i18next";
import { Button, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { connect } from "react-redux";
import LocaleChange from "../../components/locale/LocaleChange";
import { TextStagger } from "../../components/animations";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { Formik, useFormik } from "formik";
import { object, string } from "yup";
interface RootState {
    layout: any
}

const NoLogin = (props: any): JSX.Element => {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    let refInputEmail: any = useRef();
    let refInputPaasword: any = useRef();
    let userSchema = object({
        email: string().email()
            .required(),
        password: string()
            .min(5)
            .max(15)
            .required()
    });
    const {
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched
    } = useFormik({
        validationSchema: userSchema,
        initialValues: { email: '', password: '' },
        onSubmit: values => console.log(values)
    });

    const changeShowPassword = (): void => {
        setShowPassword(!showPassword);
    }

    const handleValidationForm = (type: string): void => {
        if (values.email !== '' && values.password !== '') {
            handleSubmit();
        } else {
            if (type === 'email') {
                refInputPaasword.current?.focus();
            } else if (type === 'password') {
                refInputEmail.current?.focus()
            }
        }
    }
    const handleSubmitButton = (): void => {
        if ((values.email === '' && values.password === '') || (values.email === '' && values.password !== '')) {
            handleValidationForm('password');
        } else if (values.email !== '' && values.password === '') {
            handleValidationForm('email');
        } else {
            handleValidationForm('');
        }
    }

    return (
        <View>
            <View style={styles.containerIcon}>
                <Image source={require('../../assets/png/icon-debatre.png')} style={styles.iconsize} />
            </View>
            <View style={styles.containerTextKutipan}>
                <TextStagger textStyle={styles.textKutipan} content={t('DEFAULT_QUOTE')} duration={1000} />
            </View>
            <View style={styles.containerForm}>
                <Text style={styles.labelForm}>{t('EMAIL')}:</Text>
                <TextInput
                    ref={refInputEmail}
                    autoFocus={false}
                    autoCorrect={false}
                    style={[styles.inputForm, errors.email && touched.email ? styles.inputFormInvalid : styles.inputFormValid]}
                    keyboardType="email-address"
                    placeholder="@email.com"
                    placeholderTextColor={"#dedede"}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    onSubmitEditing={() => handleValidationForm('email')}
                />
                {
                    errors.email && touched.email && <Text style={styles.labelFormMini}>{t(errors.email)}</Text>
                }
                <Text style={styles.labelForm}>{t('PASSWORD')}:</Text>
                <View style={styles.containerPasswordInput}>
                    <TextInput
                        ref={refInputPaasword}
                        autoFocus={false}
                        autoCorrect={false}
                        style={[styles.inputForm, styles.inputPassword, errors.password && touched.password ? styles.inputFormInvalid : styles.inputFormValid]}
                        secureTextEntry={!showPassword}
                        placeholder={"●●●●●"}
                        placeholderTextColor={"#dedede"}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        onSubmitEditing={() => handleValidationForm('password')}
                    />
                    <Pressable style={styles.iconPassword} onPress={() => changeShowPassword()}>
                        <FontAwesomeIcon icon={!showPassword ? faEyeSlash : faEye} color={'#60777f'} size={24} />
                    </Pressable>
                </View>
                {
                    errors.password && touched.password && <Text style={styles.labelFormMini}>{t(errors.password)}</Text>
                }
                <Pressable style={styles.containerButtonForm} onPress={handleSubmitButton}>
                    <Text style={styles.textButtonForm}>{t('SIGNIN')}</Text>
                </Pressable>
                <View style={styles.containerButtonForm}>
                    <Text style={styles.textButtonForm}>{t('SIGNUP')}</Text>
                </View>
            </View>
            <LocaleChange />
        </View>
    )
}

const mapStateToProps = (state: RootState): any => ({
    initLocale: state.layout.locale,
});
const mapDispatchToProps = (dispatch: any): any => ({
    // onSetLocale: (value: any) => dispatch(layout.actions.setLocale(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NoLogin);


const styles = StyleSheet.create({
    containerIcon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconsize: {
        width: 150,
        height: 150,
        marginTop: 30
    },
    containerTextKutipan: {
        marginRight: 50,
        marginLeft: 50,
        minHeight: 70
    },
    textKutipan: {
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Sriracha',
        fontSize: 14
    },
    containerForm: {
        margin: 25
    },
    labelForm: {
        color: 'white',
        fontFamily: 'Sriracha',
        fontSize: 18
    },
    labelFormMini: {
        color: 'red',
        fontFamily: 'Sriracha',
        fontSize: 14,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 1
    },
    inputForm: {
        borderRadius: 5,
        backgroundColor: 'white',
        color: 'black',
        fontFamily: 'Sriracha',
        paddingRight: 10,
        paddingLeft: 10,
    },
    inputFormInvalid: {
        borderColor: 'red',
        borderWidth: 1
    },
    inputFormValid: {
        borderWidth: 0
    },
    containerButtonForm: {
        backgroundColor: '#60777f',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 3,
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 15,
        paddingLeft: 15,
        marginTop: 20
    },
    textButtonForm: {
        textAlign: 'center',
        fontFamily: 'Sriracha',
        fontSize: 18,
        color: 'white'
    },
    containerPasswordInput: {
    },
    iconPassword: {
        position: 'absolute',
        right: 0,
        marginTop: 10,
        marginRight: 15
    },
    inputPassword: {
        paddingRight: 50
    }
});