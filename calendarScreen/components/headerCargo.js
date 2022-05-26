var React = require('react');
var ReactNative = require('react-native');
var {
    Text,
    TouchableOpacity,
    View,
    Image,
} = ReactNative;
import styles from "../style";
import PropTypes from 'prop-types';
import SearchBar from '../../../../components/searchBar/searchBar'

const HeaderCargo = props => {
    const {
        address,
    } = props;


    return (
        <View style={{
            elevation: 2,
            backgroundColor: "#FFF",
            height: 80,
            marginBottom: 5

        }}>
            <TouchableOpacity style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginRight: 10, marginLeft: 10, marginBottom: 50 }}>
                    <View style={{ backgroundColor: '#176645', width: 50, borderRadius: 100, height: 50, alignItems: "center", justifyContent: 'center', overflow: 'hidden', marginTop: 20, marginRight: 10 }}>
                        <Image
                            style={{ width: '100%', height: '100%', }}
                            // source={{
                            //     uri: 'https://img2.thaipng.com/20180328/she/kisspng-google-maps-computer-icons-maps-5abc3a7a261239.322842121522285178156.jpg',
                            // }}
                            source={require('../../../../images/MAPLOGO.jpg')}
                        />
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginLeft: 5, marginTop: 45 }}>
                        <Text style={styles.addressFont} >{address}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            {/* <SearchBar /> */}
        </View>

    );

}

HeaderCargo.propTypes = {
    address: PropTypes.string,
};

export default HeaderCargo