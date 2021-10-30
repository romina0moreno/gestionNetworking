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
  CircularProgress, Switch,
  Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText,
  TextField, Snackbar, InputLabel, Select, MenuItem, FormControl, FormGroup, FormControlLabel
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
import { crearCliente, borrarCliente, buscarCliente, modificarCliente } from '../store/actions/ClienteAction.js';
import { crearContrato, buscarContrato } from '../store/actions/ContratoAction.js';
import  nuevoContratoPdf  from '../pdf/pdfContrato.js';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'nombre', label: 'Nombre', alignRight: false },
  { id: 'dni', label: 'DNI', alignRight: false },
  { id: 'domicilio', label: 'Domicilio', alignRight: false },
  { id: 'telefono', label: 'Telefono', alignRight: false },
  { id: 'empresa', label: 'Empresa', alignRight: false },
  { id: 'estado', label: 'Estado', alignRight: false },
  { id: '' }
];

var clienteN = {
  apellido:'',
  nombre:'',
  dni:'',
  email:'',
  telefono:'',
  razonSocial:'',
  cuit:'',
  estado:'',
  empresa:'',
  domicilio:'',
  moroso:'',
  perfil:'',
}

var contratoN = {
  id: 0,
  cliente: '',
  comodato:'',
  fechaAlta:'',
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
    return filter(array, (_user) => _user.apellido.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Cliente(props) {
  const [page, setPage] = React.useState(0);
  const [order, setOrder] = React.useState('asc');
  const [selected, setSelected] = React.useState([]);
  const [orderBy, setOrderBy] = React.useState('name');
  const [filterName, setFilterName] = React.useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { clientesSinFiltro, configuracion, cliente, contratos, contratoC } = props;
  var clientes = [];
  const [openM, setOpenM] = React.useState(false);
  const [mensaje, setMensaje] = React.useState("");
  const [openNotif, setOpenNotif] = React.useState(false);
  const [openVer, setOpenVer] = React.useState(false);
  const [openModif, setOpenModif] = React.useState(false);
  const [contrato, setContrato] = React.useState('');
  const [openAlertContrato, setOpenAlertContrato] = React.useState(false);
  const [openContrato, setOpenContrato] = React.useState(false);

  const handleClickOpenContrato = () => {
    setOpenVer(false);
    setOpenContrato(true);
  }

  const handleCloseContrato = () =>{
    setOpenContrato(false);
  }

  const handleClickOpenAlertContrato = () => {
    setOpenAlertContrato(true);
  };

  const handleCloseAlertContrato = () => {
    setOpenAlertContrato(false);
  };

  const handleChange = (event) => {
    setContrato(event.target.value);
  };

  const handleClickNotif = () => {
    setOpenNotif(true);
    console.log(mensaje);
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
      const newSelecteds = clientes.map((n) => n.dni);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - clientes.length) : 0;


  if(clientesSinFiltro !== undefined){
    clientesSinFiltro.map((cliente) => {
        if (cliente.perfil === configuracion[1].perfilActual){
            clientes.push(cliente);
          }
        })
      console.log(clientes);
  }

  var filteredClientes = [];

  if(clientes!==undefined){
     filteredClientes = applySortFilter(clientes, getComparator(order, orderBy), filterName);
  }

  const isUserNotFound = filteredClientes.length === 0;

  const validar = () =>{
    var apellido = document.getElementById('apellido').value;
    var nombre = document.getElementById('nombre').value;
    var dni = document.getElementById('dni').value;
    var email = document.getElementById('email').value;
    var telefono = document.getElementById('telefono').value;
    var domicilio = document.getElementById('domicilio').value;
    var boton = document.getElementById("aCliente");

    if(apellido !== ""){
      console.log(apellido);
      if(nombre !== ""){
        console.log(nombre);
        if(dni!==""){
          if(email!==""){
            if(telefono!==""){
              if(domicilio!==""){
                console.log(boton.disabled);
                boton.classList.remove("Mui-disabled");
                boton.disabled=false;
                console.log(boton);
              }else{
                boton.disabled=true;
              }
            }else{
              boton.disabled=true;
            }
          }else{
            boton.disabled=true;
          }
        }else{
          boton.disabled=true;
        }
      }else{
        boton.disabled=true;
      }
    }else{
      boton.disabled=true;
    }

    console.log(boton.disabled);
  }

  const nuevoCliente = () =>{
    setMensaje("El cliente se guardó con exito");

    clienteN.apellido = document.getElementById('apellido').value;
    clienteN.nombre = document.getElementById('nombre').value;
    clienteN.dni = document.getElementById('dni').value;
    clienteN.email = document.getElementById('email').value;
    clienteN.telefono = document.getElementById('telefono').value;
    clienteN.razonSocial = document.getElementById('razonSocial').value;
    clienteN.cuit = document.getElementById('cuit').value;
    clienteN.estado = "Activo";
    clienteN.domicilio = document.getElementById('domicilio').value;
    clienteN.moroso = false;
    if(clienteN.razonSocial!==""){
      clienteN.empresa = true;
    }else{
      clienteN.empresa=false;
    }
    clienteN.perfil = configuracion[1].perfilActual;

    props.crearCliente(clienteN, clienteN.dni);
    handleCloseM();
    handleClickNotif();
    handleClickOpenAlertContrato();
  }

  const modificarCliente = () =>{
    setMensaje("Se modifico correctamente.");

    var apellido = document.getElementById('apellido').value;
    var nombre = document.getElementById('nombre').value;
    var dni = document.getElementById('dni').value;
    var email = document.getElementById('email').value;
    var telefono = document.getElementById('telefono').value;
    var razonSocial = document.getElementById('razonSocial').value;
    var cuit = document.getElementById('cuit').value;
    var domicilio = document.getElementById('domicilio').value;
    if(razonSocial!==""){
      var empresa = true;
    }else{
      var empresa=false;
    }

    props.modificarCliente(dni, apellido, nombre, email, dni, domicilio, telefono, cuit, razonSocial, empresa);
    props.buscarCliente("dni", dni);
    handleCloseModif();
    handleClickNotif();
  }

  const eliminar = (e, dni) => {
    if(window.confirm("Desea eliminar al cliente " + dni + " de manera permanente?")){
      props.borrarCliente(dni);
      setMensaje("El cliente se eliminó con exito");
      handleClickNotif();
    }
  }

  const eliminadoGrupal = (e, seleccionados) =>{
    seleccionados.map((cliente) =>{
      props.borrarCliente(cliente);
    })
    setMensaje("Se eliminaron con exito.");
    handleClickNotif();
  }

  const verCliente = (e, dni) =>{
    props.buscarCliente("dni", dni);
    props.buscarContrato('cliente.dni', dni);
    setOpenVer(true);
  }

  const nuevoContrato = () =>{
    if(document.getElementById('id').value==''){
      contratoN.id = contratos.length;
    }else{
      contratoN.id = document.getElementById('id').value;
    }
    contratoN.cliente = cliente[0];
    contratoN.comodato = document.getElementById('comodato').value;
    contratoN.tipoContrato = contrato;
    contratoN.fechaAlta = new Date().toDateString();
    if(contratoN.tipoContrato === "Wireless"){
      nuevoContratoPdf(cliente[0], contratoN);
      props.crearContrato(contratoN, contratoN.id);
    }
  }

  const handleCloseVer = () =>{
    setOpenVer(false);
  }


  return (
    <Page title="Clientes | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Clientes
          </Typography>
          <Button
            variant="contained"
            onClick={handleClickOpenM}
          >
            Nuevo cliente
          </Button>
        </Stack>

        <Card>
          <ListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            eliminadoGrupal={(event)=>eliminadoGrupal(event, selected)}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
            {
              clientes === undefined ?
              <Stack sx={{ color: 'grey.500', marginLeft: '45%'}} spacing={2} direction="row">
                <CircularProgress color="primary" />
              </Stack>
              :
              <Table>
                <ListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={clientes.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredClientes
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { nombre, apellido, dni, estado, empresa, domicilio, telefono, perfil } = row;
                      const isItemSelected = selected.indexOf(dni) !== -1;

                      return (
                        perfil === configuracion[1].perfilActual ?
                        <TableRow
                          hover
                          key={dni}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, nombre)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {apellido +" "+ nombre}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{domicilio}</TableCell>
                          <TableCell align="left">{dni}</TableCell>
                          <TableCell align="left">{telefono}</TableCell>
                          <TableCell align="left">{empresa ? 'Yes' : 'No'}</TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={(estado === 'Baja' && 'error') || 'success'}
                            >
                              {estado}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <MoreMenu eliminar={(event) => eliminar(event, dni)} verCliente={(event)=>verCliente(event, dni)}/>
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

          {clientes === undefined ?
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
              count={clientes.length}
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
        <DialogTitle>Nuevo cliente</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="apellido"
            label="Apellido/s"
            type="text"
            fullWidth
            variant="standard"
            onChange={validar}
          />
          <TextField
            margin="dense"
            id="nombre"
            label="Nombre/s"
            type="text"
            fullWidth
            variant="standard"
            onChange={validar}
          />
          <TextField
            margin="dense"
            id="dni"
            label="DNI"
            type="number"
            fullWidth
            variant="standard"
            onChange={validar}
          />
          <TextField
            margin="dense"
            id="domicilio"
            label="Domicilio"
            type="text"
            fullWidth
            variant="standard"
            onChange={validar}
          />
          <TextField
            margin="dense"
            id="telefono"
            label="Telefono"
            type="number"
            fullWidth
            variant="standard"
            onChange={validar}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            onChange={validar}
          />
          <TextField
            margin="dense"
            id="razonSocial"
            label="Razon Social"
            type="text"
            fullWidth
            variant="standard"
            onChange={validar}
          />

          <TextField
            margin="dense"
            id="cuit"
            label="Cuit"
            type="number"
            fullWidth
            variant="standard"
            onChange={validar}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseM}>Cancelar</Button>
          <Button onClick={nuevoCliente} id="aCliente" disabled>Añadir</Button>
        </DialogActions>
      </Dialog>

      {cliente === null ? null :
        <Dialog open={openVer} onClose={handleCloseVer} fullWidth maxWidth='lg'>
          <DialogTitle>{cliente[0].apellido + " " + cliente[0].nombre}</DialogTitle>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={8} md={7}>
                <Card sx={{ minWidth: 300}}>
                  <CardContent >
                    <Typography variant="h5">
                      INFORMACION DEL CLIENTE
                    </Typography>
                    <br/>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      <b>Nombre:</b> {cliente[0].apellido + " " + cliente[0].nombre}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      <b>DNI:</b> {cliente[0].dni}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      <b>Domicilio:</b> {cliente[0].domicilio}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      <b>Telefono:</b> {cliente[0].telefono}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      <b>Email:</b> {cliente[0].email}
                    </Typography>
                    { cliente[0].empresa ?
                    <div>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        <b>Razon Social:</b> {cliente[0].razonSocial}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        <b>Cuit:</b> {cliente[0].cuit}
                      </Typography>
                    </div>
                    : null}
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={handleClickOpenModif}>Modificar</Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={8} md={5}>
                {cliente[0].estado === "Activo" ?
                <Card sx={{ minWidth: 300, backgroundColor:'#AAF27F'}}>
                  <CardContent >
                    <Typography variant="h5">
                      ACTIVO
                    </Typography>
                  </CardContent>
                </Card>
                :
                <Card sx={{ minWidth: 300, backgroundColor:'#FFA48D'}}>
                  <CardContent >
                    <Typography variant="h5">
                      INACTIVO
                    </Typography>
                  </CardContent>
                </Card>}
                {cliente[0].moroso ?
                <Card sx={{ minWidth: 300, backgroundColor:'#FFA48D'}}>
                  <CardContent >
                    <Typography variant="h5">
                      Este cliente posee mora.
                    </Typography>
                    <Button variant="text">Ver</Button>
                  </CardContent>
                </Card>
                : null }
                <br/>
                 {contratoC === null ?
                   <Stack spacing={2} direction="row">
                    <Button variant="outlined" size="large" onClick={handleClickOpenContrato}>
                      Nuevo contrato
                    </Button>
                    <Button variant="outlined" size="large">
                      Nuevo comodato
                    </Button>
                  </Stack>:
                  <Stack spacing={2} direction="row">
                   <Button variant="outlined" size="large">
                     Ver contrato
                   </Button>
                   <Button variant="outlined" size="large">
                     Ver comodato
                   </Button>
                 </Stack>}
                <br/><br/>
                <Stack spacing={2} direction="row">
                  <Button variant="outlined" size="large" color="error">
                    Dar baja
                  </Button>
                  {cliente[0].estado ==="Baja" ?
                  <Button variant="outlined" size="large">
                    Ver Baja
                  </Button>
                : null}
                </Stack>
              <br/><br/>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseVer}>Salir</Button>
          </DialogActions>
        </Dialog>}

        {cliente === null ? null:
          <Dialog open={openModif} onClose={handleCloseModif}>
            <DialogTitle>Nuevo cliente</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="apellido"
                label="Apellido/s"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={cliente[0].apellido}
              />
              <TextField
                margin="dense"
                id="nombre"
                label="Nombre/s"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={cliente[0].nombre}
              />
              <TextField
                margin="dense"
                id="dni"
                label="DNI"
                type="number"
                fullWidth
                variant="standard"
                defaultValue={cliente[0].dni}
              />
              <TextField
                margin="dense"
                id="domicilio"
                label="Domicilio"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={cliente[0].domicilio}
              />
              <TextField
                margin="dense"
                id="telefono"
                label="Telefono"
                type="number"
                fullWidth
                variant="standard"
                defaultValue={cliente[0].telefono}
              />
              <TextField
                margin="dense"
                id="email"
                label="Email"
                type="email"
                fullWidth
                variant="standard"
                defaultValue={cliente[0].email}
              />
              <TextField
                margin="dense"
                id="razonSocial"
                label="Razon Social"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={cliente[0].razonSocial}
              />

              <TextField
                margin="dense"
                id="cuit"
                label="Cuit"
                type="number"
                fullWidth
                variant="standard"
                defaultValue={cliente[0].cuit}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModif}>Cancelar</Button>
              <Button onClick={modificarCliente}>Guardar</Button>
            </DialogActions>
          </Dialog>
        }
        <Dialog
        open={openAlertContrato}
        onClose={handleCloseAlertContrato}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          ¿Desea crear el contrato ahora?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Seleccione "aceptar" si desea crear un contrato para este cliente ahora. O "cancelar" si desea hacerlo mas tarde.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlertContrato}>Cancelar</Button>
          <Button onClick={handleClickOpenContrato} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openContrato} onClose={handleCloseContrato}>
        <DialogTitle>Nuevo Contrato</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="id"
            label="N°"
            type="number"
            fullWidth
            variant="standard"
          />
          <br/>
          {cliente === null ? null :
            <TextField
              margin="dense"
              id="cliente"
              label="Cliente"
              type="text"
              fullWidth
              variant="standard"
              defaultValue ={cliente[0].apellido + " " + cliente[0].nombre}
            />}
            <br/>
          <FormGroup>
            <FormControlLabel control={<Switch defaultChecked id="comodato"/>} label="Comodato" />
          </FormGroup>
          <br/>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Tipo de contrato</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={contrato}
              label="crearContrato"
              onChange={handleChange}
            >
              <MenuItem value={"Wireless"}>Wireless</MenuItem>
              <MenuItem value={"FibraOptica"}>Fibra Optica</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseContrato}>Cancelar</Button>
          <Button onClick={nuevoContrato}>Añadir</Button>
        </DialogActions>
      </Dialog>
    </Page>

  );
}
const mapStateToProps = (state) => {
  return{
    clientesSinFiltro: state.firestore.ordered.Cliente,
    configuracion: state.firestore.data.Configuracion,
    cliente: state.cliente.Cliente,
    contratoC: state.contrato.Contrato,
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    crearCliente: (cliente, dni) => dispatch(crearCliente(cliente, dni)),
    crearContrato: (contrato, id) => dispatch(crearContrato(contrato, id)),
    borrarCliente: (dni) => dispatch(borrarCliente(dni)),
    buscarCliente:(campo, filtro) => dispatch(buscarCliente(campo, filtro)),
    buscarContrato:(campo, filtro) => dispatch(buscarContrato(campo, filtro)),
    modificarCliente: (id, apellido, nombre, correo, dni, domicilio, telefono, cuit, razonSocial, empresa) => dispatch(modificarCliente(id, apellido, nombre, correo, dni, domicilio, telefono, cuit, razonSocial, empresa))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {collection: 'Cliente'},
    {collection: 'Configuracion'},
    {collection: 'Contrato'}
  ])
)(Cliente);
