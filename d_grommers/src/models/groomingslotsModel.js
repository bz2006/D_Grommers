const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimeSchema = new Schema({
    time: String
});

const SlotSchema = new Schema({
    day: Number,
    avsl: Number,
    time:[TimeSchema]
});


const MonthlySlotSchema = new Schema({
    month: String,
    year: Number,
    slots: [SlotSchema]
});


const GroomingSlotsSchema = new Schema({
    district: String,
    monthlyslots: [MonthlySlotSchema]
});


const GroomingSlots = mongoose.models.GroomingSlots || mongoose.model('GroomingSlots', GroomingSlotsSchema);

module.exports = GroomingSlots;
