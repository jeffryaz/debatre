import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { useEffect } from "react";

interface RootState {
    layout: any
}

const DiscussionContent = (props: any): JSX.Element => {
    useEffect(() => {
    }, [])

    return (
        <View>
            <Text style={{ color: 'white', fontSize: 24, fontFamily: 'Sriracha' }}>Discussion</Text>
        </View>
    )
}

const mapStateToProps = (state: RootState): any => ({
    initLocale: state.layout.locale,
});
const mapDispatchToProps = (dispatch: any): any => ({
    // onSetLocale: (value: any) => dispatch(layout.actions.setLocale(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionContent);



const styles = StyleSheet.create({
});