

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  Platform,
} from 'react-native';
// import FastImage from '@d11/react-native-fast-image';
import { showModal, screenIds, goToLogin, pop } from '../../navigation';

import { HStack, Box } from "@gluestack-ui/themed";
import { GluestackUIProvider } from "@gluestack-ui/themed";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { OverLay } from '../../components/OverLay';
import Snackbar from 'react-native-snackbar';
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

class AboutScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      password_1: '',
      password_2: '',
      correctEmail: false,
      showPassword: false,
      deviceToken: '1234',
    };
  }
  // componentWillReceiveProps(nextProps) {
    // if (this.props.error != nextProps.error) {
    //   Toast.show({
    //     text: nextProps.error,
    //     buttonText: "Okay",
    //     duration: 3000,
    //     type: "danger"
    //   })
    // }
  // }
  handleSavePassword = () => {
    Keyboard.dismiss();
    // "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
    var regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    var matches = regex.exec(this.state.password_1);
    if (this.state.password_1 !== this.state.password_2) {
     
      Snackbar.show({
        text: 'The password confirmation does not match.',
        type: 'danger',
        backgroundColor: 'red',

        duration: Snackbar.LENGTH_LONG,
        action: {
          text: 'Okay',

          onPress: () => { Snackbar.dismiss() },
        },
      });
    } else if (!matches) {
      
      Snackbar.show({
        text: 'Your Password must contain at least 1 Upper Case, 1 lower case, 1 number, 1 symbol and Must be at least 8 characters.',
        type: 'danger',
        backgroundColor: 'red',

        duration: Snackbar.LENGTH_LONG,
        action: {
          text: 'Okay',

          onPress: () => { Snackbar.dismiss() },
        },
      });
    } else {
      this.props.changePassword({
        old_password: (this.props.old_password || '').toString(),
        password: (this.state.password_1 || '').toString(),
        password_confirmation: (this.state.password_2 || '').toString(),
      });
    }
  };
  render() {
    return (
      <GluestackUIProvider>
      <Box flex={1} bg={'white'}>
        <HStack
        backgroundColor={'#005EB8'}
        borderBottomWidth={0}
        justifyContent={'flex-start'}
        alignItems={'center'}
        style={Platform.OS === 'android' ? { height: dimensionsCalculation(70) } : {}}
          >
          <TouchableOpacity
            onPress={() => pop(this.props.componentId)}
            style={{
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
              <Image style={{ marginLeft: 10 }} source={require('../../assets/icons/left_arrow.png')} />
            <Text
              style={{
                fontSize: dimensionsCalculation(20),
                color: '#FFFFFF',
                marginHorizontal: dimensionsCalculation(8),
              }}>
              {'About'.toUpperCase()}
            </Text>
          </TouchableOpacity>
        </HStack>

        <View style={{ flexDirection: "column" }}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={{ tintColor: '#00348d', width: dimensionsCalculation(210), marginVertical: dimensionsCalculation(35) }}
            />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <View style={{ flexDirection: "column", marginVertical: dimensionsCalculation(35) }}>
              <Image
                source={require('../../assets/images/app-logo.png')}
                style={{ borderRadius: 13 }}
              />
              <Text style={{
                textAlign: "center", color: "#00348d",
                fontWeight: "bold", fontSize: 26
              }}> Qpoints</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center",width:"80%",alignSelf:"center" }}>
            <Text style={{
              fontWeight: "bold", fontSize: 18, textAlign: "center"
            }}> App crafted by <Text style={{color:'#239ddd'}}>AtomKit</Text> for <Text style={{color:"#00348d"}}>KPMG</Text> Middle East offices </Text>
          </View>


        </View>
      </Box>
      </GluestackUIProvider>
    );
  }
}

export default AboutScreen;
