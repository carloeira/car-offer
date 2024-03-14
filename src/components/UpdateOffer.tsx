import React from 'react';
import CarForm, { FormData } from './CarForm'; 

interface EditOfferFormProps {
  offer: any;
  isEdit: boolean;
  setOffers: (offers: any[]) => void;
  closeModal: () => void;
  updateOffer: (updatedOffer: any) => void;
}

const EditOfferFormComponent: React.FC<EditOfferFormProps> = ({ offer, isEdit, setOffers, closeModal, updateOffer }) => {
  const [formData, setFormData] = React.useState<FormData>({ 
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

  React.useEffect(() => {
    if (offer && isEdit) {
      setFormData(offer);
    }
  }, [offer, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateOffer(formData);
    closeModal();
  };

  return (
    <form id="edit-offer-form" onSubmit={handleSubmit}>
      <CarForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} isEdit={isEdit} />
    </form>
  );
};

export default EditOfferFormComponent;
