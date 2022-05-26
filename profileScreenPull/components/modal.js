import PropTypes from 'prop-types';
import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { Overlay } from 'react-native-elements';
import styles from '../style'
const windowWidth = Dimensions.get('window').width;
export default class ModalNoSpec extends React.Component {
    render() {
        const { isVisible, setModal, pickSingleWithCamera, pickSingleWithStore } = this.props
        return (
            <Overlay
                onBackdropPress={() => {
                    setModal()
                }}
                isVisible={isVisible} height={'auto'} width={windowWidth - 70}
                state={styles.overLayImageMain}
            >
                <View>
                    <View style={styles.overLayBox}>
                        <Text style={styles.overLayTextHeader}>เลือกรูปภาพ ...</Text>
                        < TouchableOpacity
                            onPress={() => {
                                pickSingleWithCamera()
                                setModal()
                            }}>
                            <Text style={styles.overLayText}>ถ่ายรูปภาพ...</Text>
                        </TouchableOpacity>
                        < TouchableOpacity
                            onPress={() => {
                                pickSingleWithStore()
                                setModal()
                            }}>
                            <Text style={styles.overLayText}>เลือกรูปจากคลัง...</Text>
                        </TouchableOpacity>
                    </View>
                    < TouchableOpacity onPress={() => setModal()}>
                        <Text style={styles.overLayClosedText}>ปิด</Text>
                    </TouchableOpacity>
                </View>
            </Overlay>
        );
    }
}

ModalNoSpec.propTypes = {
    isVisible: PropTypes.bool,
    setModal: PropTypes.func,
    pickSingleWithCamera: PropTypes.func,
    pickSingleWithStore: PropTypes.func
};


