import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/cars');
        setCars(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchData();
  }, []);

  const handleOpenDetails = (carId: number) => {
    navigate(`/cars/${carId}`);
  };

  return (
    <Box sx={{ overflow: 'hidden', paddingTop: '20px' }}>
      <Grid container spacing={2} justifyContent="center">
        {(loading ? Array.from(new Array(3)) : cars).map((car, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ height: '100%' }}>
              <CardActionArea onClick={() => handleOpenDetails(car.id)}>
                <CardMedia
                  component="img"
                  height="200"
                  image={loading ? undefined : car?.fotos[0]}
                  alt={`${loading ? 'Carregando' : car?.marca} ${loading ? '...' : car?.modelo}`}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6">
                    {loading ? <Skeleton /> : `${car?.marca} ${car?.modelo}`}
                  </Typography>
                  <Typography variant="body1">
                    {loading ? <Skeleton /> : `Preço: R$ ${car?.preco}`}
                  </Typography>
                  <Typography variant="body2">
                    {loading ? <Skeleton /> : `Ano: ${car?.ano}`}
                  </Typography>
                  <Typography variant="body2">
                    {loading ? <Skeleton /> : `Visualizações: ${car?.visualizacoes}`}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CarList;
