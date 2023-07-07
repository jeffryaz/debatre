import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { InputSearch } from '../../components/input';
interface RootState {
    layout: any
}

const Search = (props: any): JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [valueSearch, setValueSearch] = useState<string>('');

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false)
        }, 5000);
    }, [])

    const handleValueSearch = (value: string): void => {
        console.log('value--', value);
        setValueSearch(value);
    }
    return (
        <View>
            <InputSearch getValue={handleValueSearch} value={valueSearch} />
            <ScrollView>
                <View>
                    <Text>Card In Search</Text>
                </View>
                <Text style={{ color: 'white' }}>Search</Text>
            </ScrollView>
        </View>
    )
}

const mapStateToProps = (state: RootState): any => ({
    initLocale: state.layout.locale,
});
const mapDispatchToProps = (dispatch: any): any => ({
    // onSetLocale: (value: any) => dispatch(layout.actions.setLocale(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);


const styles = StyleSheet.create({
});