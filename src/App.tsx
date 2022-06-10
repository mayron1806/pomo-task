import Task from './components/Task';
import * as C from "./app.style";
import Wellcome from './components/Wellcome';
import Container from './components/Container';
import Pomodoro from './components/Pomodoro/intex';
import ThemeController from './components/ThemeController';
import { ThemeProvider } from 'styled-components';

import Theme from './types/Theme';
import darkTheme from './themes/dark';
import lightTheme from './themes/light';
import { useLocalState } from './hooks/useLocalState';

function App() {
  const {
    state: currentTheme, 
    setState: setCurrentTheme
  } = useLocalState<Theme>("theme", lightTheme);

  console.log(currentTheme);
  return (
    <ThemeProvider theme={currentTheme}>
       <C.Container>
        <Container className='tasks'>
          <Task />
        </Container>
        <Container className='wellcome'>
          <Wellcome />
        </Container>
        <Container className='pomodoro'>
          <Pomodoro />
        </Container>
        <ThemeController theme={currentTheme} setTheme={setCurrentTheme}/>
      </C.Container>
    </ThemeProvider>
   
  );
}

export default App;
