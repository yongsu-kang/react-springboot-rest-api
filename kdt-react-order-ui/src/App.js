import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import React, {useEffect, useState} from "react";
import {ProductList} from "./components/ProductList";
import {Summary} from "./components/Summary";
import axios from "axios";

function App() {
    const [products, setProducts] = useState([
        {productId: 'uuid-1', productName:'콜롬비아 커피1', category:'커피빈', price: 5000},
        {productId: 'uuid-2', productName:'콜롬비아 커피2', category:'커피빈', price: 5000},
        {productId: 'uuid-3', productName:'콜롬비아 커피3', category:'커피빈', price: 5000}
    ]);

    const [items, setItems] = useState([]);
    const handleAddClicked = id => {
        const product = products.find(v => v.productId === id);
        const found = items.find(v => v.productId === id);
        const updatedItems =
            found ? items.map(v => (v.productId === id) ? {...v, count: v.count + 1} : v) : [...items, {...product, count: 1}]
        setItems(updatedItems);
        console.log(products.find(v => v.productId === id), "added!");
    }

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/products')
            .then(value => setProducts(value.data))
    }, []);

    const handleOrderSubmit = (order) =>{
        if (items.length === 0) {
            alert("아이템을 추가해주세요");
        } else {
            axios.post('http://localhost:8080/api/v1/orders',{
                email: order.email,
                address: order.address,
                postcode: order.postcode,
                orderItems: items.map(v => ({
                        productId: v.productId,
                        category: v.category,
                        price: v.price,
                        quantity: v.count
                }))
            }).then(
                v => alert("주문이 정상적으로 접수되었습니다"),
                e =>{
                    alert("서버 장애");
                    console.error(e);
            })
        }
    }

  return (
      <div className="container-fluid">
          <div className="row justify-content-center m-4">
              <h1 className="text-center">Grids & Circle</h1>
          </div>
          <div className="card">
              <div className="row">
                  <div className="col-md-8 mt-4 d-flex flex-column align-items-start p-3 pt-0">
                      <ProductList products={products} onAddClick={handleAddClicked}/>
                  </div>
                  <div className="col-md-4 summary p-4">
                      <Summary items={items} onOrderSubmit={handleOrderSubmit}/>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default App;
