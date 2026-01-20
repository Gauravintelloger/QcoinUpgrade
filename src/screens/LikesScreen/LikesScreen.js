
import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Alert,
  FlatList,
  Platform
} from 'react-native';
// import FastImage from '@d11/react-native-fast-image';
import { showModal, screenIds, goToLogin, pop, dismissModal, push } from '../../navigation';
import { HStack, Box } from "@gluestack-ui/themed";
import { GluestackUIProvider } from "@gluestack-ui/themed";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { OverLay } from "../../components/OverLay";
const { width, height } = Dimensions.get('window');
const dimensionsCalculation = (IPhonePixel) => {
  return width * IPhonePixel / 375
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#039893',
    width: 230,
    marginTop: 30,
    borderRadius: 25
  },
  buttonTitle: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  logo: {
    width: 300,
    height: 120,
    resizeMode: 'contain'
  },
  logoTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500'
  }
});

class LikesScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      id: props.id
    }
  }
  componentDidMount() {
    this.props.getLikesForPost({ id: this.props.id, page: 1 })
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.likesForPost[this.props.id] != nextProps.likesForPost[this.props.id] && this.state.id === this.props.id) {
      this.setState({
        people: nextProps.likesForPost[this.props.id].list
      })
    }
  }

  renderItem = ({ item, index }) => {
    const { liker } = item;
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          push(this.props.componentId, screenIds.PROFILE_SCREEN, { user: liker })
        }}
        style={{ paddingHorizontal: dimensionsCalculation(16), flexDirection: 'row', paddingVertical: dimensionsCalculation(8), alignItems: 'center' }}>
        <View style={{ width: dimensionsCalculation(45), height: dimensionsCalculation(45), borderRadius: dimensionsCalculation(45 / 2) }}>

          {liker.image && <Image source={{ uri: liker.image }} style={{ width: '100%', height: '100%', borderRadius: dimensionsCalculation(45 / 2) }} />}
        </View>
        <Text style={{ marginLeft: dimensionsCalculation(8), color: '#656565', fontSize: dimensionsCalculation(16) }}>{liker.name}</Text>
      </TouchableOpacity>
    )
  }
  render() {
    return (
      <GluestackUIProvider>
      <Box flex={1} backgroundColor={'F6F6F6'}>
        <HStack backgroundColor= {'#005EB8'} borderBottomWidth= {0} paddingLeft= {0} paddingRight= {0} style={Platform.OS == 'android' ? { height: dimensionsCalculation(70) } : {}}>
          <TouchableOpacity activeOpacity={1} onPress={() => dismissModal(this.props.componentId)} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#fff', width: '100%', paddingHorizontal: dimensionsCalculation(16), borderBottomWidth: 1, borderBottomColor: 'rgba(112,112,112,0.08)' }}>

              <Image source={require('../../assets/icons/left_arrow.png')} style={{ tintColor: '#000000', marginLeft:10 }} />
              <Image source={require('../../assets/icons/like_rounded.png')} style={{ marginLeft: dimensionsCalculation(16), marginRight: dimensionsCalculation(8) }} />
            <Text style={{ fontSize: dimensionsCalculation(16), color: '#656565', }}>{`${this.props.total_likes} People liked this post`}</Text>
          </TouchableOpacity>
        </HStack>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.people}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => item.user_id.toString()}
        />
      </Box>
      </GluestackUIProvider>
    );
  }
}

export default LikesScreen;
