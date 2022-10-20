import { LastProductInDb } from "../LastProductInDb";
import { useEffect, useState } from "react";
import { CategoriesInDb } from "../CategoriesInDb";

function ContentRowCenter() {
    const [detail, setDetail] = useState('/api/productos/1')
    const [lastProduct, setLastProduct] = useState({})
    const [categories, setCategories] = useState({})

    useEffect(() => {
        let url = 'http://localhost:3000/api/productos'
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setDetail(data.data[data.data.length - 1].detail)
                setCategories(data.meta.totalByCategory)
            })
        let detailUrl = `http://localhost:3000${detail}`
        fetch(detailUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data.data)
                setLastProduct(data.data)
            })
    }, [detail])



    return (
        <div className="row">
            <LastProductInDb  {...lastProduct}/>
            <CategoriesInDb {...categories}/>
        </div>
    )
}

export default ContentRowCenter;