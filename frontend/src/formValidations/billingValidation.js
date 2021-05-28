import * as yup from 'yup'

export const billingInfoSchema = yup.object().shape({
    name: 
        yup.string()
        .matches(/^[a-zA-Z\s]+$/, {excludeEmptyString: true, message: 'El nombre debe de contener solo letras'})
        .min(5 ,'Ingresa el nombre completo del titular')
        .required("Ingresa el nombre del titular"),
    zip: 
        yup.number()
        .positive()
        .integer()
        .min(11111)
        .max(99999)
        .required("Código postal de facturación de la tarjeta (5 dígitos)")

})
