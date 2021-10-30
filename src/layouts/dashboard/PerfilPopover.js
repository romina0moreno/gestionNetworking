import { useRef, useState } from 'react';
// material
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
// components
import MenuPopover from '../../Components/MenuPopover';
import { cambiarPerfil } from '../../store/actions/ConfiguracionAction.js';

//BD
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

// ----------------------------------------------------------------------

const AC = [
  {
    value: 'NetworkingSAS',
    label: 'Networking SAS',
    icon: './logoNet.png',
  },
  {
    value: 'TodoMujer',
    label: 'Todo Mujer',
    icon: '/static/icons/ic_flag_de.svg'
  }
];

// ----------------------------------------------------------------------

function PerfilPopover(props) {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { configuracion } = props;
  var perfilActual = [];

  if( configuracion === undefined){
    console.log(props);
  }else{
    if ( configuracion === null){
      console.log(configuracion);
    }else{
      console.log(configuracion[1].perfilActual);
      AC.map((value)=>(
        value.value === configuracion[1].perfilActual ? perfilActual = value : null
      ))
      console.log(perfilActual);
    }
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
    console.log(e.target.name);
    if(e.target.name !== undefined){
      props.cambiarPerfil(e.target.name);
    }
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
          })
        }}
      >
        <img src={perfilActual.icon} alt={perfilActual.label} />
      </IconButton>

      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current}>
        <Box sx={{ py: 1 }}>
          {AC.map((option) => (
            <MenuItem
              key={option.value}
              name={option.value}
              selected={option.value === perfilActual.value}
              onClick={handleClose}
              sx={{ py: 1, px: 2.5 }}
            >
              <ListItemIcon>
                <Box component="img" name={option.value} alt={option.label} src={option.icon} />
              </ListItemIcon>
              <ListItemText name={option.value} primaryTypographyProps={{ variant: 'body2' }}>
                {option.label}
              </ListItemText>
            </MenuItem>
          ))}
        </Box>
      </MenuPopover>
    </>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return{
    configuracion: state.firestore.data.Configuracion,
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    cambiarPerfil: (perfil) => dispatch(cambiarPerfil(perfil)),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {collection: 'Configuracion'}
  ])
)(PerfilPopover);
