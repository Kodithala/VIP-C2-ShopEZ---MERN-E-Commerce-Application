import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

export const getDashboardStats = async (_req, res, next) => {
  try {
    const [totalUsers, totalProducts, totalOrders, revenueResult, categoryResult, monthlySales, monthlyOrders] =
      await Promise.all([
        User.countDocuments(),
        Product.countDocuments(),
        Order.countDocuments(),
        Order.aggregate([{ $group: { _id: null, revenue: { $sum: '$totalAmount' } } }]),
        Product.aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }, { $sort: { _id: 1 } }]),
        Order.aggregate([
          { $group: { _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } }, revenue: { $sum: '$totalAmount' } } },
          { $sort: { _id: 1 } }
        ]),
        Order.aggregate([
          { $group: { _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } }, count: { $sum: 1 } } },
          { $sort: { _id: 1 } }
        ])
      ]);

    res.json({
      cards: {
        totalUsers,
        totalProducts,
        totalOrders,
        revenue: revenueResult[0]?.revenue || 0
      },
      charts: {
        categories: categoryResult.map((item) => ({ label: item._id, value: item.count })),
        sales: monthlySales.map((item) => ({ label: item._id, value: item.revenue })),
        orders: monthlyOrders.map((item) => ({ label: item._id, value: item.count }))
      }
    });
  } catch (error) {
    next(error);
  }
};
