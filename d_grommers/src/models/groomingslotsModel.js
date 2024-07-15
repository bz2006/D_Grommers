const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SlotSchema = new Schema({
    day: Number,
    avsl: Number
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


const GroomingSlots = mongoose.model('GroomingSlots', GroomingSlotsSchema);

module.exports = GroomingSlots;
