import Wellcome from './components/Wellcome';

import TaskList from './components/TaskList';
import Container from './components/Container';
import Pomodoro from './components/Pomodoro';
import ThemeController from './components/ThemeController';
import { ThemeProvider } from 'styled-components';

import * as C from "./app.style";

import Theme from './types/Theme';
import lightTheme from './themes/light';
import { useLocalState } from './hooks/useLocalState';
import { canNotify, getNotificationPermision } from './utils/Notification';
import { useEffect } from 'react';
function App() {
  const {
    state: currentTheme, 
    setState: setCurrentTheme
  } = useLocalState<Theme>("theme", lightTheme);
  // se nao pode enviar noficação vai pedir permissão quando renderizar o app
  useEffect(()=>{ !canNotify() && getNotificationPermision()}, [])  

  return (
    <ThemeProvider theme={currentTheme.colors}>
      <C.Main>
        <C.Content> 
          <Container className='wellcome'>
            <Wellcome />
          </Container>
          <ThemeController theme={currentTheme} setTheme={setCurrentTheme}/>
          <Pomodoro />
          <TaskList />
        </C.Content>
      </C.Main>
    </ThemeProvider>
   
  );
}

export default App;
