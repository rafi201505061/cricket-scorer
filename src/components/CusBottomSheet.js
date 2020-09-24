import React, { useState, useReducer, useContext } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { BottomSheet, CheckBox } from 'react-native-elements';
import ButtonRow from './ButtonRow';
import SlideList from './SlideList';
import { ScrollView } from 'react-native-gesture-handler';
import Button from './Button';
import ClickableButtonGroup from './ClickableButtonGroup';
import { Context as DataContext } from '../Context/DataContext';

const defaultColor = '#f0245a';

const reducer = (state, action) => {
  switch (action.type) {
    case 'newBatsman':
      return { ...state, newBatsman: { selected: action.payload.selected, isClicked: action.payload.isClicked } }
    case 'catcher':
      return { ...state, catcher: { selected: action.payload.selected, isClicked: action.payload.isClicked } }
    case 'TO':
      return { ...state, batsmanWhoTimedOut: { selected: action.payload.selected, isClicked: action.payload.isClicked } }
    case 'St':
      return { ...state, stumper: { selected: action.payload.selected, isClicked: action.payload.isClicked } }
    case 'thrower':
      return { ...state, thrower: { selected: action.payload.selected, isClicked: action.payload.isClicked } }
    case 'submit':
      return {
        newBatsman: { selected: '', isClicked: false },
        catcher: { selected: '', isClicked: false },
        thrower: { selected: '', isClicked: false },
        batsmanWhoRanOut: { selected: '', isClicked: false },
        batsmanWhoTimedOut: { selected: '', isClicked: false },
        stumper: { selected: '', isClicked: false },
        hasStrikeChanged:false
      };
    case 'ran_out':
      return { ...state, batsmanWhoRanOut: { selected: action.payload.selected, isClicked: action.payload.isClicked } };
    case 'strike_change':
      return { ...state,hasStrikeChanged:!state.hasStrikeChanged };
    default:
      return state;
  }
}

