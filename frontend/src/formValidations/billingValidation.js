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
export const shippingInfoSchema = yup.object().shape({
    calle:
        yup.string()
        .min(3, 'Ingresa Calle y número')
        .max(150)
        .required('Calle y número necesario para la entrega'),
    ciudad:
        yup.string()
        .min(5,'Ingresa el nombre de tu ciudad')
        .max(100)
        .required('Ingresa la ciudad de entrega'),
    codigoPostal:
        yup.number()
        .positive()
        .integer()
        .min(11111)
        .max(99999)
        .required('Código postal necesario para la entrega'),
    colonia: 
        yup.string()
        .min(3, 'Selecciona una colonia')
        .max(150)
        .required('Selecciona una colonia'),
    referencia:
        yup.string()
        .min(5, 'Ingresa una referencia cercana a tu domicilio')
        .max(150)
        .required('Ingresa una referencia cercana a tu domicilio'),
    celular:
        yup.number()
        .positive()
        .integer()
        .min(1111111111)
        .max(9999999999)
        .required("Necesitaremos tu número celular para completar la entrega")
        
})
