import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import MyProfile from '../components/MyProfile';
import Posts from './Posts';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import CreatePost from '../components/CreatePost';
import Connections from '../components/Connections';


export default function Home() {

  const viewIdx = useAppSelector(store => store.viewIdx);

  function handleView() {
    switch (viewIdx.idx) {
      case 1:
        return (<Posts />)
        break;
      case 2:
        return (<CreatePost />)
        break;
      case 3:
        return (<Connections />)
        break;
      case 4:
        return (<Connections />)
        break;
      case 5:
        return (<MyProfile />)
        break;
    }
  }



  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Sidebar />
        <Header />
        <Box
          component="main"
          className="MainContent"
          sx={{
            pt: { xs: 'calc(12px + var(--Header-height))', md: 3 },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1,
            overflow: 'auto',
          }}
        >
          {
            handleView()
          }

        </Box>
      </Box>
    </CssVarsProvider>
  )
}