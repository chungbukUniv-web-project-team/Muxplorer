import React, { useState, useEffect } from 'react';
import './FoodList.css';

function FoodList() {
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    async function fetchFoodList() {
      try {
        const response = await fetch('http://220.125.53.144:8000/review-service/api/get/food-list');
        const data = await response.json();
        console.log(data.response);
        setFoodList(data.response);
      } catch (error) {
        console.error('Error fetching food list:', error);
      }
    }

    fetchFoodList();
  }, []);

  return (
    <div className="food-list-container">
      <h2>Food List</h2>
      <ul className="food-list">
        {foodList.map(food => (
          <li key={food.id} className="food-item">
            <div className="food-image">
              <img src={food.image} alt={food.name} />
            </div>
            <div className="food-details">
              <h3>{food.name}</h3>
              <p>{food.description}</p>
            </div>
            <div className="food-restaurant">
              <h4>{food.restaurant}</h4>
              <p>{food.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FoodList;