import { Router } from 'express';
import * as contactController from '../controllers/contact';
import { validate } from '../middleware/validate';
import { createContactSchema, updateContactSchema, updateContactStatusSchema, deleteContactSchema } from '../schemas/contact.schema';

const router = Router();

router.get('/', contactController.getContacts);
router.post('/', validate(createContactSchema), contactController.createContact);
router.get('/:id', contactController.getContact);
router.put('/:id', validate(updateContactSchema), contactController.updateContact);
router.delete('/:id', validate(deleteContactSchema), contactController.deleteContact);
router.put('/:id/status', validate(updateContactStatusSchema), contactController.updateContactStatus);

export default router;
