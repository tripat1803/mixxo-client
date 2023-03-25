export const razorpayOptions = (key, amount, orderId, name, email, contact) => {
    return {
        key: key,
        amount: amount,
        currency: "INR",
        name: "Mixxo",
        image: "https://example.com/your_logo",
        order_id: orderId,
        callback_url: "https://mixxo-server.vercel.app/api/razorpay/verification",
        prefill: {
            "name": name,
            "email": email,
            "contact": contact
        },
        theme: {
            "color": "#B77645"
        }
    };
}