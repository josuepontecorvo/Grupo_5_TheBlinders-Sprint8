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
        setCategoryError(errors.categoryId)
    };

    const handleBlurType = (e) => {
        handleChange(e);
        let errors = validateForm(form)
        setTypeError(errors.typeId)
    };

    const handleBlurDescription = (e) => {
        handleChange(e);
        let errors = validateForm(form)
        setDescriptionError(errors.description)
    };

    const handleBlurPrice = (e) => {
        handleChange(e);
        let errors = validateForm(form)
        setPriceError(errors.price)
    };

    const handleBlurDiscount = (e) => {
        handleChange(e);
        let errors = validateForm(form)
        setDiscountError(errors.discount)
    };

    const handleBlurBrand = (e) => {
        handleChange(e);
        let errors = validateForm(form)
        setBrandError(errors.brandId)
    };

    const handleBlurModel = (e) => {
        handleChange(e);
        let errors = validateForm(form)
        setModelError(errors.model)
    };

    const handleBlurSize = (e) => {
        handleChange(e);
        let errors = validateForm(form)
        setSizeError(errors.sizeId)
    };

    const handleBlurColor = (e) => {
        handleChange(e);
        let errors = validateForm(form)
        setColorError(errors.colorId)
    };

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        let newProduct = {
            categoryId: form.categoryId,
            typeId: form.typeId,
            description: form.description,
            price: form.price,
            discount: form.discount,
            brandId: form.brandId,
            model: form.model,
            sizeId: form.sizeId,
            brakeId: form.brakeId,
            colorId: form.colorId,
            wheelSizeId: form.wheelSizeId,
            frameId: form.frameId,
            shiftId: form.shiftId,
            suspensionId: form.suspensionId,
            info: form.info
        }
        console.log(newProduct)

        //fetch("http://localhost:3000/api/productos/crear", { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newProduct) })
        //    .then(res => res.json())
        //    .then(data => {
        //        console.log(data)
        //        navigate("/dashboard")
        //    })
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
