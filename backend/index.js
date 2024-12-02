const express = require('express');
const { generateFile } = require('./generateFile');
const { generateInputFile } = require('./generateInputFile');
const { exeCpp } = require('./exeCpp');
const { exePy } = require('./exePy'); // Import exePy
const Compiler = express();
const cors = require('cors');

Compiler.use(cors());
Compiler.use(express.json());
Compiler.use(express.urlencoded({ extended: true }));

Compiler.get('/', (req, res) => {
    res.json({ online: "compiler" });
});

Compiler.post('/run', async (req, res) => {
    const { language , code, input } = req.body;
    console.log(language,"Length: " + input.length);
    
    if (code === undefined) {
        return res.status(400).json({ success: false, message: 'Empty code!' });
    }
    try { 
        const filePath = generateFile(language, code); // Create code file
        const inputPath = generateInputFile(input); // Create input file

        let output;

        // Check the language and execute accordingly
        if (language === "cpp") {
            output = await exeCpp(filePath, inputPath);
        } else if (language === "python") {
            output = await exePy(filePath, inputPath);
        } else {
            return res.status(400).json({ success: false, message: 'Unsupported language!' });
        }

        res.json({ filePath, output, inputPath });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error: " + error.message });
    }
});

Compiler.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
