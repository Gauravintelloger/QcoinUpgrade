
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
  ScrollView,
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

class PublicationScreen extends PureComponent {
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
      <Box flex={1} backgroundColor={'white'}>
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
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Image style={{marginLeft:10}} source={require('../../assets/icons/left_arrow.png')} />
            <Text
              style={{
                fontSize: dimensionsCalculation(20),
                color: '#FFFFFF',
                marginHorizontal: dimensionsCalculation(8),
              }}>
              {'PUBLICATION'}
            </Text>
          </TouchableOpacity>
        </HStack>

        <ScrollView>
          <View style={{ flexDirection: "column", marginVertical: dimensionsCalculation(40), marginHorizontal: dimensionsCalculation(10), }}>

            <Text style={{ fontSize: 18 }}>
              This app is meant to reward and recognize efforts of KPMG’s employees in their middle east offices.
               Each user will have a profile to view, track and redeem their quality points earned.
          </Text>

            <Text style={{ fontSize: 18, marginTop: dimensionsCalculation(20) }}>
              User can view latest updates in relation to who has earned quality points and the user will
              also be able to encourage colleagues by adding comments. Team members will be rewarded based on
              multiple criteria.
          </Text>

            <Text style={{ fontSize: 18, marginTop: dimensionsCalculation(20) }}>
              Please send an e-mail to
          </Text>

            <Text style={{ fontSize: 18, marginTop: dimensionsCalculation(10) }}>
              <Text style={{ color: "#c00100" }}>sa-fmkpmgqpoints@kpmg.com</Text> in case you have any feedback regarding this app.
          </Text>
          </View>
        </ScrollView>

      </Box>
      </GluestackUIProvider>
    );
  }
}

export default PublicationScreen;
