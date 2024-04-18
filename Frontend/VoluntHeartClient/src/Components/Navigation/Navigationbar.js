import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import EmailIcon from '@mui/icons-material/Email';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GroupsIcon from '@mui/icons-material/Groups';
import VerifiedIcon from '@mui/icons-material/Verified';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PendingIcon from '@mui/icons-material/Pending';

export const navigation=[

    {
        title:"Home",
        icon:<HomeIcon style={{color:'none'}}/>,
        path:"/home"
    },{
        title:"Explore",
        icon:<TravelExploreIcon/>,
        path:"/explore"
    },{
        title:"Notification",
        icon:<NotificationsActiveIcon/>,
        path:"/notification"
    },{
        title:"Messages",
        icon:<EmailIcon/>,
        path:"/messages"
    },{
        title:"List",
        icon:<FormatListBulletedIcon/>,
        path:"/list"
    },{
        title:"Groups",
        icon:<GroupsIcon/>,
        path:"/groups"
    },{
        title:"Verified",
        icon:<VerifiedIcon/>,
        path:"/verification"
    },{
        title:"Profile",
        icon:<AccountCircleIcon/>,
        path:"/profile"
    },{
        title:"More",
        icon:<PendingIcon/>,
        path:"/more"
    },
]
