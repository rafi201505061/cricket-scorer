import React from 'react';
import { LineChart, Grid, YAxis } from 'react-native-svg-charts';
import { Text, View, StyleSheet,Dimensions } from 'react-native';

/**
 * 
 * @param {data}  
 * const data1 = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
    const data2 = [ -87, 66, -69, 92, -40, -61, 16, 62, 20, -93, -54, 47, -89, -44, 18 ]

    const data = [
        {
            data: data1,
            svg: { stroke: '#8800cc' },
        },
        {
            data: data2,
            svg: { stroke: 'green' },
        },
    ]
 */
const RunsLineChart = ({ data,team1,team2 }) => {
  const windowWidth = Dimensions.get('window').width-65-300;
  const windowHeight = Dimensions.get('window').height-65-300;
  const contentInset = { top: 20, bottom: 20 }
  const r1 = data[0].data[data[0].data.length - 1];
  const r2 = data[1].data[data[1].data.length - 1];
  const max_runs = r1 > r2 ? r1 : r2;
  return <View style={{ height: 300, flexDirection: 'row',marginTop:windowHeight/2 }}>
    <YAxis
      data={[0, max_runs]}
      contentInset={contentInset}
      svg={{
        fill: '#f0245a',
        fontSize: 10,
      }}
      numberOfTicks={max_runs}
      formatLabel={(value) => `${value}`}
    />
    <LineChart
      numberOfTicks={max_runs}
      style={{ flex: 1, marginLeft: 16 }}
      data={data}
      svg={{ stroke: 'rgb(134, 65, 244)',strokeWidth:4 }}
      contentInset={contentInset}
    >
      <View style={{alignItems:'flex-end'}}>
        <View style={{ flexDirection: 'row',marginRight:20 }}>
          <View style={{ justifyContent: 'center', height: 10, width: 20 }}>
            <Text style={{ fontSize: 10, color: '#f0245a', alignSelf: 'center' }}>{team1}</Text>
          </View>
          <View style={{ width: 20, height: 10 }}>
            <View style={{ width: 20, height: 8, backgroundColor: '#05E4B5', alignSelf: 'center', marginTop: 1 }}></View>
          </View>
        </View>

        <View style={{ flexDirection: 'row',marginRight:20 }}>
          <View style={{ justifyContent: 'center', height: 10, width: 20 }}>
            <Text style={{ fontSize: 10, color: '#f0245a', alignSelf: 'center' }}>{team2}</Text>
          </View>
          <View style={{ width: 20, height: 10 }}>
            <View style={{ width: 20, height: 8, backgroundColor: '#7659FB', alignSelf: 'center', marginTop: 1 }}></View>
          </View>
        </View>
      </View>
      <Grid
      />
    </LineChart>
  </View>
}

const styles = StyleSheet.create({

});

export default RunsLineChart;
