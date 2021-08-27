import React, { useState } from 'react';
import '../../styles/header.css';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import Window from '../Window';
export default function Header () {
  
  const myStorage = window.sessionStorage;

  const name = myStorage.getItem('name');
  const points = myStorage.getItem('points');

  const [showPointPopup, setShowPointPopup] = useState(false);
  const [showCoffeePopup, setShowCoffeePopup] = useState(false);
  const [redeem, setRedeem] = useState(false);

  const handlePointClick = () => {
    setShowPointPopup(!showPointPopup);
  }

  const handleCoffeeClick = () => {
    setShowCoffeePopup(!showCoffeePopup);
  }

  const handlePointClose = () => {
    setShowPointPopup(!showPointPopup);
  }

  const handleCoffeeClose = () => {
    setShowCoffeePopup(!showCoffeePopup);
  }

  const redeemHandle = () => {
    setRedeem(!redeem);
    myStorage.setItem('points', 0);
  }

  return (
    <header>
      <div class="navbars">
        <span class="app-name">Peepoopdog</span>
        <div class="navbar-nav">
          <div class="navbar-navee">
           
          <form class="logout" action="/logout" method="POST">
          <span><LocalCafeIcon className="coffee-logo" onClick={handleCoffeeClick}/></span>
            <span><MonetizationOnIcon className="point-img" onClick={handlePointClick}/></span>
            <span className="username">{name}</span>
            <button className="logout-button"type="submit">Logout</button>
          </form>
          {showPointPopup && <Window 
          content={
            <div className="points-form">
            <h1>Points</h1>
            <div className="points">
            <label>You earned :</label>
            <span>{points} points</span>
            </div>
            {points >= 20 ? (
              <button className="btn-redeem" onClick={redeemHandle}>Redeem</button>
            ): <span id="conditions"><b>You need {20 - points} more points to REDEEM!</b></span>}
            </div>
          }
            handleClose={handlePointClose}
          />}

          {showCoffeePopup && <Window 
            content={
              <div className="redeem-form">
              <h1>Redeemed</h1>
                {redeem ? (
                <div className="redeemed">
                  <span className="title">Congratulations!</span>
                  <div className="coffee-form">
                    <div className="coffee">
                    <img className="coffee-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwEI3mvJXX3Ucm5XQ2Zf17NmyZl_rU0VPqa1JrigMU-NqdZMce9LVqWGHAX1YTsu2tqW4&usqp=CAU" />
                    <span className="redeemed-coffee">Hot Americano</span>
                    </div>
                    <div className="qrcode">
                    <img className="qrcode-img" src="https://www.imgonline.com.ua/examples/qr-code-url.png"/>
                  </div>
                  </div>
                </div>
              ) : 
              <>
              <div className="noRedeem">
                <span className="noRedeem-text">Earn more points to get free coupons!</span>
                <span className="weekly">This week's coupon</span>
              </div>
              <div className="coffee">
                <img className="coffee-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwEI3mvJXX3Ucm5XQ2Zf17NmyZl_rU0VPqa1JrigMU-NqdZMce9LVqWGHAX1YTsu2tqW4&usqp=CAU" />
                <span className="redeemed-coffee">Hot Americano</span>
              </div>
              </>
              }
              </div>
                
            }
            handleClose={handleCoffeeClose}
          />}
          </div>
        </div>
      </div>
    </header>
  );
}
