import React from 'react';
import { TopNavigation,Icon,TopNavigationAction } from '@ui-kitten/components';
import { connect } from 'react-redux';

let HeaderContent = ({navigation,setShowFilter}) => {

    let DrawerIcon = (props) => (
        <Icon name={'funnel-outline'} {...props} />
    );
    let DrawerActions = () => (
        <TopNavigationAction onPress={() => {setShowFilter(true)}} icon={DrawerIcon} />
    )
     return(
         <TopNavigation title={'Explore'} accessoryRight={DrawerActions}></TopNavigation>
     )
}


const mapStateToProps = (state) => {
     return {
         
     }
};

const mapDispatchToProps = (dispatch) => {
     return {
         
     }
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContent);