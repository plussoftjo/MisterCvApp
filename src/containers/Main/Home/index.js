import React from 'react';
import { View,ScrollView } from 'react-native';
import { Layout,Text } from '@ui-kitten/components';
import { connect } from 'react-redux';


// Local Components
import * as Components from './components'
import * as Contents from './contents'

// Constants 
import {Faker} from '../../../constants'

// Global components
import {ContentCard} from '../../../components'

import {translate} from '../../../translations'

let Home = (props) => {
   
   // Global Variables
   let {myCvs,user} = props.user
   let {navigation} = props;

   // Local Variables
   let [addNew,setAddNew] = React.useState(false) // Add New Screen


   return(
     <Layout style={{flex:1}}>
        <Components.HeaderContent handlePressPlusIcon={() => {setAddNew(!addNew)}} />

         {myCvs.length == 0 &&
            <Contents.Empty />
         }
         {myCvs.length >= 1 &&
         <ScrollView showsVerticalScrollIndicator={false}>
            <Contents.Cvs navigation={navigation} />
         </ScrollView>
         }

         {addNew &&
           <Contents.AddNew onHide={() => setAddNew(false)} />
         }
     </Layout>
   )
}


const mapStateToProps = (state) => {
   return {
     user:state.user
   }
};

const mapDispatchToProps = (dispatch) => {
   return {
     
   }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);