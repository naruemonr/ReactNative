var React = require('react');
var ReactNative = require('react-native');
import { Divider, Overlay, CheckBox } from 'react-native-elements';
var {
    Text,
    View,
    TouchableOpacity,
    Dimensions,
} = ReactNative
import PropTypes from 'prop-types';
import styles from "../style";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default class ModalListDetail extends React.Component {

    render() {
        const { isVisible, setModal } = this.props
        return (
          
                <Overlay onBackdropPress={() => { setModal() }} isVisible={isVisible} height={windowHeight * 0.4} width={windowWidth - 30} borderRadius={0}>

                    <Text style={styles.textA}>Load Seq.</Text>
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.buttonpd}>
                            <View>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFF' }}>-</Text>
                            </View>
                        </TouchableOpacity>
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20, marginRight: 20 }}>0</Text>

                            <Divider style={{ backgroundColor: '#000000' }} />
                        </View>
                        <TouchableOpacity style={styles.buttonpd}>
                            <View>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFF' }}>+</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.textA}>Load Direction</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1 }}>
                        <CheckBox
                            center
                            title='เดินหน้า'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            uncheckedColor='#FFF'
                            textStyle={{ fontSize: 25 }}
                            containerStyle={{ backgroundColor: '#FFF', borderColor: '#FFF' }}

                        />
                        <CheckBox
                            center
                            title='ถอยหลัง'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            uncheckedColor='#FFF'
                            checked={true}
                            textStyle={{ fontSize: 25 }}
                            containerStyle={{ backgroundColor: '#FFF', borderColor: '#FFF' }}

                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1, marginLeft: 20, marginRight: 20 }}>
                        <TouchableOpacity onPress={() =>  setModal() } style={styles.buttonpd1}>
                            <View>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFF' }}>ยกเลิก</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() =>  setModal()  } style={styles.buttonpd2}>
                            <View>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFF' }}>ส่ง</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Overlay>
          

        );
    }
}

ModalListDetail.propTypes = {
    isVisible: PropTypes.bool,
    setModal: PropTypes.func
};


