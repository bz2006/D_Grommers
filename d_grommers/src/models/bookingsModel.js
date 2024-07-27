import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
    packageName: {
        type: String,
    },
    packageDesc: {
        type: String,
    },
    services: [{
        type: String
    }],
    charge: {
        type: Number,
    },
    pid: {
        type: String
    }
});

const AddressSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    },
    pin: {
        type: Number
    },
    phone: {
        type: Number
    }
});

const SlotSchema = new mongoose.Schema({
    dayName: {
        type: String
    },
    dayNumber: {
        type: Number
    },
    month: {
        type: String
    },
    year: {
        type: String
    },
});


const bookingsSchema = new mongoose.Schema({

    userid: {
        type: String,
    },

    bookingid:{
        type: String,
    },

    bookingdate:{
        type: String,
    },

    package: packageSchema,

    bookingadrs: AddressSchema,

    paymentMethod: {
        type: String
    },

    amount:{
        type:Number
    },

    slot: {
        time: {
            type: String
        },
        date: SlotSchema
    },

    status: {
        type: String,
        default: 'Scheduled'
    },
});

const Bookings = mongoose.models.bookings || mongoose.model('bookings', bookingsSchema);

export default Bookings;

