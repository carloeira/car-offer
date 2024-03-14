import { useState } from 'react';
import { TextField, Button, Grid, Input } from '@mui/material';

function CarmForm() {
    const [formData, setFormData] = useState({
        marca: '',
        modelo: '',
        ano: '',
        preco: '',
        cor: '',
        quilometragem: '',
        placa: '',
        cidade: '',
        fotos: [],
        dataCadastro: ''
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
                <Grid item xs={12} sm={6} sx={{ marginBottom: '1.5rem' }}>
                    <Input
                        type="file"
                        name="fotos"
                        aria-label="Fotos"
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="marca"
                        label="Marca"
                        variant="outlined"
                        value={formData.marca}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="modelo"
                        label="Modelo"
                        variant="outlined"
                        value={formData.modelo}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="ano"
                        label="Ano"
                        variant="outlined"
                        value={formData.ano}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="preco"
                        label="Preço"
                        variant="outlined"
                        value={formData.preco}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="cor"
                        label="Cor"
                        variant="outlined"
                        value={formData.cor}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="quilometragem"
                        label="km"
                        variant="outlined"
                        value={formData.quilometragem}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="placa"
                        label="Placa"
                        variant="outlined"
                        value={formData.placa}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="cidade"
                        label="Cidade"
                        variant="outlined"
                        value={formData.cidade}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="dataCadastro"
                        label="Data de Cadastro"
                        type="date"
                        variant="outlined"
                        value={formData.dataCadastro}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid>                    
                    <Button type="submit" variant="contained" color="primary" sx={{ minWidth: '12rem', minHeight: '56px', marginLeft: '1rem', marginTop: '1rem' }}>
                        Cadastrar
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default CarmForm;
