import React, { Component } from 'react';
var ReactNative = require('react-native');
var { TextInput } = ReactNative;
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  FlatList,
  Text,

} from 'react-native';
import PropTypes from 'prop-types';
import { Container, StyleProvider } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import FooterMain from '../../../components/footer/footer'
import Icons from '../../shared/icon';
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-community/async-storage';
import { getSearchData, CountFooter } from '../../shared/item';
import moment from 'moment';
import { Footer, FooterTab, Button, Badge } from 'native-base';




const image = {
  uri: 'https://www.img.in.th/images/f34dd995d4f8fda45c6dbd708ddec0a3.jpg',
};
const Rectangle = () => {
  return (
    <View
      style={styles.rectangle}
      source={{ uri: 'https://sv1.picz.in.th/images/2021/07/01/ssiMge.png' }}
    />
  );
};


class searcScreen extends Component {
  constructor(props) {
    super(props);
    var { shipData } = this.props.navigation.state.params

    this.state = {
      //ประกาศค่าไว้สำหรับ set state
      currentMoney: 0, //int
      useMoney: 0,
      history: null, //null
      Driver: null,
      test: 'A', //string
      openButtonSheet: false, //boolean
      isShowing: false,
      activeStatus: 'A',
      searchData: '',
      data: [],
      date: null,

    };
  }


  setSearchData = async (text) => {
    await this.setState({ searchData: text, });
  };
  setStateTime = async () => {

    await this.setState({ date: null });
    // console.log(this.state.date);
    var { searchData, date, activeStatus } = this.state
    // console.log(activeStatus)
    var result = await getSearchData(searchData, date, activeStatus);
    this.setState({ data: result.Shipment });

  };
  onShipRefresh = async (searchData) => {
    var resultCount = await CountFooter()
    this.setState({ waitCount: resultCount.waitCount, onGoingCount: resultCount.onGoingCount, finishCount: resultCount.finishCount })

    await this.setState({ searchData: searchData });
    var result = await getSearchData(this.state.searchData, this.state.date, this.state.activeStatus);
    this.setState({ data: result.Shipment });
  }


  setValue = async () => {
    await this.setState({ searchData: '' });
    var result = await getSearchData(this.state.searchData, this.state.date, this.state.activeStatus);
    this.setState({ data: result.Shipment });
  }
  updateActiveStatus = async (status) => {

    await this.setState({ activeStatus: status })
    var result = await getSearchData(this.state.searchData, this.state.date, this.state.activeStatus);
    await this.setState({ data: result.Shipment });

  }
  getData = async () => {

    var resultCount = await CountFooter()
    this.setState({ waitCount: resultCount.waitCount, onGoingCount: resultCount.onGoingCount, finishCount: resultCount.finishCount })
    console.log(this.state.waitCount)
    var result = await getSearchData(this.state.searchData, this.state.date, this.state.activeStatus);
    await this.setState({ data: result.Shipment });
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  }

  componentDidMount = async () => {
    await this.getData()

    await this.refs.nameref.focus()

  };
  render() {



    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <View style={{ flex: 1, backgroundColor: '#FFFF' }}>
            <View
              style={{
                // flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginLeft: 5,
                marginTop: 10,
              }}>
              <TouchableOpacity
                style={{ marginLeft: 6, marginTop: 10 }}
                onPress={() => this.props.navigation.goBack()}>
                <Icons.MaterialIcons
                  size={25}
                  name="arrow-back"
                  color={'#00000'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginLeft: 8,
                  elevation: 2,
                  borderRadius: 25,
                  backgroundColor: '#FFF',
                  height: 50,
                  width: 340,
                }}
                disabled={true}
                onPress={() => this.pickSingleWithCamera()}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginLeft: 10,
                  }}>
                  <View style={{ width: '75%' }}>
                    <TextInput
                      ref={"nameref"}
                      placeholder={'ค้นหา'}
                      value={this.state.searchData}
                      onChangeText={(text) => this.setSearchData(text)}
                      onSubmitEditing={async () => {
                        var result = await getSearchData(
                          this.state.searchData,
                          this.state.date,
                          this.state.activeStatus
                        );
                        await this.setState({ data: result.Shipment });
                      }}
                    ></TextInput>
                  </View>
                  {this.state.searchData != '' ? (
                    <View>
                      <View style={{ justifyContent: 'center', flexWrap: 'wrap', marginLeft: 40, marginTop: 15 }} >
                        <TouchableOpacity
                          onPress={() => this.setValue(this.state.searchData)}
                        >
                          <Icons.AntDesignIcon
                            size={20}
                            name="close"
                            color={'#00000'}
                          />
                        </TouchableOpacity>
                      </View>

                    </View>


                  ) : (<View
                    style={{
                      justifyContent: 'center',
                      flexWrap: 'wrap',
                      marginLeft: 1,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('qr_screen', { onShipRefresh: this.onShipRefresh });

                      }}>
                      <Icons.FontistoIcons
                        size={20}
                        name="qrcode"
                        color={'#00000'}
                      />
                    </TouchableOpacity>
                    <DatePicker
                      style={{ width: 20, marginLeft: 25 }}
                      mode="date"
                      placeholder="select date"
                      format="YYYY-MM-DD"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      iconComponent={
                        <Icons.FontAwesome5Icons
                          size={20}
                          name="calendar-day"
                          color={'#000000'}
                        />
                      }
                      hideText={true}
                      onDateChange={async (date) => {
                        this.setState({ date: date });
                        var result = await getSearchData(
                          this.state.searchData,
                          this.state.date,
                          this.state.activeStatus
                        );
                        await this.setState({ data: result.Shipment });


                      }}
                    />
                  </View>)}

                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                borderBottomColor: '#E7E7E7',
                borderBottomWidth: 1,
                marginTop: 10,
              }}
            />

            <FooterMain listWait={this.state.waitCount} listOnGoing={this.state.onGoingCount} listfinish={this.state.finishCount} activeStatus={this.state.activeStatus} updateActiveStatus={(status) => { this.updateActiveStatus(status) }} searchTrigger={true} />
            <View style={styles.container}>
              {this.state.data.length === 0 ? ( //ถ้าไม่มีข้อมูล

                <View>
                  <View
                    style={{
                      marginTop: 5,
                      flexDirection: 'row',
                      marginBottom: 5,
                      justifyContent: 'center',
                    }}>
                    {
                      ///////เวลาที่วันไม่ได้เลือกต้องซ่อนเอาไว้นะมันดูไม่ดีหากออกมา
                      this.state.date === null ? <Text></Text>
                        :
                        <View style={{ flexDirection: 'row', marginBottom: 5, justifyContent: 'center', }}>
                          <Icons.FontistoIcons
                            size={20}
                            name="date"
                            color={'green'}
                            style={{ marginEnd: 20, marginTop: 10 }}
                          />
                          <Text style={{ fontSize: 16, marginEnd: 10, marginTop: 10 }}>วันที่เลือก</Text>
                          <Text style={{ fontSize: 16, marginEnd: 10, marginTop: 10 }}>{this.state.date}</Text>
                          <TouchableOpacity onPress={() => this.setStateTime()}>
                            <Icons.AntDesignIcon
                              size={20}
                              name="close"
                              color={'#000000'}
                              style={{ marginStart: 10, marginTop: 10 }}
                            />
                          </TouchableOpacity>
                        </View>
                    }


                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginBottom: 5,
                      justifyContent: 'center',
                    }}>
                    <Text style={{ fontSize: 20, marginEnd: 10, marginTop: 20 }}>
                      ไม่พบข้อมูล !!
                    </Text>
                  </View>
                </View>
              ) : (
                //มีข้อมูล
                <FlatList
                  data={this.state.data}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (

                    <View key={index}>
                      <TouchableOpacity
                        style={{
                          //  marginLeft:25,
                          margin: 10,
                          elevation: 10,
                          borderRadius: 5,
                          backgroundColor: '#FFF',
                          height: 100,
                          height: 'auto',
                          flex: 1,
                          flexWrap: 'wrap',
                        }}
                        onPress={() => {
                          this.props.navigation.navigate('ship_detail_list', {
                            shipData: item.shipref,
                            onShipRefresh: this.getData,
                            calendar: true,
                          });
                        }}>
                        <View style={styles.boxMain}>
                          <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 16, color: '#2db341' }}>
                              {item.shipref}
                            </Text>
                            <Text style={{ fontSize: 11, color: '#db9a0d' }}>
                              {moment(item.StartDate).format(
                                'DD/MM/YYYY HH:MM',
                              )}{' '}
                              {'->'}{' '}
                              {moment(item.DeliveryDate).format(
                                'DD/MM/YYYY HH:MM',
                              )}{' '}
                            </Text>
                          </View>
                          {item.STATUS === 'A' ? (
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                              <Text style={{ color: '#808080', marginBottom: 5 }}>
                                WP : {item.wp_complete}/{item.wp_total}
                              </Text>
                              <Text style={{ fontSize: 16, color: '#0000FF' }}>
                                {item.projectcode}
                              </Text>
                              <Icons.MaterialCommunityIcons
                                name="truck-fast"
                                size={30}
                                style={{
                                  height: 30,
                                  width: 30,
                                  marginLeft: 5,
                                  marginRight: 5,
                                  top: 8,
                                }}
                                color={'#00704f'}
                              />
                            </View>
                          ) : item.STATUS === 'C' ? (
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                              <Text style={{ color: '#808080', marginBottom: 5 }}>
                                WP : {item.wp_complete}/{item.wp_total}
                              </Text>
                              <Text style={{ fontSize: 16, color: '#0000FF' }}>
                                {item.projectcode}
                              </Text>
                              <Icons.FontAwesome5Icons
                                name="box"
                                size={25}
                                style={{
                                  height: 30,
                                  width: 30,
                                  marginLeft: 5,
                                  marginRight: 5,
                                  top: 8,
                                }}
                                color={'#00704f'}
                              />
                            </View>
                          ) : (
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                              <Text style={{ color: '#808080', marginBottom: 5 }}>
                                WP : {item.wp_complete}/{item.wp_total}
                              </Text>
                              <Text style={{ fontSize: 16, color: '#0000FF' }}>
                                {item.projectcode}
                              </Text>
                              <Icons.FontAwesome5Icons
                                name="truck-loading"
                                size={25}
                                style={{
                                  height: 30,
                                  width: 30,
                                  marginLeft: 5,
                                  marginRight: 5,
                                  top: 8,
                                }}
                                color={'#00704f'}
                              />
                            </View>
                          )}
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              )}
            </View>
          </View>

        </Container>

      </StyleProvider>
    );
  }
}
searcScreen.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  item: {
    marginLeft: 10,
    padding: 10,
    fontSize: 18,
    height: 45,
  },
  button: {
    backgroundColor: '#FFF',
    height: 'auto',
    margin: 10,
    elevation: 10,
    borderRadius: 5,
    flexWrap: 'wrap',
    flex: 1,
  },
  contain: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  noDataContain: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 70,
  },
  imageStlye: {
    width: 100,
    height: 100,
    marginTop: 5,
  },
  boxMain: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
    flexWrap: 'wrap',
  },
});


export default searcScreen;
