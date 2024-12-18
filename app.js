const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
const { title } = require('process');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Public Routes
app.use(express.static(path.join(__dirname, 'public')));

app.get('/resume', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'pdf', 'Ryan_Eskridge_Resume.pdf');
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send('Resume not found');
        }
    });
});

app.engine('hbs', exphbs.engine({
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials')
  }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', async (req, res) => {
    try {
        res.render('home',{
            title: 'Home',
            year: new Date().getFullYear(),
            name: 'Ryan Eskridge',
        });
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).send('Internal Server Error')
    }
});

// App start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));