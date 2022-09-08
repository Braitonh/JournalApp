import { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm';
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';

const formData = {
  email: '',
  password: '',
  displayName: ''
}

export const RegisterPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth);
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);


  const dispatch = useDispatch();

  //Validar formulario y Capturar los datos de los input
  const formik = useFormik({
    initialValues: {
      displayName: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      displayName: Yup.string().required('El nombre es obligatorio'),
      email: Yup.string().email('El email no es válido').required('El email es obligatorio'),
      password: Yup.string().required('El password no puede ir vacio').min(6, 'El password deber ser al menos de 6 caracteres')
    }),
    onSubmit: valores => {
      console.log('enviando');
      console.log(valores);

      dispatch(startCreatingUserWithEmailPassword(valores))
    }
  });



  return (
    <AuthLayout title='Crear Cuenta'>


      <form onSubmit={formik.handleSubmit} className="animate__animated animate__fadeIn animate__faster">
        <Grid container>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre"
              type="nombre"
              placeholder="Tu nombre"
              fullWidth
              name='displayName'
              value={formik.values.displayName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {
              formik.touched.displayName && formik.errors.displayName ? (
                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                  <p className='font-bold'>Error</p>
                  <p>{formik.errors.displayName}</p>
                </div>

              ) : null
            }
          </Grid>



          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="Correo@google.com"
              fullWidth
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              
            />
            {
              formik.touched.email && formik.errors.email ? (
                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                  <p className='font-bold'>Error</p>
                  <p>{formik.errors.email}</p>
                </div>

              ) : null
            }
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {
              formik.touched.password && formik.errors.password ? (
                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                  <p className='font-bold'>Error</p>
                  <p>{formik.errors.password}</p>
                </div>

              ) : null
            }
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

            <Grid item xs={12} display = {!!errorMessage ? '' : 'none'} >
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12} >
              <Button type='submit' variant="contained" fullWidth>
                Crear Cuenta
              </Button>
            </Grid>

          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to='/auth/login'>
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>

    </AuthLayout>

  )
}
