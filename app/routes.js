const routes = require('next-routes')();

routes
	.add('/detail', '/detail/index')
	.add('/car/payment', '/order/index')

module.exports = routes;