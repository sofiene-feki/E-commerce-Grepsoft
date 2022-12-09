import React from 'react';
import StarRatings from 'react-star-ratings';

export const showAverage = (p) => {
  if (p && p.ratings) {
    let ratingArray = p && p.ratings;
    let total = [];
    let length = ratingArray.length;
    //console.log('length', length);

    ratingArray.map((r) => total.push(r.star));
    let totalReduced = total.reduce((p, n) => p + n, 0);
    // console.log('totalReduced', totalReduced);

    let highest = length * 5;
    //console.log('highest', highest);

    let result = (totalReduced * 5) / highest;
    //console.log('result', result);

    return (
      <div>
        <span>
          <StarRatings
            starDimension="20px"
            starSpacing="2px"
            editing={false}
            starRatedColor="red"
            rating={result}
          />
          ({p.ratings.length})
        </span>
      </div>
    );
  }
};