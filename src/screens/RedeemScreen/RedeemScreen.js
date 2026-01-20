// RedeemScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Platform,
    UIManager,
    LayoutAnimation,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HStack, Box } from '@gluestack-ui/themed';
import { GluestackUIProvider } from "@gluestack-ui/themed";

import Snackbar from 'react-native-snackbar';

import RedeemCard from './redeemCard';
import { getRedeemsCall, requestRedeemCall, getUserProfileCall } from '../../../src/services/api/calls';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

const { width } = Dimensions.get('window');
const dimensionsCalculation = (iPhonePixel) => (width * iPhonePixel) / 375;

const RedeemScreen = (props) => {
    const navigation = useNavigation();

    // Props from Redux or parent (assuming you're using connect or passing via navigation params)
    const { userProfile, getRedeemRequests, getUserProfileCall: dispatchGetUserProfile } = props;

    const [redeems, setRedeems] = useState([]);
    const [selectedRedeem, setSelectedRedeem] = useState({});
    const [showRedeemForm, setShowRedeemForm] = useState(false);
    const [points, setPoints] = useState('');
    const [userProfileState, setUserProfileState] = useState({});

    // Load data on mount
    useEffect(() => {
        getRedeems();
        getProfile();
    });

    const getProfile = async () => {
        try {
            const response = await getUserProfileCall({ userId: userProfile.id });
            setUserProfileState(response.data.user_info);
            dispatchGetUserProfile({ userId: userProfile.id });
        } catch (error) {
            console.log('Error fetching profile:', error);
        }
    };

    const getRedeems = async () => {
        try {
            const response = await getRedeemsCall();
            setRedeems(response.data.redeems || []);
        } catch (error) {
            console.log('Error fetching redeems:', error);
        }
    };

    const requestRedeem = async () => {
        if (!points || !selectedRedeem.id) return;

        try {
            const data = {
                redeem_id: selectedRedeem.id,
                points: parseInt(points, 10),
            };

            const response = await requestRedeemCall(data);

            setSelectedRedeem({});
            setPoints('');
            setShowRedeemForm(false);
            getProfile(); // Refresh points

            const message = response.data?.message || 'Request processed';

            if (message.toLowerCase().includes('request has been sent to admin')) {
                Snackbar.show({
                    text: message,
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: 'red',
                    action: {
                        text: 'Okay',
                        textColor: '#fff',
                        onPress: () => Snackbar.dismiss(),
                    },
                });

                setTimeout(() => {
                    handlePressBack();
                }, 1500);
            } else {
                Snackbar.show({
                    text: message,
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: 'red',
                    action: {
                        text: 'Okay',
                        textColor: '#fff',
                        onPress: () => Snackbar.dismiss(),
                    },
                });
                handlePressBack();
            }
        } catch (error) {
            Snackbar.show({
                text: 'Something went wrong. Please try again.',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: 'red',
            });
        }
    };

    const handlePressBack = useCallback(() => {
        if (showRedeemForm) {
            setShowRedeemForm(false);
            setSelectedRedeem({});
            setPoints('');
            getRedeems();
        } else {
            getRedeemRequests?.(); // Optional Redux dispatch
            navigation.goBack();
        }
    }, [showRedeemForm, navigation, getRedeemRequests]);

    const selectRedeemItem = (item) => {
        setSelectedRedeem(item);
        setShowRedeemForm(true);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    };

    return (
        <GluestackUIProvider>
            <Box flex={1} backgroundColor="white">
                {/* Header */}
                <HStack
                    flexDirection="column"
                    paddingHorizontal={dimensionsCalculation(16)}
                    backgroundColor="#005EB8"
                    alignItems="flex-start"
                    height={dimensionsCalculation(220)}
                >
                    <TouchableOpacity onPress={handlePressBack} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={require('../../assets/icons/left_arrow.png')}
                            style={{ width: dimensionsCalculation(24), height: dimensionsCalculation(24), marginLeft: 10 }}
                        />
                        <Text
                            style={{
                                fontSize: dimensionsCalculation(20),
                                letterSpacing: 0.2,
                                lineHeight: dimensionsCalculation(25),
                                color: '#fff',
                                marginLeft: dimensionsCalculation(10),
                                fontWeight: 'bold',
                            }}
                        >
                            REDEEM QCOINS
                        </Text>
                    </TouchableOpacity>

                    <View style={{ marginTop: dimensionsCalculation(20) }}>
                        <Text
                            style={{
                                fontSize: dimensionsCalculation(24),
                                letterSpacing: 2,
                                lineHeight: dimensionsCalculation(35),
                                color: '#fff',
                                fontWeight: 'bold',
                            }}
                        >
                            You have{' '}
                            <Text style={{ color: '#f8bc1b', fontSize: dimensionsCalculation(26) }}>
                                {userProfileState.points || 0}
                                <Image
                                    source={require('../../assets/icons/money-bag.png')}
                                    style={{ width: dimensionsCalculation(30), height: dimensionsCalculation(30), marginLeft: 8 }}
                                    resizeMode="contain"
                                />
                            </Text>{' '}
                            Qcoins
                        </Text>
                        <Text style={{ color: '#fff', fontSize: dimensionsCalculation(20), marginTop: 8 }}>
                            Redeem it with
                        </Text>
                    </View>
                </HStack>

                {/* Content */}
                <ScrollView style={{ marginTop: -dimensionsCalculation(35) }}>
                    {!redeems || redeems.length === 0 ? (
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: dimensionsCalculation(22),
                                marginTop: dimensionsCalculation(60),
                                color: '#666',
                            }}
                        >
                            No redeems added yet
                        </Text>
                    ) : !showRedeemForm ? (
                        redeems.map((el) => (
                            <RedeemCard
                                key={el.id}
                                id={el.id}
                                redeemStatus={el.status}
                                name={el.name}
                                change={el.change}
                                unit={el.unit}
                                number_of_points={el.number_of_points}
                                color={el.color}
                                icon={el.icon}
                                redeem={() => selectRedeemItem(el)}
                            />
                        ))
                    ) : (
                        <View
                            style={{
                                marginHorizontal: dimensionsCalculation(8),
                                backgroundColor: '#fff',
                                marginBottom: dimensionsCalculation(32),
                                borderRadius: dimensionsCalculation(12),
                                paddingHorizontal: dimensionsCalculation(14),
                                paddingTop: dimensionsCalculation(14),
                                shadowColor: '#3B3B3B',
                                shadowOpacity: 0.13,
                                shadowRadius: 22,
                                shadowOffset: { height: 6, width: 0 },
                                elevation: 2,
                            }}
                        >
                            <View style={{ margin: dimensionsCalculation(10) }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {selectedRedeem.icon && (
                                        <Image
                                            source={{ uri: selectedRedeem.icon }}
                                            style={{
                                                height: dimensionsCalculation(40),
                                                width: dimensionsCalculation(40),
                                                resizeMode: 'contain',
                                            }}
                                        />
                                    )}
                                    <Text
                                        style={{
                                            marginLeft: dimensionsCalculation(10),
                                            fontSize: dimensionsCalculation(22),
                                            color: '#454545',
                                            fontWeight: '600',
                                        }}
                                    >
                                        {selectedRedeem.name}
                                    </Text>
                                </View>

                                <View style={{ marginTop: dimensionsCalculation(20) }}>
                                    <Text
                                        style={{
                                            fontSize: dimensionsCalculation(19),
                                            color: '#797979',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        Qcoins you want to spend
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        borderBottomColor: '#dbdbdb',
                                        borderBottomWidth: 1,
                                        alignItems: 'center',
                                    }}
                                >
                                    <TextInput
                                        style={{
                                            height: 50,
                                            width: '70%',
                                            fontSize: dimensionsCalculation(18),
                                        }}
                                        onChangeText={setPoints}
                                        value={points}
                                        keyboardType={Platform.OS === 'android' ? 'numeric' : 'number-pad'}
                                        placeholder="0"
                                    />
                                    <Text style={{ fontSize: dimensionsCalculation(16), color: '#797979' }}>
                                        Qcoins
                                    </Text>
                                </View>

                                <View style={{ marginTop: dimensionsCalculation(50), alignItems: 'center' }}>
                                    <TouchableOpacity onPress={requestRedeem} style={{ width: '100%' }}>
                                        <View
                                            style={{
                                                backgroundColor: '#eaaa01',
                                                borderRadius: 10,
                                                paddingVertical: 12,
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: '#fff',
                                                    fontSize: dimensionsCalculation(16),
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Send Request
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                </ScrollView>
            </Box>
        </GluestackUIProvider>
    );
};

export default RedeemScreen;