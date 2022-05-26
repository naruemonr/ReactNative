var React = require('react');
import PropTypes from 'prop-types';
import SuccessTask from './items/successTask'
import WaitTask from './items/waitTask'

const MainDetail = props => {
    const {
        navigation,
        shipData,
        shipmentID,
        onRefresh
    } = props;

   
    return (

        shipData.WayPoint.map((Item, index) => {
            if (Item.status !== 'U') {
                
                return (
                    <SuccessTask
                        key={Item.OrderID}
                        Item={Item}
                        shipmentID={shipmentID}
                        index={index}
                        navigation={navigation}
                        onRefresh={onRefresh}
                 
                    />
                );
            } else {
                return (
                    <WaitTask
                        key={Item.OrderID}
                        Item={Item}
                        shipmentID={shipmentID}
                        index={index}
                        navigation={navigation}
                        onRefresh={onRefresh}
                    />
                )
            }

        })

    );

}

MainDetail.propTypes = {
    navigation: PropTypes.object,
    shipData: PropTypes.object,
    shipmentID: PropTypes.string,
    onRefresh: PropTypes.func

};

export default MainDetail