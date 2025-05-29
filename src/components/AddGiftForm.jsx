import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGift } from '../slices/giftsSlice';
import styles from './AddGiftForm.module.scss';
import { TextField, Button, MenuItem, Typography } from '@mui/material';

const categories = ['Tech', 'Stationery', 'Accessories', 'Jewelry', 'Beauty', 'Fashion', 'Toys', 'Travel', 'Outdoor', 'Home Decor', 'Kitchenware'];
const ageGroups = ['kid', 'teen', 'adult', 'all'];

const AddGiftForm = () => {
  const dispatch = useDispatch();
  const allGifts = useSelector(state => state.gifts.allGifts);
  const role = useSelector(state => state.user.role);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    age_group: '',
    image: '',
    rating: '',
  });

  const [showForm, setShowForm] = useState(false);

   if (role !== 'admin') {
    return null;
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.category || !formData.age_group) {
      alert('Please fill in all required fields.');
      return;
    }
    const newGift = {
      id: allGifts.length > 0 ? Math.max(...allGifts.map(g => g.id)) + 1 : 1,
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      age_group: formData.age_group,
      image: formData.image || 'https://via.placeholder.com/150',
      rating: parseFloat(formData.rating) || 0,
    };
    dispatch(addGift(newGift));
    setFormData({
      name: '',
      price: '',
      category: '',
      age_group: '',
      image: '',
      rating: '',
    });
    setShowForm(false);
  };

  return (
    <>
      {!showForm && (
        <Button variant="contained" color="primary" onClick={() => setShowForm(true)} style={{ marginBottom: '15px' }}>
          Add New Gift
        </Button>
      )}
      {showForm && (
        <form className={styles.addGiftForm} onSubmit={handleSubmit} style={{ maxWidth: '300px' }}>
          <Typography variant="h6" gutterBottom>Add a New Gift</Typography>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            margin="normal"
            className={styles.selectField}
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
            margin="normal"
            className={styles.selectField}
            inputProps={{ min: 0, step: 0.01 }}
          />
          <TextField
            select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            margin="normal"
            className={styles.selectField}
          >
            {categories.map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Age Group"
            name="age_group"
            value={formData.age_group}
            onChange={handleChange}
            required
            margin="normal"
            className={styles.selectField}
          >
            {ageGroups.map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
            margin="normal"
            className={styles.selectField}
          />
          <TextField
            label="Rating"
            name="rating"
            type="number"
            value={formData.rating}
            onChange={handleChange}
            margin="normal"
            className={styles.selectField}
            inputProps={{ min: 0, max: 5, step: 0.1 }}
          />
          <Button type="submit" variant="contained" color="primary" className={styles.submitButton}>
            Add Gift
          </Button>
        </form>
      )}
    </>
  );
};

export default AddGiftForm;
