
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  NativeModules,
  Modal,
  StyleSheet,
  ImageBackground,
  Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import { Container, StyleProvider } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import { URL_IMAGE } from '../../shared/api/config'
import Icons from "../../shared/icon"
import ImageViewer from 'react-native-image-zoom-viewer'; //import ให้รูปภาพมัน zoom ไว้ดู
import { setDriverImage } from '../../shared/item'
// const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


// var ImagePicker = ImageCropPicker.ImageCropPicker;
var ImagePicker = NativeModules.ImageCropPicker;

class profileScreenPull extends Component {

  constructor(props) {
    super(props);
    this.state = { //ประกาศค่าไว้สำหรับ set state
      currentMoney: 0,//int
      useMoney: 0,
      history: null,//null
      Driver: null,
      test: 'A',//string
      openButtonSheet: false, //boolean
      isShowing: false,

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

  changeStateIsShowing = async () => { //ฟังก์ชั่นสำหรับ set state ในการกำหนดการเปิดเรียกดูรูปภาพ

    var { isShowing } = this.state //ประกาศตัวแปรที่ดึงมาใช้จาก constructor(props) //ที่ set state// this.state = {
    this.setState({ isShowing: !isShowing, test: 'B' }) //เมื่อกดเข้ามาเจอฟังก์ชั่นนี้ต้องการให้ isShowing เซตเป็นตรงข้าม ตอนเเรก isShowing: false เข้าฟังก์นี้เซตเป็น true
  }
  getFunction = async () => { //ฟังก์ชั่น 1.ตั้งชื่อให้ตั้งตัวเเรกพิมเล็ก จะได้ไม่ซ้ำกับ Module (Module ใช้พิมพ์ใหญ่)
    console.log('ABCD')
    // var { isShowing } = this.state
    // this.setState({ isShowing: !isShowing })
  }


  render() {
    var { driverImage, driver } = this.props.navigation.state.params //ข้อมูลที่ส่งมาจากก่อนหน้า-> รับข้อมูลตรงนี้
    var { currentMoney, isShowing } = this.state //ประกาศอีกครั้งให้ render รู้จัก isShowing

    return (
      <StyleProvider style={getTheme(material)}>
        <ImageBackground source={
          require('../../../images/LOGIN2.jpg')
        }
          style={styles.image}>

          <TouchableOpacity                                                                                                                    
            style={{ marginLeft: 20, marginBottom: windowHeight-100, color: '#FFFF' }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Icons.AntDesignIcon
              size={30}
              name='close'
              color={'#FFF'}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.circle}//touch กดได้ ครอบรูปภาพไว้
            onPress={() => {
              // this.setState({ isShowing: !isShowing }) //ตอนกดรูปถ้าไม่เรียกใช้ฟังก์ชั่นก็สั่งให้ทำงานตอนกดได้ 
              this.changeStateIsShowing() //เรียกใช้ฟังก์ชั่นทำงาน set state
            }}
          >
            <Image
              style={styles.imagesInStlye}
              source={{ uri: URL_IMAGE + '/' + driverImage }}
              resizeMode={'cover'}
            />
          </TouchableOpacity>

          <Text style={styles.name}>{driver.drivername}  </Text>

          <View style={{
            flexDirection: "row",
            flexWrap: "wrap",
            bottom: '30%',
            marginRight: 150,
            alignSelf: 'center',
          }}>
            <TouchableOpacity
              style={styles.camera}
              onPress={() => this.pickSingleWithCamera()}
            >
              <Icons.FontAwesomeIcons
                size={40}
                name='camera'
                color={'#FFF'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.getpic}

              onPress={() => this.pickSingleWithStore()}
            >
              <Icons.FontAwesomeIcons
                size={40}
                name='picture-o'
                color={'#FFF'}
              />
            </TouchableOpacity>
          </View>
          <Modal visible={isShowing} onRequestClose={() => this.changeStateIsShowing()} transparent={true}>

            <ImageViewer imageUrls={[{ 'url': URL_IMAGE + '/' + driverImage }]} />
          </Modal>


        </ImageBackground>

      </StyleProvider>

    );



  }
}
profileScreenPull.propTypes = {

  navigation: PropTypes.object,

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0"
  },
  imagesInStlye: {
    marginLeft: 5,
    position: 'absolute',
    justifyContent: "center",
    width: 150,
    height: 150,
    borderRadius: 150,
    bottom: '3%',
  },
  circle: {
    width: 160,
    height: 160,
    backgroundColor: '#FFF',
    borderRadius: 160 / 2,
    position: 'absolute',
    alignSelf: 'center',
    bottom: '30%'
  },
  camera: {
    position: 'absolute',
    bottom: '20%'
  },
  getpic: {
    marginLeft: 100,
    position: 'absolute',
    bottom: '20%'
  },
  name: {
    fontSize: 28,
    color: "#ffffff",
    fontWeight: '700',
    position: 'absolute',
    alignSelf: 'center',
    bottom: '25%'
  },
  name2: {
    fontSize: 100,
    color: "#ffffff",
    fontWeight: '700',
    position: 'absolute',
    alignSelf: 'center',
    bottom: '20%'
  },

});
export default profileScreenPull