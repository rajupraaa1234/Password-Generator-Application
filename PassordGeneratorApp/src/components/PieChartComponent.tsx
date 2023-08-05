import React from "react";
import {View , StyleSheet , Dimensions} from 'react-native';
import {
  
    PieChart,
   
  } from "react-native-chart-kit";


const PieChartComponent = (props:any) => {
    const {data} = props;
    const screenWidth = Dimensions.get("window").width;
      const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };  

    return (
        <View >
            <View style={{padding:10,justifyContent:'center',alignItems:'center',alignSelf:'center'}}>
                <PieChart
                    data={data}
                    width={screenWidth}
                    height={200}
                    style={{justifyContent:'center',alignItems:'center',alignSelf:'center'}}
                    chartConfig={chartConfig}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                    paddingLeft={40}
                    center={[60, 5]}
                    hasLegend={false}
                    absolute
                />
            </View>

        </View>
    )
}

export default PieChartComponent;


