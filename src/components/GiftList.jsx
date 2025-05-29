import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGifts } from '../slices/giftsSlice';
import GiftItem from './GiftItem';
import styles from './GiftList.module.scss';
import { Slider, Typography } from '@mui/material';
import { setBudget } from '../slices/filtersSlice';

const GiftList = () => {
  const dispatch = useDispatch();
  const { allGifts, status, error } = useSelector(state => state.gifts);
  const { ageCategory, interests, budget } = useSelector(state => state.filters);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchGifts());
    }
  }, [status, dispatch]);

  const handleBudgetChange = (event, newValue) => {
    dispatch(setBudget(newValue));
  };

  const filterGifts = () => {
    let filtered = allGifts.filter(gift => {
      // Filter by age category
      if (ageCategory && ageCategory !== '' && gift.age_group !== 'all' && gift.age_group !== ageCategory) {
        return false;
      }
      // Filter by interests (category)
      if (interests.length > 0 && !interests.includes(gift.category)) {
        return false;
      }
      // Filter by budget
      if (gift.price < budget[0] || gift.price > budget[1]) {
        return false;
      }
      return true;
    });

    if (interests.includes('Tech') || interests.includes('Fitness')) {
      const hasSmartwatch = filtered.some(gift => gift.name === 'Smartwatch');
      if (!hasSmartwatch) {
        const smartwatch = allGifts.find(gift => gift.name === 'Smartwatch');
        if (smartwatch) {
          filtered = [...filtered, smartwatch];
        }
      }
    }

    return filtered;
  };

  const filteredGifts = filterGifts();

  return (
    <div className={styles.giftList}>
      <Typography gutterBottom>Filter by Budget (₹{budget[0]} - ₹{budget[1]})</Typography>
      <Slider
        value={budget}
        onChange={handleBudgetChange}
        valueLabelDisplay="auto"
        min={0}
        max={500}
        step={1}
        className={styles.budgetSlider}
      />
      {status === 'loading' && <div>Loading gifts...</div>}
      {status === 'failed' && <div>Error: {error}</div>}
      {status === 'succeeded' && filteredGifts.length === 0 && <div>No gifts match the criteria.</div>}
      <div className={styles.giftGrid}>
        {filteredGifts.map(gift => (
          <GiftItem key={gift.id} gift={gift} />
        ))}
      </div>
    </div>
  );
};

export default GiftList;
