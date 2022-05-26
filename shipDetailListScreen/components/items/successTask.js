var React = require('react');
var ReactNative = require('react-native');
var {
    Text,
    View,
    TouchableOpacity,
    Dimensions,
} = ReactNative;
import styles from "../../style";
import PropTypes from 'prop-types';
import Icons from '../../../../shared/icon'
import moment from 'moment';

const windowWidth = Dimensions.get('window').width;

const SuccessTas = props => {
    const {
        shipmentID,
        Item,
        index,
        navigation,
        onRefresh
    } = props;



    return (
        <View>
            <TouchableOpacity
                style={Item.status_delivery === 1 ?styles.buttonSucces :styles.buttonSucces2 }
                onPress={() => { navigation.navigate('ship_detail', { data: Item, id: shipmentID, onShipDetailsRefresh: onRefresh, wp_index: index + 1 }) }}

            >
                <View style={{ width: windowWidth * 0.9, flexDirection: 'row', justifyContent: 'center', margin: 10 }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 18, color: '#2db341', marginEnd: 70 }}>{Item.pointtype === 'P' ? 'รับของ' : 'ส่งของ'}</Text>

                        </View>
                        <Text style={{ fontSize: 14, color: '#db9a0d' }}>{moment(Item.datetimefrom).format('DD/MM/YYYY')} ({moment(Item.datetimefrom).format('HH:MM')} {'->'} {moment(Item.DeliveryDate).format('HH:MM')})</Text>


                    </View>
                    <View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={{ color: '#808080', marginBottom: 5 }}>WP : {index + 1}</Text>
                        </View>
                        {/* <View style={{ alignItems: 'flex-end' }}>
                            <Text style={{ fontSize: 18, color: '#2db341' }}>เสร็จสิ้น</Text>
                        </View> */}
                    </View>
                </View>
                <View style={{ marginLeft: 10, marginRight: 20, top: -15, flex: 1, marginTop: 5 }}>
                    <Text numberOfLines={1} style={{ fontSize: 16, marginTop: 5 }}>{Item.companyname}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <View style={{ marginRight: 10 }}>
                            < Icons.FontAwesome5Icons
                                size={20}
                                name='map-marker-alt'
                                color={'red'}
                            />
                        </View>
                        <View style={{ top: -5 }}>
                            <Text numberOfLines={2} style={{ color: '#808080', fontSize: 14, marginRight: 2 }}>{Item.address}</Text>
                        </View>
                    </View>
                </View>

            </TouchableOpacity>
        </View>
    );

}

SuccessTas.propTypes = {
    shipmentID: PropTypes.string,
    Item: PropTypes.object,
    index: PropTypes.number,
    navigation: PropTypes.object,
    onRefresh: PropTypes.func


};

export default SuccessTas

