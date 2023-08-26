import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  const totalPages = Math.ceil(foodList.length / itemsPerPage);

  return (
    <div className="food-list-container">
      <div id='food-title' class='food-title'>
        <div id='food-title1' class='food-title1'>음식</div>
        <div id='food-title2' class='food-title2'>리스트</div>
      </div>
      <div id='food-line' class='food-line' />
      <ul className="food-list">
        {foodList.slice(startIndex, endIndex).map(food => (
          <li key={food.id} className="food-item">
            <div className="food-image">
              <img src={food.image} alt={food.name} />
            </div>
            <Link to={`/review/${food.id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <div className="food-details">
              <h3>{food.name}</h3>
              <p>{food.description}</p>
            </div>
            </Link>
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
        <span>
          {/* Display the current page and total pages in the format: "currentPage / totalPages" */}
          {`${currentPage.toString().padStart(2, '0')} / ${totalPages.toString().padStart(2, '0')}`}
        </span>
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