import { FlatList, View } from "react-native"
import { Card, CardMore } from "../card"

interface IListCardHome {
    data: any[];
    route: string;
    routeMore: string;
}

export const ListCardHome = (props: IListCardHome): JSX.Element => {
    const Content = (item: any) => {
        if (item.index === (props.data.length - 1)) {
            return <CardMore routeMore={props.routeMore} />;
        }
        return <Card route={props.route} />;
    }
    return (
        <View style={{ flexDirection: 'row' }}>
            <FlatList horizontal renderItem={(item: any) => Content(item)} data={props.data} />
        </View>
    )
}