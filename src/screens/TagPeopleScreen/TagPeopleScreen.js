
import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
// import FastImage from '@d11/react-native-fast-image';
import { showModal, screenIds, goToLogin, pop } from '../../navigation';
import { HStack, Box } from "@gluestack-ui/themed";
import { GluestackUIProvider } from "@gluestack-ui/themed";

import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { OverLay } from '../../components/OverLay';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BranchFilter from '../../../src/components/BranchFiltera/BranchFilters';

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

class TagPeopleScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      text: '',
      selectedUser: props.tagedUser ? props.tagedUser : null,
      selectedBranch: null,
      showBranchFilter: false,
      keyboadShown:false
    };
  }
  componentDidMount() {
    this.props.search({ text: '' });
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
  }

  keyboardDidShow=()=>{
    this.setState({
      keyboadShown:true
    })
  }

  keyboardDidHide=()=>{
    this.setState({
      keyboadShown:false
    })
  }

  handleSearch = text => {
    this.setState(
      {
        text,
      },
      () => {
        this.props.search({ branch: this.state.selectedBranch , text: text });
      },
    );
  };

  setBranch = (id, branch_name) => {
    if (this.state.selectedBranch == id) {
      this.setState({
        selectedBranch: null,
        branch_name: ""
      })
      this.props.search({ text: this.state.text })
    }
    else {
      this.setState({
        selectedBranch: id,
        branch_name
      })
      this.props.search({ branch: id, text: this.state.text})
    }
  }

  renderUserSection = user => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (!this.state.selectedUser) this.setState({ selectedUser: user });
        }}
        key={user.id + 'oooo'}
        style={{
          flexDirection: 'row',
          padding: dimensionsCalculation(8),
          paddingHorizontal: dimensionsCalculation(16),
          alignItems: 'center',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: dimensionsCalculation(30),
            height: dimensionsCalculation(30),
            borderRadius: dimensionsCalculation(15),
            borderWidth: 1,
            borderColor: this.state.selectedUser
              ? this.state.selectedUser.id === user.id
                ? '#005EB8'
                : '#E1E1E1'
              : '#E1E1E1',
          }}>
          {this.state.selectedUser && this.state.selectedUser.id === user.id ? (
            <View
              style={{
                width: dimensionsCalculation(20),
                height: dimensionsCalculation(20),
                borderRadius: dimensionsCalculation(10),
                backgroundColor: '#005EB8',
              }}
            />
          ) : null}
        </View>
        {/* <View
          style={{
            width: dimensionsCalculation(35),
            height: dimensionsCalculation(30),
            borderRadius: dimensionsCalculation(4),
            marginHorizontal: dimensionsCalculation(8),
          }}>
          {user.image &&
          <FastImage
            source={{ uri: user.image }}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: dimensionsCalculation(4),
            }}
            resizeMode="cover"
          />}
        </View> */}
        <View style={{ justifyContent: 'center' }}>
          <Text
            style={{
              color: '#000000',
              fontSize: dimensionsCalculation(16),
              letterSpacing: dimensionsCalculation(0.2),
            }}>
            {user.name}
          </Text>
          <Text
            style={{
              color: '#707070',
              fontSize: dimensionsCalculation(12),
              letterSpacing: dimensionsCalculation(0.2),
            }}>
            {user.position && user.position.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <GluestackUIProvider>
      <Box flex={1} backgroundColor={'white'}>
        {<HStack
              paddingHorizontal= {dimensionsCalculation(8)}
              backgroundColor= {'#005EB8'}
              borderBottomWidth= {0}
              justifyContent= {'space-between'}
              alignItems= {'center'}
          style={
            Platform.OS == 'android' ? { height: dimensionsCalculation(70) } : {}
          }>
          <TouchableOpacity
            onPress={() => pop(this.props.componentId)}
            style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
                source={require('../../assets/icons/left_arrow_add_post.png')}
            />
              <Text
                style={{
                  fontSize: dimensionsCalculation(20),
                  letterSpacing: dimensionsCalculation(0.2),
                  lineHeight: dimensionsCalculation(25),
                  color: '#fff',
                  marginHorizontal: this.props.myProfile
                    ? 0
                    : dimensionsCalculation(8),
                }}>
                {this.props.searchPosts?'Search Posts':'Tag people'}
              </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={!this.state.selectedUser}
            onPress={() => {
              this.props.tagUser({
                user: this.state.selectedUser,
                componentId: this.props.componentId,
              });
            }}>
            <Text
              style={{
                fontSize: dimensionsCalculation(20),
                letterSpacing: dimensionsCalculation(0.2),
                lineHeight: dimensionsCalculation(25),
                color: '#fff',
                opacity: this.state.selectedUser ? 1 : 0.5,
              }}>
              {'NEXT'}
            </Text>
          </TouchableOpacity>
        </HStack>}
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
          style={{ backgroundColor: '#EEEEEE' }}>
          {this.state.selectedUser ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: dimensionsCalculation(8),
                paddingRight: dimensionsCalculation(16),
              }}>
              <View
                style={{
                  paddingHorizontal: dimensionsCalculation(16),
                  paddingVertical: dimensionsCalculation(4),
                  backgroundColor: '#D1D1D1',
                  borderRadius: dimensionsCalculation(5),
                }}>
                <Text
                  style={{
                    fontSize: dimensionsCalculation(14),
                    letterSpacing: dimensionsCalculation(0.2),
                    lineHeight: dimensionsCalculation(27),
                  }}>
                  {this.state.selectedUser.name}
                </Text>
              </View>
              <TouchableOpacity
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                onPress={() => {
                  this.setState(
                    {
                      selectedUser: null,
                      text: '',
                    },
                    () => {
                      this.props.search({ text: '' });
                      this.props.tagUser({ user: null });
                    },
                  );
                }}>
                  <Image source={require('../../assets/icons/close.png')} />
              </TouchableOpacity>
            </View>
          ) : (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    source={require('../../assets/icons/search.png')}
                  style={{
                    marginHorizontal: dimensionsCalculation(4),
                    marginLeft: dimensionsCalculation(16),
                  }}
                />
                <TextInput
                  autoCorrect={false}
                  value={this.state.text}
                  onChangeText={text => this.handleSearch(text)}
                  placeholder="Search"
                  style={{
                    color: '#707070',
                    fontSize: dimensionsCalculation(14),
                    padding: dimensionsCalculation(16),
                    paddingLeft: dimensionsCalculation(4),
                  }}
                />
              </View>
            )}
          <View
            style={{
              backgroundColor: this.props.searchPosts ? "transparent" : '#fff',
              padding: dimensionsCalculation(16),
              marginBottom: dimensionsCalculation(8),
            }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text
                style={{
                  color: '#000000',
                  fontSize: dimensionsCalculation(18),
                  letterSpacing: dimensionsCalculation(0.2),
                  lineHeight: dimensionsCalculation(27),
                }}>
                {this.props.searchPosts ? 'All Branch Members' : this.state.text.trim() == "" ? 'All Department Members' : 'Selected Members'}

              </Text>
              <View style={{ flexDirection: "row" }}>
                {this.props.userProfile&&this.props.userProfile.position&&this.props.userProfile.position.layer !== 'C' &&
                  
                    <TouchableOpacity onPress={() => { this.setState({ showBranchFilter: !this.state.showBranchFilter }) }}>
                      <Image
                        source={require('../../assets/icons/bx-filter-blue.png')}
                        style={{
                          marginHorizontal: 5,
                          marginTop: 5,
                        }}
                      />
                    </TouchableOpacity>
                }
                <Text
                  style={{
                    color: '#000000',
                    fontSize: dimensionsCalculation(18),
                    letterSpacing: dimensionsCalculation(0.2),
                    lineHeight: dimensionsCalculation(27),
                  }}
                >{this.state.branch_name}</Text>
              </View>
            </View>
          </View>

          {this.props.users.map(user => {
            return this.renderUserSection(user);
          })}
          {this.props.users.length == 0 && !this.props.pending? (
            <Text
              style={{
                textAlign: 'center',
                marginTop: dimensionsCalculation(16),
              }}>
              No results found
            </Text>
          ) : null}
        </ScrollView>
        <View style={{
          backgroundColor: "transparent",
          borderRadius: 100
        }}>
          {this.state.showBranchFilter && !this.state.keyboadShown&&
            <BranchFilter
              onPress={this.setBranch}
              selected={this.state.selectedBranch}
              hide={() => { this.setState({ showBranchFilter: false }) }}
            />
          }
        </View>
      </Box>
      </GluestackUIProvider>
    );
  }
}

export default TagPeopleScreen;
