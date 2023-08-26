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
        <div id='detail-title' class='detail-title'>
            <div id='detail-title1' class='detail-title1'>{foodDetail.restaurant}</div>
            <div id='detail-title2' class='detail-title2'>{foodDetail.name}</div>
        </div>
        <div id='detail-line' class='detail-line' />
    </div>
    
  );
}

export default FoodDetail;
