
import React, { useState } from 'react';
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
import Snackbar from 'react-native-snackbar';

import { GluestackUIProvider, HStack, Box } from "@gluestack-ui/themed";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { OverLay } from '../../components/OverLay';
import { pop } from '../../navigation';
// import Snackbar from 'react-native-snackbar';

const { width } = Dimensions.get('window');
const dimensionsCalculation = (IPhonePixel) => (width * IPhonePixel) / 375;

const ChangePasswordScreen = ({ componentId, changePassword, pending, old_password }) => {
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [showPassword, setShowPassword] = useState(false);
 

  const handleSavePassword = () => {
    Keyboard.dismiss();
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    const matches = regex.exec(password1);

    if (password1 !== password2) {
     
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
        text: '  Your Password must contain at least 1 Upper Case, 1 lower case, 1 number, 1 symbol and Must be at least 8 characters.',
        type: 'danger',
        backgroundColor: 'red',

        duration: Snackbar.LENGTH_LONG,
        action: {
          text: 'Okay',

          onPress: () => { Snackbar.dismiss() },
        },
      });
    } else {
      changePassword({
        old_password: (old_password || '').toString(),
        password: (password1 || '').toString(),
        password_confirmation: (password2 || '').toString(),
      });
    }
  };

  return (
    <GluestackUIProvider>
      <Box flex={1} bg={'white'}>
        <HStack
          bg={'#005EB8'}
          borderBottomWidth={0}
          justifyContent={'flex-start'}
          alignItems={'center'}
          style={Platform.OS === 'android' ? { height: dimensionsCalculation(70) } : {}}
        >
          <TouchableOpacity
            onPress={() => pop(componentId)}
            style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}
          >
            <Image style={{ marginLeft: 10 }} source={require('../../assets/icons/left_arrow.png')} />
            <Text
              style={{
                fontSize: dimensionsCalculation(20),
                color: '#FFFFFF',
                marginHorizontal: dimensionsCalculation(8),
              }}
            >
              {'Change Password'.toUpperCase()}
            </Text>
          </TouchableOpacity>
        </HStack>
        <KeyboardAwareScrollView enableOnAndroid keyboardShouldPersistTaps="handled" extraScrollHeight={100}>
          <View style={{ padding: dimensionsCalculation(32) }}>
            <Text style={{ textAlign: 'center', fontSize: dimensionsCalculation(18), color: '#707070' }}>
              Please choose a password to be able to enter your account
            </Text>
            <Text style={{ textAlign: 'center', fontSize: dimensionsCalculation(14), color: '#707070' }}>
              Your password must contain at least 1 upper case, 1 lower case, 1 number, 1 symbol, and must be at least 8 characters
            </Text>
          </View>
          <View style={{ paddingHorizontal: dimensionsCalculation(32) }}>
            <View style={{ marginBottom: dimensionsCalculation(32) }}>
              <Text style={{ color: '#707070', fontSize: dimensionsCalculation(18) }}>New Password</Text>
              <CustomInput
                colored={false}
                image={require('../../assets/icons/lock.png')}
                placeholder={'Enter your new password'}
                password
                onChange={setPassword1}
                showPassword={showPassword}
                onClick={setShowPassword}
                error={null}
              />
            </View>
            <View style={{ marginBottom: dimensionsCalculation(32) }}>
              <Text style={{ color: '#707070', fontSize: dimensionsCalculation(18) }}>Confirm New Password</Text>
              <CustomInput
                colored={false}
                image={require('../../assets/icons/lock.png')}
                placeholder={'Enter your new password'}
                password
                onChange={setPassword2}
                showPassword={showPassword}
                onClick={setShowPassword}
                error={null}
              />
            </View>
            <CustomButton title={'Save new password'} click={handleSavePassword} />
          </View>
        </KeyboardAwareScrollView>
        {pending && <OverLay />}
      </Box>
    </GluestackUIProvider>
  );
};

export default ChangePasswordScreen;
