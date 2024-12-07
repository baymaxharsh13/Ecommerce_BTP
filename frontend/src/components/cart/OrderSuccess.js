export default function OrderSuccess() {
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 shadow-lg rounded-lg text-center max-w-lg w-full">
                {/* Stripe Logo */}
                <img 
                    className="my-5 mx-auto h-40"
                    src="https://www.logo.wine/a/logo/Stripe_(company)/Stripe_(company)-Powered-by-Stripe-Logo.wine.svg" 
                    alt="Stripe Logo" 
                />
                
                {/* Success Image */}
                <img 
                    className="my-5 mx-auto" 
                    src="/images/success.png" 
                    alt="Order Success" 
                    width="150" 
                    height="150" 
                />

                <h2 className="text-3xl font-semibold text-indigo-600 mb-4">Your Order Has Been Placed Successfully!</h2>
                
                <p className="text-lg text-gray-600 mb-6">
                    Thank you for your purchase! We are processing your order and will update you soon.
                </p>
                
                <a 
                    href="/orders" 
                    className="inline-block bg-indigo-600 text-white py-3 px-6 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-indigo-700"
                >
                    Go to Orders
                </a>
            </div>
        </div>
    );
}
