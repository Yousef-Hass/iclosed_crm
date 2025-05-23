import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import prisma from '../config/database';
import { Prisma } from '@prisma/client';
import { emitContactCreate, emitContactUpdate, emitContactDelete, emitContactMove } from '../events';

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const getContacts = async (req: Request, res: Response) => {
  try {
    const include = {
        status: {
          include: {
            pipeline: true
          }
        }
      } as const;

      const contacts = await prisma.contact.findMany({
        include
      });

    res.json(contacts);
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const createContact = async (req: Request, res: Response) => {
  const io = req.app.get('io');
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { basicInfo, statusId, fields } = req.body;

    const contactData: Prisma.ContactCreateInput = {
        basicInfo,
        status: {
          connect: { id: statusId }
        }
      };

      if (fields?.length) {
        const customFieldValues = fields.map((field: any) => ({
          field: { connect: { id: field.fieldId } },
          value: field.value
        }));
        (contactData as any).customFieldValues = { create: customFieldValues };
      }

      const contact = await prisma.contact.create({
        data: contactData,
      include: {
        status: {
          include: {
            pipeline: true
          }
        }
      }
    });

    res.status(201).json(contact);
  } catch (error) {
    console.error('Create contact error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getContact = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const contact = await prisma.contact.findUnique({
      where: { id },
      include: {
        status: {
          include: {
            pipeline: true
          }
        }
      }
    });

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json(contact);
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateContact = async (req: Request, res: Response) => {
  const io = req.app.get('io');
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { basicInfo, statusId, fields } = req.body;

    const contactData: Prisma.ContactUpdateInput = {
        basicInfo,
        status: {
          connect: { id: statusId }
        }
      };

      if (fields?.length) {
        const customFieldValues = fields.map((field: any) => ({
          field: { connect: { id: field.fieldId } },
          value: field.value
        }));
        (contactData as any).customFieldValues = {
          deleteMany: {},
          create: customFieldValues
        };
      }

      const contact = await prisma.contact.update({
        where: { id },
        data: contactData,
      include: {
        status: {
          include: {
            pipeline: true
          }
        }
      }
    });

    res.json(contact);
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteContact = async (req: Request, res: Response) => {
  const io = req.app.get('io');
  try {
    const { id } = req.params;

    const existingContact = await prisma.contact.findUnique({
      where: { id },
      include: { status: { include: { pipeline: true } } }
    });

    if (!existingContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    const contact = await prisma.contact.delete({
      where: { id }
    });

    if (existingContact.status?.pipeline) {
      emitContactDelete(io, existingContact.status.pipeline.id, id);
    }

    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateContactStatus = async (req: Request, res: Response) => {
  const io = req.app.get('io');
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { statusId } = req.body;

    const contact = await prisma.contact.findUnique({
      where: { id },
      include: {
        status: {
          include: {
            pipeline: true
          }
        }
      }
    });

    res.json(contact);
  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const addCustomFieldValue = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { fieldId, value } = req.body;

    const fieldValue = await prisma.customFieldValue.create({
      data: {
        contactId: id,
        fieldId,
        value
      },
      include: {
        field: true
      }
    });

    res.status(201).json(fieldValue);
  } catch (error) {
    console.error('Add custom field value error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateCustomFieldValue = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, fieldId } = req.params;
    const { value } = req.body;

    const fieldValue = await prisma.customFieldValue.findFirst({
      where: {
        contactId: id,
        fieldId
      }
    });

    if (!fieldValue) {
      return res.status(404).json({ error: 'Custom field value not found' });
    }

    const updatedFieldValue = await prisma.customFieldValue.update({
      where: {
        id: fieldValue.id
      },
      data: { value },
      include: {
        field: true
      }
    });

    res.json(fieldValue);
  } catch (error) {
    console.error('Update custom field value error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteCustomFieldValue = async (req: Request, res: Response) => {
  try {
    const { id, fieldId } = req.params;

    const fieldValue = await prisma.customFieldValue.findFirst({
      where: {
        contactId: id,
        fieldId
      }
    });

    if (!fieldValue) {
      return res.status(404).json({ error: 'Custom field value not found' });
    }

    await prisma.customFieldValue.delete({
      where: {
        id: fieldValue.id
      }
    });

    res.json({ message: 'Custom field value deleted successfully' });
  } catch (error) {
    console.error('Delete custom field value error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
