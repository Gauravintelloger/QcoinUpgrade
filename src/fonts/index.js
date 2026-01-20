// @flow
    import React from 'react';
import { Platform } from 'react-native';

export const OpenSansRegular = Platform.OS == 'ios' ? 'OpenSans-Regular' : 'OpenSansRegular';
export const OpenSansBold = Platform.OS == 'ios' ? 'OpenSans-Bold' : 'OpenSansBold';
export const OpenSansLight = Platform.OS == 'ios' ? 'OpenSans-Light' : 'OpenSansLight';
export const OpenSansSemibold = Platform.OS == 'ios' ? 'OpenSans-Semibold' : 'OpenSansSemibold';

