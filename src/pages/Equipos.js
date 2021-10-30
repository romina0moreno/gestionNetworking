import { filter } from 'lodash';
import * as React from 'react';
// material
import {
  Card, CardActions, CardContent, Grid,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField, Snackbar
} from '@mui/material';

import MuiAlert from '@mui/material/Alert';
// components
import Page from '../Components/Page';
import Label from '../Components/Label';
import Scrollbar from '../Components/Scrollbar';
import SearchNotFound from '../Components/SearchNotFound';
import { ListHead, ListToolbar, MoreMenu } from '../Components/tablas';

//BD
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { crearEquipo, borrarEquipo, buscarEquipoXId, modificarEquipo } from '../store/actions/EquipoAction.js';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'tipo', label: 'Tipo', alignRight: false },
  { id: 'marca', label: 'marca', alignRight: false },
  { id: 'modelo', label: 'Modelo', alignRight: false },
  { id: 'frecuencia', label: 'Frecuencia', alignRight: false },
  { id: 'mac', label: 'MAC', alignRight: false },
  { id: 'estado', label: 'Estado', alignRight: false },
  { id: '' }
];

var equipoN = {
  id:0,
  tipo:'',
  marca:'',
  modelo:'',
  frecuencia:'',
  mac:'',
  estado:'',
  perfil:"NetwokingSAS"
}

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.modelo.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Equipos(props) {
  const [page, setPage] = React.useState(0);
  const [order, setOrder] = React.useState('asc');
  const [selected, setSelected] = React.useState([]);
  const [orderBy, setOrderBy] = React.useState('name');
  const [filterName, setFilterName] = React.useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { equipos, configuracion, equipo } = props;
  const [openM, setOpenM] = React.useState(false);
  const [mensaje, setMensaje] = React.useState("");
  const [openNotif, setOpenNotif] = React.useState(false);
  const [openVer, setOpenVer] = React.useState(false);
  const [openModif, setOpenModif] = React.useState(false);

  const handleClickNotif = () => {
    setOpenNotif(true);
  };

  const handleCloseNotif = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenNotif(false);
  };

  const handleClickOpenM = () => {
    setOpenM(true);
  };

  const handleCloseM = () => {
    setOpenM(false);
  };
  const handleClickOpenModif = () => {
    setOpenModif(true);
  };

  const handleCloseModif = () => {
    setOpenModif(false);
  };


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = equipos.map((n) => n.modelo);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - equipos.length) : 0;

  var filteredUsers = [];

  if(equipos!==undefined){
     filteredUsers = applySortFilter(equipos, getComparator(order, orderBy), filterName);
  }

  const isUserNotFound = filteredUsers.length === 0;

  const nuevoEquipo = () =>{
    setMensaje("El equipo se guardó con exito");
    equipoN.id = equipos.length;
    equipoN.marca = document.getElementById('marca').value;
    equipoN.modelo = document.getElementById('modelo').value;
    equipoN.frecuencia = document.getElementById('frecuencia').value;
    equipoN.mac = document.getElementById('mac').value;
    equipoN.tipo = document.getElementById('tipo').value;
    equipoN.estado = document.getElementById('estado').value;
    equipoN.perfil = configuracion[1].perfilActual;

    props.crearEquipo(equipoN, equipoN.id);
    handleCloseM();
    handleClickNotif();
  }

  const modificarEquipo = (id) =>{
    setMensaje("Se modifico correctamente.");

    var marca = document.getElementById('marca').value;
    var modelo = document.getElementById('modelo').value;
    var frecuencia = document.getElementById('frecuencia').value;
    var mac = document.getElementById('mac').value;
    var estado = document.getElementById('estado').value;

    props.modificarEquipo(id, marca, modelo, frecuencia, mac, estado);
    props.buscarEquipoXId(id);
    handleCloseModif();
    handleClickNotif();
  }

  const eliminar = (e, id) => {
    if(window.confirm("Desea eliminar al equipo de manera permanente?")){
      props.borrarEquipo(id);
      setMensaje("El equipo se eliminó con exito");
      handleClickNotif();
    }
  }

  const verEquipo = (e, id) =>{
    props.buscarEquipoXId(id);
    setOpenVer(true);
  }

  const handleCloseVer = () =>{
    setOpenVer(false);
  }


  return (
    <Page title="Equipos | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Equipos
          </Typography>
          <Button
            variant="contained"
            onClick={handleClickOpenM}
          >
            Nuevo equipo
          </Button>
        </Stack>

        <Card>
          <ListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
            {
              equipos === undefined ?
              <Stack sx={{ color: 'grey.500', marginLeft: '45%'}} spacing={2} direction="row">
                <CircularProgress color="primary" />
              </Stack>
              :
              <Table>
                <ListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={equipos.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, marca, modelo, estado, frecuencia, mac, tipo} = row;
                      const isItemSelected = selected.indexOf(id) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, id)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {marca}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {modelo}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{frecuencia}</TableCell>
                          <TableCell align="left">{tipo}</TableCell>
                          <TableCell align="left">{mac}</TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={(estado === 'Robado' && 'error') || 'success'}
                            >
                              {estado}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <MoreMenu eliminar={(event) => eliminar(event, id)} verEquipo={(event)=>verEquipo(event, id)}/>
                          </TableCell>
                        </TableRow>
                        :
                        null
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            }
            </TableContainer>
          </Scrollbar>

          {equipos === undefined ?
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              rowsPerPage={rowsPerPage}
              count={0}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /> :
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              rowsPerPage={rowsPerPage}
              count={equipos.length}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          }
        </Card>
        <Snackbar open={openNotif} autoHideDuration={6000} onClose={handleCloseNotif}>
         <Alert onClose={handleCloseNotif} severity="success" sx={{ width: '100%' }}>
           {mensaje}
         </Alert>
       </Snackbar>
      </Container>

      <Dialog open={openM} onClose={handleCloseM}>
        <DialogTitle>Nuevo equipo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="marca"
            label="Marca"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="modelo"
            label="Modelo"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="frecuencia"
            label="Frecuencia"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="mac"
            label="MAC"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="tipo"
            label="Tipo"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="estado"
            label="Estado"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseM}>Cancelar</Button>
          <Button onClick={nuevoEquipo}>Añadir</Button>
        </DialogActions>
      </Dialog>

      {equipo === null ? null :
        <Dialog open={openVer} onClose={handleCloseVer} fullWidth maxWidth='lg'>
          <DialogTitle>{equipo[0].marca + " " + equipo[0].modelo}</DialogTitle>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={8} md={7}>
                <Card sx={{ minWidth: 300}}>
                  <CardContent >
                    <Typography variant="h5">
                      INFORMACION DEL EQUIPO
                    </Typography>
                    <br/>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      <b>Marca:</b> {equipo[0].marca}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      <b>Modelo:</b> {equipo[0].modelo}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      <b>Frecuencia:</b> {equipo[0].frecuencia}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      <b>MAC:</b> {equipo[0].mac}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      <b>Tipo:</b> {equipo[0].tipo}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={handleClickOpenModif}>Modificar</Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={8} md={5}>
                {equipo[0].estado !== "Robado" ?
                <Card sx={{ minWidth: 300, backgroundColor:'#AAF27F'}}>
                  <CardContent >
                    <Typography variant="h5">
                      {equipo[0].estado}
                    </Typography>
                  </CardContent>
                </Card>
                :
                <Card sx={{ minWidth: 300, backgroundColor:'#FFA48D'}}>
                  <CardContent >
                    <Typography variant="h5">
                      {equipo[0].estado}
                    </Typography>
                  </CardContent>
                </Card>}
                <br/>
                 <Stack spacing={2} direction="row">
                  <Button variant="outlined" size="large">
                    Ver comodato
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseVer}>Salir</Button>
          </DialogActions>
        </Dialog>}

        {equipo === null ? null:
          <Dialog open={openModif} onClose={handleCloseModif}>
            <DialogTitle>Modificar equipo</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="marca"
                label="Marca"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={equipo[0].marca}
              />
              <TextField
                margin="dense"
                id="modelo"
                label="Modelo"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={equipo[0].modelo}
              />
              <TextField
                margin="dense"
                id="frecuencia"
                label="Frecuencia"
                type="number"
                fullWidth
                variant="standard"
                defaultValue={equipo[0].frecuencia}
              />
              <TextField
                margin="dense"
                id="mac"
                label="MAC"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={equipo[0].mac}
              />
              <TextField
                margin="dense"
                id="tipo"
                label="Tipo"
                type="number"
                fullWidth
                variant="standard"
                defaultValue={equipo[0].tipo}
              />
              <TextField
                margin="dense"
                id="estado"
                label="Estado"
                type="email"
                fullWidth
                variant="standard"
                defaultValue={equipo[0].estado}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModif}>Cancelar</Button>
              <Button onClick={(event) => modificarEquipo(event, equipo[0].id)}>Guardar</Button>
            </DialogActions>
          </Dialog>}
    </Page>

  );
}
const mapStateToProps = (state) => {
  return{
    equipos: state.firestore.ordered.Equipo,
    configuracion: state.firestore.data.Configuracion,
    equipo: state.equipo.Equipo,
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    crearEquipo: (equipo, dni) => dispatch(crearEquipo(equipo, dni)),
    borrarEquipo: (dni) => dispatch(borrarEquipo(dni)),
    buscarEquipoXId:(id) => dispatch(buscarEquipoXId(id)),
    modificarEquipo: (id, marca, modelo, frecuencia, mac, tipo, estado) => dispatch(modificarEquipo(id, marca, modelo, frecuencia, mac, tipo, estado))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {collection: 'Equipo'},
    {collection: 'Configuracion'}
  ])
)(Equipos);
