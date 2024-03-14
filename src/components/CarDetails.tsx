import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Carousel from 'react-material-ui-carousel';

const CarDetails = () => {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/cars/${id}`);
        setCar(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchCarDetails();
  }, [id]);

  return (
    <Box sx={{ overflow: 'hidden', padding: '1.5rem' }}>
      {loading ? (
        <Typography variant="h4">Loading...</Typography>
      ) : (
        <Box>
          <Typography variant="h4">{`${car.marca} ${car.modelo}`}</Typography>
          <Typography variant="body1">{`Preço: R$ ${car.preco}`}</Typography>
          <Typography variant="body1">{`Ano: ${car.ano}`}</Typography>
          <Typography variant="body1">{`Visualizações: ${car.visualizacoes}`}</Typography>
          <Carousel autoPlay={false} animation="slide">
            {car.fotos.map((foto, index) => (
              <img key={index} src={foto} alt={`Foto ${index}`} />
            ))}
          </Carousel>
        </Box>
      )}
    </Box>
  );
};

export default CarDetails;
