import React from "react";
import { View } from "react-native";
import { Layout, Text, TopNavigation } from "@ui-kitten/components";
import { connect } from "react-redux";

import { Empty,Cvs } from "./contents";
import { Header,FilterContent } from "./components";

let Explore = (props) => {
  let { navigation } = props;
  let {exploreCvs} = props.user

  let [showFilter,setShowFilter] = React.useState(false)
  return (
    <Layout style={{ flex: 1 }}>
      <Header navigation={navigation} setShowFilter={setShowFilter}/>
      {exploreCvs.length == 0 &&
        <Empty setShowFilter={setShowFilter} />
      }
      {exploreCvs.length >= 1 &&
        <Cvs navigation={navigation} />
      }
      {showFilter &&
        <FilterContent onHide={() => {setShowFilter(false)}} />
      }
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    user:state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
