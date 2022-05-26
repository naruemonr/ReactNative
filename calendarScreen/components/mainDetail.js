var React = require('react');
var ReactNative = require('react-native');
import { Divider } from 'react-native-elements';
import { Content } from 'native-base';
var {
    Text,
    View,
    TouchableOpacity,
    Button,
} = ReactNative;
import styles from "../style";
import PropTypes from 'prop-types';
import { RefreshControl } from 'react-native';
import ActivityLoading from "../../../../components/ActivityLoading/activity"
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'


const MainDetail = props => {
    const {

    } = props;

    return (
        <Calendar
            // Collection of dates that have to be marked. Default = {}
            markedDates={{
                '2020-06-16': { selected: true, marked: true, selectedColor: 'blue' },
                '2020-06-17': { marked: true },
                '2020-06-06': { marked: true, dotColor: 'red', activeOpacity: 0 },
                '2012-05-19': { disabled: true, disableTouchEvent: true }
            }}
        />
        
    )



}

MainDetail.propTypes = {

};

export default MainDetail