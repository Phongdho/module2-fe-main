import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Card, Col, Container, Row } from "react-bootstrap";
import productActions from "../../redux/actions/product.action";
import PaginationBar from "../../components/PaginationBar";
import { ClipLoader } from "react-spinners";
import {useHistory} from 'react-router-dom';
import "./ProductPage.css"

const ProductPage = () => {
    const [pageNum, setPageNum] = useState(1);
    const limit = 10;
    const totalPage = 30;

    const history = useHistory();
    const handleClickProduct = (productId) => {
      history.push(`/product/${productId}`);
    }
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    console.log("products", products)
    const loading = useSelector(state => state.products.loading);
    const errorMessage = useSelector(state => state.products.errorMessage);
    
    useEffect(() => {
        dispatch(productActions.getAllProducts({pageNum, limit}));
    }, [dispatch, pageNum, limit]);

    return (
        <Container>
      <Row>
        <Col>
          <h1 className="text-center product-title" style={{marginTop:"2rem", marginBottom: "3rem", color:"gray"}}>Our Apple Offerings</h1>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          {loading ? (
            <div className="text-center">
              <ClipLoader color="#f86c6b" size={150} loading={true} />
            </div>
          ) : (
            <ul className="list-unstyled d-flex flex-wrap justify-content-around" style={{margin:"auto 0", width: "100%"}}>
              {products.map((product) => (
                <li
                key={product._id}
                onClick={() => handleClickProduct(product._id)}
                >
                  <Card
                    style={{
                      width: "20rem",
                      marginBottom: "2rem",
                      marginRight: "3rem",
                      marginLeft: "3rem",
                      padding: "0.5rem"
                    }}
                    className="cardAnimation"
                  >
                    <Card.Img
                      className="product-img"
                      variant="top"
                      src={`${product.photo}`}
                    />
                    <Card.Body
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "10px",
                      }}
                    >
                      <Card.Title style={{color:"gray"}}>{product.name}</Card.Title>
                      <Card.Text>
                        <strong>Price:</strong> {product.price.toLocaleString()} USD
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </Col>
        <PaginationBar
          style={{ margin: "30px auto 30px auto" }}
          pageNum={pageNum}
          setPageNum={setPageNum}
          totalPageNum={totalPage}
        />
      </Row>
    </Container>
    )
}

export default ProductPage;
