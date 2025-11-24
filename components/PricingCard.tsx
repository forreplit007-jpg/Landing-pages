import React from 'react';

const PricingCard = () => {
  return (
    <div className="uiverse-card font-sans">
      <div className="card__border"></div>
      <div className="card_title__container">
        <span className="card_title font-bold">Premium Membership</span>
        <p className="card_paragraph">Exclusive care for your family's dental health.</p>
      </div>
      <hr className="line" />
      <ul className="card__list">
        <li className="card__list_item">
          <span className="check">
            <svg
              className="check_svg"
              fill="currentColor"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                fillRule="evenodd"
              />
            </svg>
          </span>
          <span className="list_text">2 Free Checkups / Year</span>
        </li>
        <li className="card__list_item">
          <span className="check">
            <svg
              className="check_svg"
              fill="currentColor"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                fillRule="evenodd"
              />
            </svg>
          </span>
          <span className="list_text">15% Off All Procedures</span>
        </li>
        <li className="card__list_item">
          <span className="check">
            <svg
              className="check_svg"
              fill="currentColor"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                fillRule="evenodd"
              />
            </svg>
          </span>
          <span className="list_text">Priority Scheduling</span>
        </li>
        <li className="card__list_item">
          <span className="check">
            <svg
              className="check_svg"
              fill="currentColor"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                fillRule="evenodd"
              />
            </svg>
          </span>
          <span className="list_text">Free Whitening Kit</span>
        </li>
      </ul>
      <button className="button font-bold">Join Membership</button>
    </div>
  );
};

export default PricingCard;