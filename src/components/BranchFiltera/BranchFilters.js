import React, { useState, useEffect } from "react";
import { getBranchesCall } from "../../../src/services/api/calls";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

const { width } = Dimensions.get("window");

const dimensionsCalculation = (IPhonePixel) => (width * IPhonePixel) / 375;

const BranchFilter = ({ selected, onPress, hide }) => {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await getBranchesCall({});
        setBranches(response.data.branches || []);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };
    fetchBranches();
  }, []);

  return (
    <View
      style={{
        bottom: dimensionsCalculation(0),
        zIndex: 99999,
        alignSelf: "center",
        marginBottom: dimensionsCalculation(12),
      }}
    >
      <View
        style={{
          height: dimensionsCalculation(90),
          width: dimensionsCalculation(365),
          backgroundColor: "#fff",
          borderRadius: dimensionsCalculation(12),
          shadowColor: "#3B3B3B",
          shadowOpacity: 0.22,
          shadowRadius: 22,
          shadowOffset: { height: 6, width: 0 },
          elevation: 2,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: dimensionsCalculation(24),
        }}
      >
        <View style={{ flexDirection: "column" }}>
          <TouchableOpacity
            onPress={hide}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 8,
            }}
          >
            <Image
              source={require("../../assets/icons/arrow_down.png")}
              style={{ tintColor: "rgba(112,112,112,0.32)" }}
            />
          </TouchableOpacity>

          <View style={{ flexDirection: "row", marginVertical: 5 }}>
            <Image
              source={require("../../assets/icons/bx-filter-blue.png")}
              style={{ marginHorizontal: 5 }}
            />
            <Text
              style={{
                fontSize: dimensionsCalculation(16),
                color: "#888888",
                letterSpacing: dimensionsCalculation(0.2),
                lineHeight: dimensionsCalculation(18),
                fontWeight: "bold",
              }}
            >
              Branches Filter
            </Text>
          </View>

          <ScrollView horizontal>
            {branches.map((branch) => (
              <TouchableOpacity
                key={branch.id}
                onPress={() => onPress(branch.id, branch.name)}
                style={{
                  borderWidth: 0.8,
                  borderRadius: 8,
                  borderColor: "#005db8",
                  textAlign: "center",
                  margin: 8,
                  width: 150,
                  backgroundColor:
                    selected === branch.id ? "#005db8" : "transparent",
                }}
              >
                <Text
                  style={{
                    marginVertical: 4,
                    textAlign: "center",
                    color: selected === branch.id ? "#fff" : "#005db8",
                  }}
                >
                  {branch.country.name} - {branch.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default BranchFilter;
