
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
import { dismissModal, pop } from '../../navigation';
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

class TermsScreen extends PureComponent {
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
        text: '    Your Password must contain at least 1 Upper Case, 1 lower case, 1 number, 1 symbol and Must be at least 8 characters.',
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
    const sectionStyle = { marginTop: 10 }
    const subtitleStyle = { fontWeight: "bold", marginTop: 4 ,fontSize:20}
    const font = {fontSize:18}
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
            onPress={() => dismissModal(this.props.componentId)}
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
              {'Terms and Conditions'}
            </Text>
          </TouchableOpacity>
        </HStack>

        <ScrollView style={{ flexDirection: "column",backgroundColor:"#fff" }}>
          <View style={{marginHorizontal:10,marginVertical:10}}>

            <View style={[sectionStyle, {}]} >
              <Text style={font}>
                These terms and conditions are an agreement between KPMG and User .
                This Agreement sets forth the general terms and conditions of
                your use of the QPoints and any of its products or services
                (collectively, "QPoints" or "Services").
            </Text>
            </View>

            <View style={[sectionStyle, {}]} >
              <Text style={[subtitleStyle, {}]}>
                1. QPoints app:
            </Text>
              <Text style={font}>
              The QPoints (Audit Quality Points Application) is an internal reward program designed to encourage and reward colleagues to go the extra mile. it allows employees to have a profile to view your information & the number of QPoints he/she earned.
            </Text>
            </View>

            <View style={[sectionStyle, {}]} >
              <Text style={[subtitleStyle, {}]}>
                2. Accounts and membership
            </Text>
              <Text style={font}>
                If you create an account in the QPoints, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account and any other actions taken in connection with it. We may,  but  have  no  obligation  to,  monitor  and  review  new  accounts  before  you  may  sign  in  and  use  our  Services. Providing false contact information of any kind may result in the termination of your account. You must immediately notify us of any unauthorized uses of your account or any other breaches of security. We will not be liable for any acts or omissions by you, including any damages of any kind incurred as a result of such acts or omissions. We may suspend, disable, or delete your account (or any part thereof) if we determine that you have violated any provision of this Agreement or that your conduct or content would tend to damage our reputation and goodwill. If we delete your account for the foregoing reasons, you may not re-register for our Services. We may block your email address and Internet protocol address to prevent further registration.
            </Text>
            </View>

            <View style={[sectionStyle, {}]} >
              <Text style={[subtitleStyle, {}]}>
                3.Intellectual property rights
            </Text>
              <Text style={font}>
                This  Agreement does  not  transfer  to you any  intellectual property  owned by KPMG  or  third-parties, and  all  rights, titles, and interests in and to such property will remain (as between the parties) solely with KPMG. All trademarks, service  marks,  graphics  and  logos  used  in  connection  with  our  Mobile  Application  or  Services,  are  trademarks  or registered trademarks of Mobile Application Developer or Mobile Application Developer licensors. Other trademarks, service marks, graphics and logos used in connection with our Mobile Application or Services may be the trademarks of other third-parties. Your use of our Mobile Application and Services grants you no right or license to reproduce or otherwise use any KPMG or third-party trademarks.
            </Text>
            </View>

            <View style={[sectionStyle, {}]} >
              <Text style={[subtitleStyle, {}]}>
                4. Backups
            </Text>
              <Text style={font}>
                We are not responsible for Content residing in QPoints. In no event shall we be held liable for any loss of any Content. It is your sole responsibility to maintain appropriate backup of your Content. Notwithstanding the foregoing, on some occasions and in certain circumstances, with absolutely no obligation, we may be able to restore some or all of your data that has been deleted as of a certain date and time when we may have backed up data for our own purposes. We make no guarantee that the data you need will be available.            </Text>
            </View>

            <View style={[sectionStyle, {}]} >
              <Text style={[subtitleStyle, {}]}>
                5. Links to other mobile applications
            </Text>
              <Text style={font}>
                Although this QPoints may link to other mobile applications, we are not, directly or indirectly, implying any approval, association,  sponsorship,  endorsement,  or  affiliation  with  any  linked  mobile  application,  unless  specifically  stated herein. We are not responsible for examining or evaluating, and we do not warrant the offerings of, any businesses or  individuals  or  the  content  of  their  mobile  applications.  We  do  not  assume  any  responsibility  or  liability  for  the actions, products, services, and content of any other third-parties. You should carefully review the legal statements
                and other conditions of use of any mobile application which you access through a link from this Mobile Application. Your linking to any other off-site mobile applications is at your own risk.
            </Text>
            </View>

            <View style={[sectionStyle, {}]} >
              <Text style={[subtitleStyle, {}]}>
                6.General
            </Text>

            </View>
            <View style={[sectionStyle, {}]} >
              <Text style={[subtitleStyle, {}]}>
                6.1 Termination:
            </Text>
              <Text style={font}>
                Your rights under the Agreement and to use the app will automatically terminate without notice if you fail to comply with any of the terms of this Agreement. or involves any fraud or misuse of the QPoints. In case of such termination, you must cease all use of the QPoints and we may immediately revoke your access to the QPoints without notice to you.
            </Text>
            </View>
            <View style={[sectionStyle, {}]} >
              <Text style={[subtitleStyle, {}]}>
                6.2 Changes and amendments
            </Text>
              <Text style={font}>
                We reserve the right to modify this Agreement or its policies relating to the Mobile Application or Services at any time without prior notice, effective upon posting of an updated version of this Agreement in the QPoints. When we do, we will post a notification in our QPoints Continued use of the Mobile Application after any such changes shall constitute your consent to such changes.            </Text>
            </View>
            <View style={[sectionStyle, {}]} >
              <Text style={[subtitleStyle, {}]}>
                6.3 Disputes/Binding Arbitration.
            </Text>
              <Text style={font}>
                Any dispute or claim arising from or relating to the Agreement or the Program is subject  to  the  Saudi  Arabia  Law  and  regulation   disclaimer  of  warranties  and  all  other  terms  in  the  (QPoints) Conditions of Use at User page accept and agree to those terms by entering into the Agreement or using the Program.
            </Text>
            </View>
          </View>
        </ScrollView>
      </Box>
      </GluestackUIProvider>
    );
  }
}

export default TermsScreen;
