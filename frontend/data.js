const PRODUCTS = [
    {
        id: "headphones-001",
        name: "Wireless Noise-Cancelling Headphones",
        brand: "AudioPro",
        price: 149.99,
        oldPrice: 199.99,
        discount: "25% OFF",
        description: "Experience immersive sound with active noise cancellation, all-day comfort. Get an Perfect 8-D Listening experience, And if you want you can make it Wireless too.",
        features: [
            "Bluetooth 5.2 connectivity",
            "Active noise cancellation",
            "Connectivity options via USB‑C",
            "Up to 30 hours of battery life",
            "Comfortable fit for everyday use"
        ],
        images: {
            main: "https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            thumbnails: [
                "https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lfGVufDB8fDB8fHww",
                "https://s.alicdn.com/@sc04/kf/H37028e1e3b0f472c8cdf9f633eb42fe0R.png_640x640.png"
            ]
        },
        page: "index.html" // Link to the product's page
    },
    {
        id: "earbuds-002",
        name: "Premium Wireless Earbuds",
        brand: "SoundSphere",
        price: 89.99,
        oldPrice: 119.99,
        discount: "25% OFF",
        description: "Crystal-clear audio in a compact, comfortable design. With 24 hours of total playtime with the charging case, these earbuds are ready for anything.",
        features: [
            "Bluetooth 5.3 for stable connection",
            "Compact and ergonomic design",
            "24 hours total playtime",
            "IPX7 water resistance"
        ],
        images: {
            main: "https://rukminim2.flixcart.com/image/480/640/xif0q/headphone/j/4/y/black-earbuds-with-premium-quality-sound-hectic-original-imahdmngx2vamnkg.jpeg?q=90",
            thumbnails: []
        },
        page: "index.html" // This should ideally link to a different product page, but for now we'll reuse the main one.
    }
];
