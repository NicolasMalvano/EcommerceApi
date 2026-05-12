import {Formik, Form, ErrorMessage, Field } from 'formik'
import Swal from 'sweetalert2'
import Styles from './Login.module.css'
import { validateLogin } from '../../helpers/validateLogin';
import { useNavigate, Link} from 'react-router-dom';
import { useContext } from 'react';
import { UsersContext } from '../../Context/UsersContext';

const Login = () => {
    
    const navigate = useNavigate()
    const {loginUser} = useContext(UsersContext)

    const Peticion = (values) => {
        loginUser(values)
        .then((res) => {
            if(res === 200) {  
                Swal.fire({
                    theme: 'dark',
                    title: 'Éxito!',
                    text: 'Usuario logueado correctamente',
                    icon: 'success'
                });
                navigate("/home");
            }
        })
        .catch((error) => {
            Swal.fire({
                theme: 'dark',
                title: 'Error!',
                text: 'Inténtelo nuevamente',
                icon: 'error',
                
            });
            console.log(error);
        });
    };


    return(
        <div className={Styles.body}>

        <Formik 
        initialValues={{email: '', password: ''}}
        validate={validateLogin}
        onSubmit={Peticion}
        >

            <Form className={Styles.form}>
                <h2>LOGIN</h2>
                
                <label>email: </label>
                <Field type="text" name="email" placeholder="email" />
                <ErrorMessage  name="email" component="p" className={Styles.error}/>
                
                <label>password: </label>
                <Field type="password" name="password" placeholder="password"/>
                <ErrorMessage name="password" component="p" className={Styles.error}/>
                
                <button type='submit'>Submit</button>
                
                <Link to="/register" className={Styles.register}> ¿Aún no tienes cuenta? Registrate </Link>

            </Form>

        </Formik>

        
        </div>
    )
}

export default Login;