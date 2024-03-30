
OrderDetails={
    OrderID:{
        from: "",
        to: "",
        transporterID: "",
        traderID: "",
        dropID: "",
        paymentID: "",
        deliveryDate: "",
        deliveryTime: "",
        deliveryLocation: "",
        deliveryCost: 0,
        deliveryStatus: "",
    }
}

Transporter={
    transporterID: {
    email: "",
    phoneNumber: "",
    username: "",
    address: "",
    orders: {
        orderID:{
            from: "",
            to: "",
            weight: 0,
            type: "",
            status: "",
            price: 0,
            transporterID: 0,
            TraderID: 0,
            DeliveryDate: "",
            deliveryTime: "",
            deliveryLocation: "",
            deliveryCost: 0,
            deliveryCost: 0,
            transporterRating: 0,
            customerRating: 0,
            transporterReview: "",
            customerReview: "",
            timeTaken:"",
            license: "",
            vehicle: "",
            vehicleNumber: "",
            vehicleType: "",
            vehicleCapacity: "",
            vehicleImage: "",
            transporterImage: "",
            packageImage: "",
            paymentStatus: "",
            paymentMode: "",
            paymentID: "",
            paymentDate: "",
            paymentTime: "",
            paymentAmount: 0,
            paymentDescription: "",
        },
    },
    settings:{
        notification: true,
        location: true,
        payment: true,
    },
    wallet:{
        balance: 0,
        credit: 0,
        debit: 0,
        upiDetails:{
            upiID: "",
            upiName: "",
            upiBank: "",
            upiIFSC: "",
            upiImage: "",
            upiAddress: "",
            upiCity: "",
            upiState: "",
            upiCountry: "",
            upiPincode: "",
        },
        bankDetails:{
            bankName: "",
            bankBranch: "",
            bankIFSC: "",
            bankAccountNumber: "",
            bankAccountName: "",
            bankAddress: "",
            bankCity: "",
            bankState: "",
            bankCountry: "",
            bankPincode: "",
        },
        walletImage: "",
        transactions: {
            transactionID:{
                date: "",
                time: "",
                amount: 0,
                type: "",
                status: "",
                description: "",
                orderID:"",
            }
        }
    },
    ProfileDetails:{
        PhotoUrl: "",
        name: "",
        dob: "",
        panCard: "",
        adharCard: "",
        license: "",
        vehicle: "",
        vehicleNumber: "",
        vehicleType: "",
        vehicleCapacity: "",
        vehicleImage: "",
        transporterImage: "",
    }
}
}

function GetAccountDetails() {

    
}