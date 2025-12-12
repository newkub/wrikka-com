interface OrderData {
	items: Array<{
		id: string;
		quantity: number;
	}>;
	customerInfo: {
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
	};
	shippingAddress: {
		address: string;
		district: string;
		province: string;
		postalCode: string;
	};
	paymentMethod: "credit-card" | "bank-transfer" | "promptpay";
}

interface OrderResponse {
	success: boolean;
	data?: {
		orderId: string;
		total: number;
		estimatedDelivery: string;
	};
	error?: string;
}

export default defineEventHandler(async (event): Promise<OrderResponse> => {
	try {
		// Get request body
		const body = await readBody<OrderData>(event);

		// Validate required fields
		if (!body.items || body.items.length === 0) {
			throw createError({
				statusCode: 400,
				statusMessage: "ไม่พบสินค้าในคำสั่งซื้อ",
			});
		}

		if (!body.customerInfo.firstName || !body.customerInfo.lastName || !body.customerInfo.email) {
			throw createError({
				statusCode: 400,
				statusMessage: "ข้อมูลผู้สั่งซื้อไม่ครบถ้วน",
			});
		}

		if (!body.shippingAddress.address || !body.shippingAddress.province) {
			throw createError({
				statusCode: 400,
				statusMessage: "ข้อมูลที่อยู่จัดส่งไม่ครบถ้วน",
			});
		}

		// Sample products for price calculation
		const products = [
			{ id: "1", name: "Vue.js Complete Course", price: 1290 },
			{ id: "2", name: "Nuxt.js E-commerce Template", price: 890 },
			{ id: "3", name: "UI Component Library", price: 690 },
			{ id: "4", name: "TypeScript Mastery", price: 990 },
		];

		// Calculate total
		let total = 0;
		const orderItems = [];

		for (const item of body.items) {
			const product = products.find(p => p.id === item.id);
			if (!product) {
				throw createError({
					statusCode: 400,
					statusMessage: `ไม่พบสินค้า ID: ${item.id}`,
				});
			}

			const itemTotal = product.price * item.quantity;
			total += itemTotal;

			orderItems.push({
				productId: item.id,
				productName: product.name,
				price: product.price,
				quantity: item.quantity,
				total: itemTotal,
			});
		}

		// Add shipping cost
		const shippingCost = total >= 1000 ? 0 : 100;
		total += shippingCost;

		// Generate order ID
		const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

		// Calculate estimated delivery (3-5 working days)
		const deliveryDate = new Date();
		deliveryDate.setDate(deliveryDate.getDate() + 5);
		const estimatedDelivery = deliveryDate.toLocaleDateString("th-TH", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});

		// In a real application, you would:
		// 1. Save order to database
		// 2. Process payment
		// 3. Send confirmation email
		// 4. Update inventory

		// For now, we'll simulate processing time
		await new Promise(resolve => setTimeout(resolve, 1000));

		// Log order for debugging
		console.log("New order received:", {
			orderId,
			customerEmail: body.customerInfo.email,
			total,
			itemCount: body.items.length,
			paymentMethod: body.paymentMethod,
		});

		// Simulate payment processing based on method
		let _paymentStatus = "pending";

		switch (body.paymentMethod) {
			case "credit-card":
				// In real app: process credit card payment
				_paymentStatus = "completed";
				break;
			case "bank-transfer":
				// In real app: generate bank transfer instructions
				_paymentStatus = "pending";
				break;
			case "promptpay":
				// In real app: generate PromptPay QR code
				_paymentStatus = "pending";
				break;
		}

		// Send response
		return {
			success: true,
			data: {
				orderId,
				total,
				estimatedDelivery,
			},
		};
	} catch (error: unknown) {
		console.error("Order creation error:", error);

		// Return error response
		if (error && typeof error === "object" && "statusCode" in error) {
			throw error;
		}

		throw createError({
			statusCode: 500,
			statusMessage: "เกิดข้อผิดพลาดในการสร้างคำสั่งซื้อ",
		});
	}
});
