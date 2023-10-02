const mongoose = require('mongoose')

const loanSchema = new mongoose.Schema(
    {
        customerName: {
            type: String,
            required: [true, "A customer must have a name"],
            unique: false,
            trim: true,
            maxlength: [40, 'A customer name must have less than or equal to 40 characters'],
            minlength: [2, 'A customer name must have more than or equal to 2 characters']
        },
        phoneNumber: {
            type: Number,
            required: [true, "A customer must have a phone number"],
            unique: false,
            trim: true,
            maxlength: [10, 'A phone number must have maximum of 10 characters'],
            minlength: [10, 'A phone number must have minimum of 10 characters']
        },
        address: {
            type: String,
            required: [true, "A customer must have a valid physical address"],
            unique: false,
            trim: true,
            maxlength: [100, 'An address must have less than or equal to 100 characters'],
            minlength: [10, 'An address must have more than or equal to 10 characters']
        },
        loanAmount: {
            type: Number,
            required: [true, "A loan amount is required"],
            unique: false,
            trim: true,
            max: [1000000, 'a loan amount must be less than or equal to 1000000'],
            min: [1, 'a loan amount must be more than or equal to 1']
        },
        interest: {
            type: Number,
            default: 1,
            max: [20, 'Interest rate must be less than or equal to 20'],
            min: [0, 'Interest rate must be more than or equal to 0']
        },
        loanTermYears: {
            type: Number,
            required: [true, "A loan term is required"],
            default: 5,
            unique: false,
            trim: true,
            max: [30, 'a loan term must be less than or equal to 30'],
            min: [1, 'a loan term must be more than or equal to 1']
        },
        loanType: {
            type: String,
            required: [true, "A loan type is required"],
            unique: false,
            trim: false,
            maxlength: [30, 'a loan type must have less than or equal to 30 characters'],
            minlength: [3, 'a loan type must have more than or equal to 3 characters']
        },
        description: {
            type: String,
            required: [true, "A loan description is required"],
            unique: false,
            trim: false,
            maxlength: [50, 'a loan description must have less than or equal to 50 characters'],
            minlength: [10, 'a loan description must have more than or equal to 10 characters']
        },
        createdDate: {
            type: Date,
            default: Date.now,
            required: [true, 'A created date is required'],
            autopopulate: true,
            trim: false
        },
        insertedDate: {
            type: Date,
            default: Date.now,
            required: [true, 'An inserted date is required'],
            autopopulate: true,
            trim: false
        }
    })
    const customerLoan = mongoose.model('customerLoan', loanSchema)
    module.exports = customerLoan