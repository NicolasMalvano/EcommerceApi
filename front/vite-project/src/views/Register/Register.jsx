
import {Formik, Form, ErrorMessage, Field } from 'formik'
import { validateRegister } from '../../helpers/validateRegister';
import Styles from "./Register.module.css"

import { useNavigate, Link} from 'react-router-dom';
import { useContext } from 'react';

const Register = () => {

    return(

    <div className={Styles.container}>

        <Formik
        initialValues={{name: '', email: '', birthdate: '', nDni: '', username: '', password: ''}}
        validate={validateRegister}
        >
        <Form className={Styles.form}>
            <h2>REGISTRO</h2>

          <label>Nombre: </label>
          <Field type="text" name="name" placeholder="name" />
          <ErrorMessage  name="name" component="p" className={Styles.error}/>

          <label>Email: </label>
          <Field type="text" name="email" placeholder="email"/>
          <ErrorMessage name="email" component="p" className={Styles.error}/>
       
          <label>Birthdate: </label>
          <Field type="date" name="birthdate" placeholder="birthdate"/>
          <ErrorMessage name="birthdate" component="p" className={Styles.error}/>
   

          <label>DNI: </label>
          <Field type="number" name="nDni" placeholder="DNI"/>
          <ErrorMessage name="nDni" component="p" className={Styles.error}/>
 

        
          <label>username: </label>
          <Field type="text" name="username" placeholder="username"/>
          <ErrorMessage name="username" component="p" className={Styles.error}/>


          <label>password: </label>
          <Field type="password" name="password" placeholder="******"/>
          <ErrorMessage name="password" component="p" className={Styles.error}/>


          <button type='submit'>Submit</button>

          <Link to="/login" className={Styles.login}> Volver al LOGIN </Link>

        </Form>

        </Formik>

    </div>
        
    )
}

export default Register;