
const express = require('express');
const fs = require('fs');
const path = require('path');


const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
const keysFilePath = path.join(__dirname, 'keys.json');


app.post('/add-key', (req, res) => {

    const { newKey } = req.body;



    if (!newKey) {
        return res.status(400).send('Error: newKey is required.');
    }

    fs.readFile(keysFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading keys.json:', err);
            return res.status(500).send('Server error reading key file.');
        }

        let keys = [];
        try {
            keys = JSON.parse(data);
        } catch (parseErr) {
            console.error('Error parsing keys.json:', parseErr);
            return res.status(500).send('Server error: key file is corrupted.');
        }


        keys.push(newKey);


        fs.writeFile(keysFilePath, JSON.stringify(keys, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Error writing to keys.json:', writeErr);
                return res.status(500).send('Server error writing to key file.');
            }

            console.log('Successfully added new key:', newKey);
            res.status(200).send({ message: 'Key added successfully', key: newKey });
        });
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
