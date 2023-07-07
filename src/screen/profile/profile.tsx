import { ScrollView, Text, View } from "react-native";
import { connect } from "react-redux";
import NoLogin from "./noLogin";
interface RootState {
    layout: any
}

const Profile = (props: any): JSX.Element => {

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View>
                <NoLogin />
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);