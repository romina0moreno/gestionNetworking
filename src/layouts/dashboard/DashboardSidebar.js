import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack, CircularProgress } from '@mui/material';
// components
import Logo from '../../Components/Logo';
import Scrollbar from '../../Components/Scrollbar';
import NavSection from '../../Components/NavSection';
import { MHidden } from '../../Components/@material-extend';
//
import sidebarConfigNet from './SidebarConfigNet';
import sidebarConfigTM from './SidebarConfigTM';

//BD
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[200]
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

function DashboardSidebar({ isOpenSidebar, onCloseSidebar, perfil }) {
  const { pathname } = useLocation();
  const perfilActual = perfil;
  var sidebarConfig = [];

  if(perfilActual === "NetworkingSAS"){
    sidebarConfig = sidebarConfigNet;
  }else{
    if(perfilActual === "TodoMujer"){
      sidebarConfig = sidebarConfigTM;
    }else{
      sidebarConfig = [];
    }
  }

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' }
      }}
    >
      {perfilActual === "" ?
        <Stack sx={{ color: 'grey.500', marginLeft: '45%'}} spacing={2} direction="row">
          <CircularProgress color="primary" />
        </Stack>
        :
        <div>
          <Box sx={{ mb: 5, mx: 2.5 }}>
            <Link underline="none" component={RouterLink} to="#">
              { perfilActual === "NetworkingSAS" ?
              <AccountStyle>
                <Avatar  alt="photoURL" />
                <Box sx={{ ml: 2 }}>
                  <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                    Networking SAS
                  </Typography>
                </Box>
              </AccountStyle>
              :
              <AccountStyle>
                <Avatar  alt="photoURL" />
                <Box sx={{ ml: 2 }}>
                  <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                    Todo Mujer
                  </Typography>
                </Box>
              </AccountStyle>
              }
            </Link>
          </Box>

          <NavSection navConfig={sidebarConfig} />

          <Box sx={{ flexGrow: 1 }} />
        </div>
      }

    </Scrollbar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default'
            }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}


export default DashboardSidebar;
