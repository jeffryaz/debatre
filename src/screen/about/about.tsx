import { ScrollView, Text, View } from "react-native";
import { connect } from "react-redux";
interface RootState {
    layout: any
}

const About = (props: any): JSX.Element => {

    return (
        <ScrollView>
            <View>
                <Text style={{ color: 'white' }}>About</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);