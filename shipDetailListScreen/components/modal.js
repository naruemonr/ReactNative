var React = require('react');
var ReactNative = require('react-native');
import {  Overlay } from 'react-native-elements';
var {
    Text,
    View,
    Dimensions,
    View

} = ReactNative;
import styles from "../style";
import PropTypes from 'prop-types';
import Icons from '../../../shared/icon'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default class ModalListDetail extends React.Component {

    render() {
        const { isVisible, setIsVisible } = this.props
        return (

            <Overlay onBackdropPress={() => setModal()} isVisible={isVisible}  borderRadius={20}>
                <View style={{ flexDirection: 'row' }} >
                    <Text style={styles.textOverlay}>Expenses</Text>
                    <View style={{ flexDirection: 'row', marginLeft: 'auto' }}>
                        <Icons.FontAwesome5Icons
                            size={20}
                            onPress={() => setIsVisible()}
                            name='window-close'
                            color={'#E29E18'}
                        />
                    </View>
                </View>
            </Overlay>


        );
    }
}

ModalListDetail.propTypes = {
    isVisible: PropTypes.bool,
    setModal: PropTypes.func
};
