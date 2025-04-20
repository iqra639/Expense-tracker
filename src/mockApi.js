import { createServer } from 'miragejs';

export function startMockServer() {
  return createServer({
    routes() {
      this.namespace = 'api';

      // Auth endpoints
      this.post('/auth/login', (schema, request) => {
        const { email, password } = JSON.parse(request.requestBody);

        console.log('Mock server received login request:', { email, password });

        // Simple mock authentication
        if (email === 'Iqrazafarzafar647@gmail.com' && password === 'Aa1234') {
          return {
            success: true,
            token: 'mock-jwt-token',
            user: {
              id: 1,
              username: 'Iqra',
              email: 'Iqrazafarzafar647@gmail.com'
            }
          };
        } else {
          return {
            success: false,
            error: 'Invalid email or password'
          };
        }
      });

      this.post('/auth/register', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);

        return {
          success: true,
          token: 'mock-jwt-token',
          user: {
            id: 2,
            username: attrs.username || 'Iqra',
            email: attrs.email || 'Iqrazafarzafar647@gmail.com'
          }
        };
      });

      this.get('/auth/me', (schema, request) => {
        const authHeader = request.requestHeaders.Authorization;

        if (authHeader && authHeader.includes('mock-jwt-token')) {
          return {
            success: true,
            user: {
              id: 1,
              username: 'Iqra',
              email: 'Iqrazafarzafar647@gmail.com'
            }
          };
        } else {
          return {
            success: false,
            error: 'Unauthorized'
          };
        }
      });

      // Expenses endpoints
      this.get('/expenses', () => {
        return {
          success: true,
          data: [
            { id: 1, title: 'Groceries', amount: 120.50, category: 'Food', date: '2023-04-15' },
            { id: 2, title: 'Netflix', amount: 15.99, category: 'Entertainment', date: '2023-04-10' },
            { id: 3, title: 'Electricity Bill', amount: 85.75, category: 'Utilities', date: '2023-04-05' },
            { id: 4, title: 'Gym Membership', amount: 50.00, category: 'Health', date: '2023-04-01' }
          ]
        };
      });

      this.post('/expenses', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);

        return {
          success: true,
          data: {
            id: Math.floor(Math.random() * 1000) + 5,
            ...attrs,
            date: attrs.date || new Date().toISOString().split('T')[0]
          }
        };
      });

      this.delete('/expenses/:id', (schema, request) => {
        const id = request.params.id;

        return {
          success: true,
          data: { id }
        };
      });

      this.put('/expenses/:id', (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);

        return {
          success: true,
          data: {
            id: Number(id),
            ...attrs
          }
        };
      });
    }
  });
}
