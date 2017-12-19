import app from './node-server';

const port = 3000;

// Start up the server.
app.listen(port, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.info(`API listening on port ${port}`);
});
