var React = require('react');
var ReactNative = require('react-native');
var {
    Text,
    View,
    TouchableOpacity,
    Dimensions
} = ReactNative;
import styles from "../../style";
import PropTypes from 'prop-types';
import { Divider } from 'react-native-elements';
import Icons from '../../../../shared/icon'
import moment from 'moment';
import { getTotalKG } from '../../../../shared/item'

const windowWidth = Dimensions.get('window').width;



const WaitTask = props => {
    const {
        shipmentID,
        Item,
        index,
        navigation,
        onRefresh
    } = props;

    let getTotalP = (data) => {
        var count = 0
        data.Items.map(i => {
            count = count + i.qty
        })
        return count


    }
    let getTotolKG = (data) => {
        var count = 0

        data.Items.map(i => {
            count = count + i.gw
        })
        return count



    }

    let getCBM = (data) => {
        var count = 0

        data.Items.map(i => {
            count = i.length * i.height * i.width
        })
        return count
    }


    return (
        <View >
            <TouchableOpacity
                style={styles.button}
                onPress={() => { navigation.navigate('ship_detail', { data: Item, id: shipmentID, onShipDetailsRefresh: onRefresh, wp_index: index + 1 }) }}

            >
                <View style={{ width: windowWidth * 0.9, flexDirection: 'row', justifyContent: 'center', margin: 10 }}>
                    <View style={{ flex: 1 }}>

                        <Text style={{ fontSize: 18, color: '#0080ff' }}>{Item.pointtype === 'P' ? 'รับของ' : 'ส่งของ'}</Text>
                        <Text style={{ fontSize: 14, color: '#db9a0d' }}>{moment(Item.datetimefrom).format('DD/MM/YYYY')} ({moment(Item.datetimefrom).format('HH:MM')} {'->'} {moment(Item.DeliveryDate).format('HH:MM')})</Text>

                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={{ color: '#808080', marginBottom: 14 }}>WP : {index + 1}</Text>
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
                <Divider style={{ backgroundColor: '#808080', marginTop: 25 }} />
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', margin: 10 }}>
                    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', marginEnd: 40 }}>
                        <Text style={{ fontSize: 14, color: '#808080', marginEnd: 10 }}>Kg(s)</Text>
                        <Text style={{ fontSize: 16, color: '#000000' }}>{getTotolKG(Item)}</Text>

                    </View>

                    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', marginEnd: 40 }}>
                        <View style={{ flexDirection: 'row', marginEnd: 10 }}>
                            <Text style={{ fontSize: 14, color: '#808080' }}>CBM</Text>
                            <Text style={{ fontSize: 10, color: '#808080' }}>3</Text>
                        </View>
                        <Text style={{ fontSize: 16, color: '#000000' }}>{getCBM(Item)}</Text>

                    </View>

                    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}>
                        <Text style={{ fontSize: 14, color: '#808080', marginEnd: 10 }}>Piece</Text>
                        <Text style={{ fontSize: 16, color: '#000000' }}>{getTotalP(Item)}</Text>

                    </View>
                </View>

            </TouchableOpacity>
        </View>
    );

}

WaitTask.propTypes = {
    shipmentID: PropTypes.string,
    Item: PropTypes.object,
    index: PropTypes.number,
    navigation: PropTypes.object,
    onRefresh: PropTypes.func
};

export default WaitTask 