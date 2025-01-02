import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

interface Client {
  name: string;
  email: string;
}

const ClientCard: React.FC<{ client: Client }> = ({ client }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/client/${client.email}`, { state: { client } });
  };

  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          Client Name
        </Typography>
        <Typography variant="h5" component="div">
          {client.name}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Email</Typography>
        <Typography variant="body2">{client.email}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleViewDetails}>
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

const ClientManager: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [newClient, setNewClient] = useState<Client>({ name: '', email: '' });

  const handleAddClient = () => {
    if (newClient.name && newClient.email) {
      setClients([...clients, newClient]);
      setNewClient({ name: '', email: '' });
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Client Management
      </Typography>
      <Box sx={{ marginBottom: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <TextField
              label="Name"
              fullWidth
              value={newClient.name}
              onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <TextField
              label="Email"
              fullWidth
              value={newClient.email}
              onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button variant="contained" fullWidth onClick={handleAddClient}>
              Add Client
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box>
        {clients.map((client, index) => (
          <ClientCard key={index} client={client} />
        ))}
      </Box>
    </Box>
  );
};

export default ClientManager;
