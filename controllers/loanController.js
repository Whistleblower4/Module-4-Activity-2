const customerLoan = require('../models/loanModel');
const APIFeatures = require('./../dataBaseManager/loanDbContext');

exports.getLoan = async (req, res) => {
    // Get data from the database
    try {
        const customerLoans = await customerLoan.find();
        res.status(200).json({
            status: 'Success',
            results: customerLoans.length,
            data: {
                customerloan: customerLoans
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

exports.getLoanById = async (req, res) => {
    // Get particular loan details from the database
    try {
        const { id } = req.params;
        const customerloan = await customerLoan.findById(id);

        if (!customerloan) {
            res.status(404).json({
                status: 'fail',
                message: 'Loan not found'
            });
            return;
        }

        res.status(200).json({
            status: 'Success',
            data: {
                customerloan
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

exports.getAllLoans = async (req, res) => {
    try {
        // Execute query
        const features = new APIFeatures(customerLoan.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const customerloans = await features.query;

        // Send response
        res.status(200).json({
            status: 'Success',
            results: customerloans.length,
            data: {
                customerloan: customerloans
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

exports.createLoan = async (req, res) => {
    const newLoan = req.body;
    const dateTime = new Date().toISOString();

    const newcustomerLoan = { ...newLoan, createdDate: dateTime, insertedData: dateTime };

    try {
        const customerloan = await customerLoan.create(newcustomerLoan);
        res.status(201).json({
            status: 'Success',
            data: customerloan
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

exports.updateLoanById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedLoan = req.body;

        const customerloan = await customerLoan.findByIdAndUpdate(id, updatedLoan, {
            new: true,
            runValidators: true
        });

        if (!customerloan) {
            res.status(404).json({
                status: 'fail',
                message: 'Loan not found'
            });
            return;
        }

        res.status(200).json({
            status: 'success',
            data: {
                customerloan
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

exports.deleteLoanById = async (req, res) => {
    try {
        const { id } = req.params;
        const customerloan = await customerLoan.findByIdAndDelete(id);

        if (!customerloan) {
            res.status(404).json({
                status: 'fail',
                message: 'Loan not found'
            });
            return;
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};
