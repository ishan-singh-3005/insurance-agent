import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import axios from 'axios';

const outreachMethods = ["Email", "Phone", "Text Message", "In-Person Meeting"];
const outreachPurposes = ["Check-in", "Event Greeting", "Inform About New Product"];

const ClientDetails: React.FC = () => {
  const location = useLocation();
  const client = location.state?.client;

  const [additionalDetails, setAdditionalDetails] = useState({
    address: '',
    phone: '',
    policyDetails: '',
    familyInfo: '',
    occupation: '',
    miscellaneousNotes: ''
  });

  const [outreachType, setOutreachType] = useState({
    method: '',
    purpose: '',
    otherDetails: ''
  });

  const [generatedMessage, setGeneratedMessage] = useState('');
  const [messageApproved, setMessageApproved] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerateContent = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/generate-message', {
        client: {
          name: client.name,
          email: client.email,
        },
        additionalDetails,
        outreachType,
      });
      setGeneratedMessage(response.data.data.message.content.replace(/\n/g, "<br />"));

      setMessageApproved(false);
    } catch (error) {
      console.error("Error generating message:", error);
      setGeneratedMessage("Failed to generate message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!client) {
    return (
      <Box sx={{ padding: 4 }}>
        <Typography variant='h5'>Client not found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant='h4' gutterBottom>
        Client Details
      </Typography>
      <Typography variant='h6'>Name: {client.name}</Typography>
      <Typography variant='h6' gutterBottom>Email: {client.email}</Typography>

      <Box sx={{ marginTop: 4 }}>
        <Typography variant='h5' gutterBottom>Additional Details</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Address"
              fullWidth
              value={additionalDetails.address}
              onChange={(e) => setAdditionalDetails({ ...additionalDetails, address: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Phone"
              fullWidth
              value={additionalDetails.phone}
              onChange={(e) => setAdditionalDetails({ ...additionalDetails, phone: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Policy Details"
              fullWidth
              value={additionalDetails.policyDetails}
              onChange={(e) => setAdditionalDetails({ ...additionalDetails, policyDetails: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Family Information"
              fullWidth
              value={additionalDetails.familyInfo}
              onChange={(e) => setAdditionalDetails({ ...additionalDetails, familyInfo: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Occupation"
              fullWidth
              value={additionalDetails.occupation}
              onChange={(e) => setAdditionalDetails({ ...additionalDetails, occupation: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Miscellaneous Notes"
              fullWidth
              multiline
              rows={4}
              value={additionalDetails.miscellaneousNotes}
              onChange={(e) => setAdditionalDetails({ ...additionalDetails, miscellaneousNotes: e.target.value })}
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ marginTop: 4 }}>
        <Typography variant='h5' gutterBottom>Outreach Options</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              select
              label="Method of Contact"
              fullWidth
              value={outreachType.method}
              onChange={(e) => setOutreachType({ ...outreachType, method: e.target.value })}
            >
              {outreachMethods.map((method) => (
                <MenuItem key={method} value={method}>
                  {method}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              select
              label="Purpose"
              fullWidth
              value={outreachType.purpose}
              onChange={(e) => setOutreachType({ ...outreachType, purpose: e.target.value })}
            >
              {outreachPurposes.map((purpose) => (
                <MenuItem key={purpose} value={purpose}>
                  {purpose}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Other Details"
              fullWidth
              value={outreachType.otherDetails}
              onChange={(e) => setOutreachType({ ...outreachType, otherDetails: e.target.value })}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          sx={{ marginTop: 2 }}
          onClick={handleGenerateContent}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Content'}
        </Button>
      </Box>

      {generatedMessage && (
        <Box sx={{ marginTop: 4 }}>
          <Typography variant='h5' gutterBottom>Generated Message</Typography>
          <Typography variant='body1' sx={{ marginBottom: 2 }} dangerouslySetInnerHTML={{__html: generatedMessage}} />
          <Button
            variant="contained"
            color="success"
            onClick={() => setMessageApproved(true)}
            disabled={messageApproved}
          >
            {messageApproved ? 'Message Sent' : 'Approve and Send'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ClientDetails;
