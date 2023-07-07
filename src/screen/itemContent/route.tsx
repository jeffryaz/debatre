import DiscussionContent from './discussion';
import DebatreContent from './debatre';
import RoomDebatre from './roomDebatre';

const RoutesItemConten = [
    {
        path: 'ItemDebatre', name: 'itemDebatre', component: DebatreContent, options: { orientation: 'portrait', animation: 'none' }
    },
    {
        path: 'RoomDebatre', name: 'roomDebatre', component: RoomDebatre, options: { orientation: 'landscape', animation: 'none', headerShown: false }
    },
    {
        path: 'ItemDiscussion', name: 'itemDiscussion', component: DiscussionContent, options: { orientation: 'portrait', animation: 'none' }
    },
];

export default RoutesItemConten;
