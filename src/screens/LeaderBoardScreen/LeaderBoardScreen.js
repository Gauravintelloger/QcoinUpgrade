
import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  FlatList,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
import { HStack, Box } from "@gluestack-ui/themed";
import { GluestackUIProvider } from "@gluestack-ui/themed";


import {
  showModal,
  screenIds,
  goToLogin,
  resetRoot,
  push,
} from '../../navigation';
// import FastImage from '@d11/react-native-fast-image';
// import BranchFilter from 'src/components/BranchFiltera/BranchFilters';
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
  hexagon: {
    width: 32,
    height: 20,
  },
  hexagonInner: {
    width: 32,
    height: 20,
    backgroundColor: '#EAAA00',
  },
  hexagonAfter: {
    position: 'absolute',
    bottom: -8,
    left: 0,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 16,
    borderLeftColor: 'transparent',
    borderRightWidth: 16,
    borderRightColor: 'transparent',
    borderTopWidth: 8,
    borderTopColor: '#EAAA00',
  },
  hexagonBefore: {
    position: 'absolute',
    top: -8,
    left: 0,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 16,
    borderLeftColor: 'transparent',
    borderRightWidth: 16,
    borderRightColor: 'transparent',
    borderBottomWidth: 8,
    borderBottomColor: '#EAAA00',
  },
});

class LeaderBoardScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      firstUsers: [],
      nextPage: null,
      currentPage: 0,
      lastPage: 0,
      isRefreshing: false,
      showBranchFilter: false,
      selectedBranch: null,

    };
  }
  componentDidMount() {
    this.props.getLeaderBoard({});
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.state.users.success != nextProps.users.success &&
      nextProps.users.success &&
      this.state.users != nextProps.users.list
    ) {
      this.onLayout();
      this.setState({
        users: nextProps.users.list,
        nextPage: nextProps.users.next_page_url,
        currentPage: nextProps.users.current_page,
        isRefreshing: false,
      });
    }
  }

  setBranch = (id) => {
    if (this.state.selectedBranch == id) {
      this.setState({
        selectedBranch: null
      })
      this.props.getLeaderBoard({});
    }
    else {
      this.setState({
        selectedBranch: id
      })
      this.props.getLeaderBoard({ branch: id })
    }
  }

  onLayout = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(350, 'easeInEaseOut', 'scaleXY'),
    );
  };
  renderHexagon = () => {
    return (
      <View style={styles.hexagon}>
        <View style={styles.hexagonInner} />
        <View style={styles.hexagonBefore} />
        <View style={styles.hexagonAfter} />
      </View>
    );
  };
  renderHeaderSection = () => {

    if (this.state.users && this.state.users[0].name) {
      var {
        name: firstName = '',
        given_points: firstPoints = 0,
        image: firstImage = null,
      } = this.state.users[0] ? this.state.users[0] : {};

      const {
        name: secondName = '',
        given_points: secondPoints = 0,
        image: secondImage = null,
      } = this.state.users[1] ? this.state.users[1] : {};

      const {
        name: thirdName = '',
        given_points: thirdPoints = 0,
        image: thirdImage = null,
      } = this.state.users[2] ? this.state.users[2] : {};




      return (
        <View
          style={{
            width: '100%',
            backgroundColor: '#005EB8',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: dimensionsCalculation(64),
            flexDirection: 'row',
            paddingHorizontal: dimensionsCalculation(32),
            paddingTop: dimensionsCalculation(8),
          }}>
          {/* second */}
          {secondImage &&
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this.handlePress(this.state.users[1])}
              style={{ alignItems: 'center', flex: 1 }}>
              <View
                style={{
                  marginBottom: dimensionsCalculation(4),
                  width: dimensionsCalculation(20),
                  height: dimensionsCalculation(13),
                }}>
                <Image
                  source={require('../../assets/icons/crown.png')}
                  style={{ width: '100%', height: '100%' }}
                />
              </View>
              <View
                style={{
                  marginBottom: dimensionsCalculation(16),
                  width: dimensionsCalculation(56),
                  height: dimensionsCalculation(56),
                  borderRadius: dimensionsCalculation(56 / 2),
                  shadowColor: '#000000',
                  shadowOpacity: 0.16,
                  shadowRadius: 8,
                  shadowOffset: {
                    height: 3,
                    width: 0,
                  },
                  elevation: 2,
                  borderColor: '#FFFFFF',
                  borderWidth: 1,
                }}>
                {secondImage &&
                <Image
                  source={{ uri: secondImage }}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: dimensionsCalculation(56 / 2),
                  }}
                />}
                <View
                  style={{ position: 'absolute', alignSelf: 'center', bottom: -12 }}>
                  <Image source={require('../../assets/icons/two.png')} />
                </View>
              </View>
              <Text
                numberOfLines={2}
                style={{
                  flexWrap: 'wrap',
                  textAlign: 'center',
                  fontSize: dimensionsCalculation(11),
                  marginTop: dimensionsCalculation(4),
                  color: '#fff',
                  marginBottom: dimensionsCalculation(8),
                }}>
                {secondName}
              </Text>
              <Text style={{ fontSize: dimensionsCalculation(13), color: '#EAAA00' }}>
                {secondPoints} Qcoins
            </Text>
            </TouchableOpacity>
          }
          {/* first */}
          {firstImage &&

            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this.handlePress(this.state.users[0])}
              style={{ alignItems: 'center', flex: 1 }}>
              <View
                style={{
                  marginBottom: dimensionsCalculation(4),
                  width: dimensionsCalculation(28),
                  height: dimensionsCalculation(18),
                }}>
                <Image
                  source={('../../assets/icons/crown.png')}
                  style={{ width: '100%', height: '100%' }}
                />
              </View>
              <View
                style={{
                  marginBottom: dimensionsCalculation(16),
                  width: dimensionsCalculation(84),
                  height: dimensionsCalculation(84),
                  borderRadius: dimensionsCalculation(84 / 2),
                  shadowColor: '#000000',
                  shadowOpacity: 0.16,
                  shadowRadius: 8,
                  shadowOffset: {
                    height: 3,
                    width: 0,
                  },
                  elevation: 2,
                  borderColor: '#F8BC1C',
                  borderWidth: dimensionsCalculation(3),
                }}>
                {firstImage &&
                <Image
                  source={{ uri: firstImage }}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: dimensionsCalculation(84 / 2),
                    resizeMode: 'cover',
                  }}
                />}
                <View
                  style={{ position: 'absolute', alignSelf: 'center', bottom: -15 }}>
                  <Image source={require('../../assets/icons/one.png')} />
                </View>
              </View>
              <Text
                numberOfLines={2}
                style={{
                  flexWrap: 'wrap',
                  textAlign: 'center',
                  fontSize: dimensionsCalculation(15),
                  marginTop: dimensionsCalculation(4),
                  color: '#fff',
                  marginBottom: dimensionsCalculation(8),
                }}>
                {firstName}
              </Text>
              <Text style={{ fontSize: dimensionsCalculation(13), color: '#EAAA00' }}>
                {firstPoints} Qcoins
            </Text>
            </TouchableOpacity>
          }
          {/* third */}
          {thirdImage &&
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this.handlePress(this.state.users[2])}
              style={{ alignItems: 'center', flex: 1 }}>
              <View
                style={{
                  marginBottom: dimensionsCalculation(4),
                  width: dimensionsCalculation(20),
                  height: dimensionsCalculation(13),
                }}>
                <Image
                  source={('../../assets/icons/crown.png')}
                  style={{ width: '100%', height: '100%' }}
                />
              </View>
              <View
                style={{
                  marginBottom: dimensionsCalculation(16),
                  width: dimensionsCalculation(56),
                  height: dimensionsCalculation(56),
                  borderRadius: dimensionsCalculation(56 / 2),
                  shadowColor: '#000000',
                  shadowOpacity: 0.16,
                  shadowRadius: 8,
                  shadowOffset: {
                    height: 3,
                    width: 0,
                  },
                  elevation: 2,
                  borderColor: '#FFFFFF',
                  borderWidth: 1,
                }}>
                {thirdImage &&
                <Image
                  source={{ uri: thirdImage }}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: dimensionsCalculation(56 / 2),
                    resizeMode: 'cover',
                  }}
                />}
                <View
                  style={{ position: 'absolute', alignSelf: 'center', bottom: -12 }}>
                  <Image source={require('../../assets/icons/three.png')} />
                </View>
              </View>
              <Text
                numberOfLines={2}
                style={{
                  flexWrap: 'wrap',
                  textAlign: 'center',
                  fontSize: dimensionsCalculation(11),
                  marginTop: dimensionsCalculation(4),
                  color: '#fff',
                  marginBottom: dimensionsCalculation(8),
                }}>
                {thirdName}
              </Text>
              <Text style={{ fontSize: dimensionsCalculation(13), color: '#EAAA00' }}>
                {thirdPoints} Qcoins
            </Text>
            </TouchableOpacity>
          }
        </View>
      );

    }
  };

  handlePress = user => {
    push(this.props.componentId, screenIds.PROFILE_SCREEN, { user: user,profile:true });
  };

  renderUser = ({ item, index }) => {
    if (index <= 2) return null;
    const {
      image,
    } = item;
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.handlePress(item)}
        style={{
          flex: 1,
          flexDirection: 'row',
          marginHorizontal: dimensionsCalculation(12),
          backgroundColor: '#fff',
          padding: dimensionsCalculation(10),
          marginBottom: dimensionsCalculation(16),
          borderRadius: dimensionsCalculation(15),
          shadowColor: '#3B3B3B',
          shadowOpacity: 0.13,
          shadowRadius: 25,
          shadowOffset: {
            height: 3,
            width: 0,
          },
          elevation: 2,
          alignItems: 'center',
        }}>
        <Text style={{ fontSize: dimensionsCalculation(18), color: '#656565' }}>
          {index + 1}
        </Text>
        <View
          style={{
            marginLeft: dimensionsCalculation(24),
            marginRight: dimensionsCalculation(32),
            width: dimensionsCalculation(50),
            height: dimensionsCalculation(50),
            borderRadius: dimensionsCalculation(50 / 2),
            shadowColor: '#000000',
            shadowOpacity: 0.16,
            shadowRadius: 8,
            shadowOffset: {
              height: 3,
              width: 0,
            },
            elevation: 2,
          }}>
          {image &&
          <Image
            source={{ uri: image }}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: dimensionsCalculation(50 / 2),
            }}
          />}
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            height: dimensionsCalculation(50),
          }}>
          <Text style={{ fontSize: dimensionsCalculation(16), color: '#656565' }}>
            {item.name || ''}
          </Text>
          <Text style={{ fontSize: dimensionsCalculation(14), color: '#434343' }}>
            {item.given_points || ''} Qcoin
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderFooter = () => {
    if (this.state.users.pending && !this.state.isRefreshing)
      return <ActivityIndicator size="large" />;
    else return null;
  };

  renderEmpty = () => {
    if (
      this.state.users.success &&
      this.state.users.list &&
      this.state.users.list.length == 0
    )
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text> No Results found</Text>
        </View>
      );
    return null;
  };

  fetchMore = () => {
    if (this.state.nextPage && this.state.currentPage != this.state.lastPage) {
      this.setState(
        {
          lastPage: this.state.currentPage,
        },
        () => {
          this.props.getLeaderBoard({ page: this.state.currentPage + 1, branch: this.state.selectedBranch });
        },
      );
    }
  };

  handlePressBack = () => {
    // if (this.props.myProfile) null;
    // else pop(this.props.componentId);
  };

  render() {
    return (
      <GluestackUIProvider>
      <Box flex={1} backgroundColor={'white'}>
        <HStack
              paddingHorizontal= {dimensionsCalculation(16)}
              backgroundColor= {'#005EB8'}
              borderBottomWidth= {0}
              justifyContent= {'space-between'}
              alignItems= {'flex-start'}
              paddingTop= {dimensionsCalculation(30)}
          style={
            Platform.OS == 'android' ? { height: dimensionsCalculation(70) } : {}
          }>
          <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
            <View
              style={{ flexDirection: 'row' }}>
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
                {'Leader board'.toUpperCase()}
              </Text>
            </View>
            {this.props.userProfile && this.props.userProfile.position && this.props.userProfile.position.layer !== 'C' &&
              (this.state.showBranchFilter ?
                <TouchableOpacity onPress={() => { this.setState({ showBranchFilter: false }) }}>
                  <Image
                    source={require('../../assets/icons/bx-filter.png')}
                    style={{
                      marginHorizontal: 5,
                    }}
                  />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => { this.setState({ showBranchFilter: true }) }}>
                  <Image
                    source={require('../../assets/icons/bx-filter-white.png')}
                    style={{
                      marginHorizontal: 5,
                    }}
                  />
                </TouchableOpacity>)
            }
          </View>
        </HStack>
        {this.state.users.length ? (
          <ScrollView
            style={{ backgroundColor: '#FFFFFF' }}
            showsVerticalScrollIndicator={false}
            // scrollEventThrottle={1000}
            onScroll={this.fetchMore}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={() => {
                  this.setState(
                    { lastPage: 0, nextPage: null, isRefreshing: true },
                    () => {
                      this.props.getLeaderBoard({});
                    },
                  );
                }}
              />
            }>
            {this.renderHeaderSection()}
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{ marginTop: -dimensionsCalculation(50) }}
              data={this.state.users}
              contentContainerStyle={{}}
              renderItem={this.renderUser}
              keyExtractor={(item, index) =>
                (item.id + 'jojo22lkk' + index).toString()
              }
              ListFooterComponent={this.renderFooter}
              // ListEmptyComponent={this.renderEmpty}
              // initialNumToRender={2}
              onEndReachedThreshold={0.7}
            // removeClippedSubviews={true}
            />
          </ScrollView>
        ) : (
            <View style={{ flexDirection: "row", justifyContent: 'center', marginTop: dimensionsCalculation(30),height:"67%" }}>
              <Text style={{ fontSize: 20 }}> No users with achievements yet</Text>
            </View>
          )}
        {this.state.showBranchFilter &&
          <BranchFilter
            onPress={this.setBranch}
            selected={this.state.selectedBranch}
            hide={() => { this.setState({ showBranchFilter: false }) }}
          />
        }

      </Box>
      </GluestackUIProvider>
    );
  }
}

export default LeaderBoardScreen;
