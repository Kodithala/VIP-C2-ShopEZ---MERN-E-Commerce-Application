(function() {
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
