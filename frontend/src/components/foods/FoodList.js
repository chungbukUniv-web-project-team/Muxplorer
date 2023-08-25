import React, { useState, useEffect } from 'react';
import './FoodList.css';

function FoodList() {
  const itemsPerPage = 9; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    async function fetchFoodList() {
      try {
        const response = await fetch('http://220.125.53.144:8000/review-service/api/get/food-list');
        const data = await response.json();
        setFoodList(data.response);
      } catch (error) {
        console.error('Error fetching food list:', error);
      }
    }

    fetchFoodList();
  }, []);

  // Calculate the range of items to display based on current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <div className="food-list-container">
      <h2>Food List</h2>
      <ul className="food-list">
        {foodList.slice(startIndex, endIndex).map(food => (
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
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={endIndex >= foodList.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default FoodList;