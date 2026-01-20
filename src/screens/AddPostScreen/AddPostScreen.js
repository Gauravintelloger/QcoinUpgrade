
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
  LayoutAnimation,
  UIManager,
  InteractionManager,
  Platform,
} from 'react-native';
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
import AsyncStorage from '@react-native-async-storage/async-storage';

// import FastImage from '@d11/react-native-fast-image';
import { showModal, screenIds, goToLogin, pop, push } from '../../navigation';
import {  HStack, Box } from "@gluestack-ui/themed";
import { GluestackUIProvider } from "@gluestack-ui/themed";


import { OverLay } from '../../components/OverLay';


const { width } = Dimensions.get('window');
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

class AddPostScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      body: '',
      coins: [
        { count: '50', selected: false },
        { count: '100', selected: false },
        { count: '150', selected: false },
        { count: '200', selected: false },
        { count: '250', selected: false },
        // { count: '300', selected: false },
      ],
      showCoins: false,
      selectedCoin: {},
      showReasons: false,
      selectedReason: {},
    };
  }
  async componentDidMount() {
    this.props.getReasons({});
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    if (user) {
      this.setState({
        user: user,
      });
    }
    setTimeout(() => {
      this.focusInputWithKeyboard();
    }, 1000);
  }

  focusInputWithKeyboard = () => {
    InteractionManager.runAfterInteractions(() => {
      this.refSearch.focus();
    });
  };

  onLayout = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(350, 'easeInEaseOut', 'scaleXY'),
    );
  };
  render() {
    return (
      <GluestackUIProvider>
      <Box flex={1} bg={'white'}>
        <HStack
        paddingHorizontal={dimensionsCalculation(8)}
        backgroundColor={'#005EB8'}
        borderBottomWidth= {0}
        justifyContent= {'space-between'}
        alignItems= {'center'}
          style={Platform.OS == 'android' ? { height: dimensionsCalculation(70) } : {}}
            >
          <TouchableOpacity
            onPress={() => {
              if (
                this.state.body !== '' ||
                (this.state.selectedCoin.count || '' !== '') ||
                (this.state.selectedReason.id || '' !== '')
              ) {
                showModal(
                  screenIds.MODAL_SCREEN,
                  {
                    text: 'Are you sure you want to discard your post?',
                    noText: 'Discard Post',
                    yesText: 'Continue Editing',
                    noClick: () => {
                      pop(this.props.componentId);
                    },
                  },
                  {
                    layout: {
                      backgroundColor: 'rgba(143,143,143,0.44)',
                    },
                    modalPresentationStyle: 'overCurrentContext',
                    statusBar: {
                      style: 'dark',
                      backgroundColor: '#005EB8',
                    },
                  },
                );
              } else {
                pop(this.props.componentId);
              }
            }}
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
              {'Create post'}
            </Text>
          </TouchableOpacity>
        </HStack>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: '#fff' }}
          keyboardDismissMode="on-drag">
          <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
            <View
              style={{
                width: dimensionsCalculation(60),
                height: dimensionsCalculation(60),
                borderRadius: dimensionsCalculation(30),
                margin: dimensionsCalculation(16),
              }}>
              {this.state.user.image &&
              <Image
                source={{ uri: this.state.user.image }}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: dimensionsCalculation(30),
                }}
                resizeMode="contain"
              />}
            </View>
            <Text
              style={{
                fontSize: dimensionsCalculation(18),
                color: '#1A66E8',
                letterSpacing: dimensionsCalculation(0.2),
                lineHeight: dimensionsCalculation(22),
                fontWeight: 'bold',
              }}>
              {this.state.user.name}
            </Text>
          </View>
          <View>
            <Text
              style={[
                Platform.OS == 'android'
                  ? { textAlignVertical: 'top', color: '#1e69c1', fontSize: dimensionsCalculation(18), padding: dimensionsCalculation(10) }
                  : {
                    // height: dimensionsCalculation(164),
                    padding: dimensionsCalculation(10),
                    color: '#1e69c1',
                    fontSize: dimensionsCalculation(18),
                  },
              ]}>
              {this.props.tagedUser ? this.props.tagedUser.name : ''}
            </Text>
            <TextInput
              ref={elem => {
                this.refSearch = elem;
              }}
              placeholder={''}
              multiline={true}
              style={[
                Platform.OS == 'android'
                  ? { textAlignVertical: 'top' }
                  : {
                    height: dimensionsCalculation(164),
                    padding: dimensionsCalculation(16),
                    color: '#717171',
                    fontSize: dimensionsCalculation(18),
                  },
              ]}
              // returnKeyType={ 'done' }
              numberOfLines={10}
              value={this.state.body}
              editable
              maxLength={250}
              onChangeText={text => this.setState({ body: text })}
            />
          </View>
          <TouchableOpacity
            onPress={() =>
              this.props.createPostAction({
                user_id: this.props.tagedUser.id,
                given_points: this.state.selectedCoin.count,
                body: this.state.body,
                reason: this.state.selectedReason.name,
                componentId: this.props.componentId,
              })
            }
            disabled={
              !(
                this.state.body !== '' &&
                this.state.selectedCoin.count !== '' &&
                this.state.selectedReason.id !== '' &&
                this.props.tagedUser
              )
            }
            style={{
              shadowColor: '#000000',
              shadowOpacity: 0.16,
              shadowRadius: 8,
              shadowOffset: {
                height: 3,
                width: 0,
              },
              elevation: 2,
            }}>
            <View
              style={{
                flexDirection: 'row-reverse',
                paddingHorizontal: dimensionsCalculation(8),
              }}>

              {this.state.body !== '' &&
                this.state.selectedCoin.count !== '' &&
                this.state.selectedReason.id !== '' &&
                this.props.tagedUser ? (
                  <Image
                      source={require('../../assets/icons/active_send.png')}
                    style={{ width: dimensionsCalculation(40), height: dimensionsCalculation(40) }}
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                      source={require('../../assets/icons/not_active_send.png')}
                    style={{ width: dimensionsCalculation(40), height: dimensionsCalculation(40) }}
                    resizeMode="contain"
                  />
                )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() =>
              push(
                this.props.componentId,
                screenIds.TAG_PEOPLE_SCREEN,
                {},
                {
                  bottomTabs: {
                    // titleDisplayMode: 'alwaysShow',
                    // height: 70,
                    visible: false,
                    animate: true,
                  },
                },
              )
            }
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: dimensionsCalculation(16),
              flex: 1,
              borderTopColor: '#707070',
              borderTopWidth: 1,
            }}>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  width: dimensionsCalculation(28),
                  height: dimensionsCalculation(28),
                }}>
                <Image
                    source={require('../../assets/icons/tag_people.png')}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="contain"
                />
              </View>
              <Text
                style={{
                  fontSize: dimensionsCalculation(18),
                  color: '#005EB8',
                  letterSpacing: dimensionsCalculation(0.2),
                  lineHeight: dimensionsCalculation(22),
                  marginHorizontal: dimensionsCalculation(16),
                  // justifyContent: 'space-between',
                }}>
                {this.props.tagedUser
                  ? this.props.tagedUser.name
                  : 'Tag People'}
              </Text>
            </View>
            <View>
              <Image
                  source={require('../../assets/icons/right_arrow.png')}
                style={{ tintColor: 'rgba(112,112,112,0.32)' }}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              borderTopColor: '#707070',
              borderTopWidth: 1,
              padding: dimensionsCalculation(16),
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                this.onLayout();
                this.setState(prevState => ({ showCoins: !prevState.showCoins }));
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    width: dimensionsCalculation(28),
                    height: dimensionsCalculation(28),
                  }}>
                  <Image
                      source={require('../../assets/icons/give_coins.png')}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="contain"
                  />
                </View>
                <Text
                  style={{
                    fontSize: dimensionsCalculation(18),
                    color: '#005EB8',
                    letterSpacing: dimensionsCalculation(0.2),
                    lineHeight: dimensionsCalculation(22),
                    marginHorizontal: dimensionsCalculation(16),
                  }}>
                  Give coins
                </Text>
              </View>
              <View>
                <Image
                    source={require('../../assets/icons/arrow_down.png')}
                  style={{ tintColor: 'rgba(112,112,112,0.32)' }}
                />
              </View>
            </TouchableOpacity>
            {this.state.showCoins ? (
              <View
                style={{
                  backgroundColor: '#fff',
                  shadowColor: '#000000',
                  shadowOpacity: 0.16,
                  shadowRadius: 6,
                  shadowOffset: {
                    height: 3,
                    width: 0,
                  },
                  elevation: 2,
                  padding: dimensionsCalculation(8),
                  borderRadius: dimensionsCalculation(10),
                  marginTop: dimensionsCalculation(16),
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                {this.state.coins.map(coin => {
                  return (
                    <TouchableOpacity
                      key={coin.count}
                      onPress={() => this.setState({ selectedCoin: coin })}
                      activeOpacity={1}
                      style={{
                        width: dimensionsCalculation(57),
                        height: dimensionsCalculation(40),
                        borderColor: '#1A66E8',
                        borderWidth: 1,
                        borderRadius: dimensionsCalculation(6),
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: dimensionsCalculation(8),
                        backgroundColor:
                          this.state.selectedCoin.count === coin.count
                            ? '#1A66E8'
                            : '#fff',
                      }}>
                      <Text
                        style={{
                          color:
                            this.state.selectedCoin.count === coin.count
                              ? '#fff'
                              : '#1A66E8',
                        }}>
                        {coin.count}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}
          </View>
          <View
            style={{
              flex: 1,
              borderTopColor: '#707070',
              borderTopWidth: 1,
              padding: dimensionsCalculation(16),
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                this.onLayout();
                this.setState(prevState => ({
                  showReasons: !prevState.showReasons,
                }));
              }}
            >
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: dimensionsCalculation(40)
              }}>
                <View style={{ flexDirection: 'row' }}>
                  <View
                    style={{
                      width: dimensionsCalculation(28),
                      height: dimensionsCalculation(28),
                    }}>
                    <Image
                        source={require('../../assets/icons/choose_reason.png')}
                      style={{ width: '100%', height: '100%' }}
                      resizeMode="contain"
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: dimensionsCalculation(18),
                      color: '#005EB8',
                      letterSpacing: dimensionsCalculation(0.2),
                      lineHeight: dimensionsCalculation(22),
                      marginHorizontal: dimensionsCalculation(16),
                    }}>
                    Choose reason
                </Text>
                </View>
                <View>
                  <Image
                      source={require('../../assets/icons/arrow_down.png')}
                    style={{ tintColor: 'rgba(112,112,112,0.32)' }}
                  />
                </View>
              </View>
            </TouchableOpacity>

            {this.state.showReasons ? (
              <View
                style={{
                  backgroundColor: '#fff',
                  shadowColor: '#000000',
                  shadowOpacity: 0.16,
                  shadowRadius: 6,
                  shadowOffset: {
                    height: 3,
                    width: 0,
                  },
                  elevation: 2,
                  padding: dimensionsCalculation(8),
                  borderRadius: dimensionsCalculation(10),
                  marginTop: dimensionsCalculation(16),
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                {this.props.reasons && this.props.reasons.length > 0 ? this.props.reasons.map(reason => {
                  return (
                    <TouchableOpacity
                      key={reason.id}
                      onPress={() => this.setState({ selectedReason: reason })}
                      activeOpacity={1}
                      style={{
                        height: dimensionsCalculation(40),
                        borderColor: '#1A66E8',
                        borderWidth: 1,
                        borderRadius: dimensionsCalculation(6),
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: dimensionsCalculation(8),
                        backgroundColor:
                          this.state.selectedReason.id === reason.id
                            ? '#1A66E8'
                            : '#fff',
                        paddingHorizontal: dimensionsCalculation(16),
                      }}>
                      <Text
                        style={{
                          color:
                            this.state.selectedReason.id === reason.id
                              ? '#fff'
                              : '#1A66E8',
                        }}>
                        {reason.name}
                      </Text>
                    </TouchableOpacity>
                  );
                }) :
                  <Text style={{ textAlign: "center" }}>
                    No Available Reasons
                </Text>
                }
              </View>
            ) : null}
          </View>
        </ScrollView>
        {this.props.createPost?.pending && <OverLay />}
      </Box>
      </GluestackUIProvider>
    );
  }
}

export default AddPostScreen;
