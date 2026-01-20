

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
// import FastImage from '@d11/react-native-fast-image';
import { showModal, screenIds, push } from '../../navigation';

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

class Post extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      created_at: '',
      from: 8,
      given_points: 0,
      id: 0,
      liked: false,
      reason: '',
      to: 0,
      to_user: this.props.myProfile
        ? props.user
        : props.user
          ? props.user
          : { id: 0, name: '', image: '', position_id: 0, layer: '' },
      from_user: this.props.myProfile
        ? props.user
          ? props.user
          : { id: 0, name: '', image: '', position_id: 1, layer: 'B' }
        : props.user,
      total_comments: 0,
      total_likes: 0,
      ...props.item,
      user: props.user || {},
    };
  }

  // shouldComponentUpdate() {
  //   console.log('fffffff')
  //   return true
  // }

  

  handleClickImage = () => {
    if (
      this.state.user &&
      this.state.user.position &&
      this.state.user.position.layer !== 'A'
    ) {
      if (this.state.user.id != this.state.from_user.id)
        push(this.props.componentId, screenIds.PROFILE_SCREEN, {
          user: this.state.from_user,
          profile:true
        });
    } else {
      if (this.state.user.id != this.state.to_user.id)
        push(this.props.componentId, screenIds.PROFILE_SCREEN, {
          user: this.state.to_user,
          profile:true
        });
    }
  };

  handlePressOnName = user => {
    switch (user) {
      case 'from':
        if (this.state.user.id != this.state.from_user.id)
          push(this.props.componentId, screenIds.PROFILE_SCREEN, {
            user: this.state.from_user,
            profile:true
          });
        break;
      case 'to':
        if (this.state.user.id != this.state.to_user.id)
          push(this.props.componentId, screenIds.PROFILE_SCREEN, {
            user: this.state.to_user,
            profile:true
          });
        break;
    }
  };
  renderTitle = ({ toUserName, givenPoints, fromUserName, reason }) => {
    if (
      this.state.user &&
      this.state.user.position &&
      this.state.user.position.layer !== 'C'
    )
      return (
        <Text>
          <Text
            onPress={() => this.handlePressOnName('from')}
            style={{
              fontSize: dimensionsCalculation(16),
              color: '#005EB8',
              letterSpacing: dimensionsCalculation(0.2),
              lineHeight: dimensionsCalculation(18),
              fontWeight: 'bold',
            }}>
            {fromUserName}
          </Text>
          <Text
            style={{
              fontSize: dimensionsCalculation(16),
              color: '#4F5B5E',
              letterSpacing: dimensionsCalculation(0.2),
              lineHeight: dimensionsCalculation(18),
            }}>
            {' '}
            has rewarded{' '}
          </Text>
          <Text
            onPress={() => this.handlePressOnName('to')}
            style={{
              fontSize: dimensionsCalculation(16),
              color: '#005EB8',
              letterSpacing: dimensionsCalculation(0.2),
              lineHeight: dimensionsCalculation(18),
              fontWeight: 'bold',
            }}>
            {toUserName}
          </Text>
          <Text
            style={{
              fontSize: dimensionsCalculation(16),
              color: '#434343',
              letterSpacing: dimensionsCalculation(0.2),
              lineHeight: dimensionsCalculation(18),
              fontWeight: 'bold',
            }}>{` ${givenPoints} Qcoins `}</Text>
          <Text
            style={{
              fontSize: dimensionsCalculation(16),
              color: '#4F5B5E',
              letterSpacing: dimensionsCalculation(0.2),
              lineHeight: dimensionsCalculation(18),
            }}>
            for being{' '}
          </Text>
          <Text
            style={{
              fontSize: dimensionsCalculation(16),
              color: '#4F5B5E',
              letterSpacing: dimensionsCalculation(0.2),
              lineHeight: dimensionsCalculation(18),
            }}>{` ${reason}`}</Text>
        </Text>
      );
    else if (
      this.state.user &&
      this.state.user.position &&
      this.state.user.position.layer === 'C' &&
      this.props.myProfile
    )
      return (
        <Text>
          <Text
            onPress={() => this.handlePressOnName('from')}
            style={{
              fontSize: dimensionsCalculation(16),
              color: '#005EB8',
              letterSpacing: dimensionsCalculation(0.2),
              lineHeight: dimensionsCalculation(18),
              fontWeight: '800',
            }}>
            {fromUserName}
          </Text>
          <Text
            style={{
              fontSize: dimensionsCalculation(16),
              color: '#4F5B5E',
              letterSpacing: dimensionsCalculation(0.2),
              lineHeight: dimensionsCalculation(18),
            }}>
            {' '}
            has rewarded{' '}
          </Text>
          <Text
            onPress={() => this.handlePressOnName('to')}
            style={{
              fontSize: dimensionsCalculation(16),
              color: '#4F5B5E',
              letterSpacing: dimensionsCalculation(0.2),
              lineHeight: dimensionsCalculation(18),
            }}>
            you
          </Text>
          <Text
            style={{
              fontSize: dimensionsCalculation(16),
              color: '#434343',
              letterSpacing: dimensionsCalculation(0.2),
              lineHeight: dimensionsCalculation(18),
              fontWeight: 'bold',
            }}>{` ${givenPoints} Qcoins `}</Text>
          <Text
            style={{
              fontSize: dimensionsCalculation(16),
              color: '#4F5B5E',
              letterSpacing: dimensionsCalculation(0.2),
              lineHeight: dimensionsCalculation(18),
            }}>
            for being{' '}
          </Text>
          <Text
            style={{
              fontSize: dimensionsCalculation(16),
              color: '#4F5B5E',
              letterSpacing: dimensionsCalculation(0.2),
              lineHeight: dimensionsCalculation(18),
            }}>{` ${reason}`}</Text>
        </Text>
      );
    else
      return (
        <Text>
          <Text
            onPress={() => this.handlePressOnName('to')}
            style={{
              fontSize: dimensionsCalculation(16),
              color: '#005EB8',
              letterSpacing: dimensionsCalculation(0.2),
              lineHeight: dimensionsCalculation(18),
              fontWeight: 'bold',
            }}>
            {toUserName}
          </Text>
          <Text
            style={{
              fontSize: dimensionsCalculation(16),
              color: '#4F5B5E',
              letterSpacing: dimensionsCalculation(0.2),
              lineHeight: dimensionsCalculation(18),
            }}>
            {' '}
            is rewarded with{' '}
          </Text>
          <Text
            style={{
              fontSize: dimensionsCalculation(16),
              color: '#434343',
              letterSpacing: dimensionsCalculation(0.2),
              lineHeight: dimensionsCalculation(18),
              fontWeight: 'bold',
            }}>{` ${givenPoints} Qcoins `}</Text>
          <Text
            style={{
              fontSize: dimensionsCalculation(16),
              color: '#4F5B5E',
              letterSpacing: dimensionsCalculation(0.2),
              lineHeight: dimensionsCalculation(18),
            }}>
            from{' '}
          </Text>
          <Text
            onPress={() => this.handlePressOnName('from')}
            style={{
              fontSize: dimensionsCalculation(16),
              color: '#005EB8',
              letterSpacing: dimensionsCalculation(0.2),
              lineHeight: dimensionsCalculation(18),
              fontWeight: 'bold',
            }}>
            {fromUserName}
          </Text>
          <Text
            style={{
              fontSize: dimensionsCalculation(16),
              color: '#4F5B5E',
              letterSpacing: dimensionsCalculation(0.2),
              lineHeight: dimensionsCalculation(18),
            }}>{` for ${reason}`}</Text>
        </Text>
      );
  };
  render() {
    const {
      to_user = {},
      from_user = {},
      given_points: givenPoints,
      reason,
      body,
      created_at,
    } = this.state;
    const { total_likes = 0, liked = false, total_comments = 0 } =
      this.props.postsById[this.state.id] || {};
    const {
      name: toUserName,
      image = 'https://images.unsplash.com/photo-1523676060187-f55189a71f5e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
    } = to_user;
    const {
      name: fromUserName,
      image: fromUserImage = 'https://images.unsplash.com/photo-1523676060187-f55189a71f5e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
    } = from_user;


    return (
      <TouchableOpacity
      onPress={() => {
        if(!this.props.isPostScreen){
          push(
            this.props.componentId,
            screenIds.POST_SCREEN,
            {id:this.props.item.id,componentId:this.props.componentId},
            {
              bottomTabs: {
                // titleDisplayMode: 'alwaysShow',
                // height: 70,
                visible: false,
                animate: true,
              },
            },
          );
        }
  
      }}
      activeOpacity={1}
      >
      <View
        style={{
          flex: 1,
          marginHorizontal: dimensionsCalculation(8),
          backgroundColor: '#fff',
          marginBottom: dimensionsCalculation(32),
          borderRadius: dimensionsCalculation(12),
          paddingHorizontal: dimensionsCalculation(24),
          paddingTop: dimensionsCalculation(24),
          shadowColor: '#3B3B3B',
          shadowOpacity: 0.13,
          shadowRadius: 22,
          shadowOffset: {
            height: 6,
            width: 0,
          },
          elevation: 2,
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: dimensionsCalculation(24),
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={this.handleClickImage}
            style={{
              width: dimensionsCalculation(35),
              height: dimensionsCalculation(35),
              borderRadius: dimensionsCalculation(35 / 2),
              shadowColor: '#000000',
              shadowOpacity: 0.22,
              shadowRadius: 8,
              shadowOffset: {
                height: 3,
                width: 0,
              },
              elevation: 2,
            }}>
            <Image
              source={{ uri: this.props.myProfile ? fromUserImage : image }}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: dimensionsCalculation(35 / 2),
              }}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <View style={{ flex: 1, paddingLeft: dimensionsCalculation(8) }}>
            <View>
              {this.renderTitle({
                toUserName,
                givenPoints,
                fromUserName,
                reason,
              })}
            </View>
            <View>
              <Text
                style={{
                  fontSize: dimensionsCalculation(14),
                  color: '#C6C6C6',
                  letterSpacing: dimensionsCalculation(0.2),
                  lineHeight: dimensionsCalculation(27),
                }}>
                {created_at.slice(0, created_at.length - 3)}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ marginBottom: dimensionsCalculation(24) }}>
          <Text
            style={{
              fontSize: dimensionsCalculation(16),
              color: '#4F5B5E',
              letterSpacing: dimensionsCalculation(0.2),
              lineHeight: dimensionsCalculation(27),
            }}>
            {body}
          </Text>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: dimensionsCalculation(8),
              borderBottomWidth: 0.5,
              borderBottomColor: '#E2DCDC',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                // if (total_likes > 0)
                showModal(
                  screenIds.LIKES_SCREEN,
                  {
                    total_likes: total_likes,
                    id: this.state.id,
                  },
                  {
                    layout: {
                      backgroundColor: '#fff',
                    },
                    modalPresentationStyle: 'overCurrentContext',
                    statusBar: {
                      style: 'dark',
                      backgroundColor: '#005EB8',
                    },
                  },
                );
              }}
              style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../../assets/icons/like_rounded.png')} />
              
              <Text
                style={{
                  marginLeft: dimensionsCalculation(8),
                  color: '#313131',
                  fontSize: dimensionsCalculation(14),
                }}>
                {total_likes}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // if (total_likes > 0)
                showModal(
                  screenIds.COMMENTS_SCREEN,
                  {
                    total_likes: total_likes,
                    id: this.state.id,
                    user: this.state.user,
                    post_owner: this.state.to_user
                  },
                  {
                    layout: {
                      backgroundColor: '#fff',
                    },
                    modalPresentationStyle: 'overCurrentContext',
                    statusBar: { style: 'dark' },
                  },
                );
              }}
              style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  marginLeft: dimensionsCalculation(8),
                  color: '#313131',
                  fontSize: dimensionsCalculation(14),
                }}>{`${total_comments} comments`}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity
              onPress={() => this.props.likeUnLike({ id: this.state.id })}
              style={{
                flex: 1,
                flexDirection: 'row',
                paddingVertical: dimensionsCalculation(16),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                  source={require('../../assets/icons/like.png')}
                style={{ tintColor: liked ? '#005EB8' : '#7D7D7D' }}
              />
              <Text
                style={{
                  fontSize: dimensionsCalculation(16),
                  marginLeft: dimensionsCalculation(8),
                  color: '#7D7D7D',
                  lineHeight: dimensionsCalculation(27),
                  letterSpacing: dimensionsCalculation(0.2),
                }}>
                Like
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                showModal(
                  screenIds.COMMENTS_SCREEN,
                  {
                    total_likes: total_likes,
                    id: this.state.id,
                    user: this.state.user,
                    post_owner: this.state.to_user
                  },
                  {
                    layout: {
                      backgroundColor: '#fff',
                    },
                    modalPresentationStyle: 'overCurrentContext',
                    statusBar: { style: 'dark' },
                  },
                );
              }}
              style={{
                flex: 1,
                flexDirection: 'row',
                paddingVertical: dimensionsCalculation(16),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../assets/icons/comment.png')}
                style={{ tintColor: '#7D7D7D' }}
              />
              <Text
                style={{
                  fontSize: dimensionsCalculation(16),
                  marginLeft: dimensionsCalculation(8),
                  color: '#7D7D7D',
                  lineHeight: dimensionsCalculation(27),
                  letterSpacing: dimensionsCalculation(0.2),
                }}>
                Comment
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </TouchableOpacity>
    );
  }
}

export default Post;
