import React from 'react'
import { View, Dimensions, Text } from 'react-native'
import { BarChart, Grid, YAxis, XAxis } from 'react-native-svg-charts'

const RunsBarChart = ({ data, team1, team2, maximum }) => {
  const windowWidth = Dimensions.get('window').width-65-300;
  const windowHeight = Dimensions.get('window').height-65-300;
  // const data1 = [0,1, 5, 5, 5,5,1]
  //   .map((value) => ({ value }));
  // const data2 = [0,5, 5, 5, 5,5,2]
  //   .map((value) => ({ value }));

  // const barData = [
  //   {
  //     data: data1,
  //     svg: {
  //       fill: '#05E4B5'

  //     },
  //   },
  //   {
  //     data: data2,
  //     svg: {
  //       fill: '#7659FB'
  //     },
  //   },
  // ]
  const contentInset = { top: 20, bottom: 20 }
  return (<View style={{ height: 300, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop:windowHeight/2}}>
    <YAxis
      data={[0, maximum]}
      contentInset={contentInset}
      svg={{
        fill: '#f0245a',
        fontSize: 10,
      }}
      numberOfTicks={maximum}
      formatLabel={(value) => `${value}`}
    />
    <View style={{ flex: 1, marginLeft: 10 }}>
      <BarChart
        style={{ height: 300 }}
        numberOfTicks={10}
        spacingInner={0}
        spacingOuter={0.2}
        data={data}
        numberOfTicks={15}
        yAccessor={({ item }) => item.value}
        contentInset={contentInset}
      >
        <View style={{ alignItems: 'flex-end',marginBottom:20 }}>
          <View style={{ flexDirection: 'row', marginRight: 20 }}>
            <View style={{ justifyContent: 'center', height: 10, width: 20 }}>
              <Text style={{ fontSize: 10, color: '#f0245a', alignSelf: 'center' }}>{team1}</Text>
            </View>
            <View style={{ width: 20, height: 10 }}>
              <View style={{ width: 20, height: 8, backgroundColor: '#05E4B5', alignSelf: 'center', marginTop: 1 }}></View>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginRight: 20 }}>
            <View style={{ justifyContent: 'center', height: 10, width: 20 }}>
              <Text style={{ fontSize: 10, color: '#f0245a', alignSelf: 'center' }}>{team2}</Text>
            </View>
            <View style={{ width: 20, height: 10 }}>
              <View style={{ width: 20, height: 8, backgroundColor: '#7659FB', alignSelf: 'center', marginTop: 1 }}></View>
            </View>
          </View>
        </View>
        <Grid />
      </BarChart>
    </View>

  </View>
  )

}
export default RunsBarChart;