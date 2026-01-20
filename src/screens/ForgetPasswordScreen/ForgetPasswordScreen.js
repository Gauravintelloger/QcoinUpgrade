
import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  Platform
} from 'react-native';
// import FastImage from '@d11/react-native-fast-image';
import { dismissModal, screenIds, goToLogin, pop } from '../../navigation';
import { HStack, Box } from "@gluestack-ui/themed";
import { GluestackUIProvider } from "@gluestack-ui/themed";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { OverLay } from "../../components/OverLay";
import Snackbar from 'react-native-snackbar';
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

class ForgetPasswordScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password_2: '',
      correctEmail: false,
      showPassword: false,
      deviceToken: '1234'
    }
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
    Keyboard.dismiss()
    if (!this.state.correctEmail) {
    
      Snackbar.show({
        text: 'Please enter a Valid Email',
        type: 'danger',
        backgroundColor: 'red',

        duration: Snackbar.LENGTH_LONG,
        action: {
          text: 'Okay',

          onPress: () => { Snackbar.dismiss() },
        },
      });
    } else {
      this.props.forgotPassword({
        email: this.state.email
      })
      this.setState({
        email: ''
      })
    }
  }
  render() {
    return (
      <GluestackUIProvider>
      <Box flex={1} backgroundColor={'white'}>
        <HStack backgroundColor= {'#005EB8'} borderBottomWidth= {0} justifyContent= {'flex-start'} alignItems= {'center'} style={ Platform.OS == 'android' ? { height: dimensionsCalculation(70) } : {}}>
          <TouchableOpacity onPress={() => dismissModal(this.props.componentId)} style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>

              <Image style={{ marginLeft: 10 }} source={require('../../assets/icons/left_arrow.png')} />
            <Text style={{ fontSize: dimensionsCalculation(20), color: '#FFFFFF', marginHorizontal: dimensionsCalculation(8) }}>{'forgot password'.toUpperCase()}</Text>
          </TouchableOpacity>
        </HStack>
        <View style={{ backgroundColor: "#fff",height:"100%" }}>

          <KeyboardAwareScrollView
            enableOnAndroid={true}
            keyboardShouldPersistTaps='handled'
            extraScrollHeight={100}
          >
            <View style={{ padding: dimensionsCalculation(32) }}>
              <Text style={{ textAlign: 'center', fontSize: dimensionsCalculation(18), color: '#707070', lineHeight: dimensionsCalculation(22) }}>Please enter your email address to reset your password</Text>
            </View>
            <View style={{ paddingHorizontal: dimensionsCalculation(32) }}>
              <View style={{ marginBottom: dimensionsCalculation(32) }}>

                <Text style={{ color: '#707070', fontSize: dimensionsCalculation(18), lineHeight: dimensionsCalculation(22), marginBottom: dimensionsCalculation(16) }}>Email</Text>

                <CustomInput
                  colored={false}
                    image={require('../../assets/icons/envelope.png')}
                  placeholder={'Yourname@kpmg.com'}
                  value={this.state.email}
                  onChange={(text) => {
                    var regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                    var matches = regex.exec(text);
                    if (matches && matches.length > 0) {
                      this.setState({ correctEmail: true })
                    } else {
                      this.setState({ correctEmail: false })
                    }
                    this.setState({
                      email: text
                    })
                  }}
                  error={null}
                />
              </View>

              <CustomButton
                title={'Send verification email'}
                click={this.handleSavePassword} />
            </View>
          </KeyboardAwareScrollView>
          <View style={{ paddingBottom: dimensionsCalculation(32), }}>

            <Text style={{ textAlign: 'center', fontSize: dimensionsCalculation(15) }}> <Text style={{ color: '#005EB8' }} onPress={() => dismissModal(this.props.componentId)}>Log In</Text> to your account </Text>
          </View>
          {this.props.pending && <OverLay />}
        </View>
      </Box>
      </GluestackUIProvider>
    );
  }
}

export default ForgetPasswordScreen;
