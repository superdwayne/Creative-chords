const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Use body-parser to parse JSON bodies
app.use(bodyParser.json());

// Store tokens in memory for simplicity, in a real-world application you would use a database
const tokens = 'eUC9bfmTJNESQbd2L8mLvc:APA91bFmPbvCrgd2mjv-eNzzdB0EcscYe8-Bjv0D8wnKZuvBLx5dawNz6AHf8O6A_Iv1HorAB6Q2FT1Y8M1tNvKT5ikr4nrdWoJBPfTud_DZ40bruPBXnA-9wiXHfYCrCI27ec00evtu';

app.post('/register-token', (req, res) => {
  const token = req.body.token;

  if (token) {
    tokens.push(token);
    console.log('Token registered:', token);
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: 'Token is missing' });
  }
});

const serverKey = 'AAAAySH_9Ls:APA91bEpPUzBCqN-_2xO5ErYYAT75CxKzKYllsl4pkSWHsJojQfsR4lLcyfFvvPV1jIwyKfeakk6_6qZNVnyPtHtFU92FnkUMC271wiGfcVODKNhxhh4w0MS-aPmZXAqnkVDZUWZ4Yp0';

app.post('/send-notification', (req, res) => {
  const { title, body } = req.body;

  tokens.forEach((token) => {
    const headers = {
      Authorization: `key=${serverKey}`,
      'Content-Type': 'application/json',
    };

    const payload = JSON.stringify({
      notification: { title, body },
      to: token,
    });

    axios
      .post('https://fcm.googleapis.com/fcm/send', payload, { headers })
      .then((response) => {
        console.log('Notification sent successfully:', response.data);
      })
      .catch((error) => {
        console.log('Error sending notification:', error);
      });
  });

  res.json({ success: true });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listeningss on port ${port}`);
});