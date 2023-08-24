// Express validator middleware is simply an array of properties and
// validation logic applied to those properties
// If incoming request does not pass this validation, it can be rejected
import { body, ValidationChain } from 'express-validator';
import { Priority } from '../enums/Priority';
import { Status } from '../enums/Status';

export const createValidator: ValidationChain[] = [
  body('title')
    .not()
    .isEmpty()
    .withMessage('Task title is required')
    .trim()
    .isString()
    .withMessage('Title needs to be in text format'),

  body('date')
    .not()
    .isEmpty()
    .withMessage('Task date is required')
    .isString()
    .withMessage('Date needs to be in text format'),

  body('description')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Task description is required')
    .isString()
    .withMessage('Description needs to be in text format'),

  body('priority')
    .trim()
    .isIn([Priority.normal, Priority.high, Priority.low])
    .withMessage(
      'Priority can only be normal, high or low',
    ),

  body('status')
    .trim()
    .isIn([
      Status.todo,
      Status.inProgress,
      Status.completed,
    ])
    .withMessage(
      'Status can only be todo, inprogress or completed',
    ),
];

export const updateValidator: ValidationChain[] = [
  body('id')
    .not()
    .isEmpty()
    .withMessage('Task id is required')
    .trim()
    .isString()
    .withMessage('ID needs to be valid uuid format'),

  body('status')
    .trim()
    .isIn([
      Status.todo,
      Status.inProgress,
      Status.completed,
    ])
    .withMessage(
      'Status can only be todo, inprogress or completed',
    ),
];
