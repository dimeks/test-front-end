import React from 'react';
import { ThemeProvider } from 'styled-components'
import { RouterProvider } from "react-router-dom";
import GlobalStyle from '../../ui/global'
import routes from '@routes'
import bootstrapServices from '@services/axios'
import 'animate.css';
import theme from '../../ui/theme'


bootstrapServices()

type Props = {
  children?: React.ReactElement
}

const App: React.FC<Props> = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={routes} />
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
