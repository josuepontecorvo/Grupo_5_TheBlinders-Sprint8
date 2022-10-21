import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";

function ProductCreate() {
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
    let errors = {};

    // Declare the functions that validate the inputs
    function selectValidation (select) {
       
        if ( !select.value ) {   
            errors[select] = "Debes seleccionar una opción"
        } else {
            delete errors[select]
        }

        const feedback = select.nextElementSibling;
        

        if(errors[select]) {
            feedback.innerText = errors[select];
            select.style.borderColor= "#e74c3c";
        } else {
            feedback.innerText = "";
            select.style.borderColor= "#2ecc71";
        }
    }

    function descriptionValidation () {
        if (description.current.value.trim() == "") {
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
        
        if (price.current.value.trim() == "") {
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
        
        if (discount.current.value.trim() == "") {
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
        if (model.current.value.trim() == "") {
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

    useEffect(() => {
        fetch("http://localhost:3000/api/productos/info-formulario")
            .then(res => res.json())
            .then(data => setFields(data.data))
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        let newProduct = {
            categoryId: categoryId.current.value, 
            typeId: typeId.current.value, 
            description: description.current.value, 
            price: price.current.value, 
            discount: discount.current.value, 
            brandId: brandId.current.value, 
            model: model.current.value, 
            sizeId: sizeId.current.value, 
            brakeId: brakeId.current.value, 
            colorId: colorId.current.value,
            wheelSizeId: wheelSizeId.current.value, 
            frameId: frameId.current.value, 
            shiftId: shiftId.current.value, 
            suspensionId: suspensionId.current.value, 
            info: info.current.value
        }

        fetch("http://localhost:3000/api/productos/crear", {method: 'POST', headers: {'Content-Type': 'application/json'},body: JSON.stringify(newProduct)})
            .then(res => res.json())
            .then(data => {
                console.log(data)
                navigate("/dashboard")
            })
    }

    return (

        <div className="container">
            <h2 className="text-center my-5">Crear Producto</h2>
            <form className="col-8 mx-auto" onSubmit={handleSubmit}>
                <div className="mb-3 row">
                    <label htmlFor="inputCategory" className="col-lg-4 col-form-label">Producto:</label>
                    <select ref={categoryId} name="categoryId" className="form-control" id="inputCategory" onBlur={(e)=>{selectValidation (e.target)}}>
                        <option value=""  >- Seleccione el Producto - </option>
                        {fields.categories?.map(category => {
                            return <option value={category.id} key={category.id}> {category.name} </option>
                        })}
                    </select>
                    <small className="col-lg-12 my-1 text-center"></small>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputType" className="col-lg-4 col-form-label">Tipo:</label>
                    <select ref={typeId} name="typeId" className="form-control" id="inputType" onBlur={(e)=>{selectValidation (e.target)}}>
                        <option value=""  >- Seleccione el Tipo - </option>
                        {fields.types?.map(type => {
                            return <option value={type.id} key={type.id}> {type.name} </option>
                        })}
                    </select>
                    <small className="col-lg-12 my-1 text-center"></small>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputDescription" className="col-lg-4 col-form-label">Descripción:</label>
                    <input ref={description} type="text" name="description" className="form-control" id="inputDescription" onBlur={descriptionValidation} />
                    <small className="col-lg-12 my-1 text-center"></small>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="Price" className="col-lg-4 col-form-label">Precio:</label>
                    <input ref={price} type="number" name="price" className="form-control" id="inputPrice" onBlur={priceValidation}/>
                    <small className="col-lg-12 my-1 text-center"></small>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputDiscount" className="col-lg-4 col-form-label">Descuento:</label>
                    <input ref={discount} type="number" name="discount" className="form-control" id="inputDiscount" onBlur={discountValidation}/>
                    <small className="col-lg-12 my-1 text-center"></small>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputBrand" className="col-lg-2 col-form-label">Marca:</label>
                    <select ref={brandId} name="brandId" className="form-control" id="inputBrand" onBlur={(e)=>{selectValidation (e.target)}}>
                        <option value=""  >- Seleccione la Marca - </option>
                        {fields.brands?.map(brand => {
                            return <option value={brand.id} key={brand.id}> {brand.name} </option>
                        })}
                    </select>
                    <small className="col-lg-12 my-1 text-center"></small>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputModel" className="col-lg-4 col-form-label">Modelo:</label>
                    <input ref={model} type="text" name="model" className="form-control" id="inputModel" onBlur={modelValidation}/>
                    <small className="col-lg-12 my-1 text-center"></small>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputSize" className="col-lg-4 col-form-label">Talle:</label>
                    <select ref={sizeId} name="sizeId" className="form-control" id="inputsize" onBlur={(e)=>{selectValidation (e.target)}}>
                        <option value=""  >- Seleccione el Talle - </option>
                        {fields.sizes?.map(size => {
                            return <option value={size.id} key={size.id}> {size.name} </option>
                        })}
                    </select>
                    <small className="col-lg-12 my-1 text-center"></small>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputColor" className="col-lg-4 col-form-label">Color:</label>
                    <select ref={colorId} name="colorId" className="form-control" id="inputColor" onBlur={(e)=>{selectValidation (e.target)}}>
                        <option value=""  >- Seleccione el Color - </option>
                        {fields.colors?.map(color => {
                            return <option value={color.id} key={color.id}> {color.name} </option>
                        })}
                    </select>
                    <small className="col-lg-12 my-1 text-center"></small>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputRolled" className="col-lg-4 col-form-label">Rodado:</label>
                    <select ref={wheelSizeId} name="wheelSizeId" className="form-control" id="inputRolled">
                        <option value=""  >- Seleccione el Rodado - </option>
                        {fields.wheelSizes?.map(size => {
                            return <option value={size.id} key={size.id}> {size.number} </option>
                        })}
                    </select>
                    <small className="col-lg-12 my-1 text-center"></small>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputFrame" className="col-lg-4 col-form-label">Estructura:</label>
                    <select ref={frameId} name="frameId" className="form-control" id="inputFrame">
                        <option value=""  >- Seleccione la Estructura - </option>
                        {fields.frames?.map(frame => {
                            return <option value={frame.id} key={frame.id}> {frame.name} </option>
                        })}
                    </select>
                    <small className="col-lg-12 my-1 text-center"></small>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputShifter" className="col-lg-4 col-form-label">Cambios:</label>
                    <select ref={shiftId} name="shiftId" className="form-control" id="inputShifter">
                        <option value=""  >- Seleccione la cantidad de Cambios - </option>
                        {fields.shifts?.map(shift => {
                            return <option value={shift.id} key={shift.id}> {shift.number} </option>
                        })}
                    </select>
                    <small className="col-lg-12 my-1 text-center"></small>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputBrakes" className="col-lg-4 col-form-label">Frenos:</label>
                    <select ref={brakeId} name="brakeId" className="form-control" id="inputBrakes">
                        <option value=""  >- Seleccione el tipo de Freno - </option>
                        {fields.brakes?.map(brake => {
                            return <option value={brake.id} key={brake.id}> {brake.type} </option>
                        })}
                    </select>
                    <small className="col-lg-12 my-1 text-center"></small>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputSuspension" className="col-lg-4 col-form-label">Suspensión:</label>
                    <select ref={suspensionId} name="suspensionId" className="form-control" id="inputSuspension">
                        <option value=""  >- Seleccione la Suspensión - </option>
                        {fields.suspensions?.map(suspension => {
                            return <option value={suspension.id} key={suspension.id}> {suspension.type} </option>
                        })}
                    </select>
                    <small className="col-lg-12 my-1 text-center"></small>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputInfo" className="col-lg-4 col-form-label">Info Adicional:</label>
                    <textarea ref={info} name="info" className="form-control" id="inputInfo" cols="30" rows="10"></textarea>
                    <small className="col-lg-12 my-1 text-center"></small>
                </div>
                <div className="mb-3 row">
                    <button type="reset" className="btn btn-primary col-lg-12 mb-3">Limpiar</button>
                    <button type="submit" className="btn btn-primary col-lg-12 mb-3">Confirmar</button>
                </div>
            </form>
        </div>
    )
}
export default ProductCreate