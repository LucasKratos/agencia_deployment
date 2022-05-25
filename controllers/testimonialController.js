import { Testimonial } from '../models/Testimoniales.js'

const guardarTestimonial = async (req, res)=>{

    // Validar
    const { nombre, correo, mensaje } = req.body;

    const errores= []; 

    if(nombre.trim()===''){
        errores.push({mensaje: 'El nombre esta vacío'});
    }

    if(correo.trim()===''){
        errores.push({mensaje: 'El correo esta vacío'});
    }

    if(mensaje.trim()===''){
        errores.push({mensaje: 'El mensaje esta vacío'});
    }

    if(errores.length > 0){

        //consultar testimoniales existentes

        const testimoniales = await Testimonial.findAll();
        //Mostrar lista de errores
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales

        })
    }else {

        try{ 
            await Testimonial.create({
                nombre,
                correo,
                mensaje

                
        });
        
            const testimoniales = await Testimonial.findAll();
            //Mostrar lista de errores
            res.render('testimoniales', {
                pagina: 'Testimoniales',
                errores,
                nombre,
                correo,
                mensaje,
                testimoniales

        })

        } catch (error){
            console.log(error)
        }

    };


    console.log(errores)
};
export {
    guardarTestimonial
};