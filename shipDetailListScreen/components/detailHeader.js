var React = require('react');
var ReactNative = require('react-native');
var {
    Text,
    View,
} = ReactNative;
import PropTypes from 'prop-types';



const ShipDetailHeader = props => {
    const {
        shipData,
        wpData
    } = props;

    let getTotalKGALL = () => {
        var count = 0
        wpData.map(i => {

            if (i.pointtype === 'P') {

                i.Items.map(c => {
                    count = count + c.gw
                })

            }
        })
        return count


    }


    return (
        <View>
            <View style={{ margin: 5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                    <View>
                        <Text style={{ fontSize: 16, color: '#A9A9A9' }}>Kg(s) </Text>
                        <Text style={{ fontSize: 16, color: '#A9A9A9', marginLeft: 10 }}>{wpData !== undefined ? getTotalKGALL() : 0}</Text>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 16, paddingLeft: 100, color: '#A9A9A9' }}>CBM</Text>
                            <Text style={{ fontSize: 12, color: '#A9A9A9', paddingRight: 100 }}>3</Text>
                        </View>

                        <Text style={{ fontSize: 16, paddingLeft: 100, paddingRight: 100, color: '#A9A9A9', marginLeft: 10 }}> {shipData !== undefined ? shipData.total_obn : 0}</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 16, color: '#A9A9A9' }}>Piece</Text>
                        <Text style={{ fontSize: 16, color: '#A9A9A9', }}> {shipData !== undefined ? shipData.totalqty : 0}</Text>

                    </View>
                </View>

            </View>

        </View>
    );

}

ShipDetailHeader.propTypes = {
    shipDataData: PropTypes.object,
    wpData: PropTypes.array

};

export default ShipDetailHeader