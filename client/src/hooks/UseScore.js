import { useState,useContext,response } from 'react';
import { AuthContext } from '../context/AuthContext'


// console.log(user.token)

export const UseScore = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [feedback, setFeedback] = useState(null);
  const { user } = useContext(AuthContext)

  const submitScore = async (gameId, score) => {
    setIsSubmitting(true);
    console.log({gameId,score})
    console.log(user.token)


    try {
      // Submit the score using the token for authentication
      await fetch(`/api/games/${gameId}/submit-score`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify({ score }),
      });

      // Fetch the updated feedback and game stats after submission
      // const response = await fetch(`/api/games/${gameId}/stats`, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${token}`, // Include the token in this request as well
      //   },
      // });

      if (!response.ok) {
        throw new Error('Failed to fetch game stats.');
      }
      console.log(response)

      const newFeedback = await response.json();
      setFeedback(newFeedback);
      setResponseMessage('Score submitted successfully!');
    } catch (error) {
      console.error('Error submitting score:', error);
      setResponseMessage('Failed to submit score.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitScore,
    isSubmitting,
    responseMessage,
    feedback,
  };
};
