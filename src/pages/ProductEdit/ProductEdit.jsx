import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { Message } from "../../components/Message";

let errors = {};

function ProductEdit() {

    const [errorsBack, setErrorsBack] = useState({})

    // useRef Hooks: select input element

    let categoryId = useRef();
    let typeId = useRef();
    let description = useRef();
    let price = useRef();
    let discount = useRef();
    let brandId = useRef();
    let model = useRef();
    let sizeId = useRef();
    let brakeId = useRef();
    let colorId = useRef();
    let wheelSizeId = useRef();
    let frameId = useRef();
    let shiftId = useRef();
    let suspensionId = useRef();
    let info = useRef();

    // Validations

    // Declare an empty object to group the validations errors 
    

    // Declare the functions that validate the inputs
    function selectValidation (select) {
        let name = select.name
        if ( !select.value ) {   
            errors[name] = "Debes seleccionar una opción"
        } else {
            delete errors[name]
        }

        const feedback = select.nextElementSibling;


        if(errors[name]) {
            feedback.innerText = errors[name];
            select.style.borderColor= "#e74c3c";
        } else {
            feedback.innerText = "";
            select.style.borderColor= "#2ecc71";
        }
    }

    function descriptionValidation () {
        if (description.current.value.trim() === "") {
            errors.description = "El campo descripción no puede estar vacio";
        } else if (description.current.value.length < 8) {
            errors.description = "La descripción debe contener 8 caracteres como mínimo";
        } else {            
            delete errors.description
        }
        // Verificate if errors exist
        const feedback = description.current.nextElementSibling;

        if (errors.description) {
            feedback.innerText = errors.description
            description.current.style.borderColor= "#e74c3c";
        } else {
            description.current.style.borderColor= "#2ecc71";
            feedback.innerText = "";
        }
    }

    function priceValidation () {

        if (price.current.value.trim() === "") {
          errors.price = "El precio no puede estar vacio";
        } else if (price.current.value <= 0) {
            errors.price = "El precio no puede ser menor a cero";
        } else {
            delete errors.price;
        }

        // Verificate if errors exist
        const feedback = price.current.nextElementSibling;

        if (errors.price) {
            feedback.innerText = errors.price;
            price.current.style.borderColor= "#e74c3c";
        } else {
            price.current.style.borderColor= "#2ecc71";
            feedback.innerText = "";
        }
    };

    function discountValidation () {

        if (discount.current.value.trim() === "") {
          errors.discount = "El descuento no puede estar vacio";
        } else if (discount.current.value < 0 || discount.current.value > 100) {
            errors.discount = "El descuento no puede ser menor a 0%, ni mayor a 100%";
        } else {
            delete errors.discount;
        }

        // Verificate if errors exist
        const feedback = discount.current.nextElementSibling;

        if (errors.discount) {
            feedback.innerText = errors.discount;
            discount.current.style.borderColor= "#e74c3c";
        } else {
            discount.current.style.borderColor= "#2ecc71";
            feedback.innerText = "";
        }
    };

    function modelValidation () {
        if (model.current.value.trim() === "") {
            errors.model = "El campo modelo no puede estar vacio";
        } else if (model.current.value.length < 2) {
            errors.model = "El modelo debe contener 2 caracteres como mínimo";
        } else {            
            delete errors.model
        }
        // Verificate if errors exist
        const feedback = model.current.nextElementSibling;

        if (errors.model) {
            feedback.innerText = errors.model
            model.current.style.borderColor= "#e74c3c";
        } else {
            model.current.style.borderColor= "#2ecc71";
            feedback.innerText = "";
        }
    };

    // Hooks

    const navigate = useNavigate()
    const [fields, setFields] = useState({})
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState(null)
    const [initialValues, setInitialValues] = useState({})

    useEffect(() => {
        fetch("https://theblinders-sprint7.herokuapp.com/api/productos/info-formulario")
            .then(res => res.json())
            .then(data => setFields(data.data))
    }, [])

    const { id } = useParams();
    

    useEffect(() => {
        let url = `https://theblinders-sprint7.herokuapp.com/api/productos/editar/${id}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setInitialValues ( {
                    categoryId: data.data.CategoryId,
                    typeId: data.data.typeId,
                    description: data.data.description,
                    price: data.data.price,
                    discount: data.data.discount,
                    brandId: data.data.brandId,
                    model: data.data.model,
                    sizeId: data.data.sizeId,
                    brakeId: data.data.brakeId,
                    colorId: data.data.colorId,
                    wheelSizeId: data.data.wheelSizeId,
                    frameId: data.data.frameId,
                    shiftId: data.data.shiftId,
                    suspensionId: data.data.suspensionId,
                    info: data.data.info,
                } )
            })
        
        }, [id])

    function handleSubmit(e) {
        e.preventDefault();
        let editProduct = {
            // Sequelize doesn't support empty string so we replace them with "null"
            categoryId: categoryId.current.value || null, 
            typeId: typeId.current.value || null, 
            description: description.current.value || null, 
            price: price.current.value || null, 
            discount: discount.current.value || null, 
            brandId: brandId.current.value || null, 
            model: model.current.value || null, 
            sizeId: sizeId.current.value || null, 
            brakeId: brakeId.current.value || null, 
            colorId: colorId.current.value || null,
            wheelSizeId: wheelSizeId.current.value || null, 
            frameId: frameId.current.value || null, 
            shiftId: shiftId.current.value || null, 
            suspensionId: suspensionId.current.value || null, 
            info: info.current.value || null
        }

        console.log(editProduct)
        // We verificate if there aren't errors to send the new products, if there are errors we prevent the submition. 

        if (Object.keys(errors).length === 0) {
            setLoading(true)
            let url = `https://theblinders-sprint7.herokuapp.com/api/productos/editar/${id}`
            fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editProduct) })
           .then(res => res.json())
           .then(info => {
                setLoading(false)
                
                if (info.meta.status === 200) {
                    
                    setResponse(true)
                    setTimeout(() => {
                        setResponse(false)
                        navigate("/dashboard")
                    }, 2000);
                    
                } else {
                    setErrorsBack({...info.data}) 
                    console.log(errorsBack)
                }
           })
        } else {
            console.log(errors)
        }

        
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInitialValues({
            ...initialValues,
            [name]: value
        })
    };

    return (

        <div className="container">
            <h2 className="text-center my-5">Editar Producto</h2>
            <form className="col-8 mx-auto" onSubmit={handleSubmit}>
                <div className="mb-3 row">
                    <label htmlFor="inputCategory" className="col-lg-4 col-form-label">Producto:</label>
                    <select ref={categoryId} name="categoryId" className="form-control" id="inputCategory" onBlur={(e)=>{selectValidation (e.target)}} value={initialValues.categoryId ?  initialValues.categoryId : ""} onChange={handleChange}>
                        <option value=""  >- Seleccione el Producto - </option>
                        {fields.categories?.map(category => {
                            return <option value={category.id} key={category.id}> {category.name} </option>
                        })}
                    </select>
                    <small className="col-lg-12 my-1 text-center text-danger">{errorsBack?.categoryId ? errorsBack?.categoryId.msg : "" }</small>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputType" className="col-lg-4 col-form-label">Tipo:</label>
                    <select ref={typeId} name="typeId" className="form-control" id="inputType" onBlur={(e)=>{selectValidation (e.target)}} value={initialValues.typeId ?  initialValues.typeId : ""} onChange={handleChange}>
                        <option value=""  >- Seleccione el Tipo - </option>
                        {fields.types?.map(type => {
                            return <option value={type.id} key={type.id}> {type.name} </option>
                        })}
                    </select>
                    <small className="col-lg-12 my-1 text-center text-danger">{errorsBack?.typeId ? errorsBack?.typeId.msg : "" }</small>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputDescription" className="col-lg-4 col-form-label">Descripción:</label>
                    <input ref={description} type="text" name="description" className="form-control" id="inputDescription" onBlur={descriptionValidation} value={initialValues.description ?  initialValues.description : ""} onChange={handleChange}/>
                    <small className="col-lg-12 my-1 text-center text-danger">{errorsBack?.description ? errorsBack?.description.msg : "" }</small>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="Price" className="col-lg-4 col-form-label">Precio:</label>
                    <input ref={price} type="number" name="price" className="form-control" id="inputPrice"  onBlur={priceValidation} value={initialValues.price ?  initialValues.price : ""} onChange={handleChange}/>
                    <small className="col-lg-12 my-1 text-center text-danger">{errorsBack?.price ? errorsBack?.price.msg : "" }</small>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputDiscount" className="col-lg-4 col-form-label">Descuento:</label>
                    <input ref={discount} type="number" name="discount" className="form-control" id="inputDiscount" onBlur={discountValidation} value={initialValues.discount ?  initialValues.discount : ""} onChange={handleChange}/>
                    <small className="col-lg-12 my-1 text-center text-danger">{errorsBack?.discount ? errorsBack?.discount.msg : "" }</small>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputBrand" className="col-lg-2 col-form-label">Marca:</label>
                    <select ref={brandId} name="brandId" className="form-control" id="inputBrand" onBlur={(e)=>{selectValidation (e.target)}} value={initialValues.brandId ?  initialValues.brandId : ""} onChange={handleChange}>
                        <option value=""  >- Seleccione la Marca - </option>
                        {fields.brands?.map(brand => {
                            return <option value={brand.id} key={brand.id}> {brand.name} </option>
                        })}
                    </select>
                    <small className="col-lg-12 my-1 text-center text-danger" >{errorsBack?.brandId ? errorsBack?.brandId.msg : "" }</small>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputModel" className="col-lg-4 col-form-label">Modelo:</label>
                    <input ref={model} type="text" name="model" className="form-control" id="inputModel" onBlur={modelValidation} value={initialValues.model ?  initialValues.model : ""} onChange={handleChange}/>
                    <small className="col-lg-12 my-1 text-center text-danger"></small>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputSize" className="col-lg-4 col-form-label">Talle:</label>
                    <select ref={sizeId} name="sizeId" className="form-control" id="inputsize" onBlur={(e)=>{selectValidation (e.target)}} value={initialValues.sizeId ?  initialValues.sizeId : ""} onChange={handleChange}>
                        <option value=""  >- Seleccione el Talle - </option>
                        {fields.sizes?.map(size => {
                            return <option value={size.id} key={size.id}> {size.name} </option>
                        })}
                    </select>
                    <small className="col-lg-12 my-1 text-center text-danger">{errorsBack?.sizeId ? errorsBack?.sizeId.msg : "" }</small>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputColor" className="col-lg-4 col-form-label">Color:</label>
                    <select ref={colorId} name="colorId" className="form-control" id="inputColor" onBlur={(e)=>{selectValidation (e.target)}} value={initialValues.colorId ?  initialValues.colorId : ""} onChange={handleChange}>
                        <option value=""  >- Seleccione el Color - </option>
                        {fields.colors?.map(color => {
                            return <option value={color.id} key={color.id}> {color.name} </option>
                        })}
                    </select>
                    <small className="col-lg-12 my-1 text-center text-danger">{errorsBack?.colorId ? errorsBack?.colorId.msg : "" }</small>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputRolled" className="col-lg-4 col-form-label">Rodado:</label>
                    <select ref={wheelSizeId} name="wheelSizeId" className="form-control" id="inputRolled" value={initialValues.wheelSizeId ?  initialValues.wheelSizeId : ""} onChange={handleChange}>
                        <option value=""  >- Seleccione el Rodado - </option>
                        {fields.wheelSizes?.map(size => {
                            return <option value={size.id} key={size.id}> {size.number} </option>
                        })}
                    </select>
                    <small className="col-lg-12 my-1 text-center text-danger">{errorsBack?.wheelSizeId ? errorsBack?.wheelSizeId.msg : "" }</small>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputFrame" className="col-lg-4 col-form-label">Estructura:</label>
                    <select ref={frameId} name="frameId" className="form-control" id="inputFrame" value={initialValues.frameId ?  initialValues.frameId : ""} onChange={handleChange}>
                        <option value=""  >- Seleccione la Estructura - </option>
                        {fields.frames?.map(frame => {
                            return <option value={frame.id} key={frame.id}> {frame.name} </option>
                        })}
                    </select>
                    <small className="col-lg-12 my-1 text-center text-danger"></small>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputShifter" className="col-lg-4 col-form-label">Cambios:</label>
                    <select ref={shiftId} name="shiftId" className="form-control" id="inputShifter" value={initialValues.shiftId ?  initialValues.shiftId : ""} onChange={handleChange}>
                        <option value=""  >- Seleccione la cantidad de Cambios - </option>
                        {fields.shifts?.map(shift => {
                            return <option value={shift.id} key={shift.id}> {shift.number} </option>
                        })}
                    </select>
                    <small className="col-lg-12 my-1 text-center text-danger"></small>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputBrakes" className="col-lg-4 col-form-label">Frenos:</label>
                    <select ref={brakeId} name="brakeId" className="form-control" id="inputBrakes" value={initialValues.brakeId ?  initialValues.brakeId : ""} onChange={handleChange}>
                        <option value=""  >- Seleccione el tipo de Freno - </option>
                        {fields.brakes?.map(brake => {
                            return <option value={brake.id} key={brake.id}> {brake.type} </option>
                        })}
                    </select>
                    <small className="col-lg-12 my-1 text-center text-danger"></small>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputSuspension" className="col-lg-4 col-form-label">Suspensión:</label>
                    <select ref={suspensionId} name="suspensionId" className="form-control" id="inputSuspension" value={initialValues.suspensionId ?  initialValues.suspensionId : ""} onChange={handleChange}>
                        <option value=""  >- Seleccione la Suspensión - </option>
                        {fields.suspensions?.map(suspension => {
                            return <option value={suspension.id} key={suspension.id}> {suspension.type} </option>
                        })}
                    </select>
                    <small className="col-lg-12 my-1 text-center text-danger"></small>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputInfo" className="col-lg-4 col-form-label">Info Adicional:</label>
                    <textarea ref={info} name="info" className="form-control" id="inputInfo" cols="30" rows="10" value={initialValues.info ?  initialValues.info : ""} onChange={handleChange}></textarea>
                    <small className="col-lg-12 my-1 text-center text-danger"></small>
                </div>
                <div className="mb-3 row">
                    <button type="reset" className="btn btn-primary col-lg-12 mb-3">Limpiar</button>
                    <button type="submit" className="btn btn-primary col-lg-12 mb-3">Confirmar</button>
                </div>
            </form>
            {loading && <Loader />}
            {response && <Message msg="Producto editado" bgColor="#198754" />}
        </div>
    )
}

export default ProductEdit