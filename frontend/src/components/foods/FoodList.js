import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FoodList.css';

function FoodList() {
  const itemsPerPage = 9; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const [foodList, setFoodList] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState('All');

  async function fetchFoodList(restaurantName = '') {
    setCurrentPage(1);
    try {
      let url = 'http://220.125.53.144:8000/review-service/api/get/food-list';
      if (restaurantName) {
        url += `/${restaurantName}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setFoodList(data.response);
    } catch (error) {
      console.error('Error fetching food list:', error);
    }
  }

  useEffect(() => {  
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
      <div className="restaurant-filter">
          <select
            value={selectedRestaurant}
            onChange={(event) => {
              const restaurantName = event.target.value === '' ? '' : event.target.value;
              setSelectedRestaurant(event.target.value);
              fetchFoodList(restaurantName);
            }}
          >
            <option value="">전체</option>
            <option value="eunhasu">은하수식당</option>
            <option value="byeolbich">별빛식당</option>
            <option value="hanbich">한빛식당</option>
          </select>
      </div>
      <div id='food-line' class='food-line' />
      <ul className="food-list">
        {foodList.slice(startIndex, endIndex).map(food => (
          <li key={food.id} className="food-item">
            <div className="food-image">
              <img src={`/images/food-list/${food.name}.jpg`} alt={food.name} />
            </div>
            <Link to={`/review/${food.id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <div className="food-details">
              <h2>{food.name}</h2>
              <p>{food.description}</p>
            </div>
            </Link>
            <div className="food-restaurant">
              <h3>{food.restaurant}</h3>
              <p>{food.description}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}>
          <span className="arrow-button">&#8249;</span>
        </button>
        <span className="pagination-whole">
          <span className="pagination-current">{currentPage.toString().padStart(2, '0')}</span>
          <span className="pagination-separator"> / </span>
          <span className="pagination-total">{totalPages.toString().padStart(2, '0')}</span>
        </span>
        <button
          className="pagination-button"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={endIndex >= foodList.length}>
          <span className="arrow-button">&#8250;</span>
        </button>
      </div>
    </div>
  );
}

export default FoodList;