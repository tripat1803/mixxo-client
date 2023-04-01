export const razorpayOptions = (key, amount, notes, orderId, name, email, contact) => {
    return {
        key: key,
        amount: amount,
        currency: "INR",
        name: "Mixxo",
        image: "https://example.com/your_logo",
        order_id: orderId,
        notes: notes,
        callback_url: `${process.env.REACT_APP_API}/api/razorpay/verification`,
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