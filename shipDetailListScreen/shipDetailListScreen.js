var React = require('react');
var { Component } = React;
import { Container, StyleProvider, Footer } from 'native-base';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';
import ShipDetailHeader from "./components/detailHeader"
import MainDetail from "./components/mainDetail"
import HeaderDetail from "../../../components/headerDetail/headerDetail"
import { connect } from 'react-redux';
import { fetchShiprefList, resetShipment, startShipment, abandonShipment, saveDistant, fetchShiprefListOffLine, checkSendOffLineData, sendOffLineData ,refuseShipment } from '../../shared/item'
import { ScrollView, RefreshControl, View, Text, TouchableOpacity, Image } from 'react-native';
import ActivityLoading from "../../../components/ActivityLoading/activity";
import SearchBar from "../../../components/searchBar/searchBar"
import Icons from "../../shared/icon"
import Geolocation from '@react-native-community/geolocation';
import GestureRecognizer from 'react-native-swipe-gestures';
import NetInfo from "@react-native-community/netinfo";
import styles from './style'
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';
import ButtonOffLine from '../../../components/buttonOffLine/buttonOffLine'

class shipDetailListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: true,
            activeStatus: 'ALL',
            status: 'U',
            searchData: '',
            isVisible: false,
            selectTime: null,
            gestureName: 'none',
            nodata: false,
            offline: false
        };
    }



    goBack = () => {
        this.props.navigation.navigate('main');
    }
    getApiData = async () => {
        try {
            await this.setState({ isFetching: true })
            const { navigation } = this.props
            const shipref_id = navigation.state.params.shipData
            const statusSendDataStore = await checkSendOffLineData()
            const isConnected = await NetInfo.fetch().then(state => { return state.isConnected });
            if (statusSendDataStore) {
                Alert.alert(
                    "คุณได้กลับมาเชื่อมต่อกับอินเตอร์เน็ตอีกครั้ง",
                    "กรุณารอสักครู่เรากำลังอัพเดทการกระทำทั้งหมดที่คุณทำไป",
                    [

                        {
                            text: "ตกลง",
                            onPress: () => { console.log("ตกลง") },
                            style: "cancel"
                        },
                    ],
                    { cancelable: false }
                )

                await sendOffLineData()
                await this.props.fetchShiprefList(shipref_id, this.state.searchData, this.state.selectTime)
            } else {

                if (isConnected) {
                    this.setState({ offline: false })
                    await this.props.fetchShiprefList(shipref_id, this.state.searchData, this.state.selectTime)
                } else {
                    this.setState({ offline: true })
                    var value = await AsyncStorage.getItem('local_wp')
                    await AsyncStorage.setItem('online', JSON.stringify(true));
                    const data = JSON.parse(value).filter(i => {
                        if (i.ID === shipref_id) {
                            return i
                        }
                    })
                    if (data.length !== 0) {
                        await this.props.fetchShiprefListOffLine(data[0].data)
                    } else {
                        await this.props.fetchShiprefListOffLine([])
                    }
                }
            }

            await this.setState({ isFetching: false })
        } catch (error) {
            await this.setState({ isFetching: true })

        }
    }
    componentDidMount = async () => {
        this.getApiData()
    }
    onRefresh = () => {
        this.getApiData()
    }

    onSwipeUp(gestureState) {
        console.log(gestureState)

    }

    onSwipeDown(gestureState) {
        console.log(gestureState)
    }

    onSwipeLeft(gestureState) {
        console.log(gestureState)
    }

    async onSwipeRight(gestureState) {
        const { navigation } = this.props
        if (navigation.state.params.calendar === true) {
            this.props.navigation.goBack(null)
        } else {
            this.goBack()
        }
        if (navigation.state.params.onShipRefresh !== null) {
            navigation.state.params.onShipRefresh()
        }

        console.log(gestureState)
    }

    onSwipe(gestureName) {
        this.setState({ gestureName: gestureName });
    }
    setIsShowing = () => {
        this.setState({ isShowing: !this.state.isShowing })
    }
    setSelectTime = async (value) => {
        await this.setState({ selectTime: value })
        await this.getApiData()
    }

    updateActiveStatus = (status) => {
        this.setState({ activeStatus: status })

    }
    setSearchData = (text) => {
        this.setState({ searchData: text })
    }
    setIsVisible = () => {
        this.setState({ isVisible: !this.state.isVisible })
    }

    drawerControlPanel = (value) => {
        this.setState({ openDrawer: value })
    };


    comfirmStat = () => {
        const { navigation, postsShip } = this.props
        
     
        return (

            Alert.alert(
                "คุณต้องการจะเริ่มงานนี้หรือไม่",
                "เมื่อกดทำการเเล้วงานนี้จะเปลี่ยนสถานะเป็นกำลังขนส่ง",
                [
                    {
                        text: "ไม่",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    {
                        text: "ใช่",
                        onPress: async () => {
                            await Geolocation.getCurrentPosition(
                                async (info) => {
                                    const gps_send = info.coords.latitude + ',' + info.coords.longitude
                                    saveDistant(postsShip.Shipment.shipref, null, -1, 'S', null, gps_send)
                                    startShipment(postsShip.Shipment.shipref)
                                    if (navigation.state.params.calendar === true) {
                                        this.props.navigation.goBack(null)
                                    } else {
                                        this.goBack()
                                    }

                                    if (navigation.state.params.onShipRefresh !== null) {
                                        navigation.state.params.onShipRefresh()
                                    }


                                },
                                (error) => console.log('Error', JSON.stringify(error)),
                                { enableHighAccuracy: false, timeout: 300000, maximumAge: 3600000 },
                            )

                        },

                    }
                ],
                { cancelable: false }
            )
        )
    }

    confirmRefuse=()=>{
        const { navigation, postsShip } = this.props
        console.log(navigation)
        console.log(postsShip)
        return (
            Alert.alert(
                "คุณต้องการจะปฏิเสธงานนี้หรือไม่",
                "เมื่อกดปฏิเสธเเล้วงานนี้จะถูกยกเลิกไป",
                [
                    {
                        text: "ไม่",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },{
                        text: "ใช่",
                        onPress: async () => { 
                            refuseShipment(postsShip.Shipment.shipref)
                            if (navigation.state.params.calendar === true) {
                                this.props.navigation.goBack(null)
                            } else {
                                this.goBack()
                            }

                            if (navigation.state.params.onShipRefresh !== null) {
                                navigation.state.params.onShipRefresh()
                            }
                  

                        }
                    }

                ]


            )
        )

    }



    alertRestart = () => {

        const { navigation, postsShip } = this.props
        if (postsShip.Shipment.status === 'U') {
            return (

                Alert.alert(
                    "คุณยังไม่อยู่ในสถานะที่จะเริ่มงานใหม่ได้",
                    "กรุณากดเริ่มงานก่อนเพื่อจะใช้งานส่วนนี้",
                    [

                        {
                            text: "ตกลง",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"

                        }
                    ],
                    { cancelable: false }
                )
            )
        } else {
            return (

                Alert.alert(
                    "คุณต้องการจะเริ่มงานนี้ใหม่หรือไม่",
                    "งานจะทำการเริ่มใหม่เมื่อทำการกระทำนี้กรุณาตัดสินใจรอบคอบก่อนทำ",
                    [
                        {
                            text: "ไม่",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        {
                            text: "ใช่",
                            onPress: () => {
                                resetShipment(postsShip.Shipment.ShipmentID, postsShip.Shipment.shipref)
                                if (navigation.state.params.calendar === true) {
                                    this.props.navigation.goBack(null)
                                } else {
                                    this.goBack()
                                }

                                if (navigation.state.params.onShipRefresh !== null) {
                                    navigation.state.params.onShipRefresh()
                                }
                            },

                        }
                    ],
                    { cancelable: false }
                )
            )
        }


    }
    alertAbandon = () => {

        const { Shipment } = this.props.postsShip
        const { navigation } = this.props
        if (Shipment.status === 'U') {
            return (

                Alert.alert(
                    "คุณยังไม่อยู่ในสถานะที่จะละทิ้งงานนี้ได้",
                    "กรุณากดเริ่มงานก่อนเพื่อจะใช้งานส่วนนี้",
                    [

                        {
                            text: "ตกลง",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"

                        }
                    ],
                    { cancelable: false }
                )
            )
        } else {
            return (

                Alert.alert(
                    "คุณต้องการละทิ้งงานนี้ใหม่หรือไม่",
                    "คุณกำลังละทิ้งงานนี้กรุณาตัดสินใจอย่างรอบคอบก่อนทำ",
                    [
                        {
                            text: "ไม่",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        {
                            text: "ใช่",
                            onPress: async () => {
                                abandonShipment(Shipment.shipref)

                                if (navigation.state.params.calendar === true) {
                                    this.props.navigation.goBack(null)
                                } else {
                                    this.goBack()
                                }

                                if (navigation.state.params.onShipRefresh !== null) {
                                    navigation.state.params.onShipRefresh()
                                }

                            },

                        }
                    ],
                    { cancelable: false }
                )
            )
        }


    }

    render() {

        const { navigation, postsShip } = this.props
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };

        const { isFetching } = this.state


        if (isFetching !== true) {

            if (postsShip.length !== 0) {

                return (

                    <GestureRecognizer
                        onSwipeUp={(state) => this.onSwipeUp(state)}
                        onSwipeDown={(state) => this.onSwipeDown(state)}
                        onSwipeLeft={(state) => this.onSwipeLeft(state)}
                        onSwipeRight={(state) => this.onSwipeRight(state)}
                        config={config}
                        style={{
                            flex: 1,
                            backgroundColor: this.state.backgroundColor
                        }}
                    >

                        <Container style={{ backgroundColor: '#fcfcfc' }}>

                            <HeaderDetail
                                shipID={navigation.state.params.shipData}
                                goBack={() => {
                                    if (navigation.state.params.calendar === true) {
                                        console.log('x')
                                        this.props.navigation.goBack(null)
                                    } else {
                                        console.log('z')
                                        this.goBack()
                                    }
                                    if (navigation.state.params.onShipRefresh !== null) {
                                        console.log('y')
                                        navigation.state.params.onShipRefresh()
                                    }
                                }}
                                alertRestart={() => this.alertRestart()}
                                cargocheck={0}
                                detailcheck={0}
                                alertAbandon={() => this.alertAbandon()}
                            />

                            <ShipDetailHeader shipData={postsShip.Shipment} wpData={postsShip.WayPoint} />
                            <SearchBar
                                searchData={this.state.searchData}
                                setSearchData={(text) => this.setSearchData(text)}
                                getData={this.getApiData}
                                setSelectTime={(value) => { this.setSelectTime(value) }}
                                selectTime={this.state.selectTime}
                            />
                            {this.state.selectTime != null ?
                                <View style={{ flexDirection: 'row', marginBottom: 5, justifyContent: 'center' }}>
                                    <Icons.FontistoIcons
                                        size={20}
                                        name='date'
                                        color={'green'}
                                        style={{ marginEnd: 20 }}
                                    />
                                    <Text style={{ fontSize: 16, marginEnd: 10 }}>วันที่เลือก</Text>
                                    <Text style={{ fontSize: 16 }}>{this.state.selectTime}</Text>
                                    <TouchableOpacity onPress={() => this.setSelectTime(null)}>
                                        <Icons.AntDesignIcon
                                            size={20}
                                            name='close'
                                            color={'#000000'}
                                            style={{ marginStart: 10 }}
                                        />
                                    </TouchableOpacity>
                                </View>
                                : null}
                            <ScrollView
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.isFetching}
                                        onRefresh={async () => {
                                            await this.setState({ selectTime: null })
                                            this.onRefresh()
                                        }
                                        }
                                        title="Loading..."
                                    />
                                }
                                contentContainerStyle={{ flexGrow: 1 }}

                            >
                                <MainDetail shipData={postsShip} shipmentID={postsShip.Shipment.shipref} navigation={navigation} onRefresh={this.onRefresh} />

                            </ScrollView>
                            {
                                postsShip.Shipment.status === 'U' ?
                                    <Footer style={{ height: 60, backgroundColor: '#FFF' }}>

                                        <TouchableOpacity
                                            onPress={() => this.comfirmStat()}
                                            style={{ flex: 1, backgroundColor: '#1c95ff', marginRight: 10, marginLeft: 20, marginTop: 10, marginBottom: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}
                                        >
                                            <Text style={{ color: '#FFF', fontSize: 18 }}>เริ่มการทำงาน</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => this.confirmRefuse()}
                                            style={{ flex: 1, backgroundColor: '#EB3B3B', marginRight: 20, marginLeft: 10, marginTop: 10, marginBottom: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}
                                        >
                                            <Text style={{ color: '#FFF', fontSize: 18 }}>ปฏิเสธ</Text>
                                        </TouchableOpacity>
                                    </Footer>
                                    :
                                    <Footer style={{ height: 60, backgroundColor: '#FFF' }}>

                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('distant')}
                                            style={{ flex: 1, backgroundColor: '#FFF', marginRight: 5, marginLeft: 5, marginTop: 5, marginBottom: 5, alignItems: 'flex-start', justifyContent: 'center', borderRadius: 5 }}
                                        >

                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ backgroundColor: '#FFF', width: 50, borderRadius: 100, height: 50, alignItems: "center", justifyContent: 'center', overflow: 'hidden', marginRight: 10, borderColor: '#000000', borderWidth: 1 }}>
                                                    <Icons.FontAwesome5Icons
                                                        size={20}
                                                        name='map-marked-alt'
                                                        color={'#176645'}

                                                    />
                                                </View>
                                                <Text style={{ color: '#000000', fontSize: 15, marginTop: 10 }}>ระยะทางทั้งหมดในการเดินทาง : </Text>
                                                <Text style={{ color: '#000000', fontSize: 15, color: 'green', marginTop: 10 }}>{postsShip.Distant.sumDistant} Km</Text>

                                            </View>

                                        </TouchableOpacity>
                                    </Footer>
                            }
                            {this.state.offline === true ? < ButtonOffLine /> : null}
                        </Container>
                    </GestureRecognizer>

                );
            } else {
                return (
                    <StyleProvider style={getTheme(material)}>
                        <Container>
                            <HeaderDetail shipID={navigation.state.params.shipData} goBack={() => this.goBack()} cargocheck={0} />
                            <ShipDetailHeader shipData={postsShip.Shipment} />
                            <SearchBar />
                            <View style={styles.noDataContain}>
                                <Image style={styles.imageStlye} source={require('../../../images/Not-Found-Logo.png')} ></Image>
                                <Text>ไม่พบข้อมูล</Text>
                            </View>
                        </Container>
                    </StyleProvider>
                )
            }
        } else {
            return (
                <StyleProvider style={getTheme(material)}>
                    <Container>
                        <HeaderDetail shipID={navigation.state.params.shipData} goBack={() => this.goBack()} cargocheck={0} />
                        <ShipDetailHeader shipData={postsShip.Shipment} />
                        <SearchBar />
                        <ActivityLoading />
                    </Container>
                </StyleProvider>
            )
        }
    }
}

const mapStateToProps = state => {

    return { postsShip: state.postsShip, wallet: state.wallet, local: state.myLocalStorage, posts: state.posts, }
}

export default connect(mapStateToProps, { fetchShiprefList, fetchShiprefListOffLine })(shipDetailListScreen)