const CusBottomSheet = ({ isVisible, data, calledBy, changeVisibility, type, header, onSubmit,dataList }) => {
  const { State,wicket } = useContext(DataContext);
  const [wicketState, dispatch] = useReducer(reducer, {
    newBatsman: { selected: '', isClicked: false },
    catcher: { selected: '', isClicked: false },
    thrower: { selected: '', isClicked: false },
    batsmanWhoRanOut: { selected: '', isClicked: false },
    batsmanWhoTimedOut: { selected: '', isClicked: false },
    stumper: { selected: '', isClicked: false },
    hasStrikeChanged: false
  })
  const [runType, setRuntype] = useState([
    { name: 'bat', isClicked: false },
    { name: 'lb', isClicked: false },
    { name: 'b', isClicked: false },
    { name: 'wd', isClicked: false },
    { name: 'nb', isClicked: false }
  ])

  const [run, setRun] = useState([
    { name: '0', isClicked: false },
    { name: '1', isClicked: false },
    { name: '2', isClicked: false },
    { name: '3', isClicked: false },
    { name: '4', isClicked: false },
    { name: '5', isClicked: false },
    { name: '6', isClicked: false }
  ])

  const renderRunout = () => <View>
    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
      <Text style={{
        color: defaultColor, fontSize: 16,
        fontWeight: '500', padding: 5, alignSelf: 'center', flex: 1
      }}>
        out:
      </Text>
      <View style={{ flex: 4 }}>
        <SlideList data={dataList.onStrikeBatsmen} value={wicketState.batsmanWhoRanOut} onSelect={(isClicked, selected) => dispatch({ type: 'ran_out', payload: { selected, isClicked } })} />
      </View>

    </View>
    <View style={{ flexDirection: 'row' }}>
      <View style={{ flex: 1 }} />
      <View style={{ flex: 4 }}>
        <CheckBox
          onPress={() => dispatch({ type: 'strike_change' })}
          title='New batsman on strike'
          checked={wicketState.hasStrikeChanged}
          uncheckedColor='#f0245a'
          checkedColor='#f0245a'
          textStyle={styles.checkBoxTitleStyle}
          containerStyle={styles.checkboxContainerStyle}
        />
      </View>
    </View>
    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
      <Text style={{
        color: defaultColor, fontSize: 16,
        fontWeight: '500', padding: 5, alignSelf: 'center', flex: 1
      }}>
        thrower:
      </Text>
      <View style={{ flex: 4 }}>
        <SlideList data={dataList.fielders} value={wicketState.thrower} onSelect={(isClicked, selected) => dispatch({ type: 'thrower', payload: { selected, isClicked } })} />
      </View>

    </View>
    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
      <Text style={{
        color: defaultColor, fontSize: 16,
        fontWeight: '500', padding: 5, alignSelf: 'flex-end', flex: 1
      }}>
        runType:
      </Text>
      <View style={{ flex: 4 }}>
        <ClickableButtonGroup
          initialState={runType}
          onPress={(type, payload) => {
            const temp = [];
            runType.map((item) => {
              if (item.name !== type)
                temp.push({ ...item, isClicked: false });
              else {
                temp.push({ ...item, isClicked: true });
              }
            })
            setRuntype(temp);
          }} />
      </View>
    </View>
    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
      <Text style={{
        color: defaultColor, fontSize: 16,
        fontWeight: '500', padding: 5, alignSelf: 'flex-end', flex: 1
      }}>
        runs:
      </Text>
      <View style={{ flex: 4 }}>
        <ClickableButtonGroup
          initialState={run}
          onPress={(type, payload) => {
            const temp = [];
            run.map((item) => {
              if (item.name !== type)
                temp.push({ ...item, isClicked: false });
              else {
                temp.push({ ...item, isClicked: true });
              }
            })
            setRun(temp);
          }}
        />
      </View>

    </View>


  </View>

  const renderStumper = (name) => <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 2 }}>
    <View style={{ flexDirection: 'row' }}>
      <Text style={{ color: defaultColor, fontSize: 16, fontWeight: '500', padding: 5, alignSelf: 'center', flex: 2 }}>{name}</Text>
      <View style={{ flex: 4 }}>
        <SlideList data={dataList.fielders} value={wicketState.stumper} onSelect={(isClicked, selected) => dispatch({ type: 'St', payload: { selected, isClicked } })} />
      </View>
    </View>
  </View>

  const renderCatcher = (name) => <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 2 }}>
    <View style={{ flexDirection: 'row' }}>
      <Text style={{ color: defaultColor, fontSize: 16, fontWeight: '500', padding: 5, alignSelf: 'center', flex: 2 }}>{name}</Text>
      <View style={{ flex: 4 }}>
        <SlideList data={dataList.fielders} value={wicketState.catcher} onSelect={(isClicked, selected) => dispatch({ type: 'catcher', payload: { selected, isClicked } })} />
      </View>
    </View>
    <View style={{ flexDirection: 'row' }}>
      <View style={{ flex: 2 }} />
      <View style={{ flex: 4 }}>
        <CheckBox
          onPress={() => dispatch({ type: 'strike_change' })}
          title='strike changed'
          checked={wicketState.hasStrikeChanged}
          uncheckedColor='#f0245a'
          checkedColor='#f0245a'
          textStyle={styles.checkBoxTitleStyle}
          containerStyle={styles.checkboxContainerStyle}
        />
      </View>

    </View>
  </View>

  const renderTO = (name) => <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 2 }}>
    <View style={{ flexDirection: 'row' }}>
      <Text style={{ color: defaultColor, fontSize: 16, fontWeight: '500', padding: 5, alignSelf: 'center', flex: 2 }}>{name}</Text>
      <View style={{ flex: 4 }}>
        <SlideList  value={wicketState.batsmanWhoTimedOut} onSelect={(isClicked, selected) => dispatch({ type: 'TO', payload: { selected, isClicked } })} />
      </View>
    </View>
  </View>

  const renderNewBatsman = (name) => <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 2 }}>
    <View style={{ flexDirection: 'row' }}>
      <Text style={{ color: defaultColor, fontSize: 16, fontWeight: '500', padding: 5, alignSelf: 'center', flex: 2 }}>{name}</Text>
      <View style={{ flex: 4 }}>
        <SlideList data={dataList.battingContenders} value={wicketState.newBatsman} onSelect={(isClicked, selected) => dispatch({ type: 'newBatsman', payload: { selected, isClicked } })} />
      </View>
    </View>
  </View>

  if(calledBy === 'B' || calledBy === 'LB'){
    data = data.filter((item) => item.name!=='0');
  }
  return <View>
    <BottomSheet isVisible={isVisible}>
      <View style={styles.containerStyle}>
        <View style={{ alignItems: 'flex-start', height: 40, width: 60, padding: 10 }}>
          <TouchableOpacity onPress={() => {
            changeVisibility();
            dispatch({ type: 'submit' });
          }}>
            <Icon
              size={28}
              name='arrowleft'
              color={defaultColor}
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={{ padding: 10, alignSelf: 'center' }}>
            <Text style={{ color: defaultColor }}>{header}</Text>
          </View>

          <View style={{ marginBottom: 10 }}>
            <ButtonRow
              color={defaultColor}
              size={40}
              data={data}
              calledBy={calledBy}
            />
          </View>
          {type === 'C' ? renderCatcher('Catcher:') : null}
          {type === 'St' ? renderStumper('Wicket Keeper:') : null}
          {type === 'TO' ? renderTO('Out:') : null}
          {type === 'RO' ? renderRunout() : null}
          {type !== '0' ? renderNewBatsman('New batsman:') : null}
        </ScrollView>
        {(type !== '0') ? <Button name='submit'
          onPress={() => {
            console.log({
              type: calledBy,
              payload: {
                type,
                wicketState,
                run_Type: runType.find((item) => item.isClicked === true)
                  ? runType.find((item) => item.isClicked === true)
                  : '',
                runs: run.find((item) => item.isClicked === true)
                  ? run.find((item) => item.isClicked === true).name
                  : ''
              }

            });
            wicket(calledBy, {
              type,
              wicketState,
              run_Type: runType.find((item) => item.isClicked === true)
                ? runType.find((item) => item.isClicked === true)
                : '',
              runs: run.find((item) => item.isClicked === true)
                ? run.find((item) => item.isClicked === true).name
                : ''
            })
            dispatch({ type: 'submit' });
            changeVisibility();
          }
          }
          color={defaultColor}
        />
          :
          null
        }
      </View>

    </BottomSheet>
  </View>


}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'white', height: 300
  },
  checkBoxTitleStyle: {
    color: '#f0245a'
  },
  checkboxContainerStyle: {
    margin: 0
  }
});

export default CusBottomSheet;