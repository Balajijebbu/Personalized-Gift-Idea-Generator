import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../slices/favoritesSlice';
import styles from './GiftItem.module.scss';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';

const GiftItem = ({ gift }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.favorites);
  const isFavorite = favorites.some(fav => fav.id === gift.id);

    const handleFavoriteToggle = () => {
      if (isFavorite) {
        dispatch(removeFavorite(gift.id));
      } else {
        dispatch(addFavorite({ ...gift, note: '' }));
      }
    };

  return (
    <Card className={`${styles.giftItem} ${isFavorite ? styles.favorite : ''}`}>
      <CardMedia
        component="img"
        height="140"
        image={gift.image}
        alt={gift.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {gift.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category: {gift.category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ₹{gift.price.toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating: {gift.rating}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleFavoriteToggle}>
          {isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default GiftItem;
