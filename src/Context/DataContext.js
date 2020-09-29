import CreateContext from './CreateContext';
import AsyncStorage from '@react-native-community/async-storage';
const reducer = (state, action) => {
  switch (action.type) {
    case 'bat':
      {
        const payload = parseInt(action.payload);
        const strikeRotateFlag = payload % 2 === 1 ? true : false;
        const player1 = {
          ...state.player1,
          onStrike: strikeRotateFlag ? !state.player1.onStrike : state.player1.onStrike,
          runs: state.player1.onStrike ? state.player1.runs + payload : state.player1.runs,
          balls: state.player1.onStrike ? state.player1.balls + 1 : state.player1.balls

        };
        const player2 = {
          ...state.player2,
          onStrike: strikeRotateFlag ? !state.player2.onStrike : state.player2.onStrike,
          runs: state.player2.onStrike ? state.player2.runs + payload : state.player2.runs,
          balls: state.player2.onStrike ? state.player2.balls + 1 : state.player2.balls
        };
        const Bowler = {
          ...state.Bowler,
          overs: state.Bowler.overs + 1,
          runs: state.Bowler.runs + payload,
          ballsThisOver: state.Bowler.ballsThisOver + 1,
          dots: payload === 0 ? state.Bowler.dots + 1 : state.Bowler.dots
        };
        let modifiedBattingWickets = [];
        let striker = state.player1.onStrike ? state.player1 : state.player2;

        if (state.battingTeam === 'team1') {
          if (state.team1Batting.batsmen)
            modifiedBattingWickets = state.team1Batting.batsmen.filter((item) => item.name !== striker.name);

        } else {
          if (state.team2Batting.batsmen)
            modifiedBattingWickets = state.team2Batting.batsmen.filter((item) => item.name !== striker.name);
        }
        modifiedBattingWickets.push({
          ...striker, runs: striker.runs + payload,
          balls: striker.balls + 1
        });

        let modifiedBowlers = [];
        if (state.bowlingTeam === 'team1') {
          if (state.team1Bowling)
            modifiedBowlers = state.team1Bowling.filter((item) => item.name !== state.Bowler.name);
        } else {
          if (state.team2Bowling)
            modifiedBowlers = state.team2Bowling.filter((item) => item.name !== state.Bowler.name);
        }
        modifiedBowlers.push({
          ...Bowler
        });

        let inningsChange = false;
        if (state.battingTeam === 'team1') {
          if ((state.oversPerSide * 6) === (state.team1Batting.overs + 1)) {
            inningsChange = true;
          }
          if (state.noOfInnings === 1 && state.team1Batting.runs + payload > state.team2Batting.runs) {
            inningsChange = true;
          }
          //console.log(state.oversPerSide*6,state.team1Batting.overs+1);
        } else if (state.battingTeam === 'team2') {
          if ((state.oversPerSide * 6) === (state.team2Batting.overs + 1)) {
            inningsChange = true;
          }
          if (state.noOfInnings === 1 && state.team2Batting.runs + payload > state.team1Batting.runs) {
            inningsChange = true;
          }
          //console.log(state.oversPerSide*6,state.team2Batting.overs+1);
        }

        let ThisOver = [];
        if (inningsChange === true) {
          ThisOver = [];
        } else {
          ThisOver = state.ballsThisOver >= 6
            ? [...state.ThisOver]
            : [...state.ThisOver, { id: state.key + 1, value: action.payload }]
        }
        let ballsThisOver = 0;
        if (inningsChange === true) {
          ballsThisOver = 0;
        } else {
          ballsThisOver = (state.ballsThisOver + 1) >= 6
            ? Math.max(state.ballsThisOver + 1, 6)
            : state.ballsThisOver + 1
        }

        let modalVisible = false, gameFinished = false;
        if (inningsChange === true) {
          if (state.noOfInnings === 1) {
            inningsChange = false;
            gameFinished = true;
          }
          modalVisible = false;
        } else {
          if (state.ballsThisOver === 5)
            modalVisible = true;
        }
        //console.log('clicked',inningsChange,modalVisible);
        if (state.modalVisible === true || state.inningsChange === true || state.gameFinished === true)
          return state;
        else
          return {
            ...state,
            team1Batting: state.battingTeam === 'team1' ?
              {
                ...state.team1Batting, overs: state.team1Batting.overs + 1,
                batsmen: modifiedBattingWickets, runs: state.team1Batting.runs + payload,
                runHistory: [...state.team1Batting.runHistory, state.team1Batting.runs + payload]
              }
              : state.team1Batting,
            team2Batting: state.battingTeam === 'team2' ?
              {
                ...state.team2Batting, overs: state.team2Batting.overs + 1,
                batsmen: modifiedBattingWickets, runs: state.team2Batting.runs + payload,
                runHistory: [...state.team2Batting.runHistory, state.team2Batting.runs + payload]
              }
              : state.team2Batting,
            team1Bowling: state.bowlingTeam === 'team1' ?
              [...modifiedBowlers]
              : state.team1Bowling,
            team2Bowling: state.bowlingTeam === 'team2' ?
              [...modifiedBowlers]
              : state.team2Bowling,
            player1,
            player2,
            Bowler,
            ThisOver,
            ballsThisOver,
            modalVisible,
            inningsChange,
            key: state.key + 1,
            gameFinished
          }
      }
    case 'wide': {
      const payload = parseInt(action.payload.value);
      const st = payload ? `${payload}${action.payload.type}` : `${action.payload.type}`; //
      const strikeChange = payload % 2 === 1 ? true : false;
      const player1 = {
        ...state.player1,
        onStrike: strikeChange ? !state.player1.onStrike : state.player1.onStrike
      };
      const player2 = {
        ...state.player2,
        onStrike: strikeChange ? !state.player2.onStrike : state.player2.onStrike
      };
      const Bowler = {
        ...state.Bowler,
        runs: state.Bowler.runs + 1 + payload,
        ballsThisOver: state.Bowler.ballsThisOver + 1
      };
      let modifiedBowlers = [];
      if (state.bowlingTeam === 'team1') {
        if (state.team1Bowling)
          modifiedBowlers = state.team1Bowling.filter((item) => item.name !== state.Bowler.name);
      } else {
        if (state.team2Bowling)
          modifiedBowlers = state.team2Bowling.filter((item) => item.name !== state.Bowler.name);
      }
      modifiedBowlers.push({
        ...Bowler
      });
      let inningsChange = false;
      if (state.battingTeam === 'team1') {
        if (state.noOfInnings === 1 && state.team1Batting.runs + payload + 1 > state.team2Batting.runs) {
          inningsChange = true;
        }
      } else {
        if (state.noOfInnings === 1 && state.team2Batting.runs + payload + 1 > state.team1Batting.runs) {
          inningsChange = true;
        }
      }
      if (state.modalVisible === true)
        return state;
      else
        return {
          ...state,
          team1Batting: state.battingTeam === 'team1' ?
            {
              ...state.team1Batting,
              runs: state.team1Batting.runs + payload + 1,
              extras: state.team1Batting.extras + payload + 1
            }
            : state.team1Batting,
          team2Batting: state.battingTeam === 'team2' ?
            {
              ...state.team2Batting,
              runs: state.team2Batting.runs + payload + 1,
              extras: state.team2Batting.extras + payload + 1
            }
            : state.team2Batting,
          team1Bowling: state.bowlingTeam === 'team1' ?
            [...modifiedBowlers]
            : state.team1Bowling,
          team2Bowling: state.bowlingTeam === 'team2' ?
            [...modifiedBowlers]
            : state.team2Bowling,
          player1,
          player2,
          Bowler,
          ThisOver: [...state.ThisOver, { id: state.key + 1, value: st }],
          key: state.key + 1,
          inningsChange
        }
    }
    case 'N': {
      const payload = parseInt(action.payload.runs);
      const st = payload ? `${payload}N` : 'N'; //
      const strikeChange = payload % 2 === 1 ? true : false;
      const player1 = {
        ...state.player1,
        onStrike: strikeChange ? !state.player1.onStrike : state.player1.onStrike,
        runs: state.player1.onStrike && action.payload.run_Type.name === 'bat'
          ? state.player1.runs + 1
          : state.player1.runs,
        balls: state.player1.onStrike ? state.player1.balls + 1 : state.player1.balls

      };
      const player2 = {
        ...state.player2,
        onStrike: strikeChange ? !state.player2.onStrike : state.player2.onStrike,
        runs: state.player2.onStrike && action.payload.run_Type.name === 'bat'
          ? state.player2.runs + 1
          : state.player2.runs,
        balls: state.player2.onStrike ? state.player2.balls + 1 : state.player2.balls
      };
      const Bowler = {
        ...state.Bowler,
        runs: state.Bowler.runs + 1 + payload,
        ballsThisOver: state.Bowler.ballsThisOver + 1
      };
      let modifiedBowlers = [];
      if (state.bowlingTeam === 'team1') {
        if (state.team1Bowling)
          modifiedBowlers = state.team1Bowling.filter((item) => item.name !== state.Bowler.name);
      } else {
        if (state.team2Bowling)
          modifiedBowlers = state.team2Bowling.filter((item) => item.name !== state.Bowler.name);
      }
      modifiedBowlers.push({
        ...Bowler
      });
      let inningsChange = false;
      if (state.battingTeam === 'team1') {
        if (state.noOfInnings === 1 && state.team1Batting.runs + payload + 1 > state.team2Batting.runs) {
          inningsChange = true;
        }
      } else {
        if (state.noOfInnings === 1 && state.team2Batting.runs + payload + 1 > state.team1Batting.runs) {
          inningsChange = true;
        }
      }
      if (state.modalVisible === true)
        return state;
      else
        return {
          ...state,
          team1Batting: state.battingTeam === 'team1' ?
            {
              ...state.team1Batting,
              runs: state.team1Batting.runs + payload + 1,
              extras: state.team1Batting.extras + payload + 1
            }
            : state.team1Batting,
          team2Batting: state.battingTeam === 'team2' ?
            {
              ...state.team2Batting,
              runs: state.team2Batting.runs + payload + 1,
              extras: state.team2Batting.extras + payload + 1
            }
            : state.team2Batting,
          team1Bowling: state.bowlingTeam === 'team1' ?
            [...modifiedBowlers]
            : state.team1Bowling,
          team2Bowling: state.bowlingTeam === 'team2' ?
            [...modifiedBowlers]
            : state.team2Bowling,
          player1,
          player2,
          Bowler,
          ThisOver: [...state.ThisOver, { id: state.key + 1, value: st }],
          key: state.key + 1,
          inningsChange
        }

    }
    case 'byes': {
      const payload = parseInt(action.payload.value);
      const strikeRotateFlag = payload % 2 === 1 ? true : false;
      const st = payload ? `${payload}${action.payload.type}` : `${action.payload.type}`;
      const player1 = {
        ...state.player1,
        onStrike: strikeRotateFlag ? !state.player1.onStrike : state.player1.onStrike,
        balls: state.player1.onStrike ? state.player1.balls + 1 : state.player1.balls
      };
      const player2 = {
        ...state.player2,
        onStrike: strikeRotateFlag ? !state.player2.onStrike : state.player2.onStrike,
        balls: state.player2.onStrike ? state.player2.balls + 1 : state.player2.balls
      };
      const Bowler = {
        ...state.Bowler,
        overs: state.Bowler.overs + 1,
        runs: state.Bowler.runs + payload,
        ballsThisOver: state.Bowler.ballsThisOver + 1,
        dots: payload === 0 ? state.Bowler.dots + 1 : state.Bowler.dots
      };
      let modifiedBattingWickets = [];
      let striker = state.player1.onStrike ? state.player1 : state.player2;

      if (state.battingTeam === 'team1') {
        if (state.team1Batting.batsmen)
          modifiedBattingWickets = state.team1Batting.batsmen.filter((item) => item.name !== striker.name);

      } else {
        if (state.team2Batting.batsmen)
          modifiedBattingWickets = state.team2Batting.batsmen.filter((item) => item.name !== striker.name);
      }
      modifiedBattingWickets.push({
        ...striker,
        balls: striker.balls + 1
      });

      let modifiedBowlers = [];
      if (state.bowlingTeam === 'team1') {
        if (state.team1Bowling)
          modifiedBowlers = state.team1Bowling.filter((item) => item.name !== state.Bowler.name);
      } else {
        if (state.team2Bowling)
          modifiedBowlers = state.team2Bowling.filter((item) => item.name !== state.Bowler.name);
      }
      modifiedBowlers.push({
        ...Bowler
      });

      let inningsChange = false;
      if (state.battingTeam === 'team1') {
        if ((state.oversPerSide * 6) === (state.team1Batting.overs + 1)) {
          inningsChange = true;
        }
        if (state.noOfInnings === 1 && state.team1Batting.runs + payload > state.team2Batting.runs) {
          inningsChange = true;
        }
        //console.log(state.oversPerSide*6,state.team1Batting.overs+1);
      } else if (state.battingTeam === 'team2') {
        if ((state.oversPerSide * 6) === (state.team2Batting.overs + 1)) {
          inningsChange = true;
        }
        if (state.noOfInnings === 1 && state.team2Batting.runs + payload > state.team1Batting.runs) {
          inningsChange = true;
        }
        //console.log(state.oversPerSide*6,state.team2Batting.overs+1);
      }

      let ThisOver = [];
      if (inningsChange === true) {
        ThisOver = [];
      } else {
        ThisOver = state.ballsThisOver >= 6
          ? [...state.ThisOver]
          : [...state.ThisOver, { id: state.key + 1, value: st }]
      }
      let ballsThisOver = 0;
      if (inningsChange === true) {
        ballsThisOver = 0;
      } else {
        ballsThisOver = state.ballsThisOver + 1
      }
      let modalVisible = false, gameFinished = false;
      if (inningsChange === true) {
        if (state.noOfInnings === 1) {
          inningsChange = false;
          gameFinished = true;
        }
        modalVisible = false;
      } else {
        if (state.ballsThisOver === 5)
          modalVisible = true
      }
      if (state.modalVisible === true)
        return state;
      else
        return {
          ...state,
          team1Batting: state.battingTeam === 'team1' ?
            {
              ...state.team1Batting, overs: state.team1Batting.overs + 1,
              batsmen: modifiedBattingWickets, runs: state.team1Batting.runs + payload,
              extras: state.team1Batting.extras + 1,
              runHistory: [...state.team1Batting.runHistory, state.team1Batting.runs + payload]
            }
            : state.team1Batting,
          team2Batting: state.battingTeam === 'team2' ?
            {
              ...state.team2Batting, overs: state.team2Batting.overs + 1,
              batsmen: modifiedBattingWickets, runs: state.team2Batting.runs + payload,
              extras: state.team2Batting.extras + 1,
              runHistory: [...state.team2Batting.runHistory, state.team2Batting.runs + payload]
            }
            : state.team2Batting,
          team1Bowling: state.bowlingTeam === 'team1' ?
            [...modifiedBowlers]
            : state.team1Bowling,
          team2Bowling: state.bowlingTeam === 'team2' ?
            [...modifiedBowlers]
            : state.team2Bowling,
          player1,
          player2,
          Bowler,
          ThisOver,
          ballsThisOver,
          modalVisible,
          inningsChange,
          gameFinished,
          key: state.key + 1
        }
    }
    case 'over': {
      let nextBowler;
      let modifiedBowlers = [];
      const player1 = {
        ...state.player1,
        onStrike: state.player1.onStrike ? false : true
      }
      const player2 = {
        ...state.player2,
        onStrike: state.player2.onStrike ? false : true
      }

      if (state.bowlingTeam === 'team1') {
        nextBowler = state.team1Bowling.find((item) => item.name === action.payload);
        modifiedBowlers = state.team1Bowling.filter((item) => item.name !== action.payload);
      } else if (state.bowlingTeam === 'team2') {
        nextBowler = state.team2Bowling.find((item) => item.name === action.payload);
        modifiedBowlers = state.team2Bowling.filter((item) => item.name !== action.payload);
      }
      let bowlingPosition = nextBowler.bowlingPosition;
      if (bowlingPosition === -1) {
        bowlingPosition = state.bowlingPosition + 1;
      }
      modifiedBowlers.push({ ...nextBowler, bowlingPosition });
      return {
        ...state,
        player1,
        player2,
        Bowler: { ...nextBowler, bowlingPosition },
        ThisOver: [],
        bowlingPosition: nextBowler.bowlingPosition === -1 ? state.bowlingPosition + 1 : state.bowlingPosition,
        team1Bowling: state.bowlingTeam === 'team1' ? modifiedBowlers : state.team1Bowling,
        team2Bowling: state.bowlingTeam === 'team2' ? modifiedBowlers : state.team2Bowling,
        ballsThisOver: 0,
        modalVisible: false
      }
    }
    case 'Wkt': {
      let player1, player2, Bowler, newBatsman, onStrikeBatsman;
      let modifiedBattingWickets = [];
      let modifiedBowling = [];
      const payload = action.payload;
      switch (payload.type) {
        case 'HO':
          {
            player1 = state.player1.onStrike ? {
              ...state.player1,
              out: true,
              type: 'Hit_out',
              bowler: state.Bowler.name,
              balls: state.player1.balls + 1
            } : { ...state.player1 }
            player2 = state.player2.onStrike ? {
              ...state.player2,
              out: true,
              type: 'Hit_out',
              bowler: state.Bowler.name,
              balls: state.player2.balls + 1
            } : { ...state.player2 }
            Bowler = {
              ...state.Bowler,
              wickets: state.Bowler.wickets + 1,
              overs: state.Bowler.overs + 1,
              dots: state.Bowler.dots + 1
            }
            onStrikeBatsman = state.player1.onStrike ? player1 : player2;
            newBatsman = {
              name: payload.wicketState.newBatsman.selected,
              runs: 0, balls: 0, fours: 0, sixes: 0, out: false,
              strikeRate: 0, onStrike: true, battingPosition: state.battingPosition + 1
            }

            if (state.bowlingTeam === 'team1') {
              modifiedBowling = state.team1Bowling.filter(
                (item) => { return item.name !== state.Bowler.name }
              )
            } else {
              modifiedBowling = state.team2Bowling.filter(
                (item) => { return item.name !== state.Bowler.name }
              )
            }
            modifiedBowling.push({ ...Bowler });
            if (state.battingTeam === 'team1') {
              modifiedBattingWickets = state.team1Batting.batsmen.filter(
                (item) => item.name !== onStrikeBatsman.name
                  && item.name !== newBatsman.name
              )
            } else {
              modifiedBattingWickets = state.team2Batting.batsmen.filter(
                (item) => item.name !== onStrikeBatsman.name
                  && item.name !== newBatsman.name
              )
            }
            modifiedBattingWickets.push({ ...onStrikeBatsman });
            if (payload.wicketState.newBatsman.selected !== '')
              modifiedBattingWickets.push({ ...newBatsman });
            let inningsChange = false;
            if (state.battingTeam === 'team1') {
              if ((state.oversPerSide * 6) === (state.team1Batting.overs + 1)) {
                inningsChange = true;
              }
              //console.log(state.oversPerSide*6,state.team1Batting.overs+1);
            } else if (state.battingTeam === 'team2') {
              if ((state.oversPerSide * 6) === (state.team2Batting.overs + 1)) {
                inningsChange = true;
              }
              //console.log(state.oversPerSide*6,state.team2Batting.overs+1);
            }

            let ThisOver = [];
            if (inningsChange === true) {
              ThisOver = [];
            } else {
              ThisOver = state.ballsThisOver >= 6
                ? [...state.ThisOver]
                : [...state.ThisOver, { id: state.key + 1, value: 'W' }]
            }
            let ballsThisOver = 0;
            if (inningsChange === true) {
              ballsThisOver = 0;
            } else {
              ballsThisOver = (state.ballsThisOver + 1) >= 6
                ? 6
                : state.ballsThisOver + 1
            }
            let modalVisible = false;
            if (inningsChange === true) {
              modalVisible = false;
            } else {
              if (state.ballsThisOver === 5)
                modalVisible = true;
            }
            let changeBowler = false;
            if (inningsChange !== true) {
              if (state.battingTeam === 'team1') {
                if ((state.team1Batting.wickets + 1) === (state.playersPerSide - 1)) {
                  inningsChange = true;
                  modalVisible = false;
                  changeBowler = false;
                }
              } else {
                if ((state.team2Batting.wickets + 1) === (state.playersPerSide - 1)) {
                  inningsChange = true;
                  modalVisible = false;
                  changeBowler = false;
                }
              }
            }
            let gameFinished = false;
            if (inningsChange === true && state.noOfInnings === 1) {
              gameFinished = true;
              inningsChange = false;
              modalVisible = false;
              changeBowler = false;
            }
            if (state.modalVisible === true)
              return state;
            else
              return {
                ...state,
                player1: state.player1.onStrike ? { ...newBatsman } : { ...state.player1, onStrike: false },
                player2: state.player2.onStrike ? { ...newBatsman } : { ...state.player2, onStrike: false },
                team1Batting: state.battingTeam === 'team1' ?
                  {
                    ...state.team1Batting,
                    overs: state.team1Batting.overs + 1,
                    wickets: state.team1Batting.wickets + 1,
                    batsmen: modifiedBattingWickets,
                    runHistory: [...state.team1Batting.runHistory, state.team1Batting.runs]
                  }
                  : state.team1Batting,
                team2Batting: state.battingTeam === 'team2' ?
                  {
                    ...state.team2Batting,
                    overs: state.team2Batting.overs + 1,
                    wickets: state.team2Batting.wickets + 1,
                    batsmen: modifiedBattingWickets,
                    runHistory: [...state.team2Batting.runHistory, state.team2Batting.runs]
                  }
                  : state.team2Batting,
                Bowler,
                team1Bowling: state.bowlingTeam === 'team1' ?
                  modifiedBowling
                  : state.team1Bowling,
                team2Bowling: state.bowlingTeam === 'team2' ?
                  modifiedBowling
                  : state.team2Bowling,
                key: state.key + 1,
                ballsThisOver,
                ThisOver,
                key: state.key + 1,
                modalVisible,
                inningsChange,
                changeBowler,
                gameFinished,
                battingPosition: state.battingPosition + 1
              }
          }
        case 'B':
          {
            player1 = state.player1.onStrike ? {
              ...state.player1,
              out: true,
              type: 'Bowled',
              bowler: state.Bowler.name,
              balls: state.player1.balls + 1
            } : { ...state.player1 }
            player2 = state.player2.onStrike ? {
              ...state.player2,
              out: true,
              type: 'Bowled',
              bowler: state.Bowler.name,
              balls: state.player2.balls + 1
            } : { ...state.player2 }
            Bowler = {
              ...state.Bowler,
              wickets: state.Bowler.wickets + 1,
              overs: state.Bowler.overs + 1,
              dots: state.Bowler.dots + 1
            }
            onStrikeBatsman = state.player1.onStrike ? player1 : player2;
            newBatsman = {
              name: payload.wicketState.newBatsman.selected,
              balls: 0,
              runs: 0,
              fours: 0,
              sixes: 0,
              strikeRate: 0,
              onStrike: true,
              out: false,
              battingPosition: state.battingPosition + 1
            }

            if (state.bowlingTeam === 'team1') {
              modifiedBowling = state.team1Bowling.filter(
                (item) => { return item.name !== state.Bowler.name }
              )
            } else {
              modifiedBowling = state.team2Bowling.filter(
                (item) => { return item.name !== state.Bowler.name }
              )
            }
            modifiedBowling.push({ ...Bowler });
            if (state.battingTeam === 'team1') {
              modifiedBattingWickets = state.team1Batting.batsmen.filter(
                (item) => {
                  return item.name !== onStrikeBatsman.name
                    && item.name !== newBatsman.name
                }
              )
            } else {
              modifiedBattingWickets = state.team2Batting.batsmen.filter(
                (item) => {
                  return item.name !== onStrikeBatsman.name
                    && item.name !== newBatsman.name
                }
              )
            }
            modifiedBattingWickets.push({ ...onStrikeBatsman });
            if (payload.wicketState.newBatsman.selected !== '')
              modifiedBattingWickets.push({ ...newBatsman });
            let inningsChange = false;
            if (state.battingTeam === 'team1') {
              if ((state.oversPerSide * 6) === (state.team1Batting.overs + 1)) {
                inningsChange = true;
              }
              //console.log(state.oversPerSide*6,state.team1Batting.overs+1);
            } else if (state.battingTeam === 'team2') {
              if ((state.oversPerSide * 6) === (state.team2Batting.overs + 1)) {
                inningsChange = true;
              }
              //console.log(state.oversPerSide*6,state.team2Batting.overs+1);
            }

            let ThisOver = [];
            if (inningsChange === true) {
              ThisOver = [];
            } else {
              ThisOver = state.ballsThisOver >= 6
                ? [...state.ThisOver]
                : [...state.ThisOver, { id: state.key + 1, value: 'W' }]
            }
            let ballsThisOver = 0;
            if (inningsChange === true) {
              ballsThisOver = 0;
            } else {
              ballsThisOver = (state.ballsThisOver + 1) >= 6
                ? 6
                : state.ballsThisOver + 1
            }
            let modalVisible = false;
            if (inningsChange === true) {
              modalVisible = false;
            } else {
              if (state.ballsThisOver === 5)
                modalVisible = true;
            }

            let changeBowler = false;
            if (inningsChange !== true) {
              if (state.battingTeam === 'team1') {
                if ((state.team1Batting.wickets + 1) === (state.playersPerSide - 1)) {
                  inningsChange = true;
                  modalVisible = false;
                  changeBowler = false;
                }
              } else {
                if ((state.team2Batting.wickets + 1) === (state.playersPerSide - 1)) {
                  inningsChange = true;
                  modalVisible = false;
                  changeBowler = false;
                }
              }
            }
            let gameFinished = false;
            if (inningsChange === true && state.noOfInnings === 1) {
              gameFinished = true;
              inningsChange = false;
              modalVisible = false;
              changeBowler = false;
            }
            if (state.modalVisible === true)
              return state;
            else
              return {
                ...state,
                player1: state.player1.onStrike ? { ...newBatsman } : { ...state.player1, onStrike: false },
                player2: state.player2.onStrike ? { ...newBatsman } : { ...state.player2, onStrike: false },
                team1Batting: state.battingTeam === 'team1' ?
                  {
                    ...state.team1Batting,
                    overs: state.team1Batting.overs + 1,
                    wickets: state.team1Batting.wickets + 1,
                    batsmen: modifiedBattingWickets,
                    runHistory: [...state.team1Batting.runHistory, state.team1Batting.runs]
                  }
                  : state.team1Batting,
                team2Batting: state.battingTeam === 'team2' ?
                  {
                    ...state.team2Batting,
                    overs: state.team2Batting.overs + 1,
                    wickets: state.team2Batting.wickets + 1,
                    batsmen: modifiedBattingWickets,
                    runHistory: [...state.team2Batting.runHistory, state.team2Batting.runs]
                  }
                  : state.team2Batting,
                Bowler,
                team1Bowling: state.bowlingTeam === 'team1' ?
                  modifiedBowling
                  : state.team1Bowling,
                team2Bowling: state.bowlingTeam === 'team2' ?
                  modifiedBowling
                  : state.team2Bowling,
                key: state.key + 1,
                ballsThisOver,
                ThisOver,
                key: state.key + 1,
                modalVisible,
                changeBowler,
                inningsChange,
                gameFinished,
                battingPosition: state.battingPosition + 1
              }
          }
        case 'LBW':
          {
            player1 = state.player1.onStrike ? {
              ...state.player1,
              out: true,
              type: 'LBW',
              bowler: state.Bowler.name,
              balls: state.player1.balls + 1
            } : { ...state.player1 }
            player2 = state.player2.onStrike ? {
              ...state.player2,
              out: true,
              type: 'LBW',
              bowler: state.Bowler.name,
              balls: state.player2.balls + 1
            } : { ...state.player2 }
            Bowler = {
              ...state.Bowler,
              wickets: state.Bowler.wickets + 1,
              overs: state.Bowler.overs + 1,
              dots: state.Bowler.dots + 1
            }
            onStrikeBatsman = state.player1.onStrike ? player1 : player2;
            newBatsman = {
              name: payload.wicketState.newBatsman.selected,
              balls: 0,
              runs: 0,
              fours: 0,
              sixes: 0,
              strikeRate: 0,
              onStrike: true,
              out: false,
              battingPosition: state.battingPosition + 1
            }

            if (state.bowlingTeam === 'team1') {
              modifiedBowling = state.team1Bowling.filter(
                (item) => { return item.name !== state.Bowler.name }
              )
            } else {
              modifiedBowling = state.team2Bowling.filter(
                (item) => { return item.name !== state.Bowler.name }
              )
            }
            modifiedBowling.push({ ...Bowler });
            if (state.battingTeam === 'team1') {
              modifiedBattingWickets = state.team1Batting.batsmen.filter(
                (item) => {
                  return item.name !== onStrikeBatsman.name
                    && item.name !== newBatsman.name
                }
              )
            } else {
              modifiedBattingWickets = state.team2Batting.batsmen.filter(
                (item) => {
                  return item.name !== onStrikeBatsman.name
                    && item.name !== newBatsman.name
                }
              )
            }
            modifiedBattingWickets.push({ ...onStrikeBatsman });
            if (payload.wicketState.newBatsman.selected !== '')
              modifiedBattingWickets.push({ ...newBatsman });
            let inningsChange = false;
            if (state.battingTeam === 'team1') {
              if ((state.oversPerSide * 6) === (state.team1Batting.overs + 1)) {
                inningsChange = true;
              }
              //console.log(state.oversPerSide*6,state.team1Batting.overs+1);
            } else if (state.battingTeam === 'team2') {
              if ((state.oversPerSide * 6) === (state.team2Batting.overs + 1)) {
                inningsChange = true;
              }
              //console.log(state.oversPerSide*6,state.team2Batting.overs+1);
            }

            let ThisOver = [];
            if (inningsChange === true) {
              ThisOver = [];
            } else {
              ThisOver = state.ballsThisOver >= 6
                ? [...state.ThisOver]
                : [...state.ThisOver, { id: state.key + 1, value: 'W' }]
            }
            let ballsThisOver = 0;
            if (inningsChange === true) {
              ballsThisOver = 0;
            } else {
              ballsThisOver = (state.ballsThisOver + 1) >= 6
                ? 6
                : state.ballsThisOver + 1
            }
            let modalVisible = false;
            if (inningsChange === true) {
              modalVisible = false;
            } else {
              if (state.ballsThisOver === 5)
                modalVisible = true;
            }

            let changeBowler = false;
            if (inningsChange !== true) {
              if (state.battingTeam === 'team1') {
                if ((state.team1Batting.wickets + 1) === (state.playersPerSide - 1)) {
                  inningsChange = true;
                  modalVisible = false;
                  changeBowler = false;
                }
              } else {
                if ((state.team2Batting.wickets + 1) === (state.playersPerSide - 1)) {
                  inningsChange = true;
                  modalVisible = false;
                  changeBowler = false;
                }
              }
            }
            let gameFinished = false;
            if (inningsChange === true && state.noOfInnings === 1) {
              gameFinished = true;
              inningsChange = false;
              modalVisible = false;
              changeBowler = false;
            }
            if (state.modalVisible === true)
              return state;
            else
              return {
                ...state,
                player1: state.player1.onStrike ? { ...newBatsman } : { ...state.player1, onStrike: false },
                player2: state.player2.onStrike ? { ...newBatsman } : { ...state.player2, onStrike: false },
                team1Batting: state.battingTeam === 'team1' ?
                  {
                    ...state.team1Batting,
                    overs: state.team1Batting.overs + 1,
                    wickets: state.team1Batting.wickets + 1,
                    batsmen: modifiedBattingWickets,
                    runHistory: [...state.team1Batting.runHistory, state.team1Batting.runs]
                  }
                  : state.team1Batting,
                team2Batting: state.battingTeam === 'team2' ?
                  {
                    ...state.team2Batting,
                    overs: state.team2Batting.overs + 1,
                    wickets: state.team2Batting.wickets + 1,
                    batsmen: modifiedBattingWickets,
                    runHistory: [...state.team2Batting.runHistory, state.team2Batting.runs]
                  }
                  : state.team2Batting,
                Bowler,
                team1Bowling: state.bowlingTeam === 'team1' ?
                  modifiedBowling
                  : state.team1Bowling,
                team2Bowling: state.bowlingTeam === 'team2' ?
                  modifiedBowling
                  : state.team2Bowling,
                key: state.key + 1,
                ballsThisOver,
                ThisOver,
                key: state.key + 1,
                modalVisible,
                inningsChange,
                changeBowler,
                gameFinished,
                battingPosition: state.battingPosition + 1
              }
          }
        case 'C':
          {
            player1 = state.player1.onStrike ? {
              ...state.player1,
              out: true,
              type: 'caught',
              bowler: state.Bowler.name,
              balls: state.player1.balls + 1,
              catcher: payload.wicketState.catcher.selected
            } : { ...state.player1 }
            player2 = state.player2.onStrike ? {
              ...state.player2,
              out: true,
              type: 'caught',
              bowler: state.Bowler.name,
              balls: state.player1.balls + 1,
              catcher: payload.wicketState.catcher.selected
            } : { ...state.player2 }
            Bowler = {
              ...state.Bowler,
              wickets: state.Bowler.wickets + 1,
              overs: state.Bowler.overs + 1,
              dots: state.Bowler.dots + 1
            }
            onStrikeBatsman = state.player1.onStrike ? player1 : player2;
            newBatsman = {
              name: payload.wicketState.newBatsman.selected,
              balls: 0,
              runs: 0,
              fours: 0,
              sixes: 0,
              strikeRate: 0,
              onStrike: payload.wicketState.hasStrikeChanged ? false : true,
              battingPosition: state.battingPosition + 1,
              out: false
            }

            if (state.bowlingTeam === 'team1') {
              modifiedBowling = state.team1Bowling.filter(
                (item) => { return item.name !== state.Bowler.name }
              )
            } else {
              modifiedBowling = state.team2Bowling.filter(
                (item) => { return item.name !== state.Bowler.name }
              )
            }
            modifiedBowling.push({ ...Bowler });
            if (state.battingTeam === 'team1') {
              modifiedBattingWickets = state.team1Batting.batsmen.filter(
                (item) => {
                  return item.name !== onStrikeBatsman.name
                    && item.name !== newBatsman.name
                }
              )
            } else {
              modifiedBattingWickets = state.team2Batting.batsmen.filter(
                (item) => {
                  return item.name !== onStrikeBatsman.name
                    && item.name !== newBatsman.name
                }
              )
            }
            modifiedBattingWickets.push({ ...onStrikeBatsman });
            if (payload.wicketState.newBatsman.selected !== '')
              modifiedBattingWickets.push({ ...newBatsman });
            let inningsChange = false;
            if (state.battingTeam === 'team1') {
              if ((state.oversPerSide * 6) === (state.team1Batting.overs + 1)) {
                inningsChange = true;
              }
              //console.log(state.oversPerSide*6,state.team1Batting.overs+1);
            } else if (state.battingTeam === 'team2') {
              if ((state.oversPerSide * 6) === (state.team2Batting.overs + 1)) {
                inningsChange = true;
              }
              //console.log(state.oversPerSide*6,state.team2Batting.overs+1);
            }

            let ThisOver = [];
            if (inningsChange === true) {
              ThisOver = [];
            } else {
              ThisOver = state.ballsThisOver >= 6
                ? [...state.ThisOver]
                : [...state.ThisOver, { id: state.key + 1, value: 'W' }]
            }
            let ballsThisOver = 0;
            if (inningsChange === true) {
              ballsThisOver = 0;
            } else {
              ballsThisOver = (state.ballsThisOver + 1) >= 6
                ? 6
                : state.ballsThisOver + 1
            }
            let modalVisible = false;
            if (inningsChange === true) {
              modalVisible = false;
            } else {
              if (state.ballsThisOver === 5)
                modalVisible = true;
            }

            let changeBowler = false;
            if (inningsChange !== true) {
              if (state.battingTeam === 'team1') {
                if ((state.team1Batting.wickets + 1) === (state.playersPerSide - 1)) {
                  inningsChange = true;
                  modalVisible = false;
                  changeBowler = false;
                }
              } else {
                if ((state.team2Batting.wickets + 1) === (state.playersPerSide - 1)) {
                  inningsChange = true;
                  modalVisible = false;
                  changeBowler = false;
                }
              }
            }
            let gameFinished = false;
            if (inningsChange === true && state.noOfInnings === 1) {
              gameFinished = true;
              inningsChange = false;
              modalVisible = false;
              changeBowler = false;
            }
            if (state.modalVisible === true)
              return state;
            else
              return {
                ...state,
                player1: state.player1.onStrike
                  ? { ...newBatsman }
                  : { ...state.player1, onStrike: payload.wicketState.hasStrikeChanged ? true : false },
                player2: state.player2.onStrike
                  ? { ...newBatsman }
                  : { ...state.player2, onStrike: payload.wicketState.hasStrikeChanged ? true : false },
                team1Batting: state.battingTeam === 'team1' ?
                  {
                    ...state.team1Batting,
                    overs: state.team1Batting.overs + 1,
                    wickets: state.team1Batting.wickets + 1,
                    batsmen: modifiedBattingWickets,
                    runHistory: [...state.team1Batting.runHistory, state.team1Batting.runs]
                  }
                  : state.team1Batting,
                team2Batting: state.battingTeam === 'team2' ?
                  {
                    ...state.team2Batting,
                    overs: state.team2Batting.overs + 1,
                    wickets: state.team2Batting.wickets + 1,
                    batsmen: modifiedBattingWickets,
                    runHistory: [...state.team2Batting.runHistory, state.team2Batting.runs]
                  }
                  : state.team2Batting,
                Bowler,
                team1Bowling: state.bowlingTeam === 'team1' ?
                  modifiedBowling
                  : state.team1Bowling,
                team2Bowling: state.bowlingTeam === 'team2' ?
                  modifiedBowling
                  : state.team2Bowling,
                key: state.key + 1,
                ballsThisOver,
                ThisOver,
                key: state.key + 1,
                modalVisible,
                inningsChange,
                changeBowler,
                gameFinished,
                battingPosition: state.battingPosition + 1
              }
          }
        case 'St':
          {
            player1 = state.player1.onStrike ? {
              ...state.player1,
              out: true,
              type: 'stumped',
              bowler: state.Bowler.name,
              balls: state.player1.balls + 1,
              stumper: payload.wicketState.stumper.selected
            } : { ...state.player1 }
            player2 = state.player2.onStrike ? {
              ...state.player2,
              out: true,
              type: 'stumped',
              bowler: state.Bowler.name,
              balls: state.player1.balls + 1,
              stumper: payload.wicketState.stumper.selected
            } : { ...state.player2 }
            Bowler = {
              ...state.Bowler,
              wickets: state.Bowler.wickets + 1,
              overs: state.Bowler.overs + 1,
              dots: state.Bowler.dots + 1
            }
            onStrikeBatsman = state.player1.onStrike ? player1 : player2;
            newBatsman = {
              name: payload.wicketState.newBatsman.selected,
              balls: 0,
              runs: 0,
              fours: 0,
              sixes: 0,
              strikeRate: 0,
              onStrike: true,
              out: false,
              battingPosition: state.battingPosition + 1
            }

            if (state.bowlingTeam === 'team1') {
              modifiedBowling = state.team1Bowling.filter(
                (item) => { return item.name !== state.Bowler.name }
              )
            } else {
              modifiedBowling = state.team2Bowling.filter(
                (item) => { return item.name !== state.Bowler.name }
              )
            }
            modifiedBowling.push({ ...Bowler });
            if (state.battingTeam === 'team1') {
              modifiedBattingWickets = state.team1Batting.batsmen.filter(
                (item) => {
                  return item.name !== onStrikeBatsman.name
                    && item.name !== newBatsman.name
                }
              )
            } else {
              modifiedBattingWickets = state.team2Batting.batsmen.filter(
                (item) => {
                  return item.name !== onStrikeBatsman.name
                    && item.name !== newBatsman.name
                }
              )
            }
            modifiedBattingWickets.push({ ...onStrikeBatsman });
            if (payload.wicketState.newBatsman.selected !== '')
              modifiedBattingWickets.push({ ...newBatsman });
            let inningsChange = false;
            if (state.battingTeam === 'team1') {
              if ((state.oversPerSide * 6) === (state.team1Batting.overs + 1)) {
                inningsChange = true;
              }
              //console.log(state.oversPerSide*6,state.team1Batting.overs+1);
            } else if (state.battingTeam === 'team2') {
              if ((state.oversPerSide * 6) === (state.team2Batting.overs + 1)) {
                inningsChange = true;
              }
              //console.log(state.oversPerSide*6,state.team2Batting.overs+1);
            }

            let ThisOver = [];
            if (inningsChange === true) {
              ThisOver = [];
            } else {
              ThisOver = state.ballsThisOver >= 6
                ? [...state.ThisOver]
                : [...state.ThisOver, { id: state.key + 1, value: 'W' }]
            }
            let ballsThisOver = 0;
            if (inningsChange === true) {
              ballsThisOver = 0;
            } else {
              ballsThisOver = (state.ballsThisOver + 1) >= 6
                ? 6
                : state.ballsThisOver + 1
            }
            let modalVisible = false;
            if (inningsChange === true) {
              modalVisible = false;
            } else {
              if (state.ballsThisOver === 5)
                modalVisible = true;
            }

            let changeBowler = false;
            if (inningsChange !== true) {
              if (state.battingTeam === 'team1') {
                if ((state.team1Batting.wickets + 1) === (state.playersPerSide - 1)) {
                  inningsChange = true;
                  modalVisible = false;
                  changeBowler = false;
                }
              } else {
                if ((state.team2Batting.wickets + 1) === (state.playersPerSide - 1)) {
                  inningsChange = true;
                  modalVisible = false;
                  changeBowler = false;
                }
              }
            }
            let gameFinished = false;
            if (inningsChange === true && state.noOfInnings === 1) {
              gameFinished = true;
              inningsChange = false;
              modalVisible = false;
              changeBowler = false;
            }
            if (state.modalVisible === true)
              return state;
            else
              return {
                ...state,
                player1: state.player1.onStrike ? { ...newBatsman } : { ...state.player1, onStrike: false },
                player2: state.player2.onStrike ? { ...newBatsman } : { ...state.player2, onStrike: false },
                team1Batting: state.battingTeam === 'team1' ?
                  {
                    ...state.team1Batting,
                    overs: state.team1Batting.overs + 1,
                    wickets: state.team1Batting.wickets + 1,
                    batsmen: modifiedBattingWickets,
                    runHistory: [...state.team1Batting.runHistory, state.team1Batting.runs]
                  }
                  : state.team1Batting,
                team2Batting: state.battingTeam === 'team2' ?
                  {
                    ...state.team2Batting,
                    overs: state.team2Batting.overs + 1,
                    wickets: state.team2Batting.wickets + 1,
                    batsmen: modifiedBattingWickets,
                    runHistory: [...state.team2Batting.runHistory, state.team2Batting.runs]
                  }
                  : state.team2Batting,
                Bowler,
                team1Bowling: state.bowlingTeam === 'team1' ?
                  modifiedBowling
                  : state.team1Bowling,
                team2Bowling: state.bowlingTeam === 'team2' ?
                  modifiedBowling
                  : state.team2Bowling,
                key: state.key + 1,
                ballsThisOver,
                ThisOver,
                key: state.key + 1,
                modalVisible,
                inningsChange,
                changeBowler,
                gameFinished,
                battingPosition: state.battingPosition + 1
              }
          }
        case 'M.kd':
          {
            player1 = !state.player1.onStrike ? {
              ...state.player1,
              out: true,
              type: 'mancading',
              bowler: state.Bowler.name
            } : { ...state.player1 }
            player2 = !state.player2.onStrike ? {
              ...state.player2,
              out: true,
              type: 'mancading',
              bowler: state.Bowler.name
            } : { ...state.player2 }
            Bowler = {
              ...state.Bowler
            }
            const offStrikeBatsman = state.player1.onStrike ? player2 : player1;
            newBatsman = {
              name: payload.wicketState.newBatsman.selected,
              balls: 0,
              runs: 0,
              fours: 0,
              sixes: 0,
              strikeRate: 0,
              onStrike: false,
              out: false,
              battingPosition: state.battingPosition + 1
            }

            if (state.bowlingTeam === 'team1') {
              modifiedBowling = state.team1Bowling.filter(
                (item) => { return item.name !== state.Bowler.name }
              )
            } else {
              modifiedBowling = state.team2Bowling.filter(
                (item) => { return item.name !== state.Bowler.name }
              )
            }
            modifiedBowling.push({ ...Bowler });
            if (state.battingTeam === 'team1') {
              modifiedBattingWickets = state.team1Batting.batsmen.filter(
                (item) => {
                  return item.name !== offStrikeBatsman.name
                    && item.name !== newBatsman.name
                }
              )
            } else {
              modifiedBattingWickets = state.team2Batting.batsmen.filter(
                (item) => {
                  return item.name !== offStrikeBatsman.name
                    && item.name !== newBatsman.name
                }
              )
            }
            modifiedBattingWickets.push({ ...offStrikeBatsman });
            if (payload.wicketState.newBatsman.selected !== '')
              modifiedBattingWickets.push({ ...newBatsman });
            let changeBowler = false, inningsChange = false, modalVisible = false;
            if (state.battingTeam === 'team1') {
              if ((state.team1Batting.wickets + 1) === (state.playersPerSide - 1)) {
                inningsChange = true;
                modalVisible = false;
                changeBowler = false;
              }
            } else {
              if ((state.team2Batting.wickets + 1) === (state.playersPerSide - 1)) {
                inningsChange = true;
                modalVisible = false;
                changeBowler = false;
              }
            }
            let gameFinished = false;
            if (inningsChange === true && state.noOfInnings === 1) {
              gameFinished = true;
              inningsChange = false;
              modalVisible = false;
              changeBowler = false;
            }
            if (state.modalVisible === true)
              return state;
            else
              return {
                ...state,
                player1: !state.player1.onStrike ? { ...newBatsman } : { ...state.player1, onStrike: true },
                player2: !state.player2.onStrike ? { ...newBatsman } : { ...state.player2, onStrike: true },
                team1Batting: state.battingTeam === 'team1' ?
                  {
                    ...state.team1Batting,
                    wickets: state.team1Batting.wickets + 1,
                    batsmen: modifiedBattingWickets
                  }
                  : state.team1Batting,
                team2Batting: state.battingTeam === 'team2' ?
                  {
                    ...state.team2Batting,
                    wickets: state.team2Batting.wickets + 1,
                    batsmen: modifiedBattingWickets
                  }
                  : state.team2Batting,
                Bowler,
                team1Bowling: state.bowlingTeam === 'team1' ?
                  modifiedBowling
                  : state.team1Bowling,
                team2Bowling: state.bowlingTeam === 'team2' ?
                  modifiedBowling
                  : state.team2Bowling,
                key: state.key + 1,
                ThisOver: [...state.ThisOver, { id: state.key + 1, value: 'Mkd' }],
                modalVisible,
                changeBowler,
                inningsChange,
                gameFinished,
                battingPosition: state.battingPosition + 1
              }
          }
        case 'RO':
          {
            //console.log('no',payload.wicketState.noBall);
            const runType = payload.run_Type.name;
            const runs = parseInt(payload.runs);
            player1 = payload.wicketState.batsmanWhoRanOut.selected === state.player1.name ? {
              ...state.player1,
              out: true,
              type: 'run out',
              bowler: state.Bowler.name,
              runs: state.player1.onStrike && runType === 'bat' ? state.player1.runs + runs : state.player1.runs,
              balls: state.player1.onStrike && runType === 'bat' ? state.player1.balls + 1 : state.player1.balls,
              thrower: payload.wicketState.thrower.selected
            } : {
                ...state.player1,
                runs: state.player1.onStrike && runType === 'bat' ? state.player1.runs + runs : state.player1.runs,
                balls: state.player1.onStrike && runType === 'bat' ? state.player1.balls + 1 : state.player1.balls
              }
            player2 = payload.wicketState.batsmanWhoRanOut.selected === state.player2.name ? {
              ...state.player2,
              out: true,
              type: 'run out',
              bowler: state.Bowler.name,
              runs: state.player2.onStrike && runType === 'bat' ? state.player2.runs + runs : state.player2.runs,
              balls: state.player2.onStrike && runType === 'bat' ? state.player2.balls + 1 : state.player2.balls,
              thrower: payload.wicketState.thrower.selected
            } : {
                ...state.player2,
                runs: state.player2.onStrike && runType === 'bat' ? state.player2.runs + runs : state.player2.runs,
                balls: state.player2.onStrike && runType === 'bat' ? state.player2.balls + 1 : state.player2.balls
              }
            Bowler = {
              ...state.Bowler,
              overs: runType !== 'wd' && !payload.wicketState.noBall ? state.Bowler.overs + 1 : state.Bowler.overs,
              runs: runType !== 'wd' && !payload.wicketState.noBall ? state.Bowler.runs + runs : state.Bowler.runs + runs + 1
            }
            const newBatsmanOnStrike = payload.wicketState.hasStrikeChanged;

            const ranOutBatsman = state.player1.name === payload.wicketState.batsmanWhoRanOut.name ? player1 : player2;//
            newBatsman = {
              name: payload.wicketState.newBatsman.selected,
              balls: 0,
              runs: 0,
              fours: 0,
              sixes: 0,
              strikeRate: 0,
              onStrike: newBatsmanOnStrike ? true : false,
              out: false,
              battingPosition: state.battingPosition + 1
            }

            if (state.bowlingTeam === 'team1') {
              modifiedBowling = state.team1Bowling.filter(
                (item) => { return item.name !== state.Bowler.name }
              )
            } else {
              modifiedBowling = state.team2Bowling.filter(
                (item) => { return item.name !== state.Bowler.name }
              )
            }
            modifiedBowling.push({ ...Bowler });
            if (state.battingTeam === 'team1') {
              modifiedBattingWickets = state.team1Batting.batsmen.filter(
                (item) => {
                  return item.name !== ranOutBatsman.name
                    && item.name !== newBatsman.name
                }
              )
            } else {
              modifiedBattingWickets = state.team2Batting.batsmen.filter(
                (item) => {
                  return item.name !== ranOutBatsman
                    && item.name !== newBatsman.name
                }
              )
            }
            modifiedBattingWickets.push({ ...ranOutBatsman });
            if (payload.wicketState.newBatsman.selected !== '')
              modifiedBattingWickets.push({ ...newBatsman });

            let inningsChange = false;
            let ThisOver = [];
            let ballsThisOver = 0;
            let modalVisible = false;
            if (runType !== 'wd' && payload.wicketState.noBall !== false) {
              if (state.battingTeam === 'team1') {
                if ((state.oversPerSide * 6) === (state.team1Batting.overs + 1)) {
                  inningsChange = true;
                }
                //console.log(state.oversPerSide*6,state.team1Batting.overs+1);
              } else if (state.battingTeam === 'team2') {
                if ((state.oversPerSide * 6) === (state.team2Batting.overs + 1)) {
                  inningsChange = true;
                }
                //console.log(state.oversPerSide*6,state.team2Batting.overs+1);
              }
            }

            if (inningsChange === true) {
              ThisOver = [];
            } else {
              ThisOver = state.ballsThisOver >= 6
                ? [...state.ThisOver]
                : [...state.ThisOver, { id: state.key + 1, value: 'W' }]
            }

            if (inningsChange === true) {
              ballsThisOver = 0;
            } else {
              if (runType !== 'wd' && payload.wicketState.noBall !== true) {
                ballsThisOver = (state.ballsThisOver + 1) >= 6
                  ? 6
                  : state.ballsThisOver + 1
              } else {
                ballsThisOver = state.ballsThisOver;
              }
            }
            if (inningsChange === true) {
              modalVisible = false;
            } else {
              if (runType !== 'wd' && payload.wicketState.noBall !== true) {
                if (state.ballsThisOver === 5)
                  modalVisible = true;
              } else {
                modalVisible = false;
              }
            }
            let changeBowler = false;
            if (inningsChange !== true) {
              if (state.battingTeam === 'team1') {
                if ((state.team1Batting.wickets + 1) === (state.playersPerSide - 1)) {
                  inningsChange = true;
                  modalVisible = false;
                  changeBowler = false;
                }
              } else {
                if ((state.team2Batting.wickets + 1) === (state.playersPerSide - 1)) {
                  inningsChange = true;
                  modalVisible = false;
                  changeBowler = false;
                }
              }
            }
            let gameFinished = false;
            if (inningsChange === true && state.noOfInnings === 1) {
              gameFinished = true;
              inningsChange = false;
              modalVisible = false;
              changeBowler = false;
            }

            if (state.modalVisible === true)
              return state;
            else
              return {
                ...state,
                player1: payload.wicketState.batsmanWhoRanOut.selected === state.player1.name
                  ? { ...newBatsman }
                  : { ...player1, onStrike: newBatsmanOnStrike ? false : true },
                player2: payload.wicketState.batsmanWhoRanOut.selected === state.player2.name
                  ? { ...newBatsman }
                  : { ...player2, onStrike: newBatsmanOnStrike ? false : true },
                team1Batting: state.battingTeam === 'team1' ?
                  {
                    ...state.team1Batting,
                    runs: runType === 'wd' || payload.wicketState.noBall === true
                      ? state.team1Batting.runs + runs + 1
                      : state.team1Batting.runs + runs,
                    overs: runType === 'wd' || payload.wicketState.noBall === true
                    ? state.team1Batting.overs
                    : state.team1Batting.overs+1,
                    wickets: state.team1Batting.wickets + 1,
                    batsmen: modifiedBattingWickets,
                    extras: runType !== 'bat'
                      ? runs + (runType === 'wd' || payload.wicketState.noBall === true
                        ? 1
                        : 0)
                      : state.team1Batting.extras,
                    runHistory: (runType !== 'wd' && payload.wicketState.noBall !== true)
                      ? [...state.team1Batting.runHistory, state.team1Batting.runs + runs]
                      : state.team1Batting.runHistory
                  }
                  : state.team1Batting,
                team2Batting: state.battingTeam === 'team2' ?
                  {
                    ...state.team2Batting,
                    runs: runType === 'wd' || payload.wicketState.noBall === true
                      ? state.team2Batting.runs + runs + 1
                      : state.team2Batting.runs + runs,
                    overs: runType === 'wd' || payload.wicketState.noBall === true
                      ? state.team2Batting.overs
                      : state.team2Batting.overs+1,
                    wickets: state.team2Batting.wickets + 1,
                    batsmen: modifiedBattingWickets,
                    extras: runType !== 'bat'
                      ? runs + (runType === 'wd' || payload.wicketState.noBall === true
                        ? 1 : 0)
                      : state.team2Batting.extras,
                    runHistory: (runType !== 'wd' && payload.wicketState.noBall !== true)
                      ? [...state.team2Batting.runHistory, state.team2Batting.runs + runs]
                      : state.team2Batting.runHistory
                  }
                  : state.team2Batting,
                Bowler,
                team1Bowling: state.bowlingTeam === 'team1' ?
                  modifiedBowling
                  : state.team1Bowling,
                team2Bowling: state.bowlingTeam === 'team2' ?
                  modifiedBowling
                  : state.team2Bowling,
                key: state.key + 1,
                ballsThisOver,
                ThisOver,
                key: state.key + 1,
                modalVisible,
                inningsChange,
                changeBowler,
                gameFinished,
                battingPosition: state.battingPosition + 1
              }
          }
        default:
          return state;
      }
    }
    case 'change_bowler': {
      let nextBowler;
      let modifiedBowlers = [];
      if (state.bowlingTeam === 'team1') {
        nextBowler = state.team1Bowling.find((item) => item.name === action.payload);
        modifiedBowlers = state.team1Bowling.filter((item) => item.name !== action.payload
          && item.name !== state.Bowler.name);
      } else if (state.bowlingTeam === 'team2') {
        nextBowler = state.team2Bowling.find((item) => item.name === action.payload);
        modifiedBowlers = state.team2Bowling.filter((item) => item.name !== action.payload
          && item.name !== state.Bowler.name);
      }
      let bowlingPosition = nextBowler.bowlingPosition;
      let Bowler = state.Bowler;
      if (bowlingPosition === -1) {
        bowlingPosition = state.bowlingPosition + 1;
        if (state.Bowler.overs === 0) {
          Bowler = { ...Bowler, bowlingPosition: -1 };
          bowlingPosition = state.bowlingPosition;
        }
      }

      modifiedBowlers.push({ ...nextBowler, bowlingPosition });
      modifiedBowlers.push({ ...Bowler });
      return {
        ...state,
        bowlingPosition,
        Bowler: { ...nextBowler, bowlingPosition },
        team1Bowling: state.bowlingTeam === 'team1' ? modifiedBowlers : state.team1Bowling,
        team2Bowling: state.bowlingTeam === 'team2' ? modifiedBowlers : state.team2Bowling,
        changeBowler: false
      }
    }
    case 'change_bowler_visibility': {
      return { ...state, changeBowler: true }
    }
    case 'set_team_info': {
      return {
        ...state,
        team1Name: action.payload.team1Name.value,
        team2Name: action.payload.team2Name.value,
        playersPerSide: parseInt(action.payload.players_a_side.value),
        oversPerSide: parseInt(action.payload.overs.value),
        battingTeam: action.payload.team1Name.value === action.payload.battingTeam.selected
          ? 'team1'
          : 'team2',
        bowlingTeam: action.payload.team1Name.value === action.payload.battingTeam.selected
          ? 'team2'
          : 'team1',
        tossWonBy: action.payload.tossWonBy.selected === action.payload.team1Name.value
          ? 'team1'
          : 'team2'
      }
    }
    case 'set_team_players':
      let batsmen = [];
      let bowlers = [];
      action.payload.playerNames.forEach((item) => {
        batsmen.push({
          name: item.value,
          runs: 0, balls: 0, fours: 0, sixes: 0, out: false,
          strikeRate: 0, onStrike: false, battingPosition: -1
        });
        bowlers.push({
          name: item.value, overs: 0, runs: 0,
          wickets: 0, dots: 0, maidenOvers: 0,
          ballsThisOver: 0, bowlingPosition: -1
        })
      })
      return {
        ...state,
        team1Batting: {
          ...state.team1Batting,
          batsmen: action.payload.teamName === 'team1'
            ? batsmen
            : state.team1Batting.batsmen,
        },
        team1Bowling: action.payload.teamName === 'team1'
          ? bowlers
          : state.team1Bowling,
        team2Batting: {
          ...state.team2Batting,
          batsmen: action.payload.teamName === 'team2'
            ? batsmen
            : state.team2Batting.batsmen,
        },
        team2Bowling: action.payload.teamName === 'team2'
          ? bowlers
          : state.team2Bowling
      }
    case 'set_opening':
      const payload = action.payload;
      let player1, player2, Bowler, modifiedBatsmen, modifiedBowlers;
      if (state.battingTeam === 'team1') {
        player1 = state.team1Batting.batsmen.find((item) => item.name === payload.striker);
        player2 = state.team1Batting.batsmen.find((item) => item.name === payload.nonStriker);
        Bowler = state.team2Bowling.find((item) => item.name === payload.openingBowler);
        modifiedBatsmen = state.team1Batting.batsmen.filter((item) => {
          return item.name !== payload.striker && item.name !== payload.nonStriker
        })
        modifiedBowlers = state.team2Bowling.filter((item) => item.name !== payload.openingBowler);
      } else if (state.battingTeam === 'team2') {
        player1 = state.team2Batting.batsmen.find((item) => item.name === payload.striker);
        player2 = state.team2Batting.batsmen.find((item) => item.name === payload.nonStriker);
        Bowler = state.team1Bowling.find((item) => item.name === payload.openingBowler);
        modifiedBatsmen = state.team2Batting.batsmen.filter((item) => {
          return (item.name !== payload.striker && item.name !== payload.nonStriker)
        })
        modifiedBowlers = state.team1Bowling.filter((item) => item.name !== payload.openingBowler);
      }
      var today = new Date();
      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      return {
        ...state,
        date,
        time,
        player1: { ...player1, battingPosition: 1, onStrike: true },
        player2: { ...player2, battingPosition: 2 },
        Bowler: { ...Bowler, bowlingPosition: 1 },
        team1Batting: {
          ...state.team1Batting,
          batsmen: state.battingTeam === 'team1'
            ? [...modifiedBatsmen, { ...player1, battingPosition: 1 }, { ...player2, battingPosition: 2 }]
            : state.team1Batting.batsmen
        },
        team2Batting: {
          ...state.team2Batting,
          batsmen: state.battingTeam === 'team2'
            ? [...modifiedBatsmen, { ...player1, battingPosition: 1 }, { ...player2, battingPosition: 2 }]
            : state.team2Batting.batsmen
        },
        team1Bowling: state.bowlingTeam === 'team1'
          ? [...modifiedBowlers, { ...Bowler, bowlingPosition: 1 }]
          : state.team1Bowling,
        team2Bowling: state.bowlingTeam === 'team2'
          ? [...modifiedBowlers, { ...Bowler, bowlingPosition: 1 }]
          : state.team2Bowling,
        battingPosition: 2,
        bowlingPosition: 1
      }
    case 'change_innings':
      {
        const payload = action.payload;
        let player1, player2, Bowler, modifiedBatsmen, modifiedBowlers;
        if (state.battingTeam === 'team1') {
          modifiedBatsmen = state.team2Batting.batsmen.filter((item) => {
            return item.name !== payload.striker.selected && item.name !== payload.nonStriker.selected
          })
          modifiedBowlers = state.team1Bowling.filter((item) => item.name !== payload.openingBowler.selected);
        } else if (state.battingTeam === 'team2') {
          modifiedBatsmen = state.team1Batting.batsmen.filter((item) => {
            return (item.name !== payload.striker.selected && item.name !== payload.nonStriker.selected)
          })
          modifiedBowlers = state.team2Bowling.filter((item) => item.name !== payload.openingBowler.selected);
        }
        player1 = {
          name: action.payload.striker.selected,
          runs: 0, balls: 0, fours: 0, sixes: 0, out: false,
          strikeRate: 0, onStrike: true, battingPosition: 1
        };
        player2 = {
          name: action.payload.nonStriker.selected,
          runs: 0, balls: 0, fours: 0, sixes: 0, out: false,
          strikeRate: 0, onStrike: false, battingPosition: 2
        }
        Bowler = {
          name: action.payload.openingBowler.selected, overs: 0, runs: 0,
          wickets: 0, dots: 0, maidenOvers: 0,
          ballsThisOver: 0, bowlingPosition: 1
        }
        modifiedBowlers.push(Bowler);
        modifiedBatsmen.push(player1);
        modifiedBatsmen.push(player2);
        return {
          ...state,
          battingTeam: state.battingTeam === 'team1' ? 'team2' : 'team1',
          bowlingTeam: state.battingTeam === 'team1' ? 'team1' : 'team2',
          player1,
          player2,
          Bowler,
          team1Batting: {
            ...state.team1Batting,
            batsmen: state.battingTeam === 'team1' ? state.team1Batting.batsmen : modifiedBatsmen
          }
          ,
          team2Batting: {
            ...state.team2Batting,
            batsmen: state.battingTeam === 'team2' ? state.team2Batting.batsmen : modifiedBatsmen
          },
          team1Bowling: state.bowlingTeam === 'team1' ? state.team1Bowling : modifiedBowlers,
          team2Bowling: state.bowlingTeam === 'team2' ? state.team2Bowling : modifiedBowlers,
          modalVisible: false,
          inningsChange: false,
          noOfInnings: state.noOfInnings + 1,
          bowlingPosition: 1,
          battingPosition: 2,
          ThisOver: [],
          ballsThisOver: 0
        }
      }
    case 'get_match': {
      return {
        ...action.payload
      }
    }
    case 'initialize':
      return {
        team1Name: '',
        team2Name: '',
        playersPerSide: 0,
        battingTeam: '',//team1 or team2
        bowlingTeam: '',
        ballsThisOver: 0,
        oversPerSide: 0,
        player1: {},
        player2: {},
        Bowler: {},
        ThisOver: [],
        team1Players: [],
        team2Players: [],
        team1Batting: {
          runs: 0,
          extras: 0,
          wickets: 0,
          overs: 0,
          runHistory: [],
          fallOfWickets: [],
          batsmen: []
        },
        team2Batting: {
          runs: 0,
          extras: 0,
          wickets: 0,
          overs: 0,
          runHistory: [],
          fallOfWickets: [],
          batsmen: []
        },
        modalVisible: false,
        changeBowler: false,
        key: 0,
        gameFinished: false,
        prevBowler: {},
        team1Bowling: [],
        team2Bowling: [],
        inningsChange: false,
        noOfInnings: 0,
        battingPosition: -1,
        bowlingPosition: -1,
        tossWonBy: '' //'team1' or 'team2'
      }
    default:
      return state;
  }
}


