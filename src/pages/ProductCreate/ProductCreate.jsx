import { useForm } from "../../hooks/useForm";

const initialForm = {
    categoryId: "",
    typeId: "",
    description: "",
    price: "",
    discount: "",
    brandId: "",
    model: "",
    sizeId: "",
    brakeId: "",
    colorId: "",
    wheelSizeId: "",
    frameId: "",
    shiftId: "",
    suspensionId: "",
    info: "",
};

// Validaciones

const validateForm = (form) => {
    let errors = {};
    if (!form.categoryId) {
        errors.categoryId = 'Debe seleccionar una opcion'
    } else {
        delete errors.categoryId
    }


    if (!form.typeId) {
        errors.typeId = 'Debe seleccionar una opcion'
    } else {
        delete errors.typeId
    }


    if (!form.description.trim()) {
        errors.description = "El campo no puede estar vacio"
    } else if (form.description.length < 8) {
        errors.description = "La descripción debe contener 8 caracteres como mínimo";
    } else {            
        delete errors.description
    }


    if (!form.price.trim()) {
        errors.price = "El precio no puede estar vacio";
      } else if (+form.price <= 0) {
          errors.price = "El precio no puede ser menor a cero";
      } else {
          delete errors.price;
      }


      if (!form.discount.trim()) {
        errors.discount = "El descuento no puede estar vacio";
      } else if (+form.discount < 0 || +form.discount > 100) {
          errors.discount = "El descuento no puede ser menor a 0%, ni mayor a 100%";
      } else {
          delete errors.discount;
      }


      if (!form.brandId) {
        errors.brandId = 'Debe seleccionar una opcion'
    } else {
        delete errors.brandId
    }


      if (!form.model.trim()) {
        errors.model = "El campo modelo no puede estar vacio";
    } else if (form.model.length < 2) {
        errors.model = "El modelo debe contener 2 caracteres como mínimo";
    } else {            
        delete errors.model
    }


    if (!form.sizeId) {
        errors.sizeId = 'Debe seleccionar una opcion'
    } else {
        delete errors.sizeId
    }


    if (!form.colorId) {
        errors.colorId = 'Debe seleccionar una opcion'
    } else {
        delete errors.colorId
    }


    return errors
}

