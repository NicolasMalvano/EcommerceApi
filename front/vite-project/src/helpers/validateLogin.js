export const validateLogin = (values) => {
    const errors = {};


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.email.trim()) {
    errors.email = ["Email es requerido"];
    } else if (!emailRegex.test(values.email)) {
    errors.email = ["Formato de email inválido"];
    }


    const passwordErrors = [];

    if (!values.password) {
    errors.password = "Password es requerido";
  }

  if (passwordErrors.length > 0) {
    errors.password = passwordErrors;
  }    

  return errors;
}
