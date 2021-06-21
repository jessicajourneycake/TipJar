import {DefaultTheme} from '@react-navigation/native';

export default {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "cornflowerblue",
        background: "white"
    },
    tabBarOptions: {
        //showLabel: false
    }
};