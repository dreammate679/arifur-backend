const Survey = require('../Models/survey.model');
const ErrorHandler = require('../Utlis/ErrorHandler');
// const ExcelJS = require('exceljs');

exports.createSurvey = async (req, res, next) => {
    try {
        const survey = await Survey.create(req.body);
        res.status(201).json({
            success: true,
            data: survey
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
};

exports.getSurveys = async (req, res, next) => {
    try {
        const surveys = await Survey.find();
        res.status(200).json({
            success: true,
            data: surveys
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
};

exports.getSurveyById = async (req, res, next) => {
    try {
        const survey = await Survey.findById(req.params.id);
        if (!survey) {
            return next(new ErrorHandler('Survey not found', 404));
        }
        res.status(200).json({
            success: true,
            data: survey
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
};

exports.updateSurvey = async (req, res, next) => {
    try {
        let survey = await Survey.findById(req.params.id);
        if (!survey) {
            return next(new ErrorHandler('Survey not found', 404));
        }
        survey = await Survey.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            success: true,
            data: survey
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
};

exports.deleteSurvey = async (req, res, next) => {
    try {
        const survey = await Survey.findById(req.params.id);
        if (!survey) {
            return next(new ErrorHandler('Survey not found', 404));
        }
        await survey.remove();
        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
};

// exports.exportSurveysToExcel = async (req, res, next) => {
//     try {
//         const surveys = await Survey.find();
//         const workbook = new ExcelJS.Workbook();
//         const worksheet = workbook.addWorksheet('Surveys');

//         worksheet.columns = [
//             { header: 'ID', key: 'id', width: 30 },
//             { header: 'Title', key: 'title', width: 30 },
//             { header: 'Description', key: 'description', width: 30 },
//             { header: 'Created At', key: 'createdAt', width: 30 },
//             { header: 'Updated At', key: 'updatedAt', width: 30 }
//         ];

//         surveys.forEach(survey => {
//             worksheet.addRow({
//                 id: survey._id,
//                 title: survey.title,
//                 description: survey.description,
//                 createdAt: survey.createdAt,
//                 updatedAt: survey.updatedAt
//             });
//         });

//         res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//         res.setHeader('Content-Disposition', 'attachment; filename=surveys.xlsx');

//         await workbook.xlsx.write(res);
//         res.end();
//     } catch (error) {
//         return next(new ErrorHandler(error.message, 400));
//     }
// };