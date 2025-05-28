import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAgeCategory, setInterests } from '../slices/filtersSlice';
import styles from './RecipientForm.module.scss';
import { 
  FormControl, 
  FormLabel, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  Checkbox, 
  FormGroup
} from '@mui/material';

const interestsOptions = [
  'Books', 'Tech', 'Stationery', 'Accessories', 'Jewelry', 
  'Beauty', 'Fashion', 'Toys', 'Travel', 'Outdoor', 
  'Home Decor', 'Kitchenware'
];

const RecipientForm = () => {
  const dispatch = useDispatch();
  const ageCategory = useSelector(state => state.filters.ageCategory);
  const interests = useSelector(state => state.filters.interests);

  const [localInterests, setLocalInterests] = useState(interests);

  useEffect(() => {
    setLocalInterests(interests);
  }, [interests]);

  const handleAgeChange = (event) => {
    dispatch(setAgeCategory(event.target.value));
  };

  const handleInterestChange = (event) => {
    const { value, checked } = event.target;
    let updatedInterests = [...localInterests];
    if (checked) {
      updatedInterests.push(value);
    } else {
      updatedInterests = updatedInterests.filter(i => i !== value);
    }
    setLocalInterests(updatedInterests);
    dispatch(setInterests(updatedInterests));
  };

  return (
    <div>
      <FormControl component="fieldset" className={styles.formControl}>
        <FormLabel component="legend">Age Category</FormLabel>
        <RadioGroup
          aria-label="age-category"
          name="age-category"
          value={ageCategory}
          onChange={handleAgeChange}
        >
          <FormControlLabel value="kid" control={<Radio />} label="Kid" />
          <FormControlLabel value="teen" control={<Radio />} label="Teen" />
          <FormControlLabel value="adult" control={<Radio />} label="Adult" />
          <FormControlLabel value="" control={<Radio />} label="All" />
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset" className={styles.formControl}>
        <FormLabel component="legend">Interests</FormLabel>
        <FormGroup>
          {interestsOptions.map((interest) => (
            <FormControlLabel
              key={interest}
              control={
                <Checkbox
                  checked={localInterests.includes(interest)}
                  onChange={handleInterestChange}
                  value={interest}
                />
              }
              label={interest}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
};

export default RecipientForm;