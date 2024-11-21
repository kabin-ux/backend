import Order from '../Model/OrderModel.js';

// Get all orders
export const getOrder = async (req, res, next) => {
    try {
        const orders = await Order.find();

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "Orders not found" });
        }

        return res.status(200).json({ orders });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Add a new order
export const addOrder = async (req, res, next) => {
    const {
        productName,
        productCategory,
        seller,
        deliveryType,
        trakingID,
        orderDescription,
        unitPrice,
        quantity,
        orderTotal,
        paymentType,
        Date,
    } = req.body;

    try {
        const order = new Order({
            productName,
            productCategory,
            seller,
            deliveryType,
            trakingID,
            orderDescription,
            unitPrice,
            quantity,
            orderTotal,
            paymentType,
            Date,
        });
        await order.save();
        return res.status(201).json({ order }); // Use 201 for resource creation
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Unable to add order" });
    }
};

// Get order by ID
export const getOrderById = async (req, res, next) => {
    const orderId = req.params.Oid;

    try {
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        return res.status(200).json({ order });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Update order details
export const updateOrder = async (req, res, next) => {
    const orderId = req.params.Oid;
    const {
        productName,
        productCategory,
        seller,
        deliveryType,
        trakingID,
        orderDescription,
        unitPrice,
        quantity,
        orderTotal,
        paymentType,
        Date,
    } = req.body;

    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            {
                productName,
                productCategory,
                seller,
                deliveryType,
                trakingID,
                orderDescription,
                unitPrice,
                quantity,
                orderTotal,
                paymentType,
                Date,
            },
            { new: true, runValidators: true } // Return the updated document
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Unable to update order" });
        }

        return res.status(200).json({ order: updatedOrder });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Delete order
export const deleteOrder = async (req, res, next) => {
    const orderId = req.params.Oid;

    try {
        const deletedOrder = await Order.findByIdAndDelete(orderId);

        if (!deletedOrder) {
            return res.status(404).json({ message: "Unable to delete order" });
        }

        return res.status(200).json({ message: "Order deleted successfully", order: deletedOrder });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
