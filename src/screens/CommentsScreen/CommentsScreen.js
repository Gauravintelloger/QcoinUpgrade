
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
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Animated,
  ActivityIndicator,
  RefreshControl,
  InteractionManager,
  Platform,
} from 'react-native';
// import FastImage from '@d11/react-native-fast-image';
import {
  showModal,
  screenIds,
  goToLogin,
  pop,
  dismissModal,
  push,
} from '../../navigation';
import { HStack, Box } from "@gluestack-ui/themed";
import { GluestackUIProvider } from "@gluestack-ui/themed";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { OverLay } from '../../components/OverLay';
import { Api } from 'src/services';

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
  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});


class CommentsScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      id: props.id,
      height: 45,
      show: false,
      comment: '',
      nextPage: null,
      currentPage: 0,
      lastPage: 0,
      isRefreshing: false,
      to_user: this.props.myProfile
        ? props.user
        : props.user
          ? props.user
          : { id: props.id, name: '', image: '', position_id: 0, layer: '' },
      from_user: this.props.myProfile
        ? props.user
          ? props.user
          : { id: props.id, name: '', image: '', position_id: 1, layer: 'B' }
        : props.user,
      user: props.user || {},
    };

    this.keyboardHeight = new Animated.Value(0);
    // this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
  }
  componentDidMount() {
    this.props.getCommentsForPost({ id: this.props.id, page: 1 });
    // this.focusInputWithKeyboard();
  }

  focusInputWithKeyboard = () => {
    InteractionManager.runAfterInteractions(() => {
      this.refSearch.focus();
    });
  };

  componentWillReceiveProps(nextProps) {
    if (
      this.props.commentsForPost[this.props.id]  &&
      (this.props.commentsForPost[this.props.id] || {}).list 
    ) {
      this.setState({
        comments: nextProps.commentsForPost[this.props.id].list,
        nextPage: nextProps.commentsForPost[this.props.id].next_page_url,
        currentPage: nextProps.commentsForPost[this.props.id].current_page,
        isRefreshing: false,
      });
    }
  }
  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener(
      'keyboardWillShow',
      this.keyboardWillShow,
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      'keyboardWillHide',
      this.keyboardWillHide,
    );
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }
  deleteComment = async (id) => {
    this.setState({
      isRefreshing:true
    })
    const response = await this.props.deleteCommentForPost({ commentId: id })
    setTimeout(()=>{
      this.props.getCommentsForPost({ id: this.props.id, page: 1 });
      this.props.getPosts({});
    },600)
    this.setState({
      isRefreshing:false
    })
  }

  handleDelete = (id) => {
    showModal(screenIds.MODAL_SCREEN, {
      text: 'Are you sure you want to delete this comment?',
      noText: 'Cancel',
      yesText: 'Delete',
      noClick: () => { },
      yesClick: () => {
        this.deleteComment(id)
      },
    });
  }
  renderItem = ({ item, index }) => {
    const { commenter = {}, created_at = '', body = '', to = '' } = item || {};
    return (
      <View
        style={{
          padding: dimensionsCalculation(16),
          flexDirection: 'row',
          alignItems: 'flex-start',
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            push(this.props.componentId, screenIds.PROFILE_SCREEN, {
              user: commenter,
            });
          }}
          style={{
            width: dimensionsCalculation(40),
            height: dimensionsCalculation(40),
            borderRadius: dimensionsCalculation(40 / 2),
          }}>
          {commenter.image &&
          <Image
            source={{ uri: commenter.image }}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: dimensionsCalculation(40 / 2),
            }}
          />}
        </TouchableOpacity>

        <View
          style={{
            padding: dimensionsCalculation(16),
            marginHorizontal: dimensionsCalculation(16),
            backgroundColor: '#F1F1F1',
            borderWidth: 0.5,
            borderColor: '#F5F5F5',
            borderRadius: dimensionsCalculation(15),
            flex: 1,
          }}>
          <View style={styles.iconWrapper}>
            <Text
              style={{
                marginLeft: dimensionsCalculation(8),
                color: '#656565',
                fontSize: dimensionsCalculation(16),
                marginBottom: dimensionsCalculation(8),
              }}>
              {commenter.name}
            </Text>

            {((this.props.post_owner && this.props.post_owner.id === this.props.userProfile.id) || 
            this.props.userProfile.id == item.commenter.id) && 
               <TouchableOpacity style={{padding:5}} onPress={() => this.handleDelete(item.id)}>
              <Image
                  source={require('../../assets/icons/kababIcon.png')}
                style={{ tintColor: '#000000' }}
              />
            </TouchableOpacity>}
          </View>
          <Text
            style={{
              marginLeft: dimensionsCalculation(8),
              color: '#B4B4B4',
              fontSize: dimensionsCalculation(14),
              marginBottom: dimensionsCalculation(8),
            }}>
            {created_at}
          </Text>
          <Text
            style={{
              marginLeft: dimensionsCalculation(8),
              color: '#828181',
              fontSize: dimensionsCalculation(16),
              marginBottom: dimensionsCalculation(8),
            }}>
            {body}
          </Text>
        </View>
      </View>
    );
  };

  keyboardWillHide = event => {
    Animated.timing(this.keyboardHeight, {
      duration: event.duration,
      toValue: 0,
    }).start();
  };
  keyboardWillShow = event => {
    Animated.timing(this.keyboardHeight, {
      duration: event.duration,
      toValue: event.endCoordinates.height,
    }).start();
  };

  updateSize = height => {
    this.setState({
      height,
    });
  };

  handleAddComment = () => {
    this.props.createCommentForPost({
      id: this.props.id,
      body: this.state.comment,
      user: this.props.userProfile,
    });
    setTimeout(()=>{
      this.props.getCommentsForPost({
        id: this.props.id,
        page: 1,
      });
    },500)
   
    this.setState({
      comment: '',
    });
  };

  fetchMore = () => {
    if (this.state.nextPage && this.state.currentPage != this.state.lastPage) {
      this.setState(
        {
          lastPage: this.state.currentPage,
        },
        () => {
          this.props.getCommentsForPost({
            id: this.props.id,
            page: this.state.currentPage + 1,
          });
        },
      );
    }
  };

  renderFooter = () => {
    if (
      (this.props.commentsForPost[this.props.id] || {}).pending &&
      !this.state.isRefreshing
    )
      return <ActivityIndicator size="large" />;
    else return null;
  };

  renderEmpty = () => {
    if (
      (this.props.commentsForPost[this.props.id] || {}).success &&
      (this.props.commentsForPost[this.props.id] || {}).list &&
      (this.props.commentsForPost[this.props.id] || {}).list.length == 0
    )
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text> No Results found</Text>
        </View>
      );
    return null;
  };
  render() {

    return (
      <GluestackUIProvider >
      <Box flex={1} backgroundColor={'#F6F6F6'}>
        <HStack
              backgroundColor= {'#005EB8'}
              borderBottomWidth= {0}
              paddingLeft= {0}
              paddingRight= {0}
          style={
            Platform.OS == 'android' ? { height: dimensionsCalculation(70) } : {}
          }>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              this.refSearch.blur();
              dismissModal(this.props.componentId);
            }}
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: Platform.OS == 'android' ? 'center' : 'center',
              backgroundColor: '#fff',
              width: '100%',
              paddingHorizontal: dimensionsCalculation(16),
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(112,112,112,0.08)',
              paddingBottom:
                Platform.OS == 'android' ? dimensionsCalculation(12) : 0,
            }}>
            <Image
                source={require('../../assets/icons/like_rounded.png')}
              style={{ marginRight: dimensionsCalculation(8) }}
            />
            <Text
              style={{
                fontSize: dimensionsCalculation(16),
                color: '#656565',
                marginRight: dimensionsCalculation(8),
              }}>{`${this.props.total_likes}`}</Text>
            <Image
                source={require('../../assets/icons/right_arrow.png')}
              style={{ tintColor: '#000000' }}
            />
          </TouchableOpacity>
        </HStack>

        <Animated.View
          style={[{ flex: 1 }, { paddingBottom: this.keyboardHeight }]}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.state.comments}
            renderItem={this.renderItem}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={() => {
                  this.setState(
                    {
                      lastPage: 0,
                      nextPage: null,
                      posts: [],
                      isRefreshing: true,
                    },
                    () => {
                      this.props.getCommentsForPost({
                        id: this.props.id,
                        page: 1,
                      });
                    },
                  );
                }}
              />
            }
            keyExtractor={(item, index) => item.id.toString()}
            inverted
            onEndReached={this.fetchMore}
            ListFooterComponent={this.renderFooter}
            // ListEmptyComponent={this.renderEmpty}
            initialNumToRender={2}
            onEndReachedThreshold={0.7}
          />

          <View
            style={[
              {
                height: dimensionsCalculation(this.state.height + 10),
                minHeight: dimensionsCalculation(55),
                maxHeight: dimensionsCalculation(120),
                width: this.state.comment !== '' ? '94%' : '100%',
                backgroundColor: '#fff',
                paddingHorizontal: dimensionsCalculation(16),
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              },
              this.state.comment !== ''
                ? {}
                : {
                  shadowColor: '#C2C2C2',
                  shadowOpacity: 0.18,
                  shadowRadius: 22,
                  shadowOffset: {
                    height: -6,
                    width: 0,
                  },
                  elevation: 2,
                },
            ]}>
            <TextInput
              onSubmitEditing={Keyboard.dismiss}
              ref={elem => {
                this.refSearch = elem;
              }}
              multiline
              placeholder="Write a comment..."
              placeholderTextColor="#AFAFAF"
              value={this.state.comment}
              onChangeText={text => {
                this.setState({
                  comment: text,
                });
              }}
              onContentSizeChange={e =>
                this.updateSize(e.nativeEvent.contentSize.height)
              }
              style={{
                fontSize: dimensionsCalculation(16),
                height: dimensionsCalculation(this.state.height),
                maxHeight: dimensionsCalculation(120),
                minHeight: dimensionsCalculation(45),
                width: '100%',
                backgroundColor: '#F1F1F1',
                borderRadius: dimensionsCalculation(15),
                borderWidth: 0.5,
                borderColor: '#F5F5F5',
                paddingHorizontal: dimensionsCalculation(8),
              }}
            />
            {this.state.comment !== '' ? (
              <TouchableOpacity
                onPress={this.handleAddComment}
                activeOpacity={1}
                hitSlop={{ top: 8, bottom: 8, right: 8, left: 8 }}
                style={{
                  width: dimensionsCalculation(24),
                  height: dimensionsCalculation(24),
                  marginLeft: dimensionsCalculation(8),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                    source={require('../../assets/icons/send.png')}
                  style={{ width: '100%', height: '100%' }}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        </Animated.View>
      </Box>
      </GluestackUIProvider>
    );
  }
}

export default CommentsScreen;