function ProductCreate() {
    // Hook useForm

    const {
        form, 
        categoryError,
        typeError,
        descriptionError,
        priceError,
        discountError,
        brandError,
        modelError,
        sizeError,
        colorError, 
        loading, 
        response,
        fields, 
        handleChange, 
        handleBlurCategory,
        handleBlurType,
        handleBlurDescription,
        handleBlurPrice,
        handleBlurDiscount,
        handleBlurBrand,
        handleBlurModel,
        handleBlurSize,
        handleBlurColor, 
        handleSubmit
    } = useForm(initialForm, validateForm)

    let errorStyle = {
        color: "#e74c3c",
        fontWeight: "bold"
    }


    return (

        <div className="container">
            <h2 className="text-center my-5">Crear Producto</h2>
            <form className="col-8 mx-auto" onSubmit={handleSubmit}>
                <div className="mb-3 row">
                    <label htmlFor="inputCategory" className="col-lg-4 col-form-label">Producto:</label>
                    <select  name="categoryId" className="form-control" id="inputCategory" onChange={handleChange} onBlur={handleBlurCategory}>
                        <option value=""  >- Seleccione el Producto - </option>
                        {fields.categories?.map(category => {
                            return <option value={category.id} key={category.id}> {category.name} </option>
                        })}
                    </select>
                    {{categoryError} && <small className="col-lg-12 my-1 text-center" style={errorStyle}>{categoryError}</small>}
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputType" className="col-lg-4 col-form-label">Tipo:</label>
                    <select name="typeId" className="form-control" id="inputType" onChange={handleChange} onBlur={handleBlurType}>
                        <option value=""  >- Seleccione el Tipo - </option>
                        {fields.types?.map(type => {
                            return <option value={type.id} key={type.id}> {type.name} </option>
                        })}
                    </select>
                    {{typeError} && <small className="col-lg-12 my-1 text-center" style={errorStyle}>{typeError}</small>}
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputDescription" className="col-lg-4 col-form-label">Descripción:</label>
                    <input type="text" name="description" className="form-control" id="inputDescription" onBlur={handleBlurDescription} onChange={handleChange} value={form.description}/>
                    {{descriptionError} && <small className="col-lg-12 my-1 text-center">{descriptionError}</small>}
                </div>
                <div className="mb-3 row">
                    <label htmlFor="Price" className="col-lg-4 col-form-label">Precio:</label>
                    <input type="number" name="price" className="form-control" id="inputPrice" onChange={handleChange} onBlur={handleBlurPrice}/>
                    {{priceError} && <small className="col-lg-12 my-1 text-center" style={errorStyle}>{priceError}</small>}
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputDiscount" className="col-lg-4 col-form-label">Descuento:</label>
                    <input type="number" name="discount" className="form-control" id="inputDiscount" onChange={handleChange} onBlur={handleBlurDiscount}/>
                    {{discountError} && <small className="col-lg-12 my-1 text-center" style={errorStyle}>{discountError}</small>}
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputBrand" className="col-lg-2 col-form-label">Marca:</label>
                    <select name="brandId" className="form-control" id="inputBrand" onChange={handleChange} onBlur={handleBlurBrand}>
                        <option value=""  >- Seleccione la Marca - </option>
                        {fields.brands?.map(brand => {
                            return <option value={brand.id} key={brand.id}> {brand.name} </option>
                        })}
                    </select>
                    {{brandError} && <small className="col-lg-12 my-1 text-center" style={errorStyle}>{brandError}</small>}
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputModel" className="col-lg-4 col-form-label">Modelo:</label>
                    <input type="text" name="model" className="form-control" id="inputModel" onChange={handleChange} onBlur={handleBlurModel}/>
                    {{modelError} && <small className="col-lg-12 my-1 text-center" style={errorStyle}>{modelError}</small>}
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputSize" className="col-lg-4 col-form-label">Talle:</label>
                    <select name="sizeId" className="form-control" id="inputsize" onChange={handleChange} onBlur={handleBlurSize}>
                        <option value=""  >- Seleccione el Talle - </option>
                        {fields.sizes?.map(size => {
                            return <option value={size.id} key={size.id}> {size.name} </option>
                        })}
                    </select>
                    {{sizeError} && <small className="col-lg-12 my-1 text-center" style={errorStyle}>{sizeError}</small>}
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputColor" className="col-lg-4 col-form-label">Color:</label>
                    <select name="colorId" className="form-control" id="inputColor" onChange={handleChange} onBlur={handleBlurColor}>
                        <option value=""  >- Seleccione el Color - </option>
                        {fields.colors?.map(color => {
                            return <option value={color.id} key={color.id}> {color.name} </option>
                        })}
                    </select>
                    {{colorError} && <small className="col-lg-12 my-1 text-center" style={errorStyle}>{colorError}</small>}
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputRolled" className="col-lg-4 col-form-label">Rodado:</label>
                    <select name="wheelSizeId" className="form-control" id="inputRolled" onChange={handleChange}>
                        <option value=""  >- Seleccione el Rodado - </option>
                        {fields.wheelSizes?.map(size => {
                            return <option value={size.id} key={size.id}> {size.number} </option>
                        })}
                    </select>
                    <small className="col-lg-12 my-1 text-center"></small>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputFrame" className="col-lg-4 col-form-label">Estructura:</label>
                    <select name="frameId" className="form-control" id="inputFrame" onChange={handleChange}>
                        <option value=""  >- Seleccione la Estructura - </option>
                        {fields.frames?.map(frame => {
                            return <option value={frame.id} key={frame.id}> {frame.name} </option>
                        })}
                    </select>
                    <small className="col-lg-12 my-1 text-center"></small>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputShifter" className="col-lg-4 col-form-label">Cambios:</label>
                    <select name="shiftId" className="form-control" id="inputShifter" onChange={handleChange}>
                        <option value=""  >- Seleccione la cantidad de Cambios - </option>
                        {fields.shifts?.map(shift => {
                            return <option value={shift.id} key={shift.id}> {shift.number} </option>
                        })}
                    </select>
                    <small className="col-lg-12 my-1 text-center"></small>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputBrakes" className="col-lg-4 col-form-label">Frenos:</label>
                    <select name="brakeId" className="form-control" id="inputBrakes" onChange={handleChange}>
                        <option value=""  >- Seleccione el tipo de Freno - </option>
                        {fields.brakes?.map(brake => {
                            return <option value={brake.id} key={brake.id}> {brake.type} </option>
                        })}
                    </select>
                    <small className="col-lg-12 my-1 text-center"></small>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputSuspension" className="col-lg-4 col-form-label">Suspensión:</label>
                    <select name="suspensionId" className="form-control" id="inputSuspension" onChange={handleChange}>
                        <option value=""  >- Seleccione la Suspensión - </option>
                        {fields.suspensions?.map(suspension => {
                            return <option value={suspension.id} key={suspension.id}> {suspension.type} </option>
                        })}
                    </select>
                    <small className="col-lg-12 my-1 text-center"></small>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputInfo" className="col-lg-4 col-form-label">Info Adicional:</label>
                    <textarea name="info" className="form-control" id="inputInfo" cols="30" rows="10" onChange={handleChange}></textarea>
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