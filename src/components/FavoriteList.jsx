import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite, reorderFavorites, updateNote } from '../slices/favoritesSlice';
import styles from './FavoriteList.module.scss';
import { TextField, IconButton, Typography, Paper, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const FavoriteList = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.favorites);

  // Local state to hold notes input before submitting
  const [notesState, setNotesState] = useState(
    favorites.reduce((acc, gift) => {
      acc[gift.id] = gift.note || '';
      return acc;
    }, {})
  );

  const handleRemove = (id) => {
    dispatch(removeFavorite(id));
  };

  const handleNoteChangeLocal = (id, value) => {
    setNotesState(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleNoteSubmit = (id) => {
    dispatch(updateNote({ id, note: notesState[id] }));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(favorites);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    dispatch(reorderFavorites(reordered));
  };

  if (favorites.length === 0) {
    return <Typography variant="body1">No favorites saved yet.</Typography>;
  }

  return (
    <div className={styles.favoriteList}>
      <Typography variant="h6" gutterBottom>Favorites</Typography>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="favorites">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {favorites.map((gift, index) => (
                <Draggable key={gift.id} draggableId={gift.id.toString()} index={index}>
                  {(provided) => (
                    <Paper
                      className={styles.favoriteItem}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      elevation={3}
                    >
                      <div className={styles.favoriteContent}>
                        <img src={gift.image} alt={gift.name} className={styles.favoriteImage} />
                        <div className={styles.favoriteDetails}>
                          <Typography variant="subtitle1">{gift.name}</Typography>
                          <Typography variant="body2">Price: ₹{gift.price.toFixed(2)}</Typography>
                          <TextField
                            variant="outlined"
                            size="small"
                            placeholder="Notes"
                            multiline
                            rows={2}
                            value={notesState[gift.id]}
                            onChange={(e) => handleNoteChangeLocal(gift.id, e.target.value)}
                            className={styles.noteField}
                          />
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => handleNoteSubmit(gift.id)}
                            style={{ marginTop: '8px' }}
                          >
                            Save Note
                          </Button>
                        </div>
                        <IconButton onClick={() => handleRemove(gift.id)} aria-label="remove favorite">
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </Paper>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default FavoriteList;
