
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
} from 'react-native';
// import FastImage from '@d11/react-native-fast-image';
import {
  showModal,
  screenIds,
  goToLogin,
  pop,
  push,
  dismissModal,
} from '../../navigation';
 import ImagePicker from 'react-native-image-crop-picker';


import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { OverLay } from '../../components/OverLay';
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

class ChangePhotoModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showButtons: false,
      image: null,
    };
  }

  openGallery = () => {
    ImagePicker.openPicker({
      multiple: false,
      sortOrder: 'asc',
      mediaType: 'photo',
    })
      .then(image => {
        this.props.viewImage(true, image.path);
        this.setState({ showButtons: true, image: image });
      })
      .catch(error => {
        this.setState({
          isModalVisible: false,
        });
      });
  };

  openCamera =async () => {
   await ImagePicker.openCamera({
       mediaType: 'photo',
        cropperCircleOverlay: true,
        compressImageQuality: 0.5
    })
      .then(image => {
        this.props.viewImage(true, image.path);
        this.setState({ showButtons: true, image: image });
      })
      .catch(error => {
        this.setState({
          isModalVisible: false,
        });
      });
  };
  deleteImage = () => {
    this.props.updateUserImage({
      image: null,
      showButtons:false,
      componentId: this.props.componentId,
    });
    this.setState({ showButtons: false });
  }
  render() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          if (this.state.showButtons) null;
          else dismissModal(this.props.componentId);
        }}
        style={{
          flex: 1,
          paddingHorizontal: dimensionsCalculation(8),
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            backgroundColor: '#FFFFFF',
            shadowColor: '#3B3B3B',
            shadowOpacity: 0.13,
            shadowRadius: 22,
            shadowOffset: {
              height: -5,
              width: 0,
            },
            elevation: 2,
            width: '100%',
            borderTopLeftRadius: dimensionsCalculation(74),
            borderTopRightRadius: dimensionsCalculation(74),
            padding: dimensionsCalculation(24),
          }}>
          {this.state.showButtons ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: dimensionsCalculation(100),
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState(
                    {
                      image: null,
                      showButtons: false,
                    },
                    () => {
                      this.props.viewImage(false, '');
                    },
                  );
                }}
                style={{
                  height: dimensionsCalculation(44),
                  width: dimensionsCalculation(103),
                  borderRadius: dimensionsCalculation(6),
                  borderWidth: 1,
                  borderColor: '#EAAA00',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: dimensionsCalculation(21),
                    textAlign: 'center',
                    color: '#EAAA00',
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.updateUserImage({
                    image: this.state.image,
                    componentId: this.props.componentId,
                  });
                  this.setState({ showButtons: false }, () => {
                    this.props.viewImage(false, '');
                  });
                }}
                style={{
                  height: dimensionsCalculation(44),
                  width: dimensionsCalculation(103),
                  borderRadius: dimensionsCalculation(6),
                  backgroundColor: '#EAAA00',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: dimensionsCalculation(21),
                    textAlign: 'center',
                    color: '#fff',
                  }}>
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: dimensionsCalculation(44),
                  }}>
                  <TouchableOpacity
                    onPress={()=>this.openCamera()}
                    activeOpacity={1}
                    style={{
                      width: dimensionsCalculation(76),
                      height: dimensionsCalculation(76),
                      borderRadius: dimensionsCalculation(76 / 2),
                      backgroundColor: '#fff',
                      shadowColor: '#373636',
                      shadowOpacity: 0.17,
                      shadowRadius: 22,
                      shadowOffset: {
                        height: 6,
                        width: 0,
                      },
                      elevation: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../assets/icons/photo-camera1.png')}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={this.openGallery}
                    activeOpacity={1}
                    style={{
                      width: dimensionsCalculation(76),
                      height: dimensionsCalculation(76),
                      borderRadius: dimensionsCalculation(76 / 2),
                      backgroundColor: '#fff',
                      shadowColor: '#373636',
                      shadowOpacity: 0.17,
                      shadowRadius: 22,
                      shadowOffset: {
                        height: 6,
                        width: 0,
                      },
                      elevation: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderColor: '#EAAA00',
                      borderWidth: 2,
                    }}>
                    <Image
                      source={require('../../assets/icons/email_color.png')}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={this.deleteImage}
                    activeOpacity={1}
                    style={{
                      width: dimensionsCalculation(76),
                      height: dimensionsCalculation(76),
                      backgroundColor: '#fff',
                      borderRadius: dimensionsCalculation(76 / 2),
                      shadowColor: '#373636',
                      shadowOpacity: 0.17,
                      shadowRadius: 22,
                      shadowOffset: {
                        height: 6,
                        width: 0,
                      },
                      elevation: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../assets/icons/rubbish-bin-delete-button.png')}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => dismissModal(this.props.componentId)}>
                  <Text
                    style={{
                      fontSize: dimensionsCalculation(20),
                      color: '#707070',
                      textAlign: 'center',
                    }}>
                    Cancel
                </Text>
                </TouchableOpacity>
              </>
            )}
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}

export default ChangePhotoModal;
