import React from 'react';
import { View, TextInput, Image, Dimensions, TouchableOpacity, Text, Platform } from 'react-native';
import { CairoRegular } from '../fonts';
const { width, height } = Dimensions.get('window');
const dimensionsCalculation = (IPhonePixel) => {
  return width * IPhonePixel / 375
}
export const CustomInput = (props) => (
  <View style={{ width: '100%', marginBottom: dimensionsCalculation(8) }}>

    <View style={[{ borderBottomWidth: 1, borderBottomColor: '#C1C1C1', flexDirection: 'row', alignItems: 'center', paddingBottom: dimensionsCalculation(8) }]}>
      {/* <View style={{ height: dimensionsCalculation(26), width: dimensionsCalculation(22),, }}> */}

      {/* </View> */}
      {props.password ? <TextInput placeholderTextColor={"#BBB"} value={props.value} onChangeText={(text) => props.onChange(text)} onEndEditing={(e) => props.onEndEditing ? props.onEndEditing(e.nativeEvent.text) : null} secureTextEntry={!props.showPassword} style={{ flex: 1, textAlign: 'left', fontSize: dimensionsCalculation(15), color: '#2A2A2A', fontFamily: CairoRegular }} placeholder={props.placeholder} />
        : props.mobile ?
          <TextInput
            keyboardType={Platform.OS === 'android' ? 'phone-pad' : 'numeric'}
            placeholderTextColor={"#BBB"}
            value={props.value}
            onChangeText={(text) => {
              var regex = /^[0-9]+$/;
              var matches = regex.exec(text);
              if (text == '')
                props.onChange('')
              if (matches)
                props.onChange(text)
            }}
            style={{ flex: 1, textAlign: 'left', fontSize: dimensionsCalculation(15), color: '#2A2A2A', fontFamily: CairoRegular }} placeholder={props.placeholder} />
          :
          props.message ? <TextInput multiline={true}
            numberOfLines={12} textAlignVertical="top" placeholderTextColor={"#BBB"} value={props.value} onChangeText={(text) => props.onChange(text)} style={{ flex: 1, textAlign: 'left', fontSize: dimensionsCalculation(15), color: '#2A2A2A', fontFamily: CairoRegular }} placeholder={props.placeholder} />
            :
            <TextInput placeholderTextColor={"#BBB"} value={props.value} onChangeText={(text) => props.onChange(text)} style={{ flex: 1, textAlign: 'left', fontSize: dimensionsCalculation(15), color: '#2A2A2A', fontFamily: CairoRegular }} placeholder={props.placeholder} />
      }
      <View style={{ width: dimensionsCalculation(18), height: dimensionsCalculation(18), }}>

        {props.image && <Image source={props.image} style={[{ width: '100%', height: '100%' }, props.colored ? { tintColor: '#FF9E00' } : {}]} resizeMode="contain" />}
      </View>
    </View>
    {props.error ? <Text style={{ color: 'red', marginTop: 8, textAlign: 'center' }}>{props.error}</Text> : null}
  </View>
)