import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import productActions from "../../redux/actions/product.action";
import userActions from "../../redux/actions/user.action";
import "./DetailPage.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DetailPage = () => {
    const [addingProductToCart, setAddingProductToCart] = useState(false);
    const [updateId, setUpdateId] = useState(false);
    const params = useParams();
    const productId = params.id;

    const [deleteReview, setDeleteReview] = useState("");
    const [comment, setComment] = useState(false);
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(1);
    const [updateComment, setUpdateComment] = useState(false)

    const product = useSelector((state) => state.products.singleProduct);
    const loading = useSelector((state) => state.products.loading);
    const comments = useSelector(state => state.users.comment);

    const dispatch = useDispatch();

    const handleCommentText = (e) => {
        console.log(e.target.value, 'key here')
        setComment(e.target.value)
    }

    const addToCart = (product) => {
        console.log(product)
        setAddingProductToCart(product?._id);
      };

    const updateProductToCart = (product) => {
    setUpdateId(product?._id);
    };

    useEffect(() => {
    if (addingProductToCart) {
        dispatch(userActions.addToCart({addingProductToCart}))
    }
    }, [dispatch, addingProductToCart]);

    useEffect(() => {
        if (updateId) {
            dispatch(userActions.updateCart({updateId}))
        }
    })

    useEffect(() => {
        dispatch(productActions.getSingleProduct({productId}));
    }, [dispatch, productId]);

    const handleReviewInput = (e) => {
        e.preventDefault();
        setReview(e.target.value);
    }

    const handleReviewSubmit = () => {
        dispatch(userActions.postReview({ review, productId, rating }));
    };

    const handleDeleteReview = (reviewId) => {
        setDeleteReview(reviewId)
    }
    useEffect(() => {
    if(deleteReview){
        console.log(deleteReview,'huhuhuhuhuhuhuhu')
        dispatch(userActions.deleteReview({deleteReview, productId}))
    }
    },[dispatch, deleteReview]);
    
      useEffect(() => {
        dispatch(userActions.getAllComment({productId, dispatch}))
      },[productId]);   

    const handUpdateReview = (id) => {
        console.log(id,'id here');
        setUpdateComment(id)
    }
    const handleSuccess = (e) => {
        if(e.keyCode === 13) {
          setUpdateComment(false)
          dispatch(userActions.putReview({updateComment, comment, productId}))
        }
    }
    return (
        <Container>
            {loading ? (
                <div className="text-center">
                <ClipLoader color="#f86c6b" size={150} loading={true} />
                </div>
            ) : (
                <Row className="border mt-5 detailBox"
                     style={{
                         paddingTop: "5rem",
                         paddingBottom: "5rem",
                         borderRadius: "20px", 
                     }}>
                <Col md={3}>
                    {product && (
                    <img
                        className="w-100"
                        src={product?.photo}
                        alt=""
                    />
                    )}
                </Col>
                <Col md={9} style={{
                }}>
                    {product && (
                    <>
                        <h2>{product?.name}</h2>
                        <p style={{color:"gray"}}>
                        {" "}
                            <em>{product?.description}</em>
                        </p>
                        <div>
                        <strong>Price: </strong>{product?.price.toLocaleString()} VND
                        </div>
                        <div>
                        <strong>In stock:</strong> {product?.stock}
                        </div>
                        <br />
                        <div>
                        <Button onClick={()=> updateProductToCart(product)} style={{backgroundColor:"lightsteelblue", border:"none", color:"white"}}>
                        Update Cart
                        </Button>{" "}
                        <Button onClick={() => addToCart(product)} style={{backgroundColor:"lightsteelblue", border:"none", color:"white"}}>
                        Add to Cart
                        </Button>{" "}
                        </div>
                        <br />
                        <div>
                        <strong>Write us your review</strong>
                        <br />
                        <textarea key="review" rows="5" cols="50" onChange={handleReviewInput} style={{border:"1px solid lightgray", borderRadius:"10px"}}></textarea>
                        </div>
                        <br />
                        <div>
                        <Button onClick={handleReviewSubmit} style={{backgroundColor:"lightsteelblue", border:"none", color:"white"}}>Send review</Button>
                        <ToastContainer autoClose={2000} />
                        <ul>
                        {comments && comments.map((review)=> {
                            return <li key={review._id}>{review.content}
                            <Button onClick={()=> handleDeleteReview(review._id)} style={{margin:'10px 30px'}}>
                                Delete
                            </Button>
                            {updateComment ? 
                            <textarea onChange={handleCommentText} onKeyDown={handleSuccess} style={{margin:'10px 30px'}}>
                            
                            </textarea>: 
                            <Button onClick={()=> handUpdateReview(review._id)} style={{margin:'10px 30px'}}>
                                Update
                            </Button>
                            }
                            </li>;
                        })} 
                        </ul>
                        </div>
                    </>
                    )}
                </Col>
                </Row>
            )}
        </Container>
    )
}

export default DetailPage;
 