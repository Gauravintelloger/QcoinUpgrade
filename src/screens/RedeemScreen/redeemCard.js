import React from 'react';
import {
    View,
    Image,
    Text,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
const { width, height } = Dimensions.get('window');
const dimensionsCalculation = IPhonePixel => {
    return (width * IPhonePixel) / 375;
};

const RedeemCard = ({ name, change, unit, number_of_points, redeem, color, icon, redeemStatus }) => {
   const pending = redeemStatus === "pending"
    return (
        <View
            style={{
                flex: 1,
                marginHorizontal: dimensionsCalculation(8),
                backgroundColor: '#fff',
                marginBottom: dimensionsCalculation(32),
                borderRadius: dimensionsCalculation(12),
                paddingHorizontal: dimensionsCalculation(14),
                paddingTop: dimensionsCalculation(14),
                shadowColor: '#3B3B3B',
                shadowOpacity: 0.13,
                shadowRadius: 22,
                shadowOffset: {
                    height: 6,
                    width: 0,
                },
                elevation: 4,
            }}>
            <View style={{ justifyContent: "center", flexDirection: "row" }}>
            {icon &&
                <Image
                    source={{ uri: icon }}
                    style={{ width: dimensionsCalculation(44) }}
                />}
                <Text style={{
                    marginVertical: dimensionsCalculation(2),
                    marginBottom: dimensionsCalculation(15),
                    marginLeft: dimensionsCalculation(5),
                    fontSize: dimensionsCalculation(20),
                    color: "#454545"
                }}>
                    {name}
                </Text>
            </View>

            <View style={{ justifyContent: "center", flexDirection: "row" }}>
                <Text style={{
                    fontSize: dimensionsCalculation(16),
                    color: "#454545"
                }}>
                    For each {number_of_points} coins you can get
        </Text>
            </View>

            <View style={{ justifyContent: "center", flexDirection: "row", marginVertical: dimensionsCalculation(15) }}>
                <Text style={{
                    fontSize: dimensionsCalculation(28),
                    fontWeight: "bold",
                }}>
                    {change}
                </Text>
                <Text style={{
                    fontSize: dimensionsCalculation(18),
                    marginLeft: dimensionsCalculation(5),
                    marginVertical: dimensionsCalculation(10),
                }}>
                    {unit}
                </Text>
            </View>

            <TouchableOpacity onPress={pending?()=>{}:redeem}>
                <View style={{ justifyContent: "center", flexDirection: "row", marginBottom: dimensionsCalculation(15) }}>
                    <View style={{ backgroundColor: pending? "#999999":color, borderRadius: 10, width: dimensionsCalculation(130) }}>
                        {
                            pending ?
                                <Text style={{ color: "#fff", fontSize: dimensionsCalculation(15), textAlign: "center", paddingVertical: 10 }}>
                                   Pending 
                                </Text>
                                :
                                <Text style={{ color: "#fff", fontSize: dimensionsCalculation(15), textAlign: "center", paddingVertical: 10 }}>
                                    Redeem it
                                </Text>
                        }

                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default RedeemCard