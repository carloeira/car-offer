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
        updateViews(id);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchCarDetails();
  }, [id]);

  const updateViews = async (offerId: string | undefined) => {
    try {
      const response = await axios.put(`http://localhost:3001/cars/${offerId}/visualizacoes`, {
        userId: 'id_do_usuario',
      });
  
      if (response.status === 200) {
        console.log('Visualização da oferta atualizada com sucesso');
      } else {
        throw new Error('Erro ao atualizar as visualizações da oferta');
      }
    } catch (error) {
      console.error('Erro ao atualizar as visualizações da oferta:', onmessage);
    }
  };

  return (
    <Box sx={{ overflow: 'hidden', padding: '1.5rem' }}>
      {loading ? (
        <Typography variant="h4">Loading...</Typography>
      ) : (
        <Box>
          <Carousel>
              {car.fotos.map((foto, index) => (
                  <img key={index} src={foto} alt={`${car.marca} ${car.modelo}`} style={{ maxWidth: '100%', maxHeight: '20rem' }} />
              ))}
          </Carousel>
          <Typography variant="h4">{`${car.marca} ${car.modelo}`}</Typography>
          <Typography variant="body1">{`Preço: R$ ${car.preco}`}</Typography>
          <Typography variant="body1">{`Ano: ${car.ano}`}</Typography>
          <Typography variant="body1">{`Cor: ${car.cor}`}</Typography>
          <Typography variant="body1">{`Placa: ${car.placa}`}</Typography>
          <Typography variant="body1">{`Cidade: ${car.cidade}`}</Typography>
          <Typography variant="body1">{`Quilometragem: ${car.quilometragem}`}</Typography>
          <Typography variant="body1">{`Cidade: ${car.cidade}`}</Typography>
          <Typography variant="body1">{`Data de cadastro: ${car.dataCadastro}`}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default CarDetails;
