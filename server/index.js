import app from './config/app';

const { PORT = 1337 } = process.env;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// eslint-disable-line no-console
