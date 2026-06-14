import { writeFileSync } from 'fs';
import { join } from 'path';

const snippet = `(function() {
	const demoUser = { name: 'Demo User', email: 'demo@example.com', token: 'DEMO_TOKEN' };
	localStorage.setItem('userInfo', JSON.stringify(demoUser));

	const demoCart = {
		cartItems: [
			{ _id: '1', name: 'Sample Product', qty: 2, price: 9.99 }
		],
		shippingAddress: {},
		paymentMethod: 'PayPal'
	};
	localStorage.setItem('cart', JSON.stringify(demoCart));

	console.log('LocalStorage seeded: userInfo and cart');
})();
`;

const outPath = join(process.cwd(), 'seed-localstorage.js');
writeFileSync(outPath, snippet, 'utf8');

console.log('Created client/seed-localstorage.js — paste its contents into your browser console to seed localStorage.');
console.log('--- Begin snippet ---');
console.log(snippet);
console.log('--- End snippet ---');

process.exit(0);
