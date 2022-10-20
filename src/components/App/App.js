import React from 'react';
import { useEffect, useState } from "react";
import ContentRowDb from '../../pages/ContentRowDb'
import LastProductInDb from '../../pages/LastProductInDb';
function App() {
  const [detail, setDetail] = useState('/api/productos/1')
  const [lastProduct, setLastProduct] = useState({})

  useEffect(() => {
    let url = 'http://localhost:3000/api/productos'
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setDetail(data.data[data.data.length - 1].detail)
      })
    let detailUrl = `http://localhost:3000${detail}`
    fetch(detailUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data.data)
        setLastProduct(data.data)
      })
  }, [detail])

  /*let i = products.length - 1;
  let lastProduct = products[i]*/

  return (
    <React.Fragment>
      <ContentRowDb />
      <LastProductInDb  {...lastProduct}/>
    </React.Fragment>
  );
}

export default App;
