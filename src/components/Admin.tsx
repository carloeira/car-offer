import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Box, createTheme, InputAdornment } from '@mui/material';
import axios from 'axios';
import { ThemeProvider } from '@emotion/react';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function Admin() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [offers, setOffers] = useState<any[]>([]); 

    useEffect(() => {
        async function fetchOffers() {
            try {
                const response = await axios.get('http://localhost:3001/cars');
                setOffers(response.data); 
            } catch (error) {
                console.error('Erro ao buscar ofertas:', error);
            }
        }

        fetchOffers(); 
    }, []); 

    const filteredOffers = offers.filter(offer =>
        offer.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.cor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.cidade.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const deleteOffer = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3001/cars/${id}`);
            const updatedOffers = offers.filter(offer => offer.id !== id);
            setOffers(updatedOffers);
        } catch (error) {
            console.error('Erro ao excluir oferta:', error);
        }
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Box sx={{ p: 2 }}>
                <TextField
                    label="Buscar"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ 
                        width: '100%', 
                        '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#1976d2' }, 
                        '&:hover fieldset': { borderColor: '#1976d2' }, 
                        '&.Mui-focused fieldset': { borderColor: '#1976d2' 
                    } } }}
                    InputLabelProps={{
                        sx: {
                            color: '#1976d2'
                        }}}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Button>
                                </Button>
                            </InputAdornment>
                        )
                    }}
                />
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Marca</TableCell>
                                <TableCell>Modelo</TableCell>
                                <TableCell>Ano</TableCell>
                                <TableCell>Preço</TableCell>
                                <TableCell>Cor</TableCell>
                                <TableCell>Quilometragem</TableCell>
                                <TableCell>Placa</TableCell>
                                <TableCell>Cidade</TableCell>
                                <TableCell>Data de Cadastro</TableCell>
                                <TableCell>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredOffers.map((offer) => (
                                <TableRow key={offer.id}>
                                    <TableCell>{offer.id}</TableCell>
                                    <TableCell>{offer.marca}</TableCell>
                                    <TableCell>{offer.modelo}</TableCell>
                                    <TableCell>{offer.ano}</TableCell>
                                    <TableCell>{offer.preco}</TableCell>
                                    <TableCell>{offer.cor}</TableCell>
                                    <TableCell>{offer.quilometragem}</TableCell>
                                    <TableCell>{offer.placa}</TableCell>
                                    <TableCell>{offer.cidade}</TableCell>
                                    <TableCell>{offer.dataCadastro}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => console.log("Editar oferta", offer.id)}>Editar</Button>
                                        <Button onClick={() => deleteOffer(offer.id)}>Excluir</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </ThemeProvider>
    );
}

export default Admin;