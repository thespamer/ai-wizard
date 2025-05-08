import 'dotenv/config';
import app from './app.js';

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log('Environment:', process.env.NODE_ENV);
  console.log('Ollama Host:', process.env.OLLAMA_HOST);
  console.log(`Server is running on port ${port}`);
  console.log('Routes:', app._router.stack.filter(r => r.route).map(r => `${Object.keys(r.route.methods)[0].toUpperCase()} ${r.route.path}`));
});
