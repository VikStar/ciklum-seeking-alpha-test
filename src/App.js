import React, { useEffect, useState } from 'react';
import './App.scss';
import Grid from './components/Grid/Grid';
import Button from './components/Button/Button';
import { generateRandomCoordinates, recalculateCoordinates } from './utils/utils';
import * as dummy from './utils/dummy_data';

const GRID_SIZE = 50;
const TICK = 500; // ms

const INITIAL = {
  start: false,
  over: false,
  coordinates: {}
};

const App = () => {
  const [state, setState] = useState(INITIAL);
  const loadExample = (n) => { setState({ ...state, coordinates: dummy[`example_${n}`] }) };
  
  useEffect(() => {    
    let timer;
    
    if (state.start) {
      if (Object.keys(state.coordinates).length === 0) {
        setState({ ...state, start: false, over: true })
      } else {
        timer = setTimeout(() => {
          setState(state => ({
            ...state,
            coordinates: recalculateCoordinates(state.coordinates, GRID_SIZE)
          }));  
        }, TICK);
      }
    }

    return () => clearTimeout(timer);
  }, [state]);

  const startStopRestart = () => {
    if (state.over) return <Button onClick={() => { setState({ ...state, over: false }) }}>Restart</Button>;
    if (state.start) return <Button onClick={() => { setState({ ...state, start: false }) }}>Stop</Button>;

    return <Button
      onClick={() => { setState({ ...state, start: true }) }}
      isDisabled={!Object.keys(state.coordinates).length}>
      Start
    </Button>;
  };
  
  return (
    <div className="App">
      <Grid size={GRID_SIZE} coordinates={state.coordinates} showMessage={state.over} />
      
      <div className="controls">
        {startStopRestart()}

        <Button
          isDisabled={state.start || state.over}
          onClick={() => { setState(state => ({ ...state, coordinates: generateRandomCoordinates(GRID_SIZE) })); }}>
          Generate randomly
        </Button>

        <Button isDisabled={state.start || state.over} onClick={() => { loadExample(1); }}>Load example #1</Button>
        <Button isDisabled={state.start || state.over} onClick={() => { loadExample(2); }}>Load example #2</Button>
        <Button isDisabled={state.start || state.over} onClick={() => { loadExample(3); }}>Load example #3</Button>
        <Button isDisabled={state.start || state.over} onClick={() => { loadExample(4); }}>Load example #4</Button>
      </div>
    </div>
  );
};

export default App;