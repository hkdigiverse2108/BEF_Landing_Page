
export interface RazorpayResponse {
    razorpay_payment_id?: string;
    razorpay_order_id?: string;
    razorpay_signature?: string;
    error?: {
        code?: string;
        description?: string;
        source?: string;
        step?: string;
        reason?: string;
        metadata?: {
            payment_id?: string;
            order_id?: string;
        };
    };
}


export interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    handler: (response: RazorpayResponse) => void;
    prefill: {
        name: string;
        email: string;
        contact: string;
    };
    notes?: {
        course?: string;
        title?: string;
        referral?: string;
    };
    theme?: {
        color?: string;
    };
}

