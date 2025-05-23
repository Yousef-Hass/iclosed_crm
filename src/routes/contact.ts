import { Router } from 'express';
import { body } from 'express-validator';
import * as contactController from '../controllers/contact';

const router = Router();

router.get('/', contactController.getContacts);

router.post('/',
  [
    body('basicInfo').isObject(),
    body('statusId').notEmpty(),
    body('fields').optional().isArray()
  ],
  contactController.createContact
);

router.get('/:id', contactController.getContact);

router.put('/:id',
  [
    body('basicInfo').optional().isObject(),
    body('statusId').optional(),
    body('fields').optional().isArray()
  ],
  contactController.updateContact
);

router.delete('/:id', contactController.deleteContact);

router.put('/:id/status',
  [
    body('statusId').notEmpty()
  ],
  contactController.updateContactStatus
);

router.post('/:id/fields',
  [
    body('fieldId').notEmpty(),
    body('value').exists()
  ],
  contactController.addCustomFieldValue
);

router.put('/:id/fields/:fieldId',
  [
    body('value').exists()
  ],
  contactController.updateCustomFieldValue
);

router.delete('/:id/fields/:fieldId', contactController.deleteCustomFieldValue);

export default router;
