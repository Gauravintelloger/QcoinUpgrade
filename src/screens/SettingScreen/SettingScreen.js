

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
  Platform,
  ActivityIndicator
} from 'react-native';
// import FastImage from '@d11/react-native-fast-image';
import { showModal, screenIds, goToLogin, pop, push } from '../../navigation';
import { HStack, Box } from "@gluestack-ui/themed";
import { GluestackUIProvider } from "@gluestack-ui/themed";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { OverLay } from "../../components/OverLay";

import { getRedeemRequests } from '../../services/api/calls';

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

class SettingScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...(props.userProfile || {}),
      redeemStatus: {}
    }
  }

  getRedeems = async () => {
    // const response = await getRedeemsCall();
    // this.setState({
    //     redeems: response.data.redeems
    // })
}

  _removeData = async (item) => {
    try {
      const token = await AsyncStorage.removeItem(item);
      if (token !== null) {
        return true

      } else {
        return false
      }
    } catch (error) {
    }
  };

  componentDidMount() {
    this.getRedeemRequests()
  }

  getRedeemRequests = async () => {
    const response = await getRedeemRequests()
    this.setState({
      redeemStatus: response.data.requests[0]
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.refreshRedeem != this.props.refreshRedeem && nextProps.refreshRedeem) {
      this.getRedeemRequests()
    }
  }

  render() {
    const { position = {}, points_to_give } = this.state;
    return (
      <GluestackUIProvider>
      <Box flex={1} backgroundColor={'#F6F6F6'}>
        <HStack backgroundColor= {'#005EB8'} borderBottomWidth= {0} justifyContent= {'flex-start'} alignItems= {'center'} style={Platform.OS == 'android' ? { height: dimensionsCalculation(70) } : {}}>
          <TouchableOpacity onPress={() => pop(this.props.componentId)} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Image style={{ marginLeft: 10 }} source={require('../../assets/icons/left_arrow.png')} />
            <Text style={{ fontSize: dimensionsCalculation(20), color: '#FFFFFF', marginHorizontal: dimensionsCalculation(8) }}>{'Settings'.toUpperCase()}</Text>
          </TouchableOpacity>
        </HStack>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: '#F6F6F6' }}>
          <TouchableOpacity
            onPress={() => push(this.props.componentId, screenIds.USER_INFORMATION_SCREEN, {
              user: this.props.user
            }, {
                bottomTabs: {
                  visible: false,
                  animate: false,
                },
              })} activeOpacity={1} style={{ backgroundColor: '#fff', padding: dimensionsCalculation(24), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomColor: '#E2E2E2', borderBottomWidth: 1 }}>
            <Text style={{ fontSize: dimensionsCalculation(18), color: '#707070' }}>User Information</Text>
              <Image source={require('../../assets/icons/right_arrow.png')} style={{ tintColor: '#707070' }} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => push(this.props.componentId, screenIds.CHANGE_PASSWORD_SCREEN1, {
              user: this.props.user
            }, {
                bottomTabs: {
                  visible: false,
                  animate: false,
                },
              })}
            style={{ backgroundColor: '#fff', padding: dimensionsCalculation(24), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomColor: '#E2E2E2', borderBottomWidth: 1 }}>
            <Text style={{ fontSize: dimensionsCalculation(18), color: '#707070' }}>Change Password</Text>
              <Image source={require('../../assets/icons/right_arrow.png')} style={{ tintColor: '#707070' }} />
          </TouchableOpacity>

          {position.layer !== "A" &&
            <View style={{ backgroundColor: '#fff', borderBottomColor: '#E2E2E2', borderBottomWidth: 1, marginBottom: dimensionsCalculation(32) }}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => push(this.props.componentId, screenIds.REDEEM_SCREEN, {
                  getRedeemRequests: this.getRedeemRequests,
                  redeemStatus:this.state.redeemStatus
                }, {
                    bottomTabs: {
                      visible: false,
                      animate: false,
                    },
                  })}
                style={{ backgroundColor: '#fff', padding: dimensionsCalculation(24), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: dimensionsCalculation(18), color: '#707070' }}>Redeem</Text>
                  <Image source={require('../../assets/icons/right_arrow.png')} style={{ tintColor: '#707070' }} />
              </TouchableOpacity>
              {this.state.redeemStatus && this.state.redeemStatus.status == "accepted" &&
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                  <Text style={{
                    fontSize: dimensionsCalculation(15),
                    color: '#60c73d',
                    marginLeft: dimensionsCalculation(24),
                    marginBottom: dimensionsCalculation(40)
                  }}>
                    Your Request is approved
                  </Text>

                  <Image
                      source={require('../../assets/icons/green-check.png')}
                    style={{
                      marginRight: dimensionsCalculation(20),
                      marginTop: dimensionsCalculation(2),

                    }}
                  />
                </View>
              }

              {this.state.redeemStatus && this.state.redeemStatus.status == "rejected" &&
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{
                    fontSize: dimensionsCalculation(15),
                    color: 'red',
                    marginLeft: dimensionsCalculation(24),
                    marginBottom: dimensionsCalculation(40),
                    width:"80%"
                  }}>
                    Your Request is rejected, kindly contact management for more information
                  </Text>
                  <Image
                      source={require('../../assets/icons/alert.png')}
                    style={{
                      marginRight: dimensionsCalculation(25),
                      marginHorizontal: 5,
                    }}
                  />
                </View>
              }

              {this.state.redeemStatus && this.state.redeemStatus.status == "pending" &&
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{
                    fontSize: dimensionsCalculation(15),
                    color: '#ffac5d',
                    marginLeft: dimensionsCalculation(24),
                    marginBottom: dimensionsCalculation(40)
                  }}>
                    Your request is pending
                  </Text>
                  <ActivityIndicator
                    style={{ marginRight: 15, marginBottom: 50 }}
                    size="small"
                    color="#ffac5d" />
                </View>
              }
            </View>
          }

          {position.layer !== "C" ? <View style={{ backgroundColor: '#fff', padding: dimensionsCalculation(24), borderBottomColor: '#E2E2E2', borderBottomWidth: 1, marginBottom: dimensionsCalculation(32) }}>
            <Text style={{ fontSize: dimensionsCalculation(18), color: '#707070', marginBottom: dimensionsCalculation(8) }}>You have </Text>
            <Text style={{ fontSize: dimensionsCalculation(18), color: '#707070', fontWeight: 'bold' }}>{points_to_give} Qcoins <Text style={{ color: '#707070', fontWeight: 'normal' }}>to give</Text> </Text>
          </View> : null}

          <View style={{ backgroundColor: '#fff', borderBottomColor: '#E2E2E2', borderBottomWidth: 1, marginBottom: dimensionsCalculation(32) }}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => push(this.props.componentId, screenIds.ABOUT_SCREEN, {
                }, {
                    bottomTabs: {
                      visible: false,
                      animate: false,
                    },
                  })}
                style={{ backgroundColor: '#fff', padding: dimensionsCalculation(24), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: dimensionsCalculation(18), color: '#707070' }}>About</Text>
                <Image source={require('../../assets/icons/right_arrow.png')} style={{ tintColor: '#707070' }} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => push(this.props.componentId, screenIds.PUBLICATION_SCREEN, {
                }, {
                    bottomTabs: {
                      visible: false,
                      animate: false,
                    },
                  })}
                style={{ backgroundColor: '#fff', padding: dimensionsCalculation(24), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: dimensionsCalculation(18), color: '#707070' }}>Publication</Text>
                <Image source={require('../../assets/icons/right_arrow.png')} style={{ tintColor: '#707070' }} />
              </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              showModal(screenIds.MODAL_SCREEN, {
                text: 'Are you sure you want to log out?',
                noText: 'No',
                yesText: 'Yes',
                yesClick: async () => {
                  await AsyncStorage.clear()
                  await AsyncStorage.setItem("popup-opened","true")

                  goToLogin()
                }
              },
                {
                  layout: {
                    backgroundColor: 'rgba(143,143,143,0.44)',
                  },
                  modalPresentationStyle: 'overCurrentContext',
                  statusBar: {
                    style: 'dark',
                    backgroundColor: '#005EB8',
                  }
                })
            }}
            style={{ backgroundColor: '#fff', padding: dimensionsCalculation(24), borderBottomColor: '#E2E2E2', borderBottomWidth: 1 }}>
            <Text style={{ fontSize: dimensionsCalculation(18), color: '#707070' }}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
        {this.props.pending && <OverLay />}
      </Box>
      </GluestackUIProvider>
    );
  }
}

export default SettingScreen;
