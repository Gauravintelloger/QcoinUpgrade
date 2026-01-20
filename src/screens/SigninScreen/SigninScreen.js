import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  Platform,
} from 'react-native';
// import FastImage from 'react-native-fast-image';
import { showModal, screenIds } from '../../navigation';
import { HStack, Box } from "@gluestack-ui/themed";
import { GluestackUIProvider } from "@gluestack-ui/themed";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';

// console.log('CustomInput:', CustomInput);
// console.log('CustomButton:', CustomButton);
// console.log('HStack:', HStack);
// console.log('Box:', Box);
// console.log('GluestackUIProvider:', GluestackUIProvider);
// console.log('AsyncStorage:', AsyncStorage);
// console.log('Snackbar:', Snackbar);
// console.log('KeyboardAwareScrollView:', KeyboardAwareScrollView);

const { width } = Dimensions.get('window');
const dimensionsCalculation = IPhonePixel => (width * IPhonePixel) / 375;

const SigninScreen = ({ login, componentId }) => {
  const [email, setEmail] = useState('Abulhasan7@kpmg.com');
  const [password, setPassword] = useState('970625');
  const [correctEmail, setCorrectEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [deviceToken] = useState('1234');

  console.log('componentId', componentId)
  useEffect(() => {
    (async () => {
      const ModalOpened = await AsyncStorage.getItem('popup-opened');
      if (!ModalOpened) {
        await AsyncStorage.setItem('popup-opened', 'true');
        setTimeout(() => {
          showModal(screenIds.MODAL_SCREEN, {
            text: 'Your Credentials Have been sent to your email. Please use them in order to proceed and if any issue contact admin',
            yesText: 'Okay',
            yesClick: () => { },
          });
        }, 300);
      }
    })();
  }, []);

  const handleLogin = () => {
  
    Keyboard.dismiss();
    if (!correctEmail) {
    
      Snackbar.show({
        text: 'Please enter correct Email.',
        type: 'danger',
        backgroundColor:'red',
       
        duration: Snackbar.LENGTH_LONG,
        action: {
          text: 'Okay',
       
          onPress: () => { Snackbar.dismiss()},
        },
      });
    } else if (password.length < 6) {
      

      Snackbar.show({
        text: 'Please enter a valid password',
        type: 'danger',
        backgroundColor: 'red',

        duration: Snackbar.LENGTH_LONG,
        action: {
          text: 'Okay',
         
          onPress: () => { Snackbar.dismiss() },
        },
      });
    } else if (correctEmail && password.length >= 6) {
      login({
        email: email,
        password: password,
        deviceToken: deviceToken,
        componentId: componentId,
      });
    }
  };
  

  return (
    <GluestackUIProvider>
      <Box flex={1} backgroundColor={'white'}>
        <HStack
          backgroundColor={'#005EB8'}
          borderBottomWidth={0}
          justifyContent={'flex-start'}
          style={Platform.OS === 'android' ? { height: dimensionsCalculation(70) } : {}}>
          <Text style={{ fontSize: dimensionsCalculation(20), color: '#FFFFFF', marginHorizontal: dimensionsCalculation(16) }}>
            Log In
          </Text>
        </HStack>

        <KeyboardAwareScrollView
          enableOnAndroid={true}
          style={{ backgroundColor: 'white' }}
          keyboardShouldPersistTaps="handled"
          extraScrollHeight={100}>
          {/* <View style={{ alignItems: 'center', paddingTop: dimensionsCalculation(76), marginBottom: dimensionsCalculation(32) }}>
            <Image source={require('../../assets/images/people.png')} style={{ width: dimensionsCalculation(275), height: dimensionsCalculation(152) }} resizeMode="contain" />
          </View> */}

          <View style={{ paddingHorizontal: dimensionsCalculation(32) }}>
            <Text style={{ fontSize: dimensionsCalculation(18), fontWeight: 'bold', marginBottom: dimensionsCalculation(16) }}>Email</Text>
            <CustomInput
              placeholder='Email'
              onChange={text => {
                setCorrectEmail(/^\S+@\S+\.\S+$/.test(text));
                setEmail(text);
              }}
              error={null}
            />

            <Text style={{ fontSize: dimensionsCalculation(18), fontWeight: 'bold', marginBottom: dimensionsCalculation(16) }}>Password</Text>
            <CustomInput
              placeholder='Enter your password'
              password
              onChange={setPassword}
              showPassword={showPassword}
              onClick={setShowPassword}
              error={null}
            />
            <TouchableOpacity onPress={() => showModal(screenIds.FORGET_PASSWORD_SCREEN)} style={{ alignSelf: 'flex-end' }}>
              <Text style={{marginTop:5, marginBottom:15}}>Forgot your password?</Text>
            </TouchableOpacity>

            <CustomButton title='Log in to your account' click={handleLogin} />

            <Text style={{ fontSize: dimensionsCalculation(14), textAlign: 'center', marginTop: dimensionsCalculation(8) }}>
              By logging in you agree to KPMG
            </Text>
            <TouchableOpacity onPress={() => showModal(screenIds.TERMS_SCREEN, {}, { bottomTabs: { visible: false, animate: false } })}>
              <Text style={{ fontSize: dimensionsCalculation(14), color: '#1A66E8', textAlign: 'center' }}>Terms and Conditions</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </Box> 
    </GluestackUIProvider>
  );
};

export default SigninScreen;
