import React from 'react';
import { View, TextInput, Image, Dimensions, TouchableOpacity, Text, Platform } from 'react-native';
import { CairoRegular } from '../fonts';
const { width, height } = Dimensions.get('window');
const dimensionsCalculation = (IPhonePixel) => {
  return width * IPhonePixel / 375
}
export const CustomButton = (props) => (
  <TouchableOpacity
    onPress={props.click}
    style={{ width: dimensionsCalculation(300), height: dimensionsCalculation(50), borderRadius: dimensionsCalculation(6), backgroundColor: '#EAAA00', justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: dimensionsCalculation(15), color: '#fff', lineHeight: dimensionsCalculation(18) }}>{props.title}</Text>
  </TouchableOpacity>
)