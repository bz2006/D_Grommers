import {mongoose} from "mongoose"

const breedsSchema = new mongoose.Schema({
    breedname: {
        type: String,
        defaultValue:'Golden Retriver'
    },
    

},
);

const Breeds = mongoose.models.breeds || mongoose.model('breeds', breedsSchema);

export default Breeds;