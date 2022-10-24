import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const useForm = (initialForm, validateForm) => {
    const [form, setForm] = useState(initialForm)
    const [categoryError, setCategoryError] = useState("")
    const [typeError, setTypeError] = useState("")
    const [descriptionError, setDescriptionError] = useState("")
    const [priceError, setPriceError] = useState("")
    const [discountError, setDiscountError] = useState("")
    const [brandError, setBrandError] = useState("")
    const [modelError, setModelError] = useState("")
    const [sizeError, setSizeError] = useState("")
    const [colorError, setColorError] = useState("")
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState(null)
    const [fields, setFields] = useState({})

    useEffect(() => {
        fetch("http://localhost:3000/api/productos/info-formulario")
            .then(res => res.json())
            .then(data => setFields(data.data))
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    };

    const handleBlurCategory = (e) => {
        handleChange(e);
        let errors = validateForm(form)
        if(errors.categoryId) {
            e.target.style.borderColor= "#e74c3c";
        } else {
            e.target.style.borderColor= "#2ecc71";
        }
        setCategoryError(errors.categoryId)
    };

    const handleBlurType = (e) => {
        handleChange(e);
        let errors = validateForm(form)
        if(errors.typeId) {
            e.target.style.borderColor= "#e74c3c";
        } else {
            e.target.style.borderColor= "#2ecc71";
        }
        setTypeError(errors.typeId)
    };

    const handleBlurDescription = (e) => {
        handleChange(e);
        let errors = validateForm(form)
        if(errors.description) {
            e.target.style.borderColor= "#e74c3c";
        } else {
            e.target.style.borderColor= "#2ecc71";
        }
        setDescriptionError(errors.description)
    };

    const handleBlurPrice = (e) => {
        handleChange(e);
        let errors = validateForm(form)
        if(errors.price) {
            e.target.style.borderColor= "#e74c3c";
        } else {
            e.target.style.borderColor= "#2ecc71";
        }
        setPriceError(errors.price)
    };

    const handleBlurDiscount = (e) => {
        handleChange(e);
        let errors = validateForm(form)
        if(errors.discount) {
            e.target.style.borderColor= "#e74c3c";
        } else {
            e.target.style.borderColor= "#2ecc71";
        }
        setDiscountError(errors.discount)
    };

    const handleBlurBrand = (e) => {
        handleChange(e);
        let errors = validateForm(form)
        if(errors.brandId) {
            e.target.style.borderColor= "#e74c3c";
        } else {
            e.target.style.borderColor= "#2ecc71";
        }
        setBrandError(errors.brandId)
    };

    const handleBlurModel = (e) => {
        handleChange(e);
        let errors = validateForm(form)
        if(errors.model) {
            e.target.style.borderColor= "#e74c3c";
        } else {
            e.target.style.borderColor= "#2ecc71";
        }
        setModelError(errors.model)
    };

    const handleBlurSize = (e) => {
        handleChange(e);
        let errors = validateForm(form)
        if(errors.sizeId) {
            e.target.style.borderColor= "#e74c3c";
        } else {
            e.target.style.borderColor= "#2ecc71";
        }
        setSizeError(errors.sizeId)
    };

    const handleBlurColor = (e) => {
        handleChange(e);
        let errors = validateForm(form)
        if(errors.colorId) {
            e.target.style.borderColor= "#e74c3c";
        } else {
            e.target.style.borderColor= "#2ecc71";
        }
        setColorError(errors.colorId)
    };

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        // Sequelize doesn't support empty string so we replace them with "null"
        e.preventDefault();
        let newProduct = {
            categoryId: form.categoryId || null,
            typeId: form.typeId || null,
            description: form.description || null,
            price: form.price || null,
            discount: form.discount || null,
            brandId: form.brandId || null,
            model: form.model || null,
            sizeId: form.sizeId || null,
            brakeId: form.brakeId || null,
            colorId: form.colorId || null,
            wheelSizeId: form.wheelSizeId || null,
            frameId: form.frameId || null,
            shiftId: form.shiftId || null,
            suspensionId: form.suspensionId || null,
            info: form.info || null
        }
        // We verificate if there aren't errors to send the new products, if there are errors we prevent the submition. 
        let errors = validateForm(form)


        if (!Object.keys(errors).length > 0) {
            setLoading(true)
            fetch("http://localhost:3000/api/productos/crear", { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newProduct) })
           .then(res => res.json())
           .then(info => {
                setLoading(false)
                
                if (info.meta.status === 201) {
                    
                    setResponse(true)
                    setForm(initialForm)
                    setTimeout(() => {
                        setResponse(false)
                        navigate("/dashboard")
                    }, 2000);
                    
                } else {
                    let errors = info.data
                    setCategoryError(errors?.categoryId?.msg || null)
                    setTypeError(errors?.typeId?.msg || null)
                    setDescriptionError(errors?.description?.msg || null)
                    setPriceError(errors?.price?.msg || null)
                    setDiscountError(errors?.discount?.msg || null)
                    setBrandError(errors?.brandId?.msg || null)
                    setModelError(errors?.model?.msg || null)
                }
           })
        }
        
    };

    return {
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
    }
}
