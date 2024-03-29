import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Box, createTheme, Modal, Typography } from '@mui/material';
import axios from 'axios';
import { ThemeProvider } from '@emotion/react';
import EditOfferFormComponent from './UpdateOffer';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});


function Admin() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [offers, setOffers] = useState<any[]>([]);
    const [selectedOffer, setSelectedOffer] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);

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

    const openModal = (offer: any) => {
        setSelectedOffer(offer);
        setIsEdit(offer !== null);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOffer(null);
        setIsEdit(false);
    };

    const updateOffer = async (updatedOffer: any) => {
        try {
            await axios.put(`http://localhost:3001/cars/${updatedOffer.id}`, updatedOffer);
            const updatedOffers = offers.map(offer => (offer.id === updatedOffer.id ? updatedOffer : offer));
            setOffers(updatedOffers);
            console.log('Oferta atualizada com sucesso');
            closeModal(); // Fechar o modal após a atualização
        } catch (error) {
            console.error('Erro ao atualizar oferta:', error);
        }
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Box sx={{ p: 2 }}>
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    '@media (max-width: 700px)': {
                        flexDirection: 'column', 
                        alignItems: 'stretch', 
                    }
                }}>
                    <TextField
                        label="Buscar"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ 
                            width: { xs: '80%', sm: '100%' },
                            marginRight: { xs: 0, sm: 2 },
                            '@media (max-width: 600px)': {
                                width: { xs: '100%', sm: 'calc(70% - 8px)' },
                                marginRight: { xs: 0, sm: 0 },
                            },
                            '@media (max-width: 700px)': {
                                marginBottom: { xs: 2, sm: 2 },
                            },
                            '& .MuiOutlinedInput-root': { 
                            '& fieldset': { borderColor: '#1976d2' },
                            '&:hover fieldset': { borderColor: '#1976d2' }, 
                            '&.Mui-focused fieldset': { borderColor: '#1976d2' },
                            '& .MuiInputBase-input': { color: '#1976d2' } 
                            } 
                        }}
                        InputLabelProps={{
                            sx: {
                                color: '#1976d2'
                            }
                        }}
                    />
                    <Button variant="contained" onClick={() => openModal(null)}>Nova Oferta</Button>
                </Box>
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
                                        <Button onClick={() => openModal(offer)}>Editar</Button>
                                        <Button onClick={() => deleteOffer(offer.id)}>Excluir</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Modal
                    open={isModalOpen}
                    onClose={closeModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        width: 400,
                        outline: 'none',
                        textAlign: 'center'
                    }}>
                        <EditOfferFormComponent offer={selectedOffer} setOffers={setOffers} closeModal={closeModal} updateOffer={updateOffer} isEdit={isEdit} />
                    </Box>
                </Modal>
            </Box>
        </ThemeProvider>
    );
}

export default Admin;