const addRuns = (dispatch) => {
  return (type, payload) => {
    const bat = ['0', '1', '2', '3', '4', '5', '6'];
    const found = bat.find((item) => item === type);
    if (found)
      dispatch({ type: 'bat', payload: type });
    else {
      if (type === 'Wd')
        dispatch({ type: 'wide', payload: { type, value: payload } });
      else if (type === 'N')
        dispatch({ type, payload });
      else if (type === 'LB' || type === 'B')
        dispatch({ type: 'byes', payload: { type, value: payload } });
    }

  }
}
const changeInnings = (dispatch) => {
  return (inningsChangeDetails) => {
    dispatch({ type: 'change_innings', payload: inningsChangeDetails })
  }
}
const setOpening = (dispatch) => {
  return (payload) => {
    dispatch({ type: 'set_opening', payload });
  }
}
const setTeamPlayers = (dispatch) => {
  return (playerNames, teamName) => {
    dispatch({ type: 'set_team_players', payload: { teamName, playerNames } })
  }
}
const wicket = (dispatch) => {
  return (type, payload) => {
    dispatch({ type, payload });
  }
}

const setNextBowler = (dispatch) => {
  return (bowlerName) => {
    dispatch({ type: 'over', payload: bowlerName });
  }
}

const changeBowler = (dispatch) => {
  return (bowlerName) => {
    dispatch({ type: 'change_bowler', payload: bowlerName });
  }
}

const changeBowlerVisibility = (dispatch) => {
  return () => {
    dispatch({ type: 'change_bowler_visibility' })
  }
}
const setTeamInfo = (dispatch) => {
  return (teamInfo) => {
    dispatch({ type: 'set_team_info', payload: teamInfo });
  }
}

const getMatch = (dispatch) => {
  return (match) => {
    dispatch({ type: 'get_match', payload: match });
  }
}

const initializeState = (dispatch) => {
  return () => {
    dispatch({ type: 'initialize' });
  }
}

export const { Context, Provider } = CreateContext(
  reducer,
  {
    initializeState, changeInnings, addRuns, wicket, getMatch, setNextBowler,
    changeBowler, changeBowlerVisibility, setTeamInfo, setTeamPlayers, setOpening
  },
  {}
)