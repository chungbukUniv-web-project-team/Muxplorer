import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './FoodDetail.css';

function FoodDetail() {
  const { id } = useParams();
  const [foodDetail, setFoodDetail] = useState([]);
 
  useEffect(() => {
    const fetchFoodDetail = async () => {
      try {
        const response = await axios.get(`http://220.125.53.144:8000/review-service/api/get/food/${id}`);
        if (response.data && response.data.response) {
          setFoodDetail(response.data.response);
        }
      } catch (error) {
        console.error('Error fetching review list:', error);
      }
    };

    fetchFoodDetail();
  }, [id]);


  return (
    <div className="food-list-container">
      <div id="detail-title" className="detail-title">
        <div id="detail-title1" className="detail-title1">
          {foodDetail.restaurant}
        </div>
        <div id="detail-title2" className="detail-title2">
          {foodDetail.name}
        </div>
        <div className="detail-image">
          <img src={`/images/food-list/${foodDetail.name}.jpg`} alt="foodDetail.name"/>
        </div>
      </div>
      <div id="detail-line" className="detail-line" />
    </div>
  );
}

export default FoodDetail;
