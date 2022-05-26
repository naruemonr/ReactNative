
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  NativeModules,
  Alert,
  Modal
} from 'react-native';
import PropTypes from 'prop-types';
import { Container, StyleProvider } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import styles from './style';
import Icons from "../../shared/icon"
import ImageViewer from 'react-native-image-zoom-viewer';
import { InternetStatus, setDriverImage } from '../../shared/item'
import { URL, URL_IMAGE } from '../../shared/api/config'
import RNBottomActionSheet from 'react-native-bottom-action-sheet';
import Icon from 'react-native-vector-icons'
var ImagePicker = NativeModules.ImageCropPicker;
class ProfileScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentMoney: 0,
      useMoney: 0,
      history: null,
      Driver: null,
      openButtonSheet: false,


      isShowing: false
    };
  }

  componentDidMount = async () => { }
  pickSingleWithStore = async (cropping, mediaType = 'photo') => {
    ImagePicker.openPicker({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType,
    }).then(async (image) => {
      const data = await setDriverImage(image)
      await this.props.setDriverImg(data)
    }).catch(e => console.log('คุณได้ทำการยกเลิกการถ่ายรูปภาพ'));
  }

  pickSingleWithCamera = async (cropping, mediaType = 'photo') => {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType,
    }).then(async (image) => {
      const data = await setDriverImage(image)
      await this.props.setDriverImg(data)

    }).catch(e => console.log('คุณได้ทำการยกเลิกการถ่ายรูปภาพ'));
  }


  render() {
    let album = <Icon family={'Entypo'} name={'images'} color={'#000000'} size={30} />
    let instagram = <Icon family={'FontAwesome'} name={'instagram'} color={'#000000'} size={30} />
    let zoom = <Icon family={'Feather'} name={'zoom-in'} color={'#000000'} size={30} />
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>

          <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            <Modal visible={this.state.isShowing} onRequestClose={() => this.setState({ isShowing: !this.state.isShowing })} transparent={true}>

              <ImageViewer imageUrls={[{ 'url': URL_IMAGE + '/' + this.props.driverImage }]} />
            </Modal>

            <RNBottomActionSheet.SheetView visible={this.state.openButtonSheet} title={"ถ่ายรูป!"} theme={"light"}
              onSelection={(index, value) => {
                // value is optional
                this.setState({ openButtonSheet: false })
                console.log("selection: " + index + " " + value);
                if (index === 1) {
                  this.pickSingleWithStore();
                } else if (index === 0) {
                  this.pickSingleWithCamera();
                } else {
                  this.setState({ isShowing: !this.state.isShowing })
                  //  this.setState({ openButtonSheet: !this.state.openButtonSheet })
                }
                //this.setState({ openButtonSheet: !this.state.openButtonSheet })
              }}
              onCancel={() => { this.setState({ openButtonSheet: false }) }}>
              <RNBottomActionSheet.SheetView.Item title={"ถ่ายรูปภาพ..."} subTitle={"ถ่ายรูปภาพ..."} icon={instagram} />
              <RNBottomActionSheet.SheetView.Item title={"เลือกรูปจากคลัง..."} subTitle={"เลือกรูปจากคลัง..."} icon={album} />
              <RNBottomActionSheet.SheetView.Item title={"ดูรูปภาพ..."} subTitle={"ดูรูปภาพ..."} icon={zoom} />
            </RNBottomActionSheet.SheetView>

            <View style={{ marginStart: 20, marginTop: 20, flexDirection: 'row' }}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <TouchableOpacity
                  style={{ width: 65, height: 65, backgroundColor: '#176645', borderRadius: 200, alignItems: 'center', justifyContent: 'center' }}
                  onPress={async () => {
                    this.props.navigation.navigate('profilePull', { driverImage: this.props.driverImage, driver: this.props.driver, uri_: URL_IMAGE + '/' + this.props.driverImage, value: 'testF' });
                  }}
                >
                  {this.props.driver !== null && this.props.driverImage !== null ?

                    <Image
                      style={styles.imagesInStlye}
                      source={{ uri: URL_IMAGE + '/' + this.props.driverImage }}
                    />
                    :
                    <Icons.FontAwesomeIcons
                      size={30}
                      name='drivers-license-o'
                      color={'#FFF'}
                    />

                  }

                </TouchableOpacity>

                <View style={{ top: 0, marginLeft: 20 }}>
                  <Text style={{ fontSize: 14, color: '#000000', fontWeight: "bold" }}>{this.props.driver.drivername}</Text>

                </View>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <View style={{ flexDirection: 'row' }}>

                  <TouchableOpacity style={{ marginEnd: 20 }} onPress={() => this.props.logOut()}>
                    <Icons.MaterialIcons
                      size={30}
                      name='exit-to-app'
                      color={'#00000'}
                    />
                  </TouchableOpacity>
                </View>
              </View>

            </View>
            <View style={{ marginLeft: 20, marginTop: 20 }}>
              <View style={{ marginBottom: 20, flexDirection: 'row' }}>

                <Icons.FontAwesome5Icons
                  size={20}
                  name='code-branch'
                  color={'#00000'}
                  style={{ marginEnd: 10 }}
                />
                <Text style={{ fontSize: 14, color: '#000000', fontWeight: "bold" }}>รหัสคนขับ {this.props.driver.drivercode}</Text>
              </View>
              <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                <Icons.FontAwesomeIcons
                  size={20}
                  name='phone'
                  color={'#00000'}
                  style={{ marginEnd: 10 }}
                />
                <Text style={{ fontSize: 14, color: '#000000', fontWeight: "bold" }}>เบอร์โทร -</Text>
              </View>
              <View style={{ marginTop: 30 }}>
                <Text style={{ fontSize: 14, color: '#000000', fontWeight: "bold" }}>บริการ</Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>

                <TouchableOpacity style={styles.button}
                  onPress={async () => {
                    const netStatus = await InternetStatus()
                    if (netStatus) {
                      this.props.navigation.navigate('calendar')
                    } else {
                      Alert.alert(
                        "ไม่สามารถทำได้",
                        "คุณจำเป็นต้องต่ออินเตอร์เน็ตเพื่อจะทำการต่อไปได้",
                        [
                          {
                            text: "ตกลง",
                            onPress: () => console.log("Cancel Pressed"),
                          }
                        ],
                        { cancelable: false }
                      )
                    }

                  }}

                >
                  <View style={styles.marginInsideButton}>
                    <Icons.FontAwesome5Icons
                      size={30}
                      name='calendar'
                      color={'#00000'}
                    />

                  </View>
                  <Text>ปฏิทินงาน</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                  onPress={async () => {
                    const netStatus = await InternetStatus()
                    if (netStatus) {
                      this.props.navigation.navigate('wallet')
                    } else {
                      Alert.alert(
                        "ไม่สามารถทำได้",
                        "คุณจำเป็นต้องต่ออินเตอร์เน็ตเพื่อจะทำการต่อไปได้",
                        [
                          {
                            text: "ตกลง",
                            onPress: () => console.log("Cancel Pressed"),
                          }
                        ],
                        { cancelable: false }
                      )
                    }
                  }}
                >
                  <View style={styles.marginInsideButton}>
                    <Icons.FontAwesome5Icons
                      size={30}
                      name='wallet'
                      color={'#00000'}
                    />

                  </View>
                  <Text>กระเป๋าเงิน</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}
                  onPress={async () => {
                    const netStatus = await InternetStatus()
                    if (netStatus) {
                      this.props.navigation.navigate('accident')
                    } else {
                      Alert.alert(
                        "ไม่สามารถทำได้",
                        "คุณจำเป็นต้องต่ออินเตอร์เน็ตเพื่อจะทำการต่อไปได้",
                        [
                          {
                            text: "ตกลง",
                            onPress: () => console.log("Cancel Pressed"),
                          }
                        ],
                        { cancelable: false }
                      )
                    }
                  }}
                >
                  <View style={styles.marginInsideButton}>
                    <Icons.MaterialIcons
                      size={30}
                      name='report-problem'
                      color={'#00000'}
                    />

                  </View>
                  <Text>เเจ้งอุบัติเหตุ</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Container>
      </StyleProvider>

    );



  }
}
ProfileScreen.propTypes = {

  navigation: PropTypes.object,

};

export default ProfileScreen