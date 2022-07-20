import React from 'react';
import ReactDOM from 'react-dom/client';
import { createServer, Model } from 'miragejs';

import { App } from './App';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freeleance de website',
          amount: 400,
          type: 'deposit',
          category: 'Dev',
          createdAt: new Date(),
        },
        {
          id: 2,
          title: 'Aluguel',
          amount: 150,
          type: 'withdraw',
          category: 'Casa',
          createdAt: new Date(),
        },
      ],
    });
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    });
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
