var React = require('react');
var { Component } = React;

import { Container, StyleProvider } from 'native-base';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';
import HeaderDetail from "../../../components/headerDrawer/headerDrawer"
import { connect } from 'react-redux';
import { fetchShiprefList, getAgendaData,CountFooter } from '../../shared/item'
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Icons from '../../shared/icon'
import ActivityLoading from '../../../components/ActivityLoading/activity'

LocaleConfig.locales['th'] = {
    monthNames: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
    monthNamesShort: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', ' ธ.ค.'],
    dayNames: ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'],
    dayNamesShort: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']
};

LocaleConfig.defaultLocale = 'th';



const windowHeight = Dimensions.get('window').height;
class calendarScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectDate: new Date(),
            dataDate: null
        };
    }
  getCountFooter = async () => {
        const resultCount = await CountFooter();
        return resultCount
    }
    goBack = () => {
        this.props.navigation.goBack(null);
    }
    componentDidMount = async () => {
        const resultCount = await this.getCountFooter()
        this.setState({
            waitCount: resultCount.waitCount,
            onGoingCount: resultCount.onGoingCount,
            finishCount: resultCount.finishCount
        })
        const data = await getAgendaData()
        this.setState({ dataDate: data })
    }
    renderCount = (value) => {
       

        if (value.wait > 0 && value.doing > 0 && value.finish > 0) {
            return (
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 20, height: 20, backgroundColor: '#1167b1', borderRadius: 100, alignItems: "center", justifyContent: 'center', marginEnd: 2 }}>
                        <Text style={{ color: '#FFF' }}>{value.wait}</Text>
                    </View>
                    <Text>+2</Text>
                </View>
            )
        } else {
  
            return (
                <View style={{ flexDirection: 'row' }}>
                    {
                        value.doing !== 0 ?
                            <View style={{ width: 20, height: 20, backgroundColor: 'green', borderRadius: 100, alignItems: "center", justifyContent: 'center', marginEnd: 2 }}>
                                <Text style={{ color: '#FFF' }}>{value.doing}</Text>
                            </View>
                            : null
                    }
                    {
                        value.wait !== 0 ?
                            <View style={{ width: 20, height: 20, backgroundColor: '#1167b1', borderRadius: 100, alignItems: "center", justifyContent: 'center', marginEnd: 2 }}>
                                <Text style={{ color: '#FFF' }}>{value.wait}</Text>
                            </View>
                            : null
                    }
                    {
                        value.finish !== 0 ?
                            <View style={{ width: 20, height: 20, backgroundColor: '#ffc0cb', borderRadius: 100, alignItems: "center", justifyContent: 'center', marginEnd: 2 }}>
                                <Text style={{ color: '#FFF' }}>{value.finish}</Text>
                            </View>
                            : null
                    }



                </View>
            )
        }


    }






    render() {

        if (this.state.dataDate !== null) {
            const { dataDate } = this.state

            return (
                <StyleProvider style={getTheme(material)}>
                    <Container >
                        <HeaderDetail shipID={'ปฏิทินงาน'} goBack={() => this.goBack()} />
                        <Calendar
                            dayComponent={({ date, state }) => {
                                if (dataDate[date.dateString]) {

                                    if (date.day === this.state.selectDate.getDate() && date.month == this.state.selectDate.getMonth() + 1) {

                                        return (
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('agenda', { date: date })}>
                                                <Text style={{ textAlign: 'center', color: '#6c6cff', fontSize: 20 }}>
                                                    {date.day}
                                                </Text>
                                                {
                                                    this.renderCount(dataDate[date.dateString][0].count)
                                                }
                                            </TouchableOpacity>
                                        )
                                    } else {
                                        return (
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('agenda', { date: date })}>
                                                <Text style={{ textAlign: 'center', color: 'gray', fontSize: 20 }}>
                                                    {date.day}
                                                </Text>

                                                {
                                                    this.renderCount(dataDate[date.dateString][0].count)
                                                }
                                            </TouchableOpacity>
                                        );
                                    }

                                } else {
                                    if (date.day === this.state.selectDate.getDate() && date.month == this.state.selectDate.getMonth() + 1) {

                                        return (
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('agenda', { date: date })}>
                                                <Text style={{ textAlign: 'center', color: '#6c6cff', fontSize: 20 }}>
                                                    {date.day}
                                                </Text>

                                            </TouchableOpacity>
                                        )
                                    } else {
                                        return (
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('agenda', { date: date })}>
                                                <Text style={{ textAlign: 'center', color: 'gray', fontSize: 20 }}>
                                                    {date.day}
                                                </Text>
                                            </TouchableOpacity>
                                        );
                                    }

                                }

                            }}


                        />
                        <View style={{
                            margin: 20,
                            height: 'auto',
                            top: windowHeight - 170,
                            elevation: 2,
                            flexDirection: 'row',
                            marginTop: 10,
                            position: 'absolute',


                        }}>
                            <View tyle={{ flex: 1 }}>
                                <View style={{ width: 60, height: 60, backgroundColor: '#59bfff', borderRadius: 100, alignItems: "center", justifyContent: 'center', marginBottom: 10, marginLeft: 30 }}>
                                    <Icons.MaterialIcons
                                        size={40}
                                        name='select-all'
                                        color={'#FFF'}
                                    />
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>รอการดำเนินการ</Text>
                                    <Text style={{ fontSize: 16 }}>จำนวน {this.state.waitCount}</Text>
                                </View>
                            </View>
                            <View style={{ alignItems: 'center', flex: 1 }}>
                                <View style={{ width: 60, height: 60, backgroundColor: 'green', borderRadius: 100, alignItems: "center", justifyContent: 'center', marginBottom: 10, flexDirection: 'row', marginEnd: 10 }}>

                                    <Icons.FeatherIcons
                                        size={40}
                                        name='truck'
                                        color={'#FFF'}
                                    />
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>กำลังดำเนินการ</Text>
                                    <Text style={{ fontSize: 16 }}>จำนวน {this.state.onGoingCount}</Text>
                                </View>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <View style={{ width: 60, height: 60, backgroundColor: '#ffc0cb', borderRadius: 100, alignItems: "center", marginBottom: 10, flexDirection: 'row', marginEnd: 10, justifyContent: 'center' }}>
                                    <Icons.FeatherIcons
                                        size={40}
                                        name='flag'
                                        color={'#FFF'}
                                    />
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>เสร็จสิ้น</Text>
                                    <Text style={{ fontSize: 16 }}>จำนวน {this.state.finishCount}</Text>
                                </View>
                            </View>
                        </View>
                    </Container>
                </StyleProvider>

            );
        } else {
            return (
                <StyleProvider style={getTheme(material)}>
                    <Container >
                        <HeaderDetail shipID={'ปฏิทินงาน'} goBack={() => this.goBack()} />
                        <ActivityLoading />
                    </Container>
                </StyleProvider>
            )
        }




    }


}

const mapStateToProps = state => {

    return { postsShip: state.postsShip }
}

export default connect(mapStateToProps, { fetchShiprefList })(calendarScreen)