import RoutesAbout from "../screen/about/route";
import RoutesHome from "../screen/home/route";
import RoutesItemConten from "../screen/itemContent/route";
import RoutesProfile from "../screen/profile/route";
import RoutesSearch from "../screen/search/route";

const Routes: any = [
    ...RoutesHome,
    ...RoutesProfile,
    ...RoutesAbout,
    ...RoutesItemConten,
    ...RoutesSearch
];

export {
    Routes
};