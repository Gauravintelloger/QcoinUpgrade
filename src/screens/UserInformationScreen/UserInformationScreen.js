

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
} from 'react-native';
// import FastImage from '@d11/react-native-fast-image';
import {
  showModal,
  screenIds,
  goToLogin,
  pop,
  resetRoot,
} from '../../navigation';
import { HStack, Box } from "@gluestack-ui/themed";
import { GluestackUIProvider } from "@gluestack-ui/themed";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { OverLay } from '../../components/OverLay';
const { width, height } = Dimensions.get('window');
const dimensionsCalculation = IPhonePixel => {
  return (width * IPhonePixel) / 375;
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#039893',
    width: 230,
    marginTop: 30,
    borderRadius: 25,
  },
  buttonTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  logo: {
    width: 300,
    height: 120,
    resizeMode: 'contain',
  },
  logoTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
  },
});

class UserInformationScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...props.user,
      show: false,
      source: '',
    };
  }

  viewImage = (show, source) => {
    this.setState({
      viewImage: show,
      source: source,
    });
  };

  render() {
    const { name, username, email } = this.props.userProfile;
    return (
      <GluestackUIProvider>
      <Box flex={1} backgroundColor={'#F6F6F6'}>
        <HStack
              backgroundColor= {'#005EB8'}
              borderBottomWidth= {0}
              justifyContent= {'flex-start'}
              alignItems= {'center'}
          style={
            Platform.OS == 'android' ? { height: dimensionsCalculation(70) } : {}
          }>
          <TouchableOpacity
            onPress={() => pop(this.props.componentId)}
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
              <Image style={{ marginLeft: 10 }} source={require('../../assets/icons/left_arrow.png')} />
            <Text
              style={{
                fontSize: dimensionsCalculation(20),
                color: '#FFFFFF',
                marginHorizontal: dimensionsCalculation(8),
              }}>
              {'User Information'.toUpperCase()}
            </Text>
          </TouchableOpacity>
        </HStack>
        {this.state.viewImage ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingTop: dimensionsCalculation(32),
            }}>
            {this.state.source &&
            <Image
              source={{ uri: this.state.source }}
              style={{
                width: dimensionsCalculation(320),
                height: dimensionsCalculation(300),
                borderRadius: dimensionsCalculation(17),
                opacity: 0.5,
              }}
            />}
          </View>
        ) : (
            <ScrollView style={{ backgroundColor: '#F6F6F6' }} showsVerticalScrollIndicator={false}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  paddingVertical: dimensionsCalculation(35),
                  paddingBottom: dimensionsCalculation(35),
                  backgroundColor: '#EEEEEE',
                }}>
                {/* <TouchableOpacity
                  activeOpacity={1}
                  onPress={() =>
                    showModal(
                      screenIds.CHANGE_PHOTO_MODAL,
                      {
                        viewImage: this.viewImage,
                      },
                      {
                        layout: {
                          backgroundColor: 'rgba(52,52,52,0.3)',
                        },
                        modalPresentationStyle: 'overCurrentContext',
                        statusBar: { style: 'dark' },
                      },
                    )
                  }
                  style={{
                    width: dimensionsCalculation(122),
                    height: dimensionsCalculation(122),
                    borderRadius: dimensionsCalculation(122 / 2),
                  }}>
                  {image &&
                  <FastImage
                    source={{ uri: image }}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: dimensionsCalculation(122 / 2),
                    }}
                  />}
                  <Image
                    source={('../../assets/icons/photo-camera.png')}
                    style={{ position: 'absolute', bottom: -10, right: -4 }}
                  />
                </TouchableOpacity> */}
              </View>
              <View
                style={{
                  paddingHorizontal: dimensionsCalculation(32),
                  width: '100%',
                  marginVertical: dimensionsCalculation(16),
                }}>
                <Text
                  style={{
                    fontSize: dimensionsCalculation(16),
                    color: '#707070',
                    marginBottom: dimensionsCalculation(16),
                    fontWeight: 'bold',
                  }}>
                  Name
              </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: dimensionsCalculation(8),
                    borderBottomColor: '#C1C1C1',
                    borderBottomWidth: 1,
                  }}>
                  <Text
                    style={{
                      fontSize: dimensionsCalculation(14),
                      color: '#707070',
                    }}>
                    {name}
                  </Text>
                    <Image source={require('../../assets/icons/user.png')} />
                </View>
              </View>
              <View
                style={{
                  paddingHorizontal: dimensionsCalculation(32),
                  width: '100%',
                  marginVertical: dimensionsCalculation(16),
                }}>
                <Text
                  style={{
                    fontSize: dimensionsCalculation(16),
                    color: '#707070',
                    marginBottom: dimensionsCalculation(16),
                    fontWeight: 'bold',
                  }}>
                  Username
              </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: dimensionsCalculation(8),
                    borderBottomColor: '#C1C1C1',
                    borderBottomWidth: 1,
                  }}>
                  <Text
                    style={{
                      fontSize: dimensionsCalculation(14),
                      color: '#707070',
                    }}>
                    {username}
                  </Text>
                    <Image source={require('../../assets/icons/user.png')} />
                </View>
              </View>
              <View
                style={{
                  paddingHorizontal: dimensionsCalculation(32),
                  width: '100%',
                  marginVertical: dimensionsCalculation(16),
                }}>
                <Text
                  style={{
                    fontSize: dimensionsCalculation(16),
                    color: '#707070',
                    marginBottom: dimensionsCalculation(16),
                    fontWeight: 'bold',
                  }}>
                  Email
              </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: dimensionsCalculation(8),
                    borderBottomColor: '#C1C1C1',
                    borderBottomWidth: 1,
                  }}>
                  <Text
                    style={{
                      fontSize: dimensionsCalculation(14),
                      color: '#707070',
                    }}>
                    {email}
                  </Text>
                    <Image source={require('../../assets/icons/email.png')} />
                </View>
              </View>
            </ScrollView>
          )}
      </Box>
      </GluestackUIProvider>
    );
  }
}

export default UserInformationScreen;
