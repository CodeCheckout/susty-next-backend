import {Decimal128, ObjectID} from 'bson'
import mongoose from 'mongoose'

const Types = mongoose.Types

export const checkIfBSONType = (query) => {
    // return query instanceof Types.ObjectId;

    return Types.ObjectId.isValid(query)
}
