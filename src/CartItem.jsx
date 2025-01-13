import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping, updateAddedTocart}) => {
  const cart = useSelector(state => state.cart.items);
  
  const dispatch = useDispatch();
  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let totalCost = 0;
    cart.forEach((item) => {
      const cleanedCost = item.cost.replace("$", ""); // Remove the dollar sign
      const costNumber = parseFloat(cleanedCost);
      totalCost += costNumber * item.quantity;});
    return totalCost;
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e);
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    const updatedItem = { ...item, quantity: item.quantity + 1 }; // Create a new object
    dispatch(updateQuantity(updatedItem));
  };

  const handleDecrement = (item) => {
    const updatedItem = { ...item, quantity: item.quantity - 1 }; // Create a new object
    if (updatedItem.quantity > 0) {
      dispatch(updateQuantity(updatedItem));
    }
    else
    {
      dispatch(removeItem(item));
      updateAddedTocart((prevState) => {
        // Create a new object without the specified key
        const newObject = Object.fromEntries(
          Object.entries(prevState).filter(([key]) => key !== item.name)
        );
        return newObject;
      });
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
    updateAddedTocart((prevState) => {
              // Create a new object without the specified key
              const newObject = Object.fromEntries(
                Object.entries(prevState).filter(([key]) => key !== item.name)
            );
            return newObject;
  });
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const cleanedCost = item.cost.replace("$", ""); // Remove the dollar sign
    const costNumber = parseFloat(cleanedCost);
    let total = costNumber * item.quantity
    return total;
  };

  
  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